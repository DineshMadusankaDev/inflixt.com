import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const taxonomyPills = [
  "Web Engineering",
  "AI & Automation",
  "Mobile Systems",
  "Software Architecture",
  "Technical SEO",
];

export function InsightsHero() {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#8B2CFF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-purple" />

      <Container>
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <Badge variant="cyan" hasBeacon className="mb-6">
              Engineering Publication
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              WE SHARE WHAT <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-white to-[#8B2CFF]">
                WE BUILD.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#9290A3] leading-relaxed max-w-2xl mb-10">
              Engineering perspectives, architectural trade-offs, and practical AI notes from the Inflixt team. An engineering studio that publishes what it learns.
            </p>

            {/* Editorial Taxonomy Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 border-t border-white/10 max-w-3xl">
              <span className="text-xs font-mono text-[#9290A3] uppercase tracking-wider mr-2 hidden md:inline">
                Pillars:
              </span>
              {taxonomyPills.map((pillar) => (
                <span
                  key={pillar}
                  className="text-xs font-mono text-[#E7E5EE] bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:border-[#00F5FF]/40 hover:text-[#00F5FF] transition-colors"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
