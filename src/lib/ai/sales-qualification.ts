import { ChatMessage, LeadData, LeadQualification, LeadScore } from "./types";
import { VALID_BUDGET_OPTIONS } from "@/lib/contact/inquiry-service";
import { servicesData } from "@/data/services";

export function evaluateLeadQualification(
  messages: ChatMessage[],
  currentLead?: Partial<LeadData>
): LeadQualification {
  const allUserText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const extracted: Partial<LeadData> = { ...currentLead };

  // 1. Identify Service
  if (!extracted.service) {
    for (const service of servicesData) {
      if (
        allUserText.includes(service.title.toLowerCase()) ||
        allUserText.includes(service.slug.toLowerCase()) ||
        (service.id === "ai-web-development" &&
          (allUserText.includes("website") || allUserText.includes("web app") || allUserText.includes("next.js"))) ||
        (service.id === "ecommerce-solutions" &&
          (allUserText.includes("e-commerce") || allUserText.includes("ecommerce") || allUserText.includes("online store") || allUserText.includes("shop"))) ||
        (service.id === "mobile-app-development" &&
          (allUserText.includes("mobile app") || allUserText.includes("ios") || allUserText.includes("android") || allUserText.includes("flutter"))) ||
        (service.id === "custom-software" &&
          (allUserText.includes("custom software") || allUserText.includes("erp") || allUserText.includes("crm") || allUserText.includes("internal tool") || allUserText.includes("portal"))) ||
        (service.id === "ai-automation" &&
          (allUserText.includes("ai automation") || allUserText.includes("automate") || allUserText.includes("gemini") || allUserText.includes("workflow automation"))) ||
        (service.id === "seo-digital-growth" &&
          (allUserText.includes("seo") || allUserText.includes("search visibility") || allUserText.includes("core web vitals")))
      ) {
        extracted.service = service.title;
        break;
      }
    }
  }

  // 2. Identify Budget Range
  if (!extracted.budget) {
    for (const option of VALID_BUDGET_OPTIONS) {
      if (allUserText.includes(option.toLowerCase())) {
        extracted.budget = option;
        break;
      }
    }
    // Check for common dollar patterns
    if (!extracted.budget) {
      if (/\$?\b(500|600|700|800|900|1000|1,000)\b/.test(allUserText)) {
        extracted.budget = "$500 – $1,000";
      } else if (/\$?\b(1500|2000|2,000|2500|2,500)\b/.test(allUserText)) {
        extracted.budget = "$1,000 – $2,500";
      } else if (/\$?\b(3000|3,000|4000|4,000|5000|5,000)\b/.test(allUserText)) {
        extracted.budget = "$2,500 – $5,000";
      } else if (/\$?\b(6000|7000|8000|9000|10000|10,000)\b/.test(allUserText)) {
        extracted.budget = "$5,000 – $10,000";
      } else if (/\$?\b(12000|15000|20000|25000|30000|50000)\b/.test(allUserText)) {
        extracted.budget = "$10,000+";
      }
    }
  }

  // 3. Identify Timeline
  if (!extracted.timeline) {
    const timelineMatch = allUserText.match(
      /\b(within|in|by|around)?\s*(\d+\s*(?:week|weeks|month|months|days))\b/i
    );
    if (timelineMatch) {
      extracted.timeline = timelineMatch[0].trim();
    } else if (allUserText.includes("asap") || allUserText.includes("immediately")) {
      extracted.timeline = "Immediately / ASAP";
    }
  }

  // 4. Check for Contact Info
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const hasEmail = emailRegex.test(allUserText) || !!extracted.email;
  const hasContactInfo = hasEmail && (!!extracted.name || /my name is|i am\s+([A-Z][a-z]+)/i.test(allUserText));

  // 5. Compute Lead Score
  let score: LeadScore = "COLD";

  const hasProjectIntent =
    allUserText.includes("build") ||
    allUserText.includes("create") ||
    allUserText.includes("need a") ||
    allUserText.includes("want a") ||
    allUserText.includes("start a project") ||
    allUserText.includes("hire") ||
    allUserText.includes("cost") ||
    allUserText.includes("quote") ||
    allUserText.includes("price");

  if (hasContactInfo && (extracted.budget || extracted.service)) {
    score = "HOT";
  } else if (
    (hasProjectIntent && extracted.service) ||
    extracted.budget ||
    extracted.timeline ||
    allUserText.includes("start a project")
  ) {
    score = "WARM";
  }

  return {
    score,
    identifiedService: extracted.service,
    identifiedBudget: extracted.budget,
    identifiedTimeline: extracted.timeline,
    hasContactInfo,
    notes: `Lead stage: ${score}. Service: ${extracted.service || "Unspecified"}. Budget: ${
      extracted.budget || "Unspecified"
    }.`,
  };
}
