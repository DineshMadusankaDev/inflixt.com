import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CheckCircle2, ShieldCheck, Zap, Layers, Users } from "lucide-react";
import { ArchitectureVisualizer } from "./ArchitectureVisualizer";

export function WhyInflixt() {
  const pillars = [
    {
      num: "01",
      title: "Modern Stack, Zero Bloat",
      description:
        "We build exclusively with contemporary frameworks like Next.js, React, and Flutter. We never use fragile WordPress themes or slow drag-and-drop website builders that degrade performance.",
      highlight: "Pure clean code and lean bundles",
      icon: Zap,
    },
    {
      num: "02",
      title: "Practical AI Integration",
      description:
        "We avoid superficial AI gimmicks. Instead, we embed Google Gemini and intelligent APIs into practical business workflows—such as data parsing, search, and automated operations.",
      highlight: "Real utility over empty hype",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Type-Safe & Scalable Architecture",
      description:
        "Engineered with strict TypeScript, modular components, and structured database schemas (PostgreSQL / MySQL) designed to scale smoothly as your transaction volume and user base grow.",
      highlight: "Reliable engineering discipline",
      icon: Layers,
    },
    {
      num: "04",
      title: "Direct Technical Collaboration",
      description:
        "You collaborate directly with experienced software engineers and product designers who understand the technical reality of building and launching digital products.",
      highlight: "Fast communication, no agency layers",
      icon: Users,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#080512] border-y border-white/10 relative overflow-hidden">
      {/* Subtle purple background aura */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#8B2CFF]/10 rounded-full blur-[150px] pointer-events-none animate-ambient-purple" />

      <Container>
        {/* Section Heading / Thesis (Top Header) */}
        <ScrollReveal className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <Badge variant="purple" className="mb-4">
            WHY INFLIXT
          </Badge>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Engineered for Impact. Built to Scale.
          </h2>
          <p className="text-base sm:text-xl text-[#9290A3] leading-relaxed max-w-3xl mx-auto mb-6">
            We position ourselves as a dedicated software engineering partner for
            businesses that refuse to compromise on design quality, code integrity,
            or operational velocity.
          </p>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0B0717] border border-white/10 text-xs font-mono">
            <span className="text-[#00F5FF] uppercase font-semibold">Core Philosophy:</span>
            <span className="text-white font-medium">&ldquo;Design. Develop. Dominate.&rdquo;</span>
          </div>
        </ScrollReveal>

        {/* PRIMARY VISUAL CENTERPIECE: Signature Architecture System Visualizer */}
        <div className="mb-16 sm:mb-20">
          <ArchitectureVisualizer />
        </div>

        {/* Supporting Engineering Principles (Balanced Architectural Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.num} delay={idx * 60}>
                <div className="p-6 rounded-2xl bg-[#0B0717]/80 border border-white/10 hover:border-[#00F5FF]/30 motion-safe:hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(0,245,255,0.06)] transition-all duration-300 group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#8B2CFF] bg-[#8B2CFF]/10 border border-[#8B2CFF]/30 px-2.5 py-1 rounded-md">
                        {pillar.num}
                      </span>
                      <Icon className="w-4 h-4 text-[#00F5FF] opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00F5FF] transition-colors duration-200">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9290A3] leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-[#00F5FF]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{pillar.highlight}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
