"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface LivingSystemBackgroundProps {
  className?: string;
}

export function LivingSystemBackground({ className }: LivingSystemBackgroundProps) {
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable pointer tracking on fine pointer (mouse) devices with hover capability
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapabilities = () => {
      setIsDesktop(mediaQuery.matches && !reducedMotionQuery.matches);
    };

    updateCapabilities();
    mediaQuery.addEventListener("change", updateCapabilities);
    reducedMotionQuery.addEventListener("change", updateCapabilities);

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPointer({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handlePointerMove, { passive: true });
      container.addEventListener("mouseleave", () => setPointer(null));
    }

    return () => {
      mediaQuery.removeEventListener("change", updateCapabilities);
      reducedMotionQuery.removeEventListener("change", updateCapabilities);
      if (container) {
        container.removeEventListener("mousemove", handlePointerMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
    >
      {/* 1. Base Ambient Atmospheric Glows */}
      <div className="absolute -top-[15%] left-[8%] w-[520px] h-[520px] rounded-full bg-[#00F5FF]/10 blur-[130px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-[25%] right-[5%] w-[620px] h-[620px] rounded-full bg-[#8B2CFF]/12 blur-[150px] pointer-events-none animate-ambient-purple" />
      <div className="hidden sm:block absolute bottom-[5%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#00F5FF]/5 blur-[120px] pointer-events-none" />

      {/* 2. Perspective Digital Engineering Grid */}
      <div className="absolute inset-0 digital-grid-bg opacity-40 sm:opacity-65 perspective-grid h-[150%] w-[120%] -left-[10%]" />

      {/* 2.5. Major Abstract Visual Anchor: Digital Architecture Core (Concentric Technical Rings) */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] max-w-[90vw] max-h-[90vw] pointer-events-none select-none opacity-40 sm:opacity-55">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle central atmospheric core glow */}
          <circle cx="400" cy="400" r="140" fill="url(#coreRadialGlow)" opacity="0.4" />

          {/* Outer Ring 1: Slow clockwise rotation */}
          <g className="animate-core-spin origin-center">
            <circle
              cx="400"
              cy="400"
              r="340"
              stroke="rgba(0, 245, 255, 0.18)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <circle
              cx="400"
              cy="400"
              r="320"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="0.8"
            />
            <circle cx="400" cy="60" r="3" fill="#00F5FF" opacity="0.8" />
            <circle cx="400" cy="740" r="3" fill="#8B2CFF" opacity="0.8" />
          </g>

          {/* Mid Ring 2: Counter-clockwise rotation */}
          <g className="animate-core-reverse origin-center">
            <circle
              cx="400"
              cy="400"
              r="240"
              stroke="rgba(139, 44, 255, 0.22)"
              strokeWidth="1.2"
              strokeDasharray="8 12"
            />
            <circle cx="160" cy="400" r="3.5" fill="#8B2CFF" opacity="0.7" />
            <circle cx="640" cy="400" r="3.5" fill="#00F5FF" opacity="0.7" />
          </g>

          {/* Inner Ring 3: Fine dashed telemetry */}
          <circle
            cx="400"
            cy="400"
            r="160"
            stroke="rgba(0, 245, 255, 0.25)"
            strokeWidth="0.8"
            strokeDasharray="2 6"
          />

          {/* Coordinate Crosshairs (Subtle System Traces) */}
          <line
            x1="120"
            y1="400"
            x2="680"
            y2="400"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <line
            x1="400"
            y1="120"
            x2="400"
            y2="680"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />

          <defs>
            <radialGradient id="coreRadialGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#8B2CFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 3. Subtle Horizon Light Shimmer */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#00F5FF]/40 to-transparent pointer-events-none animate-horizon-shimmer" />

      {/* 4. Abstract Network Architecture Constellation (Lightweight SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 sm:opacity-60"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Subtle connecting lines */}
        <g stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" strokeDasharray="3 6">
          <line x1="220" y1="280" x2="480" y2="280" />
          <line x1="480" y1="280" x2="620" y2="180" />
          <line x1="620" y1="180" x2="820" y2="180" />
          <line x1="820" y1="180" x2="960" y2="280" />
          <line x1="960" y1="280" x2="1220" y2="280" />
          <line x1="720" y1="180" x2="720" y2="340" stroke="rgba(0, 245, 255, 0.12)" />
        </g>

        {/* Animated signal transmission path */}
        <path
          d="M 220 280 L 480 280 L 620 180 L 820 180 L 960 280 L 1220 280"
          stroke="url(#signalGradient)"
          strokeWidth="1.2"
          strokeDasharray="6 12"
          className="animate-signal-flow"
        />

        {/* Constellation Network Nodes */}
        {/* Left cluster */}
        <circle cx="220" cy="280" r="2.5" fill="#9290A3" opacity="0.6" />
        <circle cx="480" cy="280" r="3" fill="#00F5FF" opacity="0.8" className="animate-node-pulse" />
        <circle cx="480" cy="280" r="7" stroke="#00F5FF" strokeWidth="0.8" opacity="0.3" />

        {/* Center top cluster */}
        <circle cx="620" cy="180" r="2.5" fill="#8B2CFF" opacity="0.7" />
        <circle cx="720" cy="180" r="3.5" fill="#00F5FF" opacity="0.9" />
        <circle cx="720" cy="180" r="9" stroke="#00F5FF" strokeWidth="0.8" opacity="0.25" />
        <circle cx="820" cy="180" r="2.5" fill="#8B2CFF" opacity="0.7" />

        {/* Right cluster */}
        <circle cx="960" cy="280" r="3" fill="#8B2CFF" opacity="0.8" className="animate-node-pulse" />
        <circle cx="960" cy="280" r="7" stroke="#8B2CFF" strokeWidth="0.8" opacity="0.3" />
        <circle cx="1220" cy="280" r="2.5" fill="#9290A3" opacity="0.6" />

        {/* Floating micro-ambient telemetry nodes (calm positions) */}
        <circle cx="340" cy="420" r="2" fill="#00F5FF" opacity="0.5" />
        <circle cx="1100" cy="400" r="2" fill="#8B2CFF" opacity="0.5" />

        <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#00F5FF" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#8B2CFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8B2CFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 5. Desktop Eased Cursor-Following Ambient Light (Pointer Fine Only) */}
      {isDesktop && pointer && (
        <div
          className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-300 ease-out opacity-60"
          style={{
            transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)`,
            background:
              "radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, rgba(139, 44, 255, 0.04) 45%, transparent 70%)",
          }}
        />
      )}

      {/* Subtle bottom gradient mask for soft transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05030D] to-transparent pointer-events-none" />
    </div>
  );
}
