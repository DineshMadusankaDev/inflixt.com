"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatLauncherProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export function ChatLauncher({ isOpen, onClick, unreadCount = 0 }: ChatLauncherProps) {
  return (
    <button
      id="inflixt-ai-launcher"
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close Inflixt AI chat" : "Open Inflixt AI consultation chat"}
      title="Talk to Inflixt AI"
      className={cn(
        "group relative flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-3 rounded-full cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF]",
        "bg-[#080512]/90 backdrop-blur-md border border-[#00F5FF]/40 text-white shadow-[0_4px_25px_rgba(0,245,255,0.25)]",
        "hover:border-[#00F5FF] hover:shadow-[0_0_30px_rgba(0,245,255,0.45)] hover:scale-[1.03] active:scale-[0.98]",
        "motion-reduce:transform-none"
      )}
    >
      {/* Ambient pulsating glow behind launcher */}
      <span
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00F5FF]/20 via-[#8B2CFF]/20 to-[#00F5FF]/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none animate-pulse"
        aria-hidden="true"
      />

      {/* Online indicator dot */}
      <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#00F5FF]" />
      </span>

      {/* Sparkles Icon */}
      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F5FF] group-hover:rotate-12 transition-transform duration-300 motion-reduce:transform-none" />

      {/* Text label */}
      <span className="font-heading font-semibold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-white via-[#E7E5EE] to-[#00F5FF] bg-clip-text text-transparent">
        INFLIXT AI
      </span>

      {/* Unread badge if any */}
      {unreadCount > 0 && (
        <span className="ml-1 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#8B2CFF] text-white rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
