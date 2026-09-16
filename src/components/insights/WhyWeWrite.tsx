import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Terminal, ShieldCheck, Compass } from "lucide-react";

export function WhyWeWrite() {
  const principles = [
    {
      icon: <Terminal className="w-5 h-5 text-[#00F5FF]" />,
      title: "Built from Production Reality",
      description:
        "Every perspective is distilled from hands-on engineering work across production web platforms, API pipelines, and mobile architectures.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#8B2CFF]" />,
      title: "Unbiased Trade-Off Analysis",
      description:
        "We evaluate software architectures objectively. We highlight where modern frameworks excel, and where native, specialized solutions are required.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00F5FF]" />,
      title: "Actionable Knowledge Over Hype",
      description:
        "No buzzwords or superficial AI claims. We share clear structural schemas, concrete patterns, and engineering considerations for growing businesses.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="rounded-3xl bg-[#080512] border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Subtle background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B2CFF]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-3">
                Editorial Philosophy
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                An Engineering Studio That Publishes What It Learns.
              </h2>
              <p className="text-sm sm:text-base text-[#9290A3] leading-relaxed">
                We believe that software engineering is best advanced through transparent knowledge sharing. While our Services outline what we build and our Work demonstrates what we have shipped, Insights represents what we know, test, and learn in the field.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {principles.map((principle, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0B0717] border border-white/5 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      {principle.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9290A3] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
