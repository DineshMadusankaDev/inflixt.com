import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyData } from "@/data/company";
import { ArrowRight, Compass, ShieldCheck, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const principles = [
    {
      icon: Terminal,
      title: "Engineering as Craft",
      description:
        "We view software engineering as a disciplined craft. Every interface element, database index, and API contract is carefully built for speed and longevity.",
    },
    {
      icon: Compass,
      title: "Design-Driven Outcomes",
      description:
        "Modern digital products succeed when form meets function. We design interfaces that look futuristic while remaining immediately clear and intuitive.",
    },
    {
      icon: ShieldCheck,
      title: "Global Delivery Standards",
      description:
        "Operating with high standards for communication, transparency, and clean codebases, serving ambitious clients and businesses globally.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#080512] border-y border-white/10 relative overflow-hidden">
      {/* Background atmospheric ambient glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#8B2CFF]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-purple" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Portrait & Technical Craft Framing */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative framing with subtle neon aura */}
              <div className="relative rounded-3xl p-2 bg-[#0B0717] border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)] group transition-all duration-300 hover:border-[#00F5FF]/40 hover:shadow-[0_0_35px_rgba(0,245,255,0.15)]">
                {/* Ambient glow edge */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#00F5FF]/20 via-transparent to-[#8B2CFF]/20 opacity-40 pointer-events-none" />

                {/* Aspect Ratio Container (4:5 Editorial Portrait) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#05030D]">
                  <Image
                    src="/images/about/founder-dinesh.webp"
                    alt="Founder and engineering craftsmanship at Inflixt"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    priority={false}
                  />

                  {/* Subtle vignette gradient overlay at bottom for telemetry contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05030D]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Corner technical indicator */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                      INFLIXT // CRAFTSMANSHIP
                    </span>
                  </div>

                  {/* Bottom portrait telemetry bar */}
                  <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-[11px] font-mono text-[#9290A3] bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-2.5 rounded-xl shadow-lg">
                    <span className="text-white font-medium">Human Craftsmanship</span>
                    <span className="text-[#00F5FF]">{companyData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Unified Studio Profile & Operating Principles */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal direction="up">
              <div>
                <Badge variant="cyan" className="mb-4">
                  ABOUT INFLIXT
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
                  Modern Digital Products for Ambitious Businesses.
                </h2>
                <p className="text-lg text-[#E7E5EE] leading-relaxed mb-4">
                  {companyData.corePositioning}
                </p>
                <p className="text-base text-[#9290A3] leading-relaxed mb-6">
                  {companyData.supportingPositioning}
                </p>
                
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3.5 py-1.5 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                  <span>Regional Hub: {companyData.location}</span>
                </div>
              </div>

              {/* Cohesive Editorial Principles Panel (No repetitive card boxes) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0717]/90 border border-white/10 relative overflow-hidden mb-8 space-y-6">
                <div className="pointer-events-none absolute inset-0 tech-grid-pattern opacity-15" />
                {principles.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "flex items-start gap-4 relative z-10",
                        idx !== 0 && "pt-6 border-t border-white/5"
                      )}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] shrink-0 group-hover:border-[#00F5FF]/50 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9290A3] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <Button
                  href="/about"
                  variant="secondary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Learn More About Our Company
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
