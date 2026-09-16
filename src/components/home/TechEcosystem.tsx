"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { technologiesData } from "@/data/technologies";
import { TechCategory } from "@/types";
import { cn } from "@/lib/utils";
import {
  Code2,
  Smartphone,
  Server,
  Database,
  Cloud,
  Sparkles,
  Layers,
} from "lucide-react";

interface DomainDefinition {
  id: TechCategory | "all";
  label: string;
  count: number;
  icon: React.ElementType;
  description: string;
}

const domains: DomainDefinition[] = [
  {
    id: "all",
    label: "All Technologies",
    count: technologiesData.length,
    icon: Layers,
    description: "End-to-end type-safe modern engineering ecosystem.",
  },
  {
    id: "frontend",
    label: "Frontend",
    count: technologiesData.filter((t) => t.category === "frontend").length,
    icon: Code2,
    description: "Next.js App Router, modern React 19, strict TypeScript, and Tailwind CSS.",
  },
  {
    id: "mobile",
    label: "Mobile",
    count: technologiesData.filter((t) => t.category === "mobile").length,
    icon: Smartphone,
    description: "Cross-platform iOS and Android engineering via Flutter and Dart.",
  },
  {
    id: "backend",
    label: "Backend",
    count: technologiesData.filter((t) => t.category === "backend").length,
    icon: Server,
    description: "High-performance Node.js microservices, Python automation, and REST/GraphQL APIs.",
  },
  {
    id: "database",
    label: "Database",
    count: technologiesData.filter((t) => t.category === "database").length,
    icon: Database,
    description: "Type-safe relational databases (PostgreSQL & MySQL) with strict schema migrations.",
  },
  {
    id: "cloud",
    label: "Cloud",
    count: technologiesData.filter((t) => t.category === "cloud").length,
    icon: Cloud,
    description: "Global edge CDN routing and zero-cold-start cloud infrastructure.",
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    count: technologiesData.filter((t) => t.category === "ai").length,
    icon: Sparkles,
    description: "Google Gemini multimodal models, vector embeddings, and intelligent workflow automation.",
  },
];

export function TechEcosystem() {
  const [activeTab, setActiveTab] = useState<TechCategory | "all">("all");
  const currentDomain = domains.find((d) => d.id === activeTab) || domains[0];

  return (
    <section id="technology" className="py-24 sm:py-32 bg-[#080512] border-y border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#8B2CFF]/8 rounded-full blur-[150px] pointer-events-none animate-ambient-purple" />

      <Container>
        <SectionHeader
          badgeText="TECHNOLOGY ECOSYSTEM"
          badgeVariant="purple"
          title="The Confirmed Engineering Stack"
          description="A curated, modern technology ecosystem selected for performance, strict type safety, cross-platform reach, and practical AI integration."
        />

        {/* Central Architectural Ecosystem Control Hub */}
        <div className="mb-12 p-6 sm:p-10 rounded-3xl bg-[#0B0717] border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute inset-0 tech-grid-pattern opacity-25" />

          {/* Central Core Title & Dynamic Domain Inspector */}
          <div className="relative z-10 max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-xs font-mono text-[#00F5FF] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
              <span>CENTRAL ARCHITECTURE ENGINE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              INFLIXT ENGINEERING ECOSYSTEM
            </h3>
            <p className="text-sm text-[#9290A3] max-w-xl mx-auto leading-relaxed">
              {currentDomain.description}
            </p>
          </div>

          {/* Connected Domain Selector Rails */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 relative z-10 mb-2">
            {domains.map((domain) => {
              const isActive = activeTab === domain.id;
              const Icon = domain.icon;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setActiveTab(domain.id)}
                  className={cn(
                    "text-xs font-mono px-4 py-2.5 rounded-xl transition-all duration-300 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] flex items-center gap-2",
                    isActive
                      ? "bg-[#00F5FF]/15 text-[#00F5FF] border-[#00F5FF]/60 shadow-[0_0_20px_rgba(0,245,255,0.25)] scale-[1.02]"
                      : "bg-[#080512] text-[#9290A3] border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{domain.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded font-semibold",
                      isActive ? "bg-[#00F5FF]/20 text-[#00F5FF]" : "bg-white/5 text-[#9290A3]"
                    )}
                  >
                    {domain.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact, High-Polish Engineering Node Constellation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5">
          {technologiesData.map((tech) => {
            const isMatch = activeTab === "all" || tech.category === activeTab;
            return (
              <div
                key={tech.name}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-300 group relative flex flex-col justify-between overflow-hidden",
                  isMatch
                    ? "bg-[#0B0717] border-white/15 hover:border-[#00F5FF]/50 hover:shadow-[0_4px_24px_rgba(0,245,255,0.12)] motion-safe:hover:-translate-y-1 opacity-100 scale-100"
                    : "bg-[#080512]/30 border-white/5 opacity-25 scale-[0.98] hover:opacity-60"
                )}
              >
                {/* Top: Name & Tag */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#00F5FF] transition-colors">
                      {tech.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#9290A3] uppercase tracking-wider mt-0.5">
                      {tech.category}
                    </div>
                  </div>
                  {tech.badge && (
                    <span className="text-[9px] font-mono text-[#8B2CFF] bg-[#8B2CFF]/10 border border-[#8B2CFF]/30 px-2 py-0.5 rounded shrink-0 group-hover:border-[#8B2CFF]/60 transition-colors">
                      {tech.badge}
                    </span>
                  )}
                </div>

                {/* Bottom: Connection Indicator */}
                <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#9290A3] group-hover:text-[#E7E5EE] transition-colors">
                    {isMatch ? "ACTIVE IN STACK" : "SYNCHRONIZED"}
                  </span>
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      isMatch
                        ? "bg-[#00F5FF] shadow-[0_0_8px_rgba(0,245,255,0.9)]"
                        : "bg-white/20"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
