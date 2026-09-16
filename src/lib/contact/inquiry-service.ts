import { servicesData } from "@/data/services";

export const VALID_BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export type ValidBudgetOption = (typeof VALID_BUDGET_OPTIONS)[number];

export const VALID_SERVICE_TITLES = servicesData.map((s) => s.title);

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  description: string;
  timeline?: string;
  source?: "contact_form" | "ai_chat";
  conversationSummary?: string;
  ip?: string;
}

export interface InquiryValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    description: string;
    timeline: string;
    source: "contact_form" | "ai_chat";
    conversationSummary: string;
  };
}

export interface InquiryDispatchResult {
  success: boolean;
  simulated?: boolean;
  message?: string;
  error?: string;
  status: number;
}

export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // Strip control characters
    .trim();
}

export function validateInquiryPayload(rawBody: Record<string, unknown>): InquiryValidationResult {
  const name = sanitizeText(rawBody.name);
  const email = sanitizeText(rawBody.email).toLowerCase();
  const company = sanitizeText(rawBody.company);
  const service = sanitizeText(rawBody.service);
  const budget = sanitizeText(rawBody.budget);
  const description = sanitizeText(rawBody.description);
  const timeline = sanitizeText(rawBody.timeline);
  const conversationSummary = sanitizeText(rawBody.conversationSummary);
  const source = rawBody.source === "ai_chat" ? "ai_chat" : "contact_form";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please provide your full name (minimum 2 characters).";
  } else if (name.length > 100) {
    errors.name = "Name must not exceed 100 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid work email address.";
  } else if (email.length > 100) {
    errors.email = "Email must not exceed 100 characters.";
  }

  if (company && company.length > 100) {
    errors.company = "Company name must not exceed 100 characters.";
  }

  // Handle service matching (allow title, slug, id, or partial match)
  const normalizedServiceInput = service.toLowerCase().replace(/[-_]/g, " ").trim();
  const matchedService = servicesData.find(
    (s) =>
      s.title.toLowerCase() === service.toLowerCase() ||
      s.id.toLowerCase() === service.toLowerCase() ||
      s.slug.toLowerCase() === service.toLowerCase() ||
      s.title.toLowerCase().replace(/[-_]/g, " ").trim() === normalizedServiceInput
  );
  const resolvedService = matchedService ? matchedService.title : service;

  if (!resolvedService || !VALID_SERVICE_TITLES.includes(resolvedService)) {
    errors.service = "Please select a valid primary service.";
  }

  // Handle budget matching (allow en-dash, hyphen, with/without commas)
  const normalizeBudgetStr = (str: string) =>
    str
      .replace(/[\u2010-\u2015\u2212\-]/g, "-")
      .replace(/,/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();

  const normalizedInputBudget = normalizeBudgetStr(budget);
  const matchedBudget = VALID_BUDGET_OPTIONS.find(
    (b) =>
      normalizeBudgetStr(b) === normalizedInputBudget ||
      b.toLowerCase() === budget.toLowerCase()
  );
  const resolvedBudget = matchedBudget || budget;

  if (!resolvedBudget || !VALID_BUDGET_OPTIONS.includes(resolvedBudget as ValidBudgetOption)) {
    errors.budget = "Please select an estimated budget range.";
  }

  if (!description || description.length < 15) {
    errors.description = "Please provide a brief project description (minimum 15 characters).";
  } else if (description.length > 4000) {
    errors.description = "Project description must not exceed 4,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    sanitized: {
      name,
      email,
      company,
      service: resolvedService,
      budget: resolvedBudget,
      description,
      timeline,
      source,
      conversationSummary,
    },
  };
}

export async function dispatchInquiry(
  payload: NonNullable<InquiryValidationResult["sanitized"]>,
  ip: string = "anonymous-client"
): Promise<InquiryDispatchResult> {
  const submissionDate = new Date();
  const utcTimestamp = submissionDate.toUTCString();
  const slTimestamp = submissionDate.toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const isProduction = process.env.NODE_ENV === "production";
  const resendApiKey = process.env.RESEND_API_KEY;

  // Production Safety Enforcement
  if (isProduction && !resendApiKey) {
    console.error(
      "[INQUIRY DISPATCH ERROR]: RESEND_API_KEY is not configured in production environment."
    );
    return {
      success: false,
      status: 503,
      error:
        "Email dispatch service is currently being configured. Please contact dinesh@inflixtglobal.com directly.",
    };
  }

  // Development Fallback (Simulated Mode)
  if (!resendApiKey) {
    console.log("=================================================");
    console.log(`[DEV MODE] Inquiry Submission (Simulated - ${payload.source.toUpperCase()}):`);
    console.log(`- Name: ${payload.name}`);
    console.log(`- Email: ${payload.email}`);
    console.log(`- Company: ${payload.company || "N/A"}`);
    console.log(`- Service: ${payload.service}`);
    console.log(`- Budget: ${payload.budget}`);
    if (payload.timeline) console.log(`- Timeline: ${payload.timeline}`);
    console.log(`- Description:\n${payload.description}`);
    if (payload.conversationSummary) {
      console.log(`- AI Consultation Summary:\n${payload.conversationSummary}`);
    }
    console.log(`- Source: ${payload.source}`);
    console.log(`- Timestamp (SLT): ${slTimestamp}`);
    console.log("=================================================");

    return {
      success: true,
      simulated: true,
      status: 200,
      message: "Inquiry received (Development simulated delivery).",
    };
  }

  // Resend Transactional Email Delivery
  const recipientEmail = process.env.CONTACT_TO_EMAIL || "dinesh@inflixtglobal.com";
  const senderEmail =
    process.env.CONTACT_FROM_EMAIL || "Inflixt Inquiries <onboarding@resend.dev>";

  const originTag = payload.source === "ai_chat" ? "[Inflixt AI Lead]" : "[Contact Form]";
  const emailSubject = `${originTag} Project Inquiry: ${payload.name} — ${payload.service}`;

  const textContent = `New Project Inquiry — Inflixt
==================================================
Source: ${payload.source === "ai_chat" ? "Inflixt AI Consultation" : "Website Contact Form"}

Client Details:
- Name: ${payload.name}
- Email: ${payload.email}
- Company: ${payload.company || "Not provided"}

Project Requirements:
- Primary Service: ${payload.service}
- Estimated Budget (USD): ${payload.budget}
${payload.timeline ? `- Desired Timeline: ${payload.timeline}\n` : ""}- Project Description & Goals:
${payload.description}

${
  payload.conversationSummary
    ? `AI Consultation Summary:
------------------------
${payload.conversationSummary}
`
    : ""
}
Submission Metadata:
- Time (Sri Lanka Time): ${slTimestamp}
- Time (UTC): ${utcTimestamp}
- Sender IP: ${ip}

Reply directly to this email to respond to ${payload.name} (${payload.email}).
`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111827; background-color: #f9fafb; margin: 0; padding: 24px; }
    .container { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
    .header { background: #05030D; color: #ffffff; padding: 28px 32px; border-bottom: 2px solid #00F5FF; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: #ffffff; }
    .header p { margin: 0; font-size: 13px; color: #9ca3af; }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: rgba(0, 245, 255, 0.15); color: #00F5FF; margin-bottom: 8px; }
    .content { padding: 32px; }
    .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; font-weight: 600; margin: 24px 0 12px 0; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px; }
    .section-title:first-child { margin-top: 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
    .info-table td { padding: 8px 0; vertical-align: top; font-size: 14px; }
    .info-table td.label { width: 150px; color: #6b7280; font-weight: 500; }
    .info-table td.value { color: #111827; font-weight: 600; }
    .info-table td.value a { color: #0284c7; text-decoration: none; }
    .description-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; font-size: 14px; color: #1f2937; white-space: pre-wrap; margin-top: 8px; line-height: 1.6; }
    .footer { background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="tag">${payload.source === "ai_chat" ? "✦ INFLIXT AI INQUIRY" : "WEBSITE CONTACT FORM"}</div>
      <h1>New Project Inquiry — Inflixt</h1>
      <p>Received via inflixt.com</p>
    </div>
    <div class="content">
      <div class="section-title">Client Information</div>
      <table class="info-table">
        <tr>
          <td class="label">Client Name:</td>
          <td class="value">${payload.name}</td>
        </tr>
        <tr>
          <td class="label">Work Email:</td>
          <td class="value"><a href="mailto:${payload.email}">${payload.email}</a></td>
        </tr>
        <tr>
          <td class="label">Company:</td>
          <td class="value">${payload.company || "Not provided"}</td>
        </tr>
      </table>

      <div class="section-title">Project Scope & Budget</div>
      <table class="info-table">
        <tr>
          <td class="label">Primary Service:</td>
          <td class="value">${payload.service}</td>
        </tr>
        <tr>
          <td class="label">Budget Range (USD):</td>
          <td class="value">${payload.budget}</td>
        </tr>
        ${
          payload.timeline
            ? `<tr>
          <td class="label">Target Timeline:</td>
          <td class="value">${payload.timeline}</td>
        </tr>`
            : ""
        }
      </table>

      <div class="section-title">Project Description & Requirements</div>
      <div class="description-box">${payload.description}</div>

      ${
        payload.conversationSummary
          ? `<div class="section-title">AI Consultation Summary</div>
      <div class="description-box" style="background:#f0f9ff; border-color:#bae6fd; color:#0369a1;">${payload.conversationSummary}</div>`
          : ""
      }
    </div>
    <div class="footer">
      <div><strong>Sri Lanka Time:</strong> ${slTimestamp}</div>
      <div><strong>UTC Timestamp:</strong> ${utcTimestamp}</div>
      <div style="margin-top: 6px; color: #4b5563;">You can reply directly to this email to contact <strong>${payload.name}</strong> (${payload.email}).</div>
    </div>
  </div>
</body>
</html>`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: payload.email,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error(`[INQUIRY RESEND ERROR]: HTTP ${resendResponse.status} - ${errorText}`);
      return {
        success: false,
        status: 502,
        error:
          "Email delivery provider encountered an error while dispatching the message. Please contact dinesh@inflixtglobal.com directly.",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Inquiry successfully dispatched to the Inflixt team.",
    };
  } catch (err) {
    console.error("[INQUIRY RESEND NETWORK ERROR]:", err);
    return {
      success: false,
      status: 500,
      error:
        "Network error occurred while dispatching email. Please contact dinesh@inflixtglobal.com directly.",
    };
  }
}
