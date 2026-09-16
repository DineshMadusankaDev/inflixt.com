import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { servicesData } from "@/data/services";
import { ServicePillarCard } from "./ServicePillarCard";
import {
  WebArchitectureMetaphor,
  EcommerceMetaphor,
  MobileEngineMetaphor,
  CustomSoftwareMetaphor,
  AIAutomationMetaphor,
  SEOMetaphor,
} from "./ServiceVisualMetaphors";

export function ServicesShowcase() {
  const webService = servicesData[0];
  const ecommerceService = servicesData[1];
  const mobileService = servicesData[2];
  const softwareService = servicesData[3];
  const aiService = servicesData[4];
  const seoService = servicesData[5];

  return (
    <section id="what-we-build" className="py-24 sm:py-32 relative overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-[#8B2CFF]/6 rounded-full blur-[140px] pointer-events-none animate-ambient-purple"
        aria-hidden="true"
      />

      <Container>
        <ScrollReveal>
          <SectionHeader
            badgeText="WHAT WE BUILD"
            badgeVariant="cyan"
            title="Six Core Pillars of Digital Engineering"
            description="From high-velocity web platforms to intelligent automation pipelines, every solution is architected around real business needs and long-term maintainability."
          />
        </ScrollReveal>

        {/* Asymmetric Editorial Grid Layout */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Row 1: Featured 01 — AI-Powered Web Development (Full-Width Split) */}
          <ScrollReveal delay={40}>
            <ServicePillarCard
              service={webService}
              index={0}
              layout="featured"
              visualMetaphor={<WebArchitectureMetaphor />}
              badgeVariant="cyan"
            />
          </ScrollReveal>

          {/* Row 2: Paired 02 & 03 — E-commerce & Mobile App Development (2-Column Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <ScrollReveal delay={80} className="h-full">
              <ServicePillarCard
                service={ecommerceService}
                index={1}
                layout="standard"
                visualMetaphor={<EcommerceMetaphor />}
                badgeVariant="purple"
              />
            </ScrollReveal>

            <ScrollReveal delay={120} className="h-full">
              <ServicePillarCard
                service={mobileService}
                index={2}
                layout="standard"
                visualMetaphor={<MobileEngineMetaphor />}
                badgeVariant="cyan"
              />
            </ScrollReveal>
          </div>

          {/* Row 3: Featured 04 — Custom Software (Full-Width System Blueprint) */}
          <ScrollReveal delay={140}>
            <ServicePillarCard
              service={softwareService}
              index={3}
              layout="featured"
              visualMetaphor={<CustomSoftwareMetaphor />}
              badgeVariant="purple"
            />
          </ScrollReveal>

          {/* Row 4: Paired 05 & 06 — AI & Automation + SEO & Digital Growth (2-Column Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <ScrollReveal delay={160} className="h-full">
              <ServicePillarCard
                service={aiService}
                index={4}
                layout="standard"
                visualMetaphor={<AIAutomationMetaphor />}
                badgeVariant="cyan"
              />
            </ScrollReveal>

            <ScrollReveal delay={200} className="h-full">
              <ServicePillarCard
                service={seoService}
                index={5}
                layout="standard"
                visualMetaphor={<SEOMetaphor />}
                badgeVariant="purple"
              />
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
