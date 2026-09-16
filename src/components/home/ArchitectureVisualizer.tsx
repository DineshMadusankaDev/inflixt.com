"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Monitor, Smartphone, Cpu, Server, Database, Activity } from "lucide-react";

interface LayerNode {
  id: string;
  step: string;
  name: string;
  tagline: string;
  specs: string[];
  icon: React.ElementType;
  accent: "cyan" | "purple";
  coordinate: string;
}

const architectureLayers: LayerNode[] = [
  {
    id: "experience",
    step: "01",
    name: "EXPERIENCE",
    tagline: "High-Fidelity Interface & UX",
    specs: ["Responsive Layouts", "Accessible Design Systems"],
    icon: Monitor,
    accent: "cyan",
    coordinate: "LAYER // 01",
  },
  {
    id: "frontend",
    step: "02",
    name: "FRONTEND",
    tagline: "Next.js & Cross-Platform",
    specs: ["React 19 & Turbopack", "Flutter Native Mobile"],
    icon: Smartphone,
    accent: "cyan",
    coordinate: "LAYER // 02",
  },
  {
    id: "backend",
    step: "03",
    name: "BACKEND",
    tagline: "Type-Safe APIs & Edge Services",
    specs: ["REST & GraphQL Microservices", "Sub-50ms Edge Execution"],
    icon: Server,
    accent: "purple",
    coordinate: "LAYER // 03",
  },
  {
    id: "intelligence",
    step: "04",
    name: "INTELLIGENCE",
    tagline: "Practical AI & Automation",
    specs: ["Google Gemini Integration", "Structured Workflow Engines"],
    icon: Cpu,
    accent: "purple",
    coordinate: "LAYER // 04",
  },
  {
    id: "data",
    step: "05",
    name: "DATA / AI",
    tagline: "Scalable Data Infrastructure",
    specs: ["PostgreSQL & MySQL", "Cloud Datastores & Caching"],
    icon: Database,
    accent: "cyan",
    coordinate: "LAYER // 05",
  },
];

export function ArchitectureVisualizer() {
  const [isInView, setIsInView] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const raf = requestAnimationFrame(() => setIsInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-16 sm:mt-20 pt-10 border-t border-white/10 relative rounded-3xl bg-[#080512] border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl"
    >
      {/* Background Depth & Micro-Grid Atmosphere */}
      <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#00F5FF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#8B2CFF]/10 blur-[120px] pointer-events-none" />

      {/* Telemetry Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF]">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00F5FF]">
              SYSTEM ARCHITECTURE VISUALIZATION
            </div>
            <div className="text-sm font-bold text-white tracking-tight">
              End-to-End Digital Engineering Pipeline
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
          <span>STATUS: ALL LAYERS SYNCHRONIZED</span>
        </div>
      </div>

      {/* Signature Connected Pipeline Architecture */}
      <div className="relative z-10 pt-10">
        {/* Desktop Connected Signal Backbone SVG */}
        <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-1 pointer-events-none -z-0">
          <svg
            className="w-full h-8 overflow-visible"
            viewBox="0 0 1000 32"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Base track line */}
            <line
              x1="0"
              y1="16"
              x2="1000"
              y2="16"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            {/* Animated drawing pipeline */}
            <line
              x1="0"
              y1="16"
              x2="1000"
              y2="16"
              stroke="url(#sigPipeGrad)"
              strokeWidth="2"
              className={cn(
                "transition-all duration-1000 ease-out origin-left",
                isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
            />
            {/* Signal Flow Dash */}
            <line
              x1="0"
              y1="16"
              x2="1000"
              y2="16"
              stroke="url(#sigPipeGrad)"
              strokeWidth="2.5"
              strokeDasharray="16 32"
              className="animate-signal-flow"
            />
            <defs>
              <linearGradient id="sigPipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#00F5FF" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#8B2CFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 5 Layered Architectural Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative">
          {architectureLayers.map((layer, idx) => {
            const Icon = layer.icon;
            const isCyan = layer.accent === "cyan";
            const isHovered = activeLayer === layer.id;

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                style={{
                  transitionDelay: `${idx * 120}ms`,
                  transitionDuration: "500ms",
                }}
                className={cn(
                  "p-6 rounded-2xl bg-[#0B0717] border transition-all duration-300 group flex flex-col justify-between relative overflow-hidden focus-within:ring-1 focus-within:ring-[#00F5FF]/40",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  isHovered
                    ? "border-[#00F5FF]/60 shadow-[0_4px_30px_rgba(0,245,255,0.15)] -translate-y-1.5"
                    : "border-white/10 hover:border-white/25"
                )}
              >
                {/* Station Interior Subtle Grid */}
                <div className="pointer-events-none absolute inset-0 tech-grid-pattern opacity-20" />

                <div>
                  {/* Top Station Header: Beacon + Coordinate */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200",
                        isCyan
                          ? "bg-[#00F5FF]/10 border-[#00F5FF]/40 text-[#00F5FF] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                          : "bg-[#8B2CFF]/10 border-[#8B2CFF]/40 text-[#8B2CFF] group-hover:shadow-[0_0_15px_rgba(139,44,255,0.3)]"
                      )}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    </div>

                    <span className="text-[11px] font-mono text-[#9290A3] group-hover:text-white transition-colors">
                      {layer.coordinate}
                    </span>
                  </div>

                  {/* Stage Name */}
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#00F5FF] transition-colors duration-200 relative z-10">
                    {layer.name}
                  </h4>
                  <p className="text-xs text-[#9290A3] leading-relaxed mb-6 relative z-10">
                    {layer.tagline}
                  </p>

                  {/* Key Architecture Specs */}
                  <ul className="space-y-2 mb-6 relative z-10 border-t border-white/5 pt-4">
                    {layer.specs.map((spec) => (
                      <li key={spec} className="text-[11px] font-mono text-[#E7E5EE]/80 flex items-center gap-2">
                        <span className={cn("w-1.5 h-1.5 rounded-full", isCyan ? "bg-[#00F5FF]" : "bg-[#8B2CFF]")} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-[#9290A3] group-hover:text-[#E7E5EE] transition-colors">
                    STAGE // {layer.step}
                  </span>
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-125 relative",
                      isCyan ? "bg-[#00F5FF]" : "bg-[#8B2CFF]"
                    )}
                  >
                    {isInView && (
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full animate-beacon opacity-60 pointer-events-none",
                          isCyan ? "bg-[#00F5FF]" : "bg-[#8B2CFF]"
                        )}
                      />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
