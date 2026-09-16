import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export function ServicesProcess() {
  const steps = [
    {
      num: "01",
      name: "DISCOVER",
      icon: Search,
      tagline: "Architecture & Research",
      description:
        "Analyze business workflows, technical constraints, and user needs to establish a clear architectural blueprint before writing code.",
      color: "#00F5FF",
    },
    {
      num: "02",
      name: "DESIGN",
      icon: PenTool,
      tagline: "High-Fidelity Interface & UX",
      description:
        "Design responsive component libraries, user-centered flows, and purposeful micro-interactions tailored for high conversion.",
      color: "#00D9FF",
    },
    {
      num: "03",
      name: "DEVELOP",
      icon: Code2,
      tagline: "Engineering & Integration",
      description:
        "Engineer scalable systems with type-safe Next.js, Flutter, and backend APIs backed by disciplined code hygiene and testing.",
      color: "#8B2CFF",
    },
    {
      num: "04",
      name: "DOMINATE",
      icon: Rocket,
      tagline: "Deploy, Optimize & Scale",
      description:
        "Deploy to global edge networks, optimize performance, implement structured technical SEO, and support operational growth.",
      color: "#B026FF",
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 relative overflow-hidden scroll-mt-20">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badgeText="OUR METHODOLOGY"
            badgeVariant="cyan"
            title="How We Engineer Digital Solutions"
            description="A structured four-stage engineering methodology linking directly to our brand ethos: Design. Develop. Dominate."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.num} delay={idx * 80} className="h-full">
                <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0B0717] border border-white/10 hover:border-[#00F5FF]/30 motion-safe:hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(0,245,255,0.08)] transition-all duration-300 group flex flex-col justify-between h-full">
                  <div>
                    {/* Top bar: Icon and Step number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/40 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] motion-safe:group-hover:scale-105 transition-all duration-200">
                        <Icon className="w-5 h-5 transition-transform duration-200" />
                      </div>
                      <span className="text-xl font-mono font-bold text-white/30 group-hover:text-white transition-colors duration-200">
                        {step.num}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#00F5FF] uppercase tracking-wider mb-1">
                      {step.tagline}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-[#00F5FF] transition-colors duration-200">
                      {step.name}
                    </h3>
                    <p className="text-sm text-[#9290A3] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: step.color }}
                    />
                    <span className="text-xs font-mono text-[#E7E5EE]/70 uppercase">
                      Stage {step.num}
                    </span>
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
