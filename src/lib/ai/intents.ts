import { AuthoritativeProject, getAuthoritativeProjects, getAuthoritativeProjectBySlug } from "./authoritative-projects";

export type DetectedIntentType =
  | "portfolio"
  | "specific_project"
  | "founder"
  | "company_overview"
  | "why_inflixt"
  | "services"
  | "pricing"
  | "web_development"
  | "mobile_development"
  | "ai_automation"
  | "custom_software"
  | "ecommerce"
  | "seo"
  | "lead_inquiry"
  | "general";

export interface IntentAnalysis {
  type: DetectedIntentType;
  targetProjectSlug?: string;
  recommendedProjects?: AuthoritativeProject[];
  targetServiceId?: string;
  isPortfolioIntent: boolean;
}

export function detectUserIntent(userText: string): IntentAnalysis {
  const text = userText.toLowerCase().trim();

  // 1. Founder & Leadership Intent
  if (
    text.includes("dinesh") ||
    text.includes("madhusanka") ||
    text.includes("madhusankha") ||
    text.includes("who is the founder") ||
    text.includes("who founded") ||
    text.includes("who runs inflixt") ||
    text.includes("founder of inflixt")
  ) {
    return {
      type: "founder",
      isPortfolioIntent: false,
    };
  }

  // 2. "Why Inflixt?" Intent
  if (
    text.includes("why should i choose inflixt") ||
    text.includes("why inflixt") ||
    text.includes("why choose you") ||
    text.includes("why hire inflixt") ||
    text.includes("what makes inflixt different")
  ) {
    return {
      type: "why_inflixt",
      isPortfolioIntent: false,
    };
  }

  // 3. Company Overview Intent
  if (
    text.includes("what does inflixt do") ||
    text.includes("what do you do") ||
    text.includes("about inflixt") ||
    text.includes("tell me about inflixt") ||
    text === "what is inflixt" ||
    text === "who is inflixt"
  ) {
    return {
      type: "company_overview",
      isPortfolioIntent: false,
    };
  }

  // 4. Specific Project Intent (CONSERVATIVE: Only trigger on explicit project naming or case study references)
  if (text.includes("studio 2020") || text.includes("studio2020") || text.includes("studio-2020")) {
    const project = getAuthoritativeProjectBySlug("studio-2020");
    return {
      type: "specific_project",
      targetProjectSlug: "studio-2020",
      recommendedProjects: project ? [project] : [],
      isPortfolioIntent: false,
    };
  }

  if (text.includes("fair comment") || text.includes("faircomment") || text.includes("fair-comment")) {
    const project = getAuthoritativeProjectBySlug("fair-comment");
    return {
      type: "specific_project",
      targetProjectSlug: "fair-comment",
      recommendedProjects: project ? [project] : [],
      isPortfolioIntent: false,
    };
  }

  if (
    text.includes("inflixt global platform") ||
    text.includes("inflixt global project") ||
    text.includes("inflixt global case study") ||
    text.includes("inflixt-global")
  ) {
    const project = getAuthoritativeProjectBySlug("inflixt-global");
    return {
      type: "specific_project",
      targetProjectSlug: "inflixt-global",
      recommendedProjects: project ? [project] : [],
      isPortfolioIntent: false,
    };
  }

  // 2. Broad Portfolio Intent ("Show me your work", "What have you built?", "Case studies", etc.)
  const portfolioKeywords = [
    "show me your work",
    "show me your projects",
    "what have you built",
    "can i see your portfolio",
    "see your portfolio",
    "previous projects",
    "past projects",
    "case studies",
    "case study",
    "your work",
    "your portfolio",
    "show me work",
    "portfolio",
    "recent work",
  ];

  if (portfolioKeywords.some((kw) => text.includes(kw))) {
    return {
      type: "portfolio",
      recommendedProjects: getAuthoritativeProjects(),
      isPortfolioIntent: true,
    };
  }

  // 3. Pricing / Cost Intent
  if (
    text.includes("how much") ||
    text.includes("cost") ||
    text.includes("pricing") ||
    text.includes("price") ||
    text.includes("rates") ||
    text.includes("budget") ||
    text.includes("quote")
  ) {
    return {
      type: "pricing",
      isPortfolioIntent: false,
    };
  }

  // 4. Services Intent
  if (
    text.includes("what services") ||
    text.includes("explore your services") ||
    text.includes("services do you offer") ||
    text.includes("what do you offer") ||
    text.includes("all services") ||
    text === "services"
  ) {
    return {
      type: "services",
      isPortfolioIntent: false,
    };
  }

  // 5. Mobile Development
  if (
    text.includes("mobile app") ||
    text.includes("need an app") ||
    text.includes("build an app") ||
    text.includes("ios") ||
    text.includes("android") ||
    text.includes("flutter")
  ) {
    return {
      type: "mobile_development",
      targetServiceId: "mobile-app-development",
      isPortfolioIntent: false,
    };
  }

  // 6. AI Automation
  if (
    text.includes("automate") ||
    text.includes("automation") ||
    text.includes("ai workflow") ||
    text.includes("repetitive")
  ) {
    return {
      type: "ai_automation",
      targetServiceId: "ai-automation",
      isPortfolioIntent: false,
    };
  }

  // 7. Custom Software
  if (
    text.includes("custom software") ||
    text.includes("spreadsheets") ||
    text.includes("erp") ||
    text.includes("crm") ||
    text.includes("internal tool") ||
    text.includes("portal")
  ) {
    return {
      type: "custom_software",
      targetServiceId: "custom-software",
      isPortfolioIntent: false,
    };
  }

  // 8. E-commerce
  if (
    text.includes("ecommerce") ||
    text.includes("e-commerce") ||
    text.includes("online store") ||
    text.includes("shop") ||
    text.includes("sell online")
  ) {
    return {
      type: "ecommerce",
      targetServiceId: "ecommerce-solutions",
      isPortfolioIntent: false,
    };
  }

  // 9. Web Development
  if (
    text.includes("website") ||
    text.includes("web app") ||
    text.includes("web development") ||
    text.includes("next.js")
  ) {
    return {
      type: "web_development",
      targetServiceId: "ai-web-development",
      isPortfolioIntent: false,
    };
  }

  // 10. SEO & Digital Growth
  if (
    text.includes("seo") ||
    text.includes("google ranking") ||
    text.includes("search visibility") ||
    text.includes("core web vitals")
  ) {
    return {
      type: "seo",
      targetServiceId: "seo-digital-growth",
      isPortfolioIntent: false,
    };
  }

  // 11. Lead Inquiry
  if (
    text.includes("start a project") ||
    text.includes("hire you") ||
    text.includes("work together") ||
    text.includes("contact team") ||
    text.includes("inquiry")
  ) {
    return {
      type: "lead_inquiry",
      isPortfolioIntent: false,
    };
  }

  return {
    type: "general",
    isPortfolioIntent: false,
  };
}
