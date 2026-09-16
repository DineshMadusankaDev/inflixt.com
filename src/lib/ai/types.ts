export type ChatRole = "user" | "assistant" | "system";

export interface ServiceRecommendation {
  id: string;
  title: string;
  slug: string;
  href: string;
  reason: string;
  capabilities: string[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  slug: string;
  href: string;
  clientDomain: string;
  technologies: string[];
  summary: string;
}

export interface LeadData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  timeline?: string;
  projectDescription: string;
  conversationSummary?: string;
}

export type LeadScore = "COLD" | "WARM" | "HOT";

export interface LeadQualification {
  score: LeadScore;
  identifiedService?: string;
  identifiedBudget?: string;
  identifiedTimeline?: string;
  hasContactInfo: boolean;
  notes?: string;
}

export interface MessageMetadata {
  serviceRecommendation?: ServiceRecommendation;
  projectRecommendation?: ProjectRecommendation;
  projectRecommendations?: ProjectRecommendation[];
  leadConfirmation?: LeadData;
  leadSubmitted?: boolean;
  cta?: {
    label: string;
    href: string;
  };
  isError?: boolean;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  metadata?: MessageMetadata;
}

export interface ConversationState {
  messages: ChatMessage[];
  qualification: LeadQualification;
  pendingLeadData?: Partial<LeadData>;
  isConfirmedForSubmission?: boolean;
}

export type ChatStreamEvent =
  | { type: "token"; content: string }
  | {
      type: "card";
      cardType: "service" | "project" | "projects" | "lead_confirm" | "lead_success" | "error" | "cta";
      payload: unknown;
    }
  | { type: "done" }
  | { type: "error"; error: string };

export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  metadata?: MessageMetadata;
  toolCalls?: ToolCall[];
}
