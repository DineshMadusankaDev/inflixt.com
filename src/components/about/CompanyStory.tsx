import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Compass, Cpu, Layers, Palette } from "lucide-react";

export function CompanyStory() {
  const pillars = [
    {
      num: "01",
      icon: Compass,
      title: "STRATEGY",
      subtitle: "Technical Architecture & Product Vision",
      description:
        "We dissect complex business workflows to establish explicit technical specifications, database architectures, and API contracts before building.",
    },
    {
      num: "02",
      icon: Palette,
      title: "DESIGN",
      subtitle: "Intuitive High-Fidelity UI/UX Systems",
      description:
        "Digital interfaces crafted with precision typography, responsive ergonomics, and dark-canvas aesthetics that make complex systems effortless to navigate.",
    },
    {
      num: "03",
      icon: Layers,
      title: "ENGINEERING",
      subtitle: "Modern, Type-Safe Full-Stack Systems",
      description:
        "Disciplined engineering using Next.js, TypeScript, Flutter, and cloud-native backends, delivering resilient codebases built to stand the test of time.",
    },
    {
      num: "04",
      icon: Cpu,
      title: "INTELLIGENCE",
      subtitle: "Practical AI & Intelligent Automation",
      description:
        "Applying generative models, automated workflows, and data pipelines to eliminate operational bottlenecks rather than chasing superficial hype.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[#8B2CFF]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-purple" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal>
            <Badge variant="purple" className="mb-4">
              OUR REASON FOR BEING
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Engineered for Longevity. Built for Scale.
            </h2>
            <p className="text-base sm:text-lg text-[#9290A3] leading-relaxed">
              We founded Inflixt to bridge the gap between ambitious digital vision and institutional software execution—rejecting fragile templates in favor of modern, type-safe digital architecture.
            </p>
          </ScrollReveal>
        </div>

        {/* Narrative Manifesto Box */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-20 p-8 sm:p-12 rounded-3xl bg-[#0B0717] border border-white/10 relative overflow-hidden">
            {/* Top gradient highlight bar */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent" />

            <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-widest mb-3">
              Company Manifesto // Inflixt Global
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
              Modern digital products and business solutions for growing businesses.
            </h3>

            <div className="space-y-4 text-base text-[#9290A3] leading-relaxed">
              <p>
                In today&apos;s digital economy, businesses are frequently constrained by two extremes: expensive legacy consultancies that move too slowly, or generic template shops that assemble brittle websites with zero architectural depth.
              </p>
              <p>
                Inflixt represents a modern alternative. We unite digital product strategy, bespoke UI/UX design, rigorous software engineering, and applied artificial intelligence under one roof. Every platform we deliver is built with clean code hygiene, modular component architecture, and comprehensive documentation.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={idx * 80} className="h-full">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#080512] border border-white/10 hover:border-[#00F5FF]/30 motion-safe:hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/40 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-white/30 group-hover:text-white transition-colors duration-200">
                        {pillar.num}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#00F5FF] transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-mono text-[#00F5FF]/80 mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-[#9290A3] leading-relaxed">
                      {pillar.description}
                    </p>
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
