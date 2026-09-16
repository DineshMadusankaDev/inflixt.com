import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projectsData, getProjectBySlug } from "@/data/projects";
import { LiveWebsitePreview } from "@/components/work/LiveWebsitePreview";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Cpu, Globe2, Layers } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Inflixt",
    };
  }

  const url = `https://inflixt.com/work/${project.slug}`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url,
      type: "website",
      siteName: "Inflixt",
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Schema.org structured data using standard WebPage type
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.seo.title,
    description: project.seo.description,
    url: `https://inflixt.com/work/${project.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Inflixt",
      url: "https://inflixt.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://inflixt.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: "https://inflixt.com/work",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: `https://inflixt.com/work/${project.slug}`,
        },
      ],
    },
    mainEntity: {
      "@type": "CreativeWork",
      name: project.title,
      headline: project.classification,
      description: project.summary,
      url: project.liveUrl,
      creator: {
        "@type": "Organization",
        name: "Inflixt Global PVT LTD",
      },
    },
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#8B2CFF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-purple" />

      <Container>
        {/* Navigation / Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9290A3]">
            <Link
              href="/work"
              className="hover:text-[#00F5FF] transition-colors inline-flex items-center gap-1.5 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Work</span>
            </Link>
            <span>/</span>
            <span className="text-white/80">{project.title}</span>
          </div>
        </nav>

        {/* Project Hero */}
        <ScrollReveal>
          <div className="max-w-4xl mb-12 sm:mb-16">
            <Badge variant="cyan" className="mb-4">
              {project.clientDomain}
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl font-mono text-[#00F5FF] mb-6">
              {project.classification}
            </p>

            <p className="text-base sm:text-lg text-[#E7E5EE] leading-relaxed mb-8 max-w-3xl">
              {project.summary}
            </p>

            {/* Confirmed Technologies Pills */}
            <div className="mb-8">
              <div className="text-xs font-mono text-[#9290A3] uppercase tracking-wider mb-3">
                Confirmed Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-white bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                variant="primary"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Visit Live Website
              </Button>
              <Button
                href="/work"
                size="md"
                variant="secondary"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Work
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Live Website Experience Section */}
        <section className="mb-20 sm:mb-24" aria-labelledby="live-experience-heading">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-2">
                  Live Experience
                </div>
                <h2 id="live-experience-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Live Production Environment
                </h2>
              </div>
              <div className="text-xs font-mono text-[#9290A3]">
                Target: <span className="text-white">{project.displayUrl}</span>
              </div>
            </div>

            {/* Interactive Browser Preview / Fallback */}
            <LiveWebsitePreview project={project} />
          </ScrollReveal>
        </section>

        {/* Project Scope & Engineering Details */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 sm:mb-24">
          {/* Left Column: What We Built & Overview */}
          <div className="lg:col-span-7">
            <ScrollReveal className="h-full">
              <div className="rounded-2xl bg-[#080512] border border-white/10 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-3">
                    <Layers className="w-4 h-4" />
                    <span>Scope & Engineering</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    What We Built
                  </h2>
                  <p className="text-sm sm:text-base text-[#9290A3] leading-relaxed mb-6">
                    {project.fullOverview}
                  </p>

                  <div className="space-y-3 pt-2">
                    {project.whatWeBuilt.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#E7E5EE] font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#9290A3]">
                    Domain: {project.clientDomain}
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#00F5FF] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Launch Direct</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Verified Specifications & Highlights */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={100} className="h-full">
              <div className="rounded-2xl bg-[#080512] border border-white/10 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8B2CFF] uppercase tracking-wider mb-3">
                    <Cpu className="w-4 h-4" />
                    <span>Verified Specifications</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Architecture Highlights
                  </h2>

                  {project.architectureHighlights && project.architectureHighlights.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {project.architectureHighlights.map((highlight, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-[#9290A3] font-mono">{highlight.label}</span>
                          <span className="text-white font-medium text-right">{highlight.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 p-4 rounded-xl bg-[#0B0717] border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] mb-1">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Verified Live Availability</span>
                    </div>
                    <p className="text-xs text-[#9290A3] leading-relaxed">
                      Platform is active and publicly accessible on the production web at{" "}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#00F5FF] underline underline-offset-2"
                      >
                        {project.displayUrl}
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Button
                    href="/contact"
                    size="sm"
                    variant="outline"
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Inquire About Similar Architecture
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Project Bottom Conversion CTA */}
        <ScrollReveal>
          <section className="text-center max-w-2xl mx-auto p-8 sm:p-12 rounded-2xl bg-[#080512] border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Need Something Similar?
              </h2>
              <p className="text-sm sm:text-base text-[#9290A3] mb-8 leading-relaxed">
                Let&apos;s build a digital product designed around your business. We engineer high-performance web platforms, custom applications, and localized digital systems.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="md" variant="primary">
                  Start a Project →
                </Button>
                <Button href="/work" size="md" variant="secondary">
                  View More Projects
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </Container>
    </div>
  );
}
