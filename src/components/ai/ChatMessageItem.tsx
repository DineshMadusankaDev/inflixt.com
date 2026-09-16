"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  User,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
} from "lucide-react";
import {
  ChatMessage,
  LeadData,
} from "@/lib/ai/types";
import { toSafeInternalHref } from "@/lib/ai/urls";
import {
  trackAiEvent,
  mapSlugToAiProject,
} from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  message: ChatMessage;
  isStreaming?: boolean;
  onLeadSubmitted?: (lead: LeadData) => void;
  onSelectPrompt?: (text: string) => void;
}

// Module-level cache to ensure lead confirmation "shown" is tracked exactly once per message ID
const trackedShownLeadConfirmations = new Set<string>();

/**
 * Parses and formats markdown elements safely without heavy external markdown libraries.
 * Handles: **bold**, `code`, [link](url), and list items (- or *).
 * Strips all internal marker tags and sanitizes out any localhost URLs.
 */
function renderFormattedContent(rawText: string) {
  // 1. Strip raw card tags and markers (both complete and streaming partials)
  let cleanText = rawText
    .replace(/:::service\{[\s\S]*?\}:::/gi, "")
    .replace(/:::project\{[\s\S]*?\}:::/gi, "")
    .replace(/:::inquiry_summary\{[\s\S]*?\}:::/gi, "")
    .replace(/:::cta\{[\s\S]*?\}:::/gi, "")
    .replace(/\[\[recommend_projects:[\s\S]*?\]\]/gi, "")
    .replace(/\[\[recommend_project:[\s\S]*?\]\]/gi, "")
    .replace(/\[\[recommend_service:[\s\S]*?\]\]/gi, "")
    .replace(/\[\[confirm_inquiry:[\s\S]*?\]\]/gi, "")
    // Strip trailing incomplete markers during streaming
    .replace(/:::service\{[\s\S]*$/gi, "")
    .replace(/:::project\{[\s\S]*$/gi, "")
    .replace(/:::inquiry_summary\{[\s\S]*$/gi, "")
    .replace(/:::cta\{[\s\S]*$/gi, "")
    .replace(/\[\[recommend_[a-z_]+:?[\s\S]*$/gi, "")
    .replace(/\[\[confirm_inquiry:?[\s\S]*$/gi, "")
    .trim();

  // 2. Eradicate any localhost URLs from output
  cleanText = cleanText
    .replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi, "")
    .trim();

  if (!cleanText) return null;

  const lines = cleanText.split("\n");

  return (
    <div className="space-y-2 text-sm leading-relaxed text-[#E7E5EE]">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // List item handling
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#00F5FF] mt-1 text-xs select-none">•</span>
              <span className="flex-1">{formatInline(trimmed.substring(2))}</span>
            </div>
          );
        }

        // Ordered list handling (1. , 2. )
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#00F5FF] font-mono text-xs mt-0.5 select-none font-semibold">
                {numMatch[1]}.
              </span>
              <span className="flex-1">{formatInline(numMatch[2])}</span>
            </div>
          );
        }

        return <p key={idx}>{formatInline(trimmed)}</p>;
      })}
    </div>
  );
}

/**
 * Handles inline formatting: **bold**, `code`, and [link](url)
 */
function formatInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("[") && token.includes("](")) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const label = linkMatch[1];
        const rawHref = linkMatch[2];
        const href = toSafeInternalHref(rawHref);
        const isExternal = href.startsWith("http");
        parts.push(
          <Link
            key={match.index}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-[#00F5FF] font-medium hover:underline inline-flex items-center gap-0.5"
          >
            {label}
            {isExternal && <ExternalLink className="w-3 h-3 ml-0.5 inline" />}
          </Link>
        );
      }
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-[#00F5FF]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export function ChatMessageItem({
  message,
  isStreaming = false,
  onLeadSubmitted,
}: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSuccess, setLeadSuccess] = useState(message.metadata?.leadSubmitted || false);
  const [leadDeclined, setLeadDeclined] = useState(false);

  // ai_lead_confirmation status="shown": track once per unique confirmation message
  useEffect(() => {
    if (
      message.metadata?.leadConfirmation &&
      !message.metadata.leadSubmitted &&
      !trackedShownLeadConfirmations.has(message.id)
    ) {
      trackedShownLeadConfirmations.add(message.id);
      trackAiEvent("ai_lead_confirmation", { status: "shown" });
    }
  }, [message.id, message.metadata?.leadConfirmation, message.metadata?.leadSubmitted]);

  async function handleConfirmLead(data: LeadData) {
    trackAiEvent("ai_lead_confirmation", { status: "confirmed" });
    setSubmittingLead(true);
    setLeadError(null);

    try {
      const res = await fetch("/api/ai/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          description: data.projectDescription,
          conversationSummary: data.conversationSummary,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Failed to submit project inquiry.");
      }

      // CRITICAL: Server-side successful submission is the authoritative source of truth
      trackAiEvent("ai_lead_submitted");
      setLeadSuccess(true);
      onLeadSubmitted?.(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Inquiry submission error.";
      setLeadError(errorMsg);
    } finally {
      setSubmittingLead(false);
    }
  }

  function handleDeclineLead() {
    trackAiEvent("ai_lead_confirmation", { status: "declined" });
    setLeadDeclined(true);
  }

  return (
    <div
      className={cn(
        "flex gap-3 max-w-full group animate-in fade-in slide-in-from-bottom-2 duration-200",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 select-none",
          isUser
            ? "bg-[#8B2CFF]/30 border border-[#8B2CFF]/50 text-white"
            : "bg-gradient-to-br from-[#00F5FF]/30 to-[#8B2CFF]/30 border border-[#00F5FF]/50 text-[#00F5FF]"
        )}
        aria-hidden="true"
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble Content */}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl p-3.5 space-y-2.5 transition-all text-sm",
          isUser
            ? "bg-[#18112C] border border-[#8B2CFF]/40 text-white rounded-tr-none shadow-[0_2px_15px_rgba(139,44,255,0.15)]"
            : "bg-[#0B0717]/90 border border-white/10 text-[#E7E5EE] rounded-tl-none shadow-[0_2px_15px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Render text with formatting */}
        {renderFormattedContent(message.content)}

        {/* Streaming Cursor */}
        {isStreaming && (
          <span
            className="inline-block w-1.5 h-4 ml-1 bg-[#00F5FF] animate-pulse align-middle"
            aria-label="Generating response..."
          />
        )}

        {/* Rich Service Card */}
        {message.metadata?.serviceRecommendation && (
          <div className="mt-2.5 p-3 rounded-xl bg-black/50 border border-[#00F5FF]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#00F5FF] uppercase">
                RECOMMENDED SERVICE
              </span>
              <span className="text-[10px] text-[#9290A3]">Pillar Fit</span>
            </div>
            <h4 className="font-heading font-bold text-white text-sm">
              {message.metadata.serviceRecommendation.title}
            </h4>
            <p className="text-xs text-[#9290A3] leading-relaxed">
              {message.metadata.serviceRecommendation.reason}
            </p>
            {message.metadata.serviceRecommendation.capabilities?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {message.metadata.serviceRecommendation.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#E7E5EE]"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            )}
            <Link
              href={toSafeInternalHref(message.metadata.serviceRecommendation.href)}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F5FF] hover:text-white transition-colors group/link pt-1"
            >
              <span>Explore Service Details</span>
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}

        {/* Rich Project Recommendation Cards */}
        {(() => {
          const projects =
            message.metadata?.projectRecommendations && message.metadata.projectRecommendations.length > 0
              ? message.metadata.projectRecommendations
              : message.metadata?.projectRecommendation
              ? [message.metadata.projectRecommendation]
              : [];

          if (projects.length === 0) return null;

          return (
            <div className="mt-3 space-y-2.5">
              {projects.map((project, idx) => (
                <div
                  key={project.id || project.slug || idx}
                  className="p-3.5 rounded-xl bg-black/60 border border-[#8B2CFF]/30 hover:border-[#8B2CFF]/60 transition-all space-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#00F5FF] uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                      PORTFOLIO PROOF
                    </span>
                    <span className="text-[10px] text-[#9290A3] font-medium">
                      {project.clientDomain}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-white text-sm tracking-tight">
                    {project.title}
                  </h4>
                  <p className="text-xs text-[#9290A3] leading-relaxed">
                    {project.summary}
                  </p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-[#8B2CFF]/15 border border-[#8B2CFF]/25 text-[10px] font-medium text-[#C471ED]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="pt-1 flex items-center justify-between">
                    <Link
                      href={toSafeInternalHref(project.href)}
                      onClick={() => {
                        const mapped = mapSlugToAiProject(project.slug || project.id);
                        if (mapped) {
                          trackAiEvent("ai_portfolio_viewed", { project: mapped });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F5FF] hover:text-white transition-colors group/link"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Lead Confirmation & Submission Card */}
        {message.metadata?.leadConfirmation && (
          <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-b from-[#0F0B1E] to-[#080512] border border-[#00F5FF]/30 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono font-bold text-[#00F5FF] tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                PROJECT INQUIRY SUMMARY
              </span>
              <span className="text-[10px] text-[#9290A3]">Verified Intake</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-0.5 border-b border-white/5">
                <span className="text-[#9290A3]">Client:</span>
                <span className="font-medium text-white">
                  {message.metadata.leadConfirmation.name}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-white/5">
                <span className="text-[#9290A3]">Work Email:</span>
                <span className="font-medium text-white">
                  {message.metadata.leadConfirmation.email}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-white/5">
                <span className="text-[#9290A3]">Target Service:</span>
                <span className="font-medium text-[#00F5FF]">
                  {message.metadata.leadConfirmation.service}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-white/5">
                <span className="text-[#9290A3]">Budget Tier:</span>
                <span className="font-medium text-white">
                  {message.metadata.leadConfirmation.budget}
                </span>
              </div>
              {message.metadata.leadConfirmation.timeline && (
                <div className="flex justify-between py-0.5 border-b border-white/5">
                  <span className="text-[#9290A3]">Timeline:</span>
                  <span className="font-medium text-white">
                    {message.metadata.leadConfirmation.timeline}
                  </span>
                </div>
              )}
            </div>

            {leadError && (
              <div className="flex items-start gap-1.5 p-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{leadError}</span>
              </div>
            )}

            {leadSuccess ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#27C93F]/10 border border-[#27C93F]/30 text-[#27C93F] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Inquiry Dispatched to Inflixt Team!</span>
              </div>
            ) : leadDeclined ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-[#9290A3] text-xs">
                <span>Inquiry cancelled. You can continue chatting or adjust any details.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    message.metadata?.leadConfirmation &&
                    handleConfirmLead(message.metadata.leadConfirmation)
                  }
                  disabled={submittingLead}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#00F5FF] via-[#38E1FF] to-[#8B2CFF] text-[#05030D] font-heading font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:brightness-105 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {submittingLead ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting to Inflixt...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm & Send to Inflixt Team</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDeclineLead}
                  disabled={submittingLead}
                  className="w-full py-1.5 px-3 rounded-lg border border-white/10 text-[#9290A3] hover:text-white hover:bg-white/5 text-xs font-medium transition-colors cursor-pointer"
                >
                  Not now / Decline
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lead Success Card */}
        {message.metadata?.leadSubmitted && (
          <div className="mt-2.5 p-3 rounded-xl bg-[#27C93F]/10 border border-[#27C93F]/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-[#27C93F] font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Project Inquiry Confirmed & Sent</span>
            </div>
            <p className="text-[#9290A3] leading-relaxed text-[11px]">
              Dinesh and our engineering team will review your specifications and reach out
              via email within 24 hours.
            </p>
          </div>
        )}

        {/* CTA Card */}
        {message.metadata?.cta && (
          <div className="mt-2 pt-1">
            <Link
              href={toSafeInternalHref(message.metadata.cta.href)}
              onClick={() => {
                trackAiEvent("ai_contact_cta_clicked");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#8B2CFF] text-[#05030D] font-heading font-semibold text-xs hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all"
            >
              <span>{message.metadata.cta.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
