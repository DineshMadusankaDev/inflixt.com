import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { technologiesData } from "@/data/technologies";
import { TechItem } from "@/types";

interface TechTier {
  title: string;
  categoryTag: string;
  description: string;
  technologies: TechItem[];
  accentColor: "cyan" | "purple";
}

export function ServicesTechStack() {
  const tiers: TechTier[] = [
    {
      title: "Client & Frontend Engineering",
      categoryTag: "TIER 01 // INTERFACE",
      description: "Type-safe web frontends and cross-platform mobile applications engineered with contemporary UI libraries.",
      technologies: technologiesData.filter(
        (t) => t.category === "frontend" || t.category === "mobile"
      ),
      accentColor: "cyan",
    },
    {
      title: "Backend Services & High-Throughput APIs",
      categoryTag: "TIER 02 // LOGIC & RUNTIMES",
      description: "Asynchronous backend microservices, event-driven runtimes, and type-checked REST APIs.",
      technologies: technologiesData.filter((t) => t.category === "backend"),
      accentColor: "purple",
    },
    {
      title: "Relational Data & Edge Infrastructure",
      categoryTag: "TIER 03 // STORAGE & CLOUD",
      description: "Structured database integrity and edge-distributed CDN routing for global availability.",
      technologies: technologiesData.filter(
        (t) => t.category === "database" || t.category === "cloud"
      ),
      accentColor: "cyan",
    },
    {
      title: "Artificial Intelligence & Automation",
      categoryTag: "TIER 04 // INTELLIGENCE",
      description: "Multimodal Gemini integrations, custom prompt contexts, and automated event workflows.",
      technologies: technologiesData.filter((t) => t.category === "ai"),
      accentColor: "purple",
    },
  ];

  return (
    <section id="technologies" className="py-24 sm:py-32 bg-[#080512] border-y border-white/10 relative overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div
        className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#8B2CFF]/6 rounded-full blur-[140px] pointer-events-none animate-ambient-purple"
        aria-hidden="true"
      />

      <Container>
        <ScrollReveal>
          <SectionHeader
            badgeText="ENGINEERING STACK"
            badgeVariant="purple"
            title="Technology That Powers the Work"
            description="A curated, verified engineering stack selected for type safety, maintainability, cross-platform reach, and practical AI integration."
          />
        </ScrollReveal>

        {/* 4 Multi-Tier Architectural Rows */}
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {tiers.map((tier, tierIdx) => (
            <ScrollReveal key={tier.title} delay={tierIdx * 60}>
              <div className="rounded-2xl bg-[#0B0717] border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
                {/* Tier Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
                  <div>
                    <span
                      className={`text-xs font-mono tracking-wider uppercase ${
                        tier.accentColor === "cyan" ? "text-[#00F5FF]" : "text-[#B026FF]"
                      }`}
                    >
                      {tier.categoryTag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {tier.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9290A3] max-w-md">
                    {tier.description}
                  </p>
                </div>

                {/* Technologies Grid within Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tier.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-4 rounded-xl bg-[#080512] border border-white/5 hover:border-[#00F5FF]/30 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_2px_20px_rgba(0,245,255,0.06)] transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white group-hover:text-[#00F5FF] transition-colors">
                            {tech.name}
                          </span>
                          {tech.badge && (
                            <span className="text-[10px] font-mono text-[#E7E5EE] bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                              {tech.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#9290A3] leading-relaxed">
                          {tech.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#9290A3]">
                        <span className="uppercase tracking-wider">{tech.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]/40 group-hover:bg-[#00F5FF] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
