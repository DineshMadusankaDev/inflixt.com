"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ChatMessage,
  ChatStreamEvent,
  ServiceRecommendation,
  ProjectRecommendation,
  LeadData,
} from "@/lib/ai/types";
import { toSafeInternalHref } from "@/lib/ai/urls";
import {
  trackAiEvent,
  mapDetectedIntentToAi,
  mapSlugToAiService,
  AiIntent,
  AiService,
} from "@/lib/analytics/events";
import { detectUserIntent } from "@/lib/ai/intents";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow } from "./ChatWindow";

const STORAGE_KEY = "inflixt_ai_conversation_v1";

export function InflixtAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to load AI chat from sessionStorage:", e);
    }
    return [];
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Conversion Tracking State & Deduplication Refs
  const hasTrackedFirstMessageRef = useRef(
    messages.some((m) => m.role === "user")
  );
  const hasTrackedConversationStartedRef = useRef(
    messages.some((m) => m.role === "assistant" && m.content.length > 0)
  );
  const trackedIntentsRef = useRef<Set<AiIntent>>(new Set());
  const trackedServicesRef = useRef<Set<AiService>>(new Set());
  const trackedLeadConfirmationsRef = useRef<Set<string>>(new Set());

  // Persist to sessionStorage on updates (limit to 30 messages)
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Failed to save AI chat to sessionStorage:", e);
    }
  }, [messages]);

  // 3. Focus restoration to launcher when closing
  const handleClose = useCallback(() => {
    setIsOpen(false);
    trackAiEvent("ai_chat_closed");
    setTimeout(() => {
      document.getElementById("inflixt-ai-launcher")?.focus();
    }, 50);
  }, []);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      trackAiEvent("ai_chat_opened");
    }
  }, [isOpen, handleClose]);

  // 4. Reset Conversation
  const handleResetChat = useCallback(() => {
    if (isStreaming) {
      abortControllerRef.current?.abort();
      setIsStreaming(false);
    }
    setMessages([]);
    hasTrackedFirstMessageRef.current = false;
    hasTrackedConversationStartedRef.current = false;
    trackedIntentsRef.current.clear();
    trackedServicesRef.current.clear();
    trackedLeadConfirmationsRef.current.clear();
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear sessionStorage:", e);
    }
  }, [isStreaming]);

  // 5. Stop Streaming
  const handleStopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  // 6. Lead submitted callback
  const handleLeadSubmitted = useCallback(() => {
    setMessages((prev) => {
      const copy = [...prev];
      if (copy.length > 0) {
        const last = copy[copy.length - 1];
        if (last.role === "assistant" && last.metadata) {
          last.metadata.leadSubmitted = true;
        }
      }
      return copy;
    });
  }, []);

  // 7. Send message & process streaming response
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const trimmedText = text.trim();

      // 1. ai_first_message: Fire once per conversation session on user's first message
      const isFirstUserMessage =
        !hasTrackedFirstMessageRef.current &&
        messages.filter((m) => m.role === "user").length === 0;

      if (isFirstUserMessage) {
        hasTrackedFirstMessageRef.current = true;
        trackAiEvent("ai_first_message");
      }

      // 2. Commercial Project Intent & Service Identification (per-value deduplication)
      const userIntent = detectUserIntent(trimmedText);
      const mapped = mapDetectedIntentToAi(userIntent.type);

      if (mapped.intent && !trackedIntentsRef.current.has(mapped.intent)) {
        trackedIntentsRef.current.add(mapped.intent);
        trackAiEvent("ai_project_intent", { intent: mapped.intent });
      }

      if (mapped.service && !trackedServicesRef.current.has(mapped.service)) {
        trackedServicesRef.current.add(mapped.service);
        trackAiEvent("ai_service_identified", { service: mapped.service });
      }

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmedText,
        timestamp: Date.now(),
      };

      const assistantMsgId = `assistant-${Date.now()}`;
      const assistantMsgPlaceholder: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      const updatedHistory = [...messages, userMsg];
      setMessages([...updatedHistory, assistantMsgPlaceholder]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedHistory,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with ${response.status}`);
        }

        if (!response.body) {
          throw new Error("Response body is empty.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const cleanLine = line.trim();
            if (cleanLine.startsWith("data: ")) {
              try {
                const event: ChatStreamEvent = JSON.parse(cleanLine.substring(6));

                // 3. ai_conversation_started: established on first assistant response token or card
                if (
                  !hasTrackedConversationStartedRef.current &&
                  (event.type === "token" || event.type === "card")
                ) {
                  hasTrackedConversationStartedRef.current = true;
                  trackAiEvent("ai_conversation_started");
                }

                if (event.type === "token") {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId
                        ? { ...msg, content: msg.content + event.content }
                        : msg
                    )
                  );
                } else if (event.type === "card") {
                  // Service card identified via server recommendation
                  if (event.cardType === "service") {
                    const s = event.payload as ServiceRecommendation;
                    const mappedService = mapSlugToAiService(s.slug || s.id);
                    if (mappedService && !trackedServicesRef.current.has(mappedService)) {
                      trackedServicesRef.current.add(mappedService);
                      trackAiEvent("ai_service_identified", { service: mappedService });
                    }
                  } else if (event.cardType === "lead_confirm") {
                    if (!trackedLeadConfirmationsRef.current.has(assistantMsgId)) {
                      trackedLeadConfirmationsRef.current.add(assistantMsgId);
                      trackAiEvent("ai_lead_confirmation", { status: "shown" });
                    }
                  }

                  setMessages((prev) =>
                    prev.map((msg) => {
                      if (msg.id !== assistantMsgId) return msg;
                      const metadata = { ...(msg.metadata || {}) };
                      if (event.cardType === "service") {
                        const s = event.payload as ServiceRecommendation;
                        metadata.serviceRecommendation = {
                          ...s,
                          href: toSafeInternalHref(s.href),
                        };
                      } else if (event.cardType === "projects") {
                        const projs = (event.payload as ProjectRecommendation[]).map((p) => ({
                          ...p,
                          href: toSafeInternalHref(p.href),
                        }));
                        metadata.projectRecommendations = projs;
                      } else if (event.cardType === "project") {
                        const proj = event.payload as ProjectRecommendation;
                        const safeProj = {
                          ...proj,
                          href: toSafeInternalHref(proj.href),
                        };
                        metadata.projectRecommendation = safeProj;
                        metadata.projectRecommendations = [safeProj];
                      } else if (event.cardType === "lead_confirm") {
                        metadata.leadConfirmation = event.payload as LeadData;
                      } else if (event.cardType === "lead_success") {
                        metadata.leadSubmitted = true;
                      } else if (event.cardType === "cta") {
                        const ctaPayload = event.payload as { label: string; href: string };
                        metadata.cta = {
                          label: ctaPayload.label || "Start a Project →",
                          href: toSafeInternalHref(ctaPayload.href),
                        };
                      }
                      return { ...msg, metadata };
                    })
                  );
                } else if (event.type === "error") {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId
                        ? { ...msg, content: event.error, metadata: { ...(msg.metadata || {}), isError: true } }
                        : msg
                    )
                  );
                }
              } catch (parseErr) {
                console.warn("Failed to parse SSE event:", parseErr);
              }
            }
          }
        }

        // Process any trailing line in buffer
        if (buffer.trim().startsWith("data: ")) {
          try {
            const event: ChatStreamEvent = JSON.parse(buffer.trim().substring(6));
            if (
              !hasTrackedConversationStartedRef.current &&
              (event.type === "token" || event.type === "card")
            ) {
              hasTrackedConversationStartedRef.current = true;
              trackAiEvent("ai_conversation_started");
            }
            if (event.type === "token") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: msg.content + event.content }
                    : msg
                )
              );
            }
          } catch (trailingErr) {
            console.warn("Failed to parse trailing SSE token:", trailingErr);
          }
        }
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") {
          // Stream cancelled by user
          return;
        }

        console.error("[INFLIXT AI CHAT ERROR]:", err);
        setMessages((prev) => {
          const target = prev.find((m) => m.id === assistantMsgId);
          // If content was already streamed to user, do not overwrite or corrupt it
          if (target && target.content.trim().length > 0) {
            return prev;
          }
          return prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
                  metadata: {
                    cta: {
                      label: "Start a Project →",
                      href: toSafeInternalHref("/contact"),
                    },
                  },
                }
              : msg
          );
        });
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  return (
    <div className="relative pointer-events-auto">
      {/* Floating launcher with safe-area support */}
      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-3 sm:bottom-6 sm:right-6 z-40">
        <ChatLauncher isOpen={isOpen} onClick={handleToggle} />
      </div>

      {/* Floating Chat Window Modal */}
      <ChatWindow
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        isStreaming={isStreaming}
        onSendMessage={handleSendMessage}
        onStopStreaming={handleStopStreaming}
        onResetChat={handleResetChat}
        onLeadSubmitted={handleLeadSubmitted}
      />
    </div>
  );
}
