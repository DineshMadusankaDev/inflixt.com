import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "./ServiceCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { servicesData } from "@/data/services";

export function ServicesMatrix() {
  const heroService = servicesData[0];
  const secondaryPair = servicesData.slice(1, 3);
  const tertiaryTrio = servicesData.slice(3, 6);

  return (
    <section id="what-we-build" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background subtle neon lights */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute bottom-10 right-0 w-[420px] h-[420px] bg-[#8B2CFF]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-purple" />

      <Container>
        <ScrollReveal>
          <SectionHeader
            badgeText="WHAT WE BUILD"
            badgeVariant="cyan"
            title="Digital Solutions Engineered for Scale"
            description="From high-speed web platforms to cross-platform mobile apps and AI automation, we craft robust digital infrastructure for ambitious businesses."
          />
        </ScrollReveal>

        {/* Asymmetric Editorial Architecture Layout */}
        <div className="space-y-6 sm:space-y-8">
          {/* Level 1: Dominant Architectural Pillar (Web Development) */}
          <ScrollReveal delay={50}>
            <ServiceCard service={heroService} index={0} variant="hero" />
          </ScrollReveal>

          {/* Level 2: Secondary Pair (E-commerce & Mobile Engineering) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryPair.map((service, index) => (
              <ScrollReveal key={service.id} delay={(index + 1) * 70}>
                <ServiceCard service={service} index={index + 1} />
              </ScrollReveal>
            ))}
          </div>

          {/* Level 3: Tertiary Supporting Ecosystem (Custom Software, AI & Automation, Technical SEO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tertiaryTrio.map((service, index) => (
              <ScrollReveal key={service.id} delay={(index + 3) * 70}>
                <ServiceCard service={service} index={index + 3} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
