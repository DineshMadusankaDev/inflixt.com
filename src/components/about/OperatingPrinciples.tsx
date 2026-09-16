import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Code2, Cpu, ShieldCheck, Target } from "lucide-react";

export function OperatingPrinciples() {
  const principles = [
    {
      num: "01",
      icon: Code2,
      title: "Clean Modern Architecture",
      tagline: "Code Hygiene & Long-Term Maintainability",
      description:
        "We build exclusively with contemporary frameworks and strict type safety, rejecting bloated legacy systems in favor of modular, self-documenting codebases that teams love maintaining.",
    },
    {
      num: "02",
      icon: Cpu,
      title: "Practical Intelligence",
      tagline: "AI Engineered for Measurable Utility",
      description:
        "We apply artificial intelligence and autonomous workflows directly to operational friction points—focusing on tangible business productivity rather than superficial industry buzzwords.",
    },
    {
      num: "03",
      icon: Target,
      title: "Design. Develop. Dominate.",
      tagline: "End-to-End Execution Discipline",
      description:
        "Our tagline defines our end-to-end discipline: intuitive user experience design, robust software engineering, and technical SEO positioning that enables our clients to lead their markets.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Integrity & Direct Engineering",
      tagline: "Transparent Communication & Full Ownership",
      description:
        "We operate with direct engineer-to-client communication, realistic delivery roadmaps, and verifiable technical standards—treating every partner codebase with institutional seriousness.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#8B2CFF]/6 rounded-full blur-[140px] pointer-events-none animate-ambient-purple" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal>
            <Badge variant="cyan" className="mb-4">
              HOW WE OPERATE
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Our Operating Principles
            </h2>
            <p className="text-base sm:text-lg text-[#9290A3] leading-relaxed">
              Four fundamental disciplines that guide every technical decision, architecture review, and client engagement at Inflixt.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.title} delay={idx * 90} className="h-full">
                <div className="p-8 rounded-2xl bg-[#0B0717] border border-white/10 hover:border-white/20 motion-safe:hover:-translate-y-1 hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group h-full flex flex-col justify-between">
                  <div>
                    {/* Top row with icon & index */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/40 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] motion-safe:group-hover:scale-105 transition-all duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xl font-mono font-bold text-white/20 group-hover:text-white transition-colors">
                        {p.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00F5FF] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs font-mono text-[#00F5FF]/80 uppercase tracking-wider mb-4">
                      {p.tagline}
                    </p>
                    <p className="text-sm text-[#9290A3] leading-relaxed">
                      {p.description}
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
