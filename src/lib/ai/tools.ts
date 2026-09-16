import { FunctionDeclaration, Type } from "@google/genai";
import { dispatchInquiry, validateInquiryPayload } from "@/lib/contact/inquiry-service";

export const submitProjectInquiryTool: FunctionDeclaration = {
  name: "submitProjectInquiry",
  description:
    "Dispatches a formally confirmed project inquiry to the Inflixt team. Call this ONLY after summarizing the project, service, budget, and timeline, and receiving the user's explicit confirmation.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The client's full name.",
      },
      email: {
        type: Type.STRING,
        description: "The client's contact email address.",
      },
      company: {
        type: Type.STRING,
        description: "The client's company, organization, or brand name (optional).",
      },
      service: {
        type: Type.STRING,
        description:
          "The primary Inflixt service, e.g., 'AI-Powered Web Development', 'E-commerce Solutions', 'Mobile App Development', 'Custom Software', 'AI & Automation', 'SEO & Digital Growth'.",
      },
      budget: {
        type: Type.STRING,
        description:
          "The budget range from verified options: 'Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000+', or 'Not sure yet'.",
      },
      timeline: {
        type: Type.STRING,
        description: "The desired project timeline or deadline.",
      },
      projectDescription: {
        type: Type.STRING,
        description: "Detailed description of the client's project, goals, and technical requirements.",
      },
      conversationSummary: {
        type: Type.STRING,
        description: "Concise summary of what was discussed during the consultation.",
      },
    },
    required: ["name", "email", "service", "budget", "projectDescription"],
  },
};

export async function executeSubmitProjectInquiry(
  args: Record<string, unknown>,
  ip: string = "ai-chat-client"
) {
  const validation = validateInquiryPayload({
    name: args.name,
    email: args.email,
    company: args.company,
    service: args.service,
    budget: args.budget,
    description: args.projectDescription,
    timeline: args.timeline,
    conversationSummary: args.conversationSummary,
    source: "ai_chat",
  });

  if (!validation.isValid || !validation.sanitized) {
    return {
      success: false,
      error: "Validation failed on inquiry parameters.",
      details: validation.errors,
    };
  }

  const dispatchResult = await dispatchInquiry(validation.sanitized, ip);
  return dispatchResult;
}
