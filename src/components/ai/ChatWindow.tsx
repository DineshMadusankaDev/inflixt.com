"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  X,
  RotateCcw,
  Send,
  Square,
  ChevronDown,
} from "lucide-react";
import { ChatMessage, LeadData } from "@/lib/ai/types";
import { ChatMessageItem } from "./ChatMessageItem";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  onSendMessage: (text: string) => void;
  onStopStreaming: () => void;
  onResetChat: () => void;
  onLeadSubmitted: (lead: LeadData) => void;
}

const QUICK_PROMPTS = [
  "Explore your services",
  "How much does a website cost?",
  "Show me your work",
  "I want to start a project",
];

export function ChatWindow({
  isOpen,
  onClose,
  messages,
  isStreaming,
  onSendMessage,
  onStopStreaming,
  onResetChat,
  onLeadSubmitted,
}: ChatWindowProps) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isStreaming]);

  // Focus input when opened & setup ESC key listener
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Handle scroll events to show/hide "Scroll to bottom" button
  function handleScroll() {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 120;
    setShowScrollDown(isFarFromBottom);
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const clean = inputVal.trim();
    if (!clean || isStreaming) return;
    onSendMessage(clean);
    setInputVal("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Inflixt AI Consultation"
      className={cn(
        "fixed z-50 flex flex-col overflow-hidden transition-all duration-300 ease-out",
        // Desktop positioning & dimensions
        "bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] md:w-[440px] h-[600px] max-h-[calc(100vh-8rem)]",
        "rounded-2xl bg-[#080512]/95 backdrop-blur-2xl border border-white/15",
        "shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,245,255,0.12)]",
        // Mobile near-full viewport adaptation
        "max-sm:bottom-2 max-sm:right-2 max-sm:left-2 max-sm:w-[calc(100vw-1rem)] max-sm:h-[calc(100vh-2rem)] max-sm:max-h-[calc(100vh-1rem)]"
      )}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-black/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F5FF]/20 via-[#8B2CFF]/20 to-[#00F5FF]/10 border border-[#00F5FF]/40 flex items-center justify-center text-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.2)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-white text-sm tracking-tight">
                INFLIXT AI
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-1.5 py-0.2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[11px] text-[#9290A3] leading-none mt-0.5">
              AI Sales & Project Consultant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onResetChat}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="p-1.5 rounded-lg text-[#9290A3] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close chat (ESC)"
            aria-label="Close chat"
            className="p-1.5 rounded-lg text-[#9290A3] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Chat Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth focus:outline-none"
        tabIndex={0}
      >
        {/* Welcome message if conversation is empty */}
        {messages.length === 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00F5FF]/30 to-[#8B2CFF]/30 border border-[#00F5FF]/50 text-[#00F5FF] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-none p-3.5 bg-[#0B0717]/90 border border-white/10 text-[#E7E5EE] text-sm space-y-2">
                <p>Hi, I&apos;m Inflixt AI 👋</p>
                <p className="text-xs text-[#9290A3] leading-relaxed">
                  I can help you explore our services, understand project pricing, review our work, or figure out the best way to build your idea.
                </p>
                <p className="text-xs font-semibold text-white pt-1">
                  What are you looking to build?
                </p>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="pt-2 pl-10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9290A3] block">
                SUGGESTED QUESTIONS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSendMessage(prompt)}
                    className="text-xs text-left px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F5FF]/50 hover:bg-[#00F5FF]/10 hover:text-white text-[#E7E5EE] transition-all cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Items */}
        {messages.map((msg, index) => (
          <ChatMessageItem
            key={msg.id || index}
            message={msg}
            isStreaming={isStreaming && index === messages.length - 1}
            onLeadSubmitted={onLeadSubmitted}
            onSelectPrompt={onSendMessage}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button if user scrolled up */}
      {showScrollDown && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-20 right-6 p-2 rounded-full bg-[#0B0717] border border-[#00F5FF]/40 text-[#00F5FF] shadow-lg hover:scale-105 transition-all cursor-pointer"
          aria-label="Scroll to newest message"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* 3. Input Form */}
      <div className="p-3 border-t border-white/10 bg-black/50 shrink-0">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Inflixt AI..."
            maxLength={1000}
            className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-[#9290A3] focus:outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] max-h-28 overflow-y-auto leading-relaxed"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStreaming}
              title="Stop generating"
              aria-label="Stop generating"
              className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer shrink-0"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputVal.trim()}
              title="Send message"
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#8B2CFF] text-[#05030D] hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Footer Subtext */}
        <div className="flex items-center justify-between text-[10px] text-[#9290A3] pt-1.5 px-1">
          <span>Inflixt AI · Grounded in verified engineering data</span>
          {inputVal.length > 800 && (
            <span className={inputVal.length >= 1000 ? "text-red-400" : "text-amber-400"}>
              {inputVal.length}/1000
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
