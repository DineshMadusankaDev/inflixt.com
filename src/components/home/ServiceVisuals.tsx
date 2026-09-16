"use client";

import { cn } from "@/lib/utils";
import {
  ShoppingBag,
  Smartphone,
  Server,
  Sparkles,
  Search,
} from "lucide-react";

interface ServiceVisualProps {
  serviceId: string;
  isHovered?: boolean;
  className?: string;
}

export function ServiceVisual({ serviceId, className }: ServiceVisualProps) {
  switch (serviceId) {
    case "ai-web-development":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full h-full min-h-[240px] rounded-xl bg-[#060312] border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden select-none group-hover:border-[#00F5FF]/40 transition-all duration-300",
            className
          )}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />

          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
              <span className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#9290A3]">
                https://platform.edge
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
              NEXT.JS 15 SSR
            </span>
          </div>

          {/* Component Architecture Preview */}
          <div className="space-y-2.5 my-auto py-3 relative z-10">
            {/* Header Component Row */}
            <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#00F5FF]/20 flex items-center justify-center text-[9px] font-mono text-[#00F5FF]">
                  R
                </div>
                <span className="text-[11px] font-mono text-white font-medium">
                  React Server Component
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#00F5FF] bg-[#00F5FF]/10 px-1.5 py-0.5 rounded">
                STREAMED
              </span>
            </div>

            {/* Split Content Panels */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                <div className="text-[9px] font-mono text-[#9290A3]">ROUTING</div>
                <div className="text-[11px] font-mono text-white">App Router</div>
                <div className="text-[8px] font-mono text-[#00F5FF]">DYNAMIC / EDGE</div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                <div className="text-[9px] font-mono text-[#9290A3]">COMPILER</div>
                <div className="text-[11px] font-mono text-white">Turbopack</div>
                <div className="text-[8px] font-mono text-[#8B2CFF]">STRICT TYPES</div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                <div className="text-[9px] font-mono text-[#9290A3]">STATE</div>
                <div className="text-[11px] font-mono text-white">Server Actions</div>
                <div className="text-[8px] font-mono text-[#27C93F]">ZERO CLIENT BLOAT</div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#9290A3] border-t border-white/5 pt-2.5 relative z-10">
            <span className="text-[#E7E5EE]/80">MODULAR ARCHITECTURE</span>
            <span className="text-[#00F5FF]">VERIFIED PRODUCTION READY</span>
          </div>
        </div>
      );

    case "ecommerce-solutions":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full rounded-xl bg-[#060312] border border-white/10 p-4 mb-4 relative overflow-hidden select-none transition-all duration-300 group-hover:border-[#00F5FF]/30",
            className
          )}
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-[10px] font-mono">
            <span className="text-[#9290A3] flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3 text-[#00F5FF]" />
              HEADLESS STOREFRONT
            </span>
            <span className="text-[#00F5FF] bg-[#00F5FF]/10 px-1.5 py-0.5 rounded border border-[#00F5FF]/20">
              STRIPE CHECKOUT
            </span>
          </div>

          {/* Stepper Pipeline: Product -> Cart -> Checkout -> Delivered */}
          <div className="grid grid-cols-4 gap-1.5 mb-3 text-center text-[9px] font-mono">
            <div className="p-1.5 rounded bg-white/5 border border-white/10 text-white font-medium">
              1. BROWSE
            </div>
            <div className="p-1.5 rounded bg-white/5 border border-white/10 text-white font-medium">
              2. CART
            </div>
            <div className="p-1.5 rounded bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] font-semibold">
              3. CHECKOUT
            </div>
            <div className="p-1.5 rounded bg-[#27C93F]/10 border border-[#27C93F]/30 text-[#27C93F] font-semibold">
              4. SYNCED
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
              <span className="text-[#E7E5EE]">Inventory & Webhook Gateway</span>
            </div>
            <span className="text-[#00F5FF] text-[10px]">REAL-TIME SYNC</span>
          </div>
        </div>
      );

    case "mobile-app-development":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full rounded-xl bg-[#060312] border border-white/10 p-4 mb-4 relative overflow-hidden select-none transition-all duration-300 group-hover:border-[#00F5FF]/30",
            className
          )}
        >
          {/* Smartphone Bezel & Dynamic Island */}
          <div className="max-w-[240px] mx-auto rounded-xl border border-white/15 bg-black/60 p-2.5 shadow-inner">
            <div className="w-16 h-2 rounded-full bg-white/20 mx-auto mb-2" />
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-white font-semibold flex items-center gap-1">
                  <Smartphone className="w-2.5 h-2.5 text-[#00F5FF]" />
                  Flutter Native
                </span>
                <span className="text-[#00F5FF]">iOS · Android</span>
              </div>
              <div className="h-2 rounded bg-white/10 w-3/4" />
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <div className="h-6 rounded bg-[#8B2CFF]/10 border border-[#8B2CFF]/20 flex items-center justify-center text-[8px] font-mono text-[#8B2CFF]">
                  OFFLINE FIRST
                </div>
                <div className="h-6 rounded bg-[#00F5FF]/10 border border-[#00F5FF]/20 flex items-center justify-center text-[8px] font-mono text-[#00F5FF]">
                  60 FPS SMOOTH
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "custom-software":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full rounded-xl bg-[#060312] border border-white/10 p-3.5 mb-4 relative overflow-hidden select-none transition-all duration-300 group-hover:border-[#00F5FF]/30 font-mono text-[10px]",
            className
          )}
        >
          <div className="flex items-center justify-between text-[#9290A3] border-b border-white/5 pb-2 mb-2.5">
            <span className="flex items-center gap-1.5 text-white">
              <Server className="w-3 h-3 text-[#00F5FF]" />
              API MICROSERVICE ARCHITECTURE
            </span>
            <span className="text-[#27C93F] bg-[#27C93F]/10 px-1.5 py-0.2 rounded border border-[#27C93F]/30">
              STATUS: 200 OK
            </span>
          </div>
          <div className="space-y-1.5 bg-black/50 p-2.5 rounded-lg border border-white/5 text-[#9290A3]">
            <div className="flex items-center justify-between">
              <span className="text-[#00F5FF]">POST /api/v1/dispatch</span>
              <span className="text-white">Strict Type Schema</span>
            </div>
            <div className="flex items-center justify-between text-[9px]">
              <span>AUTH: Bearer Token</span>
              <span className="text-[#8B2CFF]">POSTGRESQL POOL</span>
            </div>
          </div>
        </div>
      );

    case "ai-automation":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full rounded-xl bg-[#060312] border border-white/10 p-3.5 mb-4 relative overflow-hidden select-none transition-all duration-300 group-hover:border-[#8B2CFF]/30 font-mono text-[10px]",
            className
          )}
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2.5">
            <span className="flex items-center gap-1.5 text-white">
              <Sparkles className="w-3 h-3 text-[#8B2CFF]" />
              INTELLIGENT WORKFLOW DAG
            </span>
            <span className="text-[#8B2CFF] bg-[#8B2CFF]/10 px-1.5 py-0.2 rounded border border-[#8B2CFF]/30">
              GEMINI PRO
            </span>
          </div>
          {/* Visual Workflow Steps: Raw Data -> Parser -> Decision -> Action */}
          <div className="grid grid-cols-3 gap-1 text-center text-[9px]">
            <div className="p-1.5 rounded bg-white/5 border border-white/10 text-white">
              DATA INGEST
            </div>
            <div className="p-1.5 rounded bg-[#8B2CFF]/15 border border-[#8B2CFF]/30 text-[#8B2CFF] font-semibold">
              LLM PARSE
            </div>
            <div className="p-1.5 rounded bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-[#00F5FF]">
              DISPATCH
            </div>
          </div>
        </div>
      );

    case "seo-digital-growth":
      return (
        <div
          aria-hidden="true"
          className={cn(
            "w-full rounded-xl bg-[#060312] border border-white/10 p-3.5 mb-4 relative overflow-hidden select-none transition-all duration-300 group-hover:border-[#00F5FF]/30 font-mono text-[10px]",
            className
          )}
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2.5">
            <span className="flex items-center gap-1.5 text-white">
              <Search className="w-3 h-3 text-[#00F5FF]" />
              SEARCH ENGINE INDEXING
            </span>
            <span className="text-[#00F5FF] bg-[#00F5FF]/10 px-1.5 py-0.2 rounded border border-[#00F5FF]/20">
              SCHEMA VERIFIED
            </span>
          </div>
          <div className="p-2 rounded bg-black/50 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] text-[#9290A3]">
              <span className="text-[#00F5FF]">Google Search</span>
              <span>› https://inflixt.com</span>
            </div>
            <div className="text-[11px] font-semibold text-white truncate">
              Inflixt | AI-Powered Software & Digital Solutions
            </div>
            <div className="text-[8px] text-[#27C93F]">
              ✓ Structured JSON-LD · Canonical Tags · Sitemap Indexed
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
