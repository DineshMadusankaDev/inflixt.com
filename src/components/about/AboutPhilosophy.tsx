import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Code2, Compass, PenTool, Rocket } from "lucide-react";

export function AboutPhilosophy() {
  const stages = [
    {
      step: "01",
      name: "DISCOVER",
      icon: Compass,
      tagline: "Architecture First",
      philosophy:
        "We dissect workflows, clarify user journeys, and establish strict data schemas before writing code.",
    },
    {
      step: "02",
      name: "DESIGN",
      icon: PenTool,
      tagline: "Form Meets Purpose",
      philosophy:
        "Interfaces crafted with modern dark-canvas aesthetics, intuitive navigation, and high conversion mechanics.",
    },
    {
      step: "03",
      name: "DEVELOP",
      icon: Code2,
      tagline: "Strict Type Safety",
      philosophy:
        "Engineering scalable applications with Next.js, Flutter, and robust cloud APIs built for zero debt.",
    },
    {
      step: "04",
      name: "DOMINATE",
      icon: Rocket,
      tagline: "Deploy & Scale",
      philosophy:
        "Edge deployments, structured technical SEO, and ongoing optimization that position clients to win.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#00F5FF]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-cyan" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal>
            <Badge variant="purple" className="mb-4">
              EXECUTION DISCIPLINE
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Design. Develop. Dominate.
            </h2>
            <p className="text-base sm:text-lg text-[#9290A3] leading-relaxed">
              Our four-stage product methodology bridges technical precision and strategic business outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* 4-Stage Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <ScrollReveal key={stage.step} delay={idx * 80} className="h-full">
                <div className="p-6 rounded-2xl bg-[#0B0717] border border-white/10 hover:border-white/20 transition-all duration-200 group h-full flex flex-col justify-between motion-safe:hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#00F5FF]">
                        STAGE {stage.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E7E5EE] group-hover:text-[#00F5FF] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00F5FF] transition-colors">
                      {stage.name}
                    </h3>
                    <div className="text-xs font-mono text-[#9290A3] mb-3">
                      {stage.tagline}
                    </div>
                    <p className="text-xs text-[#9290A3] leading-relaxed">
                      {stage.philosophy}
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
