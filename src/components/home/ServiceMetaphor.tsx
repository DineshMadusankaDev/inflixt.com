"use client";

import { cn } from "@/lib/utils";

interface ServiceMetaphorProps {
  serviceId: string;
  isHovered?: boolean;
  className?: string;
}

export function ServiceMetaphor({ serviceId, isHovered, className }: ServiceMetaphorProps) {
  switch (serviceId) {
    case "ai-web-development":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full h-full min-h-[220px] rounded-xl bg-[#080512] border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden select-none pointer-events-none group-hover:border-[#00F5FF]/30 transition-colors duration-300",
            className
          )}
        >
          <div className="absolute inset-0 tech-grid-pattern opacity-25" />
          {/* Top simulated browser/interface chrome */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00F5FF]/80 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <span className="text-[10px] font-mono text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-2 py-0.5 rounded">
              NEXT.JS // EDGE RUNTIME
            </span>
          </div>

          {/* Abstract Wireframe Layout Components */}
          <div className="space-y-3 my-auto py-2 relative z-10">
            <div className="flex gap-3">
              <div className="w-1/3 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-[#9290A3]">
                HEADLESS
              </div>
              <div className="w-2/3 h-10 rounded-lg bg-[#00F5FF]/5 border border-[#00F5FF]/20 flex items-center justify-between px-3 text-[10px] font-mono text-[#00F5FF]">
                <span>DYNAMIC SSR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 rounded bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-[9px] font-mono text-[#9290A3]">
                <span>0.18s</span>
                <span className="text-[8px] text-[#00F5FF]">LCP OPTIMIZED</span>
              </div>
              <div className="h-12 rounded bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-[9px] font-mono text-[#9290A3]">
                <span>100/100</span>
                <span className="text-[8px] text-[#8B2CFF]">PERFORMANCE</span>
              </div>
              <div className="h-12 rounded bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-[9px] font-mono text-[#9290A3]">
                <span>GLOBAL</span>
                <span className="text-[8px] text-white/70">CDN EDGE</span>
              </div>
            </div>
          </div>

          {/* Bottom telemetry trace */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#9290A3] border-t border-white/5 pt-2 relative z-10">
            <span className="text-[#E7E5EE]/70">RESPONSIVE ADAPTIVE LAYOUT</span>
            <span className="text-[#00F5FF]">● ACTIVE</span>
          </div>
        </div>
      );

    case "ecommerce-solutions":
      return (
        <div aria-hidden="true" className={cn("w-full h-16 relative overflow-hidden select-none pointer-events-none mb-4", className)}>
          <svg className="w-full h-full" viewBox="0 0 300 64" fill="none">
            <path
              d="M 10 32 L 80 32 L 120 18 L 180 18 L 220 32 L 290 32"
              stroke="rgba(0, 245, 255, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="80" cy="32" r="3" fill="#00F5FF" />
            <circle cx="120" cy="18" r="3.5" fill="#8B2CFF" />
            <circle cx="180" cy="18" r="3.5" fill="#00F5FF" />
            <circle cx="220" cy="32" r="3" fill="#8B2CFF" />
            <path
              d="M 80 32 L 120 18 L 180 18 L 220 32"
              stroke="#00F5FF"
              strokeWidth="1.5"
              className={cn("transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-40")}
            />
          </svg>
        </div>
      );

    case "mobile-app-development":
      return (
        <div aria-hidden="true" className={cn("w-full h-16 relative overflow-hidden select-none pointer-events-none mb-4", className)}>
          <svg className="w-full h-full" viewBox="0 0 300 64" fill="none">
            <rect x="50" y="8" width="80" height="48" rx="8" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            <rect x="170" y="8" width="80" height="48" rx="8" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="1.2" />
            <line x1="130" y1="32" x2="170" y2="32" stroke="#00F5FF" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="210" cy="16" r="2" fill="#00F5FF" />
            <circle cx="90" cy="16" r="2" fill="#8B2CFF" />
          </svg>
        </div>
      );

    case "custom-software":
      return (
        <div aria-hidden="true" className={cn("w-full h-16 relative overflow-hidden select-none pointer-events-none mb-4", className)}>
          <svg className="w-full h-full" viewBox="0 0 300 64" fill="none">
            <rect x="30" y="16" width="48" height="32" rx="4" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <line x1="78" y1="32" x2="126" y2="32" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5" />
            <rect x="126" y="12" width="56" height="40" rx="6" stroke="#8B2CFF" strokeWidth="1.5" />
            <line x1="182" y1="32" x2="230" y2="32" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5" />
            <rect x="230" y="16" width="48" height="32" rx="4" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          </svg>
        </div>
      );

    case "ai-automation":
      return (
        <div aria-hidden="true" className={cn("w-full h-16 relative overflow-hidden select-none pointer-events-none mb-4", className)}>
          <svg className="w-full h-full" viewBox="0 0 300 64" fill="none">
            <circle cx="150" cy="32" r="14" stroke="#00F5FF" strokeWidth="1.5" />
            <circle cx="150" cy="32" r="4" fill="#00F5FF" />
            <circle cx="70" cy="32" r="5" fill="#8B2CFF" opacity="0.8" />
            <circle cx="230" cy="32" r="5" fill="#8B2CFF" opacity="0.8" />
            <line x1="75" y1="32" x2="136" y2="32" stroke="rgba(139, 44, 255, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="164" y1="32" x2="225" y2="32" stroke="rgba(139, 44, 255, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>
      );

    case "seo-digital-growth":
      return (
        <div aria-hidden="true" className={cn("w-full h-16 relative overflow-hidden select-none pointer-events-none mb-4", className)}>
          <svg className="w-full h-full" viewBox="0 0 300 64" fill="none">
            <path
              d="M 20 48 Q 100 48 150 28 T 280 12"
              stroke="url(#seoGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="280" cy="12" r="3.5" fill="#00F5FF" />
            <circle cx="150" cy="28" r="2.5" fill="#8B2CFF" />
            <defs>
              <linearGradient id="seoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B2CFF" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#00F5FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00F5FF" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
