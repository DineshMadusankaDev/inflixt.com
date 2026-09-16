"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Terminal,
  Globe,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  category: string;
  status: "active" | "ready";
  detail: string;
}

const pipelineNodes: PipelineStep[] = [
  {
    id: "edge",
    name: "Edge Ingress",
    category: "NETWORK",
    status: "active",
    detail: "Global routing via Cloudflare edge nodes",
  },
  {
    id: "nextjs",
    name: "Next.js SSR",
    category: "COMPUTE",
    status: "active",
    detail: "React Server Components with Turbopack",
  },
  {
    id: "gemini",
    name: "Gemini AI Engine",
    category: "INTELLIGENCE",
    status: "active",
    detail: "Multimodal parsing and structured workflow automation",
  },
  {
    id: "data",
    name: "Type-Safe DB",
    category: "PERSISTENCE",
    status: "ready",
    detail: "Strict relational schemas with connection pooling",
  },
];

export function LivingProductCanvas() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "contract" | "telemetry">("pipeline");
  const [activeNode, setActiveNode] = useState<string>("nextjs");

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 sm:mt-14 relative z-20 text-left">
      {/* Ambient Backlight Aura */}
      <div
        className="absolute -inset-1.5 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#00F5FF]/15 via-[#8B2CFF]/15 to-[#00F5FF]/15 blur-xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Glassmorphic Workspace Chassis */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-[#05030D]/90 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Top Control Rail / Chrome */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
            <div className="hidden sm:flex items-center gap-2 ml-4 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#9290A3]">
              <Terminal className="w-3 h-3 text-[#00F5FF]" />
              <span>INFLIXT // ENGINE RUNTIME</span>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={cn(
                "px-2.5 py-1 rounded transition-all",
                activeTab === "pipeline"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-[#9290A3] hover:text-white"
              )}
            >
              SYS // PIPELINE
            </button>
            <button
              onClick={() => setActiveTab("contract")}
              className={cn(
                "px-2.5 py-1 rounded transition-all",
                activeTab === "contract"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-[#9290A3] hover:text-white"
              )}
            >
              SCHEMA // API
            </button>
            <button
              onClick={() => setActiveTab("telemetry")}
              className={cn(
                "hidden sm:block px-2.5 py-1 rounded transition-all",
                activeTab === "telemetry"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-[#9290A3] hover:text-white"
              )}
            >
              TELEMETRY
            </button>
          </div>

          {/* Right Live State Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#00F5FF]">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
            <span className="hidden sm:inline">ALL SYSTEMS SYNCHRONIZED</span>
            <span className="sm:hidden">ACTIVE</span>
          </div>
        </div>

        {/* Interior Command Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Visual Arena (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            {activeTab === "pipeline" && (
              <div className="space-y-4">
                {/* Visual Engineering Flow Runway */}
                <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono tracking-wider text-[#9290A3] uppercase">
                      Active Execution Runway
                    </span>
                    <span className="text-[10px] font-mono text-[#00F5FF] bg-[#00F5FF]/10 px-2 py-0.5 rounded border border-[#00F5FF]/20">
                      LIVE TOPOLOGY
                    </span>
                  </div>

                  {/* Horizontal Flow Line with Nodes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
                    {pipelineNodes.map((node) => {
                      const isSelected = activeNode === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setActiveNode(node.id)}
                          className={cn(
                            "p-3 rounded-lg border text-left transition-all relative overflow-hidden group",
                            isSelected
                              ? "bg-white/[0.08] border-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                              : "bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-mono text-[#9290A3] uppercase tracking-wider">
                              {node.category}
                            </span>
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                isSelected
                                  ? "bg-[#00F5FF] animate-ping"
                                  : "bg-white/20"
                              )}
                            />
                          </div>
                          <div className="text-xs font-semibold text-white truncate">
                            {node.name}
                          </div>
                          <div className="text-[10px] text-[#9290A3] mt-1 line-clamp-1">
                            {node.detail}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layer Detail Focus Panel */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-[#E7E5EE]">
                  <div className="flex items-center justify-between text-[11px] text-[#9290A3] border-b border-white/5 pb-2 mb-3">
                    <span className="text-[#00F5FF]">{"// FOCUSED ARCHITECTURAL NODE"}</span>
                    <span>NODE: {activeNode.toUpperCase()}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                      <div className="text-[#9290A3] text-[9px] mb-1">EXECUTION LAYER</div>
                      <div className="text-white font-semibold">
                        {activeNode === "edge" && "Cloudflare Workers & CDN"}
                        {activeNode === "nextjs" && "Next.js App Router (SSR)"}
                        {activeNode === "gemini" && "Google Gemini AI Pipeline"}
                        {activeNode === "data" && "PostgreSQL Connection Pool"}
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                      <div className="text-[#9290A3] text-[9px] mb-1">CONTRACT / PROTOCOL</div>
                      <div className="text-[#00F5FF] font-semibold">
                        {activeNode === "edge" && "HTTP/3 · Anycast DNS"}
                        {activeNode === "nextjs" && "React Server Actions"}
                        {activeNode === "gemini" && "Structured JSON Output"}
                        {activeNode === "data" && "Type-Safe Prisma Client"}
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                      <div className="text-[#9290A3] text-[9px] mb-1">HEALTH STATE</div>
                      <div className="text-[#27C93F] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>VERIFIED OPERATIONAL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contract" && (
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-2 overflow-x-auto">
                <div className="text-[#9290A3] text-[10px]">{"// TYPE-SAFE API CONTRACT (SAMPLE INTERFACE)"}</div>
                <pre className="text-[11px] leading-relaxed text-[#00F5FF]">
{`interface EngineeringPipeline {
  client: "Enterprise" | "Ambitious Business";
  frontend: Next.js<ReactServerComponents>;
  intelligence: GoogleGemini<StructuredWorkflows>;
  persistence: PostgreSQL<TypeSafeSchemas>;
  status: "PRODUCTION_READY";
}`}
                </pre>
              </div>
            )}

            {activeTab === "telemetry" && (
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-2">
                <div className="text-[#9290A3] text-[10px]">{"// RECENT RUNTIME EVENTS"}</div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-[#9290A3]">
                    <span className="text-[#00F5FF]">GET /api/v1/projects</span>
                    <span className="text-[#27C93F]">200 OK · EDGE_HIT</span>
                  </div>
                  <div className="flex items-center justify-between text-[#9290A3]">
                    <span className="text-[#8B2CFF]">POST /api/ai/workflow</span>
                    <span className="text-[#27C93F]">GEMINI_PARSED · STREAM_DONE</span>
                  </div>
                  <div className="flex items-center justify-between text-[#9290A3]">
                    <span className="text-white">TURBOPACK COMPILE</span>
                    <span className="text-[#00F5FF]">INCREMENTAL_CACHE_ACTIVE</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Telemetry Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 h-full flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#9290A3] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Stack Integration</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00F5FF]" />
                </div>
                <div className="space-y-2 text-[11px] font-mono">
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-[#9290A3]">Frontend Engine</span>
                    <span className="text-white font-medium">Next.js 15 & React</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-[#9290A3]">Mobile Stack</span>
                    <span className="text-white font-medium">Flutter & Dart</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-[#9290A3]">AI Orchestration</span>
                    <span className="text-[#8B2CFF] font-medium">Google Gemini</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-[#9290A3]">Database</span>
                    <span className="text-white font-medium">PostgreSQL / Cloud</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#9290A3]">Edge Distribution</span>
                    <span className="text-[#00F5FF] font-medium">Global Edge Network</span>
                  </div>
                </div>
              </div>

              {/* Bottom Assurance Token */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-[#9290A3]">
                <Globe className="w-3 h-3 text-[#00F5FF]" />
                <span>Distributed Worldwide · Zero Bloat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
