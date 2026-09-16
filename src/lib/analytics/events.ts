/**
 * Inflixt Analytics & Conversion Tracking Architecture
 * Privacy-First, Event-Level Funnel Instrumentation.
 * 
 * STRICT PRIVACY CONTRACT:
 * - NO user messages, AI responses, or conversation content.
 * - NO names, emails, phones, company names, or lead data.
 * - NO unvetted parameters. Only controlled categorical taxonomies.
 * - Non-blocking: analytics failures will NEVER disrupt user interactions or AI streaming.
 */

export type AiService =
  | "web_development"
  | "mobile_app_development"
  | "custom_software"
  | "ai_automation"
  | "ecommerce"
  | "seo";

export type AiProject =
  | "fair_comment"
  | "studio_2020"
  | "inflixt_global";

export type AiIntent =
  | "website"
  | "mobile_app"
  | "custom_software"
  | "ai_automation"
  | "ecommerce"
  | "seo"
  | "general_project";

export type LeadConfirmationStatus = "shown" | "confirmed" | "declined";

export type AnalyticsEventMap = {
  // Primary AI Conversion Funnel Events
  ai_chat_opened: undefined;
  ai_first_message: undefined;
  ai_conversation_started: undefined;
  ai_service_identified: { service: AiService };
  ai_portfolio_viewed: { project: AiProject };
  ai_project_intent: { intent: AiIntent };
  ai_lead_confirmation: { status: LeadConfirmationStatus };
  ai_lead_submitted: undefined;

  // Additional High-Value Funnel Events
  ai_chat_closed: undefined;
  ai_contact_cta_clicked: undefined;
  contact_form_submitted: undefined;
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

// Global type declaration for GA4 / GTM
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Whitelist filter ensuring strictly NO PII or unauthorized keys leak into analytics payloads.
 */
function sanitizeEventParams(
  params?: Record<string, unknown>
): Record<string, string> | undefined {
  if (!params) return undefined;

  const allowedKeys = ["service", "project", "intent", "status"];
  const clean: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (allowedKeys.includes(key) && typeof value === "string") {
      clean[key] = value;
    }
  }

  return Object.keys(clean).length > 0 ? clean : undefined;
}

/**
 * Privacy-safe console logger for development and diagnostics.
 */
function logAnalyticsDebug<E extends AnalyticsEventName>(
  event: E,
  params?: Record<string, string>
) {
  if (typeof window === "undefined") return;

  const isDev = process.env.NODE_ENV !== "production";
  const isDebugEnabled =
    typeof window !== "undefined" &&
    window.localStorage?.getItem("inflixt_analytics_debug") === "true";

  if (isDev || isDebugEnabled) {
    if (params && Object.keys(params).length > 0) {
      console.log(`[Analytics] ${event}`, params);
    } else {
      console.log(`[Analytics] ${event}`);
    }
  }
}

/**
 * Central event tracking helper.
 * Completely non-blocking and error-resilient.
 */
export function trackAiEvent<E extends AnalyticsEventName>(
  event: E,
  ...args: AnalyticsEventMap[E] extends undefined ? [] : [AnalyticsEventMap[E]]
): void {
  try {
    if (typeof window === "undefined") return;

    const rawParams = args[0] as Record<string, unknown> | undefined;
    const sanitizedParams = sanitizeEventParams(rawParams);

    // 1. Safe developer log (zero private data)
    logAnalyticsDebug(event, sanitizedParams);

    // 2. Dispatch to GA4 via window.gtag if present
    if (typeof window.gtag === "function") {
      window.gtag("event", event, sanitizedParams || {});
    }

    // 3. Dispatch to GTM dataLayer if present
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event,
        ...(sanitizedParams || {}),
      });
    }
  } catch (err) {
    // Analytics failures must NEVER interrupt user operations
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Analytics Warning] Event dispatch failed silently:", err);
    }
  }
}

/**
 * Maps project slug or title to strictly controlled AiProject taxonomy.
 */
export function mapSlugToAiProject(slugOrTitle?: string): AiProject | null {
  if (!slugOrTitle) return null;
  const clean = slugOrTitle.toLowerCase().replace(/[^a-z0-9]/g, "_");
  if (clean.includes("fair_comment")) return "fair_comment";
  if (clean.includes("studio_2020") || clean.includes("studio2020")) return "studio_2020";
  if (clean.includes("inflixt_global")) return "inflixt_global";
  return null;
}

/**
 * Maps service slug or title to strictly controlled AiService taxonomy.
 */
export function mapSlugToAiService(slugOrTitle?: string): AiService | null {
  if (!slugOrTitle) return null;
  const clean = slugOrTitle.toLowerCase().replace(/[^a-z0-9]/g, "_");
  if (clean.includes("web_development") || clean.includes("web_app")) return "web_development";
  if (clean.includes("mobile") || clean.includes("flutter") || clean.includes("ios") || clean.includes("android"))
    return "mobile_app_development";
  if (clean.includes("custom_software") || clean.includes("internal_tool") || clean.includes("portal") || clean.includes("erp") || clean.includes("crm"))
    return "custom_software";
  if (clean.includes("automation") || clean.includes("workflow")) return "ai_automation";
  if (clean.includes("ecommerce") || clean.includes("shop") || clean.includes("store")) return "ecommerce";
  if (clean.includes("seo") || clean.includes("growth") || clean.includes("search")) return "seo";
  return null;
}

/**
 * Maps detected intent type from `detectUserIntent()` to controlled taxonomies.
 */
export function mapDetectedIntentToAi(detectedType: string): {
  intent?: AiIntent;
  service?: AiService;
} {
  switch (detectedType) {
    case "web_development":
      return { intent: "website", service: "web_development" };
    case "mobile_development":
      return { intent: "mobile_app", service: "mobile_app_development" };
    case "custom_software":
      return { intent: "custom_software", service: "custom_software" };
    case "ai_automation":
      return { intent: "ai_automation", service: "ai_automation" };
    case "ecommerce":
      return { intent: "ecommerce", service: "ecommerce" };
    case "seo":
      return { intent: "seo", service: "seo" };
    case "lead_inquiry":
      return { intent: "general_project" };
    default:
      return {};
  }
}
