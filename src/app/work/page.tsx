import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { projectsData } from "@/data/projects";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Featured Work & Case Studies | Inflixt",
  description:
    "Review verified digital products and platforms engineered by Inflixt, including Fair Comment, Studio 2020, and Inflixt Global.",
  alternates: {
    canonical: "https://inflixt.com/work",
  },
};

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-[#8B2CFF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-purple" />

      <Container>
        <ScrollReveal>
          <SectionHeader
            badgeText="PORTFOLIO & CASE STUDIES"
            badgeVariant="cyan"
            title="Verified Case Studies & Platforms"
            description="Explore verified digital platforms and bespoke experiences engineered with modern technology standards."
          />
        </ScrollReveal>

        {/* 3-Project Balanced Grid:
            Mobile: 1 column stacked
            Tablet: Card 01 spans 2 cols, Cards 02 & 03 side-by-side (no orphan)
            Desktop: 3 equal balanced columns
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16">
          {projectsData.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              delay={idx * 100}
              className={`h-full ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <article
                className="rounded-3xl bg-[#0B0717] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#00F5FF]/40 hover:shadow-[0_4px_30px_rgba(0,245,255,0.12)] transition-all duration-300 motion-safe:hover:-translate-y-1.5 group h-full"
              >
              {/* Neutral Visual Browser Framing */}
              <div className="bg-[#080512] border-b border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[240px] relative overflow-hidden">
                <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  </div>
                  <span className="text-[11px] font-mono text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/20 px-2.5 py-0.5 rounded-full">
                    {project.clientDomain}
                  </span>
                </div>

                <div className="relative z-10 text-center py-5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#00F5FF] transition-colors">
                    <Link href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-xs font-mono text-[#9290A3] mt-2">
                    {project.classification}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#9290A3] relative z-10">
                  <span className="text-white/60 text-[11px]">{project.displayUrl}</span>
                  <span>INDEX 0{idx + 1}</span>
                </div>
              </div>

              {/* Factual Information & Stack */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs font-mono text-[#8B2CFF] uppercase tracking-wider mb-2">
                    Scope & Architecture
                  </h3>
                  <p className="text-sm text-[#E7E5EE] leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-mono text-[#9290A3] uppercase mb-2.5">
                      Confirmed Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: Primary Case Study + Secondary Live External */}
                <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <Button
                    href={`/work/${project.slug}`}
                    size="sm"
                    variant="primary"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View Case Study
                  </Button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#9290A3] hover:text-[#00F5FF] inline-flex items-center justify-center sm:justify-start gap-1 py-1 transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3 h-3 text-[#00F5FF]" />
                  </a>
                </div>
              </div>
            </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing Banner */}
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto p-8 rounded-2xl bg-[#080512] border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">
              Have a project in mind?
            </h3>
            <p className="text-sm text-[#9290A3] mb-6">
              We are actively accepting inquiries for custom web platforms, mobile apps, and AI software engineering projects.
            </p>
            <Button href="/contact" size="md" variant="primary">
              Start a Conversation →
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
