import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildInflixtSystemPrompt } from "@/lib/ai/inflixt-system-prompt";
import { ChatMessage, ChatStreamEvent, ProjectRecommendation, ServiceRecommendation } from "@/lib/ai/types";
import { sanitizeText } from "@/lib/contact/inquiry-service";
import { submitProjectInquiryTool, executeSubmitProjectInquiry } from "@/lib/ai/tools";
import { detectUserIntent } from "@/lib/ai/intents";
import { extractConversationState } from "@/lib/ai/conversation-state";
import { classifyGeminiError } from "@/lib/ai/error-handler";
import { toSafeInternalHref } from "@/lib/ai/urls";
import {
  getAuthoritativeProjects,
  getAuthoritativeProjectBySlug,
  toProjectRecommendation,
} from "@/lib/ai/authoritative-projects";
import { servicesData } from "@/data/services";

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 25; // 25 messages per 10 minutes per IP

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 15 * 60 * 1000).unref?.();

// Server-side cached Gemini client singleton
let cachedClient: GoogleGenAI | null = null;
let cachedApiKey: string | null = null;

function getGeminiClient(apiKey: string): GoogleGenAI {
  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new GoogleGenAI({ apiKey });
    cachedApiKey = apiKey;
  }
  return cachedClient;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Throttling
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";

    const now = Date.now();
    const clientLimit = rateLimitMap.get(ip);

    if (clientLimit && now < clientLimit.resetAt) {
      if (clientLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error:
              "You have sent too many messages in a short period. Please wait a few minutes or reach out directly to dinesh@inflixtglobal.com.",
          },
          { status: 429 }
        );
      }
      clientLimit.count += 1;
    } else {
      rateLimitMap.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse payload safely
    let body: { messages?: ChatMessage[] };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Conversation history must be a non-empty array." },
        { status: 400 }
      );
    }

    // Cap conversation history at latest 30 messages
    const recentMessages = messages.slice(-30);
    const lastUserMessage = recentMessages[recentMessages.length - 1];

    if (!lastUserMessage || lastUserMessage.role !== "user") {
      return NextResponse.json(
        { error: "The latest message must be from the user." },
        { status: 400 }
      );
    }

    // Sanitize user content and enforce length guardrails
    const cleanUserText = sanitizeText(lastUserMessage.content);
    if (!cleanUserText) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    if (cleanUserText.length > 1000) {
      return NextResponse.json(
        { error: "Message exceeds maximum length of 1,000 characters." },
        { status: 400 }
      );
    }

    // Detect user intent (portfolio, service, pricing, specific project, etc.)
    const userIntent = detectUserIntent(cleanUserText);

    // 3. Check for GEMINI_API_KEY
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-flash-latest";

    // Set up SSE Stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let hasEmittedTokens = false;

        function emit(event: ChatStreamEvent) {
          if (event.type === "token" && event.content) {
            hasEmittedTokens = true;
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        }

        // Graceful fallback when GEMINI_API_KEY is not configured
        if (!apiKey) {
          if (userIntent.isPortfolioIntent) {
            emit({
              type: "token",
              content:
                "Here are a few projects worth exploring.\n\nLooking for something similar to one of these, or starting from a different idea?",
            });
            emit({
              type: "card",
              cardType: "projects",
              payload: getAuthoritativeProjects().map(toProjectRecommendation),
            });
          } else {
            emit({
              type: "token",
              content:
                "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Start a Project →",
                href: toSafeInternalHref("/contact"),
              },
            });
          }
          emit({ type: "done" });
          controller.close();
          return;
        }

        try {
          const ai = getGeminiClient(apiKey);
          const conversationState = extractConversationState(recentMessages);
          const systemPrompt = buildInflixtSystemPrompt(conversationState);

          // Build contents history
          const contents = recentMessages.map((m) => ({
            role: m.role === "user" ? ("user" as const) : ("model" as const),
            parts: [{ text: sanitizeText(m.content) }],
          }));

          // Set 12s timeout to protect against Google API network hangs and 503 latency spikes
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => {
              const timeoutErr = new Error("Connection to Google Gemini timed out (12s threshold reached).");
              (timeoutErr as unknown as { status: number }).status = 504;
              reject(timeoutErr);
            }, 12000).unref?.();
          });

          const responseStream = await Promise.race([
            ai.models.generateContentStream({
              model,
              contents,
              config: {
                systemInstruction: systemPrompt,
                temperature: 0.5, // Controlled, consistent, professional
                maxOutputTokens: 800,
                tools: [
                  {
                    functionDeclarations: [submitProjectInquiryTool],
                  },
                ],
              },
            }),
            timeoutPromise,
          ]);

          let fullResponseText = "";
          let streamBuffer = "";
          let functionCallDetected: { name: string; args: Record<string, unknown> } | null = null;

          for await (const chunk of responseStream) {
            // Check for function calls
            if (chunk.functionCalls && chunk.functionCalls.length > 0) {
              const call = chunk.functionCalls[0];
              if (call.name) {
                functionCallDetected = {
                  name: call.name,
                  args: (call.args || {}) as Record<string, unknown>,
                };
              }
            }

            const chunkText = chunk.text;
            if (typeof chunkText === "string" && chunkText.length > 0) {
              fullResponseText += chunkText;
              streamBuffer += chunkText;

              // Filter out markers and localhost references from streaming tokens
              // We buffer if an opening tag `[[` or `:::` is partially formed
              while (streamBuffer.length > 0) {
                const markerOpenBracket = streamBuffer.indexOf("[[");
                const markerOpenColon = streamBuffer.indexOf(":::");

                // Find earliest opening delimiter
                let openIndex = -1;
                let closeDelimiter = "";

                if (markerOpenBracket !== -1 && markerOpenColon !== -1) {
                  if (markerOpenBracket < markerOpenColon) {
                    openIndex = markerOpenBracket;
                    closeDelimiter = "]]";
                  } else {
                    openIndex = markerOpenColon;
                    closeDelimiter = ":::";
                  }
                } else if (markerOpenBracket !== -1) {
                  openIndex = markerOpenBracket;
                  closeDelimiter = "]]";
                } else if (markerOpenColon !== -1) {
                  openIndex = markerOpenColon;
                  closeDelimiter = ":::";
                }

                if (openIndex === -1) {
                  // No opening marker found. Check if the buffer ends with partial `[` or `:`
                  if (streamBuffer.endsWith("[") || streamBuffer.endsWith(":")) {
                    // Hold last character in buffer
                    const toEmit = streamBuffer.slice(0, -1);
                    streamBuffer = streamBuffer.slice(-1);
                    if (toEmit.length > 0) {
                      const clean = toEmit.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi, "");
                      if (clean) emit({ type: "token", content: clean });
                    }
                    break;
                  } else {
                    // Safe to emit entire buffer
                    const clean = streamBuffer.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi, "");
                    streamBuffer = "";
                    if (clean) emit({ type: "token", content: clean });
                    break;
                  }
                } else {
                  // Text before openIndex is safe to emit
                  if (openIndex > 0) {
                    const safeText = streamBuffer.slice(0, openIndex);
                    const clean = safeText.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi, "");
                    if (clean) emit({ type: "token", content: clean });
                    streamBuffer = streamBuffer.slice(openIndex);
                  }

                  // Look for closing delimiter
                  const closeIndex = streamBuffer.indexOf(closeDelimiter);
                  if (closeIndex !== -1) {
                    // Discard the marker from text stream (handled as structured card event later)
                    streamBuffer = streamBuffer.slice(closeIndex + closeDelimiter.length);
                  } else {
                    // Closing delimiter hasn't arrived yet, wait for next chunk
                    break;
                  }
                }
              }
            }
          }

          // Flush any remaining buffer text that is not a marker
          if (streamBuffer.length > 0) {
            const leftover = streamBuffer
              .replace(/\[\[[\s\S]*?\]\]/g, "")
              .replace(/:::[\s\S]*?:::/g, "")
              .replace(/\[\[[\s\S]*$/g, "")
              .replace(/:::[\s\S]*$/g, "")
              .replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi, "")
              .trim();

            if (leftover) {
              emit({ type: "token", content: leftover });
            }
          }
          // Handle function call if triggered
          if (functionCallDetected && functionCallDetected.name === "submitProjectInquiry") {
            const dispatchResult = await executeSubmitProjectInquiry(
              functionCallDetected.args,
              ip
            );

            if (dispatchResult.success) {
              emit({
                type: "card",
                cardType: "lead_success",
                payload: {
                  message:
                    "Your inquiry has been successfully sent to the Inflixt team! Dinesh and our engineering staff will review your specifications and reach out within 24 hours.",
                  details: functionCallDetected.args,
                },
              });
            } else {
              emit({
                type: "card",
                cardType: "error",
                payload: {
                  message:
                    "We encountered an issue submitting your inquiry automatically. Please feel free to use our main contact form directly.",
                  href: toSafeInternalHref("/contact"),
                },
              });
            }
          }          // -------------------------------------------------------------------
          // RESOLVE STRUCTURED APPLICATION CARDS
          // -------------------------------------------------------------------
          let cardsEmitted = false;

          // 1. Multiple Projects Recommendation Marker: [[recommend_projects:slug1,slug2]]
          const multiProjectsMatch = fullResponseText.match(/\[\[recommend_projects:(.*?)\]\]/);
          if (multiProjectsMatch) {
            const rawSlugs = multiProjectsMatch[1].split(",").map((s) => s.trim().toLowerCase());
            const matchedProjects: ProjectRecommendation[] = [];

            for (const slug of rawSlugs) {
              const proj = getAuthoritativeProjectBySlug(slug);
              if (proj) {
                matchedProjects.push(toProjectRecommendation(proj));
              }
            }

            if (matchedProjects.length > 0) {
              emit({ type: "card", cardType: "projects", payload: matchedProjects });
              cardsEmitted = true;
            }
          }

          // 2. Single Project Recommendation Marker: [[recommend_project:slug]]
          const singleProjectMatch = fullResponseText.match(/\[\[recommend_project:(.*?)\]\]/);
          if (!cardsEmitted && singleProjectMatch) {
            const slug = singleProjectMatch[1].trim().toLowerCase();
            const proj = getAuthoritativeProjectBySlug(slug);
            if (proj) {
              emit({ type: "card", cardType: "project", payload: toProjectRecommendation(proj) });
              cardsEmitted = true;
            }
          }

          // 3. Fallback to User Intent if LLM omitted markers on portfolio inquiries
          if (!cardsEmitted && userIntent.isPortfolioIntent) {
            emit({
              type: "card",
              cardType: "projects",
              payload: getAuthoritativeProjects().map(toProjectRecommendation),
            });
            cardsEmitted = true;
          } else if (!cardsEmitted && userIntent.type === "specific_project" && userIntent.targetProjectSlug) {
            const proj = getAuthoritativeProjectBySlug(userIntent.targetProjectSlug);
            if (proj) {
              emit({ type: "card", cardType: "project", payload: toProjectRecommendation(proj) });
              cardsEmitted = true;
            }
          }

          // 4. Service Recommendation Marker: [[recommend_service:slug]] or legacy :::service{...}:::
          const serviceSlugMatch = fullResponseText.match(/\[\[recommend_service:(.*?)\]\]/);
          if (serviceSlugMatch) {
            const slug = serviceSlugMatch[1].trim().toLowerCase();
            const s = servicesData.find((item) => item.slug === slug || item.id === slug);
            if (s) {
              const payload: ServiceRecommendation = {
                id: s.id,
                title: s.title,
                slug: s.slug,
                href: toSafeInternalHref(`/services#${s.id}`),
                reason: s.shortDescription,
                capabilities: s.capabilities,
              };
              emit({ type: "card", cardType: "service", payload });
            }
          } else {
            const legacyServiceMatch = fullResponseText.match(/:::service(\{.*?\})\:::/);
            if (legacyServiceMatch) {
              try {
                const data = JSON.parse(legacyServiceMatch[1]);
                emit({ type: "card", cardType: "service", payload: data });
              } catch (e) {
                console.warn("Failed to parse legacy service card JSON:", e);
              }
            }
          }

          // 5. Inquiry Summary Confirmation Card: [[confirm_inquiry:{...}]] or legacy :::inquiry_summary{...}:::
          const confirmInquiryMatch = fullResponseText.match(/\[\[confirm_inquiry:(\{.*?\})\]\]/);
          if (confirmInquiryMatch) {
            try {
              const data = JSON.parse(confirmInquiryMatch[1]);
              emit({ type: "card", cardType: "lead_confirm", payload: data });
            } catch (e) {
              console.warn("Failed to parse confirm_inquiry JSON:", e);
            }
          } else {
            const legacyInquiryMatch = fullResponseText.match(/:::inquiry_summary(\{.*?\})\:::/);
            if (legacyInquiryMatch) {
              try {
                const data = JSON.parse(legacyInquiryMatch[1]);
                emit({ type: "card", cardType: "lead_confirm", payload: data });
              } catch (e) {
                console.warn("Failed to parse legacy inquiry JSON:", e);
              }
            }
          }

          emit({ type: "done" });
          controller.close();
        } catch (err) {
          const classified = classifyGeminiError(err);
          console.error(
            `[GEMINI STREAMING ERROR] [${classified.category}] [HTTP ${classified.statusCode || "N/A"}]: ${classified.technicalDetails}`
          );

          if (hasEmittedTokens) {
            // If tokens were already sent down the stream, do NOT append fallback text or duplicate messages
            emit({ type: "done" });
            controller.close();
            return;
          }

          const lowerUserText = cleanUserText.toLowerCase();

          // 1. Adversarial: "Tell me everything about Dinesh"
          if (
            (lowerUserText.includes("everything") || lowerUserText.includes("all you know")) &&
            (lowerUserText.includes("dinesh") || lowerUserText.includes("founder"))
          ) {
            emit({
              type: "token",
              content:
                "Dinesh Madhusanka is the Founder of Inflixt Global PVT LTD, leading the company across modern web development, mobile applications, custom software engineering, and AI-powered solutions. We keep our consultation focused strictly on verified business and technical capabilities, so private personal details are not shared.\n\nIf you'd like to discuss a project with Inflixt or connect directly with Dinesh regarding an inquiry, I'd be glad to help.",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Start a Project →",
                href: toSafeInternalHref("/contact"),
              },
            });
          }
          // 2. Adversarial: "How many clients does Inflixt have?"
          else if (
            lowerUserText.includes("how many client") ||
            lowerUserText.includes("how many customer") ||
            lowerUserText.includes("number of client")
          ) {
            emit({
              type: "token",
              content:
                "Inflixt focuses on bespoke digital engineering and high-touch technical partnerships rather than volume metrics. Specific client counts and private financial metrics are not publicly published.\n\nYou can review our verified production case studies—such as Fair Comment and Studio 2020—to see the quality and scope of our work.",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Explore Case Studies →",
                href: toSafeInternalHref("/work"),
              },
            });
          }
          // 3. Adversarial: "Is Inflixt the best agency in Sri Lanka?"
          else if (
            lowerUserText.includes("best agency") ||
            lowerUserText.includes("number one") ||
            lowerUserText.includes("best company") ||
            lowerUserText.includes("top agency")
          ) {
            emit({
              type: "token",
              content:
                "We avoid subjective rankings or claiming to be the 'best'. Instead, Inflixt stands on verifiable engineering standards: type-safe architectures with Next.js and Flutter, thoughtful UI design, practical AI automation, and end-to-end technical delivery.\n\nAre you looking for a technology partner for a specific platform or project?",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Start a Project →",
                href: toSafeInternalHref("/contact"),
              },
            });
          }
          // 4. Founder Inquiries
          else if (userIntent.type === "founder") {
            emit({
              type: "token",
              content:
                "Dinesh Madhusanka is the Founder of Inflixt Global PVT LTD, the company behind Inflixt.\n\nHe leads the company across web development, mobile applications, custom software, and AI-powered digital solutions, with a focus on building practical digital products for growing businesses.\n\nIf you're exploring a project with Inflixt, I can show you some of our recent work or help you figure out what kind of solution would fit your needs.",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Explore Our Work →",
                href: toSafeInternalHref("/work"),
              },
            });
          }
          // 5. "Why Inflixt?" Inquiries
          else if (userIntent.type === "why_inflixt") {
            emit({
              type: "token",
              content:
                "Clients partner with Inflixt for our combination of design craftsmanship and modern engineering rigor. We build with type-safe technologies like Next.js, React 19, and Flutter, integrate practical AI automation into actual business workflows, and deliver end-to-end from product architecture to high-performance deployment.\n\nIs there a particular project challenge or technical requirement you're looking to solve?",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Explore Services →",
                href: toSafeInternalHref("/services"),
              },
            });
          }
          // 6. Company Overview Inquiries
          else if (userIntent.type === "company_overview") {
            emit({
              type: "token",
              content:
                "Inflixt is an AI-powered software development and digital solutions company that builds modern digital products for growing businesses. We specialize across modern web platforms, mobile apps, custom operational software, and AI workflow automation.\n\nAre you looking to build a new product or improve an existing business workflow?",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Start a Project →",
                href: toSafeInternalHref("/contact"),
              },
            });
          }
          // 7. Specific Studio 2020 CMS question
          else if (
            (lowerUserText.includes("studio 2020") || lowerUserText.includes("studio2020")) &&
            (lowerUserText.includes("cms") || lowerUserText.includes("sanity"))
          ) {
            const proj = getAuthoritativeProjectBySlug("studio-2020");
            emit({
              type: "token",
              content:
                "Studio 2020 was engineered with Next.js, TypeScript, and Tailwind CSS using custom code structuring rather than a headless CMS. It does not use Sanity CMS.",
            });
            if (proj) {
              emit({
                type: "card",
                cardType: "project",
                payload: toProjectRecommendation(proj),
              });
            } else {
              emit({
                type: "card",
                cardType: "cta",
                payload: {
                  label: "View Studio 2020 →",
                  href: toSafeInternalHref("/work/studio-2020"),
                },
              });
            }
          }
          // 8. Broad Portfolio Request
          else if (userIntent.isPortfolioIntent) {
            emit({
              type: "token",
              content:
                "Here are a few projects worth exploring.\n\nLooking for something similar to one of these, or starting from a different idea?",
            });
            emit({
              type: "card",
              cardType: "projects",
              payload: getAuthoritativeProjects().map(toProjectRecommendation),
            });
          }
          // 9. Specific Project Request
          else if (userIntent.type === "specific_project" && userIntent.targetProjectSlug) {
            const proj = getAuthoritativeProjectBySlug(userIntent.targetProjectSlug);
            if (proj) {
              emit({
                type: "token",
                content: `${proj.title} is a verified ${proj.category.toLowerCase()} engineered with ${proj.technologies.join(
                  ", "
                )}. ${proj.shortDescription}`,
              });
              emit({
                type: "card",
                cardType: "project",
                payload: toProjectRecommendation(proj),
              });
            } else {
              emit({
                type: "card",
                cardType: "cta",
                payload: {
                  label: "Explore Case Studies →",
                  href: toSafeInternalHref("/work"),
                },
              });
            }
          }
          // 10. Pricing Inquiry
          else if (userIntent.type === "pricing") {
            emit({
              type: "token",
              content:
                "Project pricing depends directly on scope, functional requirements, third-party integrations, design fidelity, and timeline.\n\nOur verified inbound intake budget tiers are:\n• Under $500\n• $500 – $1,000\n• $1,000 – $2,500\n• $2,500 – $5,000\n• $5,000 – $10,000\n• $10,000+\n\nWhat kind of digital product or platform are you looking to build?",
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Start a Project →",
                href: toSafeInternalHref("/contact"),
              },
            });
          }
          // 11. Specific Service Inquiry
          else if (userIntent.targetServiceId) {
            const s = servicesData.find((item) => item.id === userIntent.targetServiceId || item.slug === userIntent.targetServiceId);
            if (s) {
              emit({
                type: "token",
                content: `${s.title}: ${s.shortDescription}\n\nWhat kind of requirements or features are you planning for this project?`,
              });
              emit({
                type: "card",
                cardType: "service",
                payload: {
                  id: s.id,
                  title: s.title,
                  slug: s.slug,
                  href: toSafeInternalHref(`/services#${s.id}`),
                  reason: s.shortDescription,
                  capabilities: s.capabilities,
                },
              });
            } else {
              emit({
                type: "token",
                content:
                  "I'd be glad to help you explore that. Could you share a bit more about what you're looking to build?",
              });
              emit({
                type: "card",
                cardType: "cta",
                payload: {
                  label: "Explore Services →",
                  href: toSafeInternalHref("/services"),
                },
              });
            }
          }
          // 12. General fallback
          else {
            emit({
              type: "token",
              content: classified.publicMessage,
            });
            emit({
              type: "card",
              cardType: "cta",
              payload: {
                label: "Start a Project →",
                href: toSafeInternalHref("/contact"),
              },
            });
          }

          emit({ type: "done" });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[CHAT API FATAL ERROR]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred. Please reach out to dinesh@inflixtglobal.com.",
      },
      { status: 500 }
    );
  }
}
