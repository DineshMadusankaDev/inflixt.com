"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 450;

/**
 * Returns true if the Inflixt AI chat modal is currently open.
 * Evaluates synchronously during client mount and render.
 */
function getChatSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  const launcher = document.getElementById("inflixt-ai-launcher");
  if (launcher && launcher.getAttribute("aria-expanded") === "true") {
    return true;
  }
  const dialog = document.querySelector(
    '[role="dialog"][aria-label="Inflixt AI Consultation"]'
  );
  return Boolean(dialog);
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Subscribes to DOM mutations and interaction events to catch AI chat state changes reactively.
 */
function subscribeChat(onStoreChange: () => void) {
  if (typeof document === "undefined") {
    return () => {};
  }

  const observer = new MutationObserver(() => {
    onStoreChange();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-expanded"],
  });

  // Secondary interaction fallback for immediate reaction on clicks or escape key
  const handleInteraction = (e: Event) => {
    const target = e.target as HTMLElement | null;
    if (
      target?.closest("#inflixt-ai-launcher") ||
      target?.closest('[aria-label="Close chat"]') ||
      (e instanceof KeyboardEvent && e.key === "Escape")
    ) {
      queueMicrotask(onStoreChange);
    }
  };

  document.addEventListener("click", handleInteraction, { capture: true, passive: true });
  window.addEventListener("keydown", handleInteraction, { capture: true, passive: true });

  return () => {
    observer.disconnect();
    document.removeEventListener("click", handleInteraction, { capture: true });
    window.removeEventListener("keydown", handleInteraction, { capture: true });
  };
}

/**
 * Site-wide floating Back to Top button.
 * - Positioned consistently above the Inflixt AI Chat launcher.
 * - Respects mobile safe-area insets.
 * - Immediately inspects AI chat open state on mount and subscribes to subsequent changes.
 * - Automatically hides when the AI Chat window opens to guarantee zero overlap.
 * - Smoothly scrolls to top while respecting prefers-reduced-motion.
 * - Accessible, keyboard-focusable, and minimal JS footprint.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isChatOpen = useSyncExternalStore(subscribeChat, getChatSnapshot, getServerSnapshot);

  // Track scroll position with requestAnimationFrame throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    const rafId = window.requestAnimationFrame(() => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  const shouldShow = isVisible && !isChatOpen;

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-300 ease-out",
        // Mobile positioning: placed above the AI chat launcher with 12px vertical clearance & safe-area inset
        "right-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))]",
        // Desktop positioning: placed above the AI chat launcher (sm:bottom-6 + sm:h-[46px] + 14px gap = 84px)
        "sm:right-6 sm:bottom-[84px]",
        shouldShow
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      )}
      aria-hidden={!shouldShow}
    >
      <button
        type="button"
        onClick={scrollToTop}
        tabIndex={shouldShow ? 0 : -1}
        aria-label="Back to top"
        title="Back to top"
        className={cn(
          "group relative flex items-center justify-center w-11 h-11 rounded-full cursor-pointer",
          "transition-all duration-300 ease-out",
          // Surface styling matching Inflixt futuristic dark aesthetic
          "bg-[#080512]/90 backdrop-blur-md border border-[#00F5FF]/30 text-[#E7E5EE]",
          "shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(0,245,255,0.15)]",
          // Hover and active states
          "hover:border-[#00F5FF] hover:text-[#00F5FF] hover:shadow-[0_0_25px_rgba(0,245,255,0.35)] hover:scale-105 active:scale-95",
          // Focus state
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05030D]",
          // Reduced motion override
          "motion-reduce:transform-none motion-reduce:transition-none"
        )}
      >
        {/* Subtle ambient glow behind button matching AI chat launcher */}
        <span
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00F5FF]/15 via-[#8B2CFF]/15 to-[#00F5FF]/15 blur-sm opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />

        {/* Minimal ArrowUp icon */}
        <ArrowUp className="relative z-10 w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300 motion-reduce:transform-none" />
      </button>
    </div>
  );
}
