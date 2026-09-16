"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Search, PenTool, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const [isInView, setIsInView] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

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

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  const steps = [
    {
      num: "01",
      name: "DISCOVER",
      icon: Search,
      tagline: "Architecture & Research",
      description:
        "Understand your business, users and goals. We analyze technical constraints, user workflows, and market opportunities to define clear product requirements.",
      color: "#00F5FF",
      coordinate: "PHASE // 01",
      artifactTitle: "Blueprint & Topology",
      artifactVisual: (
        <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] space-y-1.5">
          <div className="flex items-center justify-between text-[#9290A3]">
            <span className="text-[#00F5FF]">SCHEMA BLUEPRINT</span>
            <span>v1.0 SPEC</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded bg-white/20 w-3/4" />
            <div className="h-1.5 rounded bg-[#00F5FF]/40 w-1/2" />
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-[#27C93F] pt-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Architecture Validated</span>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      name: "DESIGN",
      icon: PenTool,
      tagline: "High-Fidelity Interface & UX",
      description:
        "Turn ideas into clear, engaging digital experiences. We design responsive layouts, cohesive component libraries, and purposeful micro-interactions.",
      color: "#00D9FF",
      coordinate: "PHASE // 02",
      artifactTitle: "UI Component Tokens",
      artifactVisual: (
        <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] space-y-1.5">
          <div className="flex items-center justify-between text-[#9290A3]">
            <span className="text-[#00D9FF]">DESIGN SYSTEM</span>
            <span>TOKENS</span>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-0.5">
            <div className="p-1 rounded bg-white/5 border border-white/10 text-[9px] text-center text-white">
              Button.primary
            </div>
            <div className="p-1 rounded bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[9px] text-center text-[#00D9FF]">
              Modal.sheet
            </div>
          </div>
          <div className="text-[9px] text-[#9290A3] pt-0.5">
            Accessible · Spatial Harmony
          </div>
        </div>
      ),
    },
    {
      num: "03",
      name: "DEVELOP",
      icon: Code2,
      tagline: "Engineering & Integration",
      description:
        "Build with modern, scalable technology. We implement type-safe Next.js, Flutter, and backend APIs backed by rigorous code hygiene and testability.",
      color: "#8B2CFF",
      coordinate: "PHASE // 03",
      artifactTitle: "Type-Safe Build Stream",
      artifactVisual: (
        <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] space-y-1.5">
          <div className="flex items-center justify-between text-[#9290A3]">
            <span className="text-[#8B2CFF]">TURBOPACK BUILD</span>
            <span>NEXT.JS</span>
          </div>
          <div className="text-[9px] text-white/90 truncate">
            ✓ export default AppRouter()
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-[#27C93F] pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
            <span>Strict TypeScript: 0 Errors</span>
          </div>
        </div>
      ),
    },
    {
      num: "04",
      name: "DOMINATE",
      icon: Rocket,
      tagline: "Deploy, Optimize & Scale",
      description:
        "Launch, optimize and grow. We deploy to global edge CDNs, tune Core Web Vitals, implement structured SEO, and iterate based on real performance.",
      color: "#B026FF",
      coordinate: "PHASE // 04",
      artifactTitle: "Global Edge Production",
      artifactVisual: (
        <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] space-y-1.5">
          <div className="flex items-center justify-between text-[#9290A3]">
            <span className="text-[#B026FF]">GLOBAL CLOUD</span>
            <span>LIVE</span>
          </div>
          <div className="text-[9px] text-white/90">
            Anycast Edge Routing Active
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-[#00F5FF] pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
            <span>SEO & Web Vitals Synced</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="process" ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-cyan" />

      <Container>
        <SectionHeader
          badgeText="OUR PROCESS"
          badgeVariant="cyan"
          title="From Concept to Market Leadership"
          description="A structured four-stage methodology linking directly to our brand ethos: Design. Develop. Dominate."
        />

        {/* Unified Continuous Engineering Runway Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#080512] border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute inset-0 digital-grid-bg opacity-25" />

          {/* Connected SVG Pipeline Track on Desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[94px] left-[8%] right-[8%] h-1 pointer-events-none z-0"
          >
            <svg
              className="w-full h-4 overflow-visible"
              viewBox="0 0 1000 16"
              fill="none"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="8"
                x2="1000"
                y2="8"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
                strokeDasharray="4 6"
              />
              <line
                x1="0"
                y1="8"
                x2="1000"
                y2="8"
                stroke="url(#processGrad)"
                strokeWidth="2"
                className={cn(
                  "transition-all duration-1000 ease-out origin-left",
                  isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
              />
              <line
                x1="0"
                y1="8"
                x2="1000"
                y2="8"
                stroke="url(#processGrad)"
                strokeWidth="3"
                strokeDasharray="16 32"
                className="animate-signal-flow"
              />
              <defs>
                <linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#00D9FF" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#8B2CFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#B026FF" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Continuous Journey Stage Stations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStage === idx;

              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStage(idx)}
                  className={cn(
                    "p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group",
                    isSelected
                      ? "bg-[#0B0717] border-[#00F5FF]/50 shadow-[0_0_25px_rgba(0,245,255,0.12)] -translate-y-1"
                      : "bg-[#0B0717]/60 border-white/10 hover:border-white/20 hover:bg-[#0B0717]"
                  )}
                >
                  <div>
                    {/* Top Runway Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200"
                        style={{
                          backgroundColor: `${step.color}15`,
                          borderColor: `${step.color}40`,
                          color: step.color,
                        }}
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#9290A3] group-hover:text-white transition-colors">
                        {step.coordinate}
                      </span>
                    </div>

                    {/* Stage Heading */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00F5FF] transition-colors">
                        {step.name}
                      </h3>
                      <div className="text-xs font-mono text-[#00F5FF] mt-0.5">
                        {step.tagline}
                      </div>
                    </div>

                    {/* Concrete Stage Visual Artifact */}
                    <div className="my-4">
                      <div className="text-[10px] font-mono text-[#9290A3] mb-1.5 uppercase tracking-wider">
                        {step.artifactTitle}
                      </div>
                      {step.artifactVisual}
                    </div>

                    {/* Stage Description Copy (Preserved 100%) */}
                    <p className="text-xs sm:text-sm text-[#9290A3] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Stage Footer Status */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#9290A3]">
                    <span className="group-hover:text-[#E7E5EE] transition-colors">
                      MILESTONE 0{idx + 1}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
