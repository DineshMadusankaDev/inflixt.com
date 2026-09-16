import { ChatMessage } from "./types";

export interface ClientProjectState {
  businessType?: string;
  projectType?: string;
  requirements?: string[];
  platform?: string;
  budget?: string;
  timeline?: string;
  intent?: string;
  recommendedService?: string;
  relevantProject?: string;
  clientName?: string;
  clientEmail?: string;
}

/**
 * Extracts structured client and project context from recent conversation messages.
 * Operates strictly on explicitly provided facts from user turns.
 * Missing values remain undefined (UNKNOWN).
 */
export function extractConversationState(messages: ChatMessage[]): ClientProjectState {
  const state: ClientProjectState = {};
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content);
  const allUserText = userMessages.join(" \n ").toLowerCase();

  // 1. Business Type
  const businessPatterns = [
    { pattern: /(?:run|own|have|manage|at|for)\s+(?:an?|our)\s+([a-z0-9\s\-]+?)(?:\s+studio|\s+firm|\s+agency|\s+business|\s+company|\s+restaurant|\s+clinic|\s+shop|\s+store|\s+hotel|\s+startup)/i, matchFull: true },
    { pattern: /architecture\s+studio/i, value: "Architecture studio" },
    { pattern: /restaurant|cafe|bistro|bakery/i, value: "Restaurant / Hospitality" },
    { pattern: /hotel|resort|boutique hotel|villa/i, value: "Hotel / Hospitality" },
    { pattern: /law\s+firm|legal\s+practice/i, value: "Law firm" },
    { pattern: /clinic|healthcare|dental|medical/i, value: "Healthcare / Clinic" },
    { pattern: /e-?commerce|clothing\s+brand|retail\s+store/i, value: "E-commerce / Retail brand" },
    { pattern: /saas|tech\s+startup|software\s+company/i, value: "Tech startup / SaaS" },
    { pattern: /real\s+estate|property\s+developer/i, value: "Real estate / Property" },
  ];

  for (const bp of businessPatterns) {
    if ("value" in bp && bp.pattern.test(allUserText)) {
      state.businessType = bp.value;
      break;
    } else if ("matchFull" in bp) {
      const match = allUserText.match(bp.pattern);
      if (match && match[0]) {
        const clean = match[0].replace(/^(run|own|have|manage|at|for)\s+(an?|our)\s+/i, "").trim();
        if (clean.length > 2 && clean.length < 50) {
          state.businessType = clean.charAt(0).toUpperCase() + clean.slice(1);
          break;
        }
      }
    }
  }

  // 2. Project Type
  if (/mobile\s+app|ios\s+app|android\s+app|flutter\s+app/i.test(allUserText)) {
    state.projectType = "Mobile Application";
    state.platform = "iOS & Android";
  } else if (/e-?commerce\s+platform|online\s+store|web\s+shop/i.test(allUserText)) {
    state.projectType = "E-commerce Platform";
    state.platform = "Web";
  } else if (/internal\s+tool|erp|crm|custom\s+software|operations\s+platform|inventory\s+system/i.test(allUserText)) {
    state.projectType = "Custom Software / Internal System";
    state.platform = "Web";
  } else if (/web\s+app|saas\s+platform|web\s+portal|client\s+portal/i.test(allUserText)) {
    state.projectType = "Web Application";
    state.platform = "Web";
  } else if (/website|redesign|company\s+site|landing\s+page/i.test(allUserText)) {
    state.projectType = "Company Website";
    state.platform = "Web";
  } else if (/automate|automation|workflow/i.test(allUserText)) {
    state.projectType = "AI & Workflow Automation";
  }

  // 3. Budget
  const budgetMatches = [
    { pattern: /under\s+\$500|\$500\s+or\s+less|< ?\$?500/i, value: "Under $500" },
    { pattern: /\$500\s*(?:–|-|to)\s*\$1,?000/i, value: "$500 – $1,000" },
    { pattern: /\$1,?000\s*(?:–|-|to)\s*\$2,?500/i, value: "$1,000 – $2,500" },
    { pattern: /\$2,?500\s*(?:–|-|to)\s*\$5,?000/i, value: "$2,500 – $5,000" },
    { pattern: /\$5,?000\s*(?:–|-|to)\s*\$10,?000/i, value: "$5,000 – $10,000" },
    { pattern: /\$10,?000\s*\+|over\s+\$10,?000|10k\+/i, value: "$10,000+" },
    { pattern: /(?:budget\s+is\s+|have\s+(?:a\s+)?)\$?5,?000\b/i, value: "$2,500 – $5,000 (Target $5,000)" },
    { pattern: /(?:budget\s+is\s+|have\s+(?:a\s+)?)\$?([0-9,]+)/i, custom: true },
  ];

  for (const bm of budgetMatches) {
    if (bm.value && bm.pattern.test(allUserText)) {
      state.budget = bm.value;
      break;
    } else if (bm.custom) {
      const match = allUserText.match(bm.pattern);
      if (match && match[1]) {
        const num = parseInt(match[1].replace(/,/g, ""), 10);
        if (!isNaN(num)) {
          if (num < 500) state.budget = "Under $500";
          else if (num <= 1000) state.budget = "$500 – $1,000";
          else if (num <= 2500) state.budget = "$1,000 – $2,500";
          else if (num <= 5000) state.budget = "$2,500 – $5,000";
          else if (num <= 10000) state.budget = "$5,000 – $10,000";
          else state.budget = "$10,000+";
          break;
        }
      }
    }
  }

  // 4. Requirements (accumulated from user input)
  const reqs: string[] = [];
  if (/portfolio|project\s+gallery|showcase/i.test(allUserText)) reqs.push("Portfolio showcase");
  if (/contact\s+form|inquiry\s+form|get\s+in\s+touch/i.test(allUserText)) reqs.push("Inquiry form");
  if (/reservation|booking|appointment/i.test(allUserText)) reqs.push("Reservations / Bookings");
  if (/payment|checkout|stripe/i.test(allUserText)) reqs.push("Payment processing");
  if (/inventory|stock\s+management|excel/i.test(allUserText)) reqs.push("Inventory / Workflow automation");
  if (/multilingual|multi-language/i.test(allUserText)) reqs.push("Multilingual publishing");
  if (/client\s+portal|login|dashboard/i.test(allUserText)) reqs.push("User auth / Portal");
  if (reqs.length > 0) {
    state.requirements = reqs;
  }

  // 5. Timeline
  const timelineMatch = allUserText.match(/(?:launch|need|ready|timeline|deadline)\s+(?:in|by|around|within)\s+([a-z0-9\s]+?)(?:\.|\,|$|\n)/i);
  if (timelineMatch && timelineMatch[1]) {
    const raw = timelineMatch[1].trim();
    if (raw.length < 30 && !raw.includes("budget") && !raw.includes("dollar")) {
      state.timeline = raw;
    }
  }

  // 6. Name and Email (if provided by user)
  for (const text of userMessages) {
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch && !state.clientEmail) {
      state.clientEmail = emailMatch[1];
    }
    const nameMatch = text.match(/(?:my\s+name\s+is|i['’]m|call\s+me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch && !state.clientName) {
      state.clientName = nameMatch[1];
    }
  }

  return state;
}

/**
 * Formats the extracted client project state into a readable prompt context block.
 */
export function formatConversationStateContext(state: ClientProjectState): string {
  const lines: string[] = [
    "### ACTIVE CONVERSATION CONTEXT (KNOWN vs UNKNOWN)",
    "The visitor has provided the following details in this session so far:",
    `- Business / Industry: ${state.businessType ? `KNOWN: "${state.businessType}"` : "UNKNOWN (Do not assume or guess)"}`,
    `- Project Type: ${state.projectType ? `KNOWN: "${state.projectType}"` : "UNKNOWN (Do not assume or guess)"}`,
    `- Key Requirements: ${state.requirements && state.requirements.length > 0 ? `KNOWN: ${state.requirements.join(", ")}` : "UNKNOWN"}`,
    `- Target Platform: ${state.platform ? `KNOWN: "${state.platform}"` : "UNKNOWN"}`,
    `- Target Budget: ${state.budget ? `KNOWN: "${state.budget}"` : "UNKNOWN"}`,
    `- Timeline: ${state.timeline ? `KNOWN: "${state.timeline}"` : "UNKNOWN"}`,
  ];

  if (state.clientName) lines.push(`- Client Name: KNOWN: "${state.clientName}"`);
  if (state.clientEmail) lines.push(`- Client Email: KNOWN: "${state.clientEmail}"`);

  lines.push(
    "",
    "CONVERSATION MEMORY & ANTI-REPETITION RULES:",
    "1. For any field marked KNOWN above, DO NOT ASK FOR IT AGAIN. If the user already told you they run an architecture studio, remember it and build upon it.",
    "2. For any field marked UNKNOWN, do NOT invent or guess a value. Treat it strictly as unknown.",
    "3. Keep qualification step-by-step: ask ONE question at a time about the next most logical unknown requirement."
  );

  return lines.join("\n");
}
