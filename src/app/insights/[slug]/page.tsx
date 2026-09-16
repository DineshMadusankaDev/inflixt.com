import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { companyData } from "@/data/company";
import {
  getAllInsights,
  getInsightBySlug,
  getRelatedInsights,
} from "@/data/insights";
import { ArticleHeader } from "@/components/insights/ArticleHeader";
import { ArticleSidebar } from "@/components/insights/ArticleSidebar";
import { ArticleContentRenderer } from "@/components/insights/ArticleContentRenderer";
import { ArticleServiceBridge } from "@/components/insights/ArticleServiceBridge";
import { InsightCard } from "@/components/insights/InsightCard";
import { ArrowLeft, Clock, FileCode2 } from "lucide-react";

interface InsightDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllInsights().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {
      title: "Perspective Not Found | Inflixt",
    };
  }

  const url = `https://inflixt.com/insights/${article.slug}`;
  const isPublished = article.status === "published";

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: isPublished,
      follow: true,
    },
    openGraph: {
      type: "article",
      url,
      title: article.seo.title,
      description: article.seo.description,
      siteName: "Inflixt",
      images: [
        {
          url: article.seo.ogImage || "/brand/inflixt-logo.png",
          width: 776,
          height: 311,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: [article.seo.ogImage || "/brand/inflixt-logo.png"],
    },
  };
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedInsights(article.slug);
  const isUpcoming = article.status === "upcoming";
  const isDraft = article.status === "draft";

  // Schema.org structured data (Article / BlogPosting + BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    url: `https://inflixt.com/insights/${article.slug}`,
    datePublished: article.publishedDate || "2026-03-15",
    dateModified: article.updatedDate || article.publishedDate || "2026-03-15",
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: `${companyData.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: companyData.legalName,
      url: companyData.url,
      logo: {
        "@type": "ImageObject",
        url: `${companyData.url}/brand/inflixt-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://inflixt.com/insights/${article.slug}`,
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
          name: "Insights",
          item: "https://inflixt.com/insights",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: `https://inflixt.com/insights/${article.slug}`,
        },
      ],
    },
  };

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#8B2CFF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-purple" />

      <Container>
        <ScrollReveal>
          {/* Main 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left/Prose Content Column */}
            <article className="lg:col-span-8">
              <ArticleHeader article={article} />

              {/* Status Notice if Draft */}
              {isDraft && (
                <div className="my-6 p-4 rounded-xl bg-[#8B2CFF]/10 border border-[#8B2CFF]/30 text-xs font-mono text-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B2CFF] animate-pulse" />
                    <span>EDITORIAL DRAFT — IN REVIEW (ROBOTS: NOINDEX)</span>
                  </div>
                  <span className="text-[#9290A3] hidden sm:inline">Inflixt SEO Content Program</span>
                </div>
              )}

              {/* Status Notice if Upcoming */}
              {isUpcoming && (
                <div className="my-8 p-6 sm:p-8 rounded-2xl bg-[#080512] border border-white/10 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Editorial Status: In Technical Review</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Upcoming Architectural Perspective
                  </h2>
                  <p className="text-sm text-[#9290A3] leading-relaxed mb-6">
                    This perspective is currently undergoing engineering review and code benchmarking. The complete technical analysis, verified code snippets, and production trade-offs will be released in the upcoming editorial cycle.
                  </p>

                  {/* Planned Architectural Topics */}
                  {article.tableOfContents && article.tableOfContents.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs font-mono text-[#9290A3] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileCode2 className="w-3.5 h-3.5 text-[#00F5FF]" />
                        <span>Planned Architectural Scope</span>
                      </div>
                      <div className="space-y-2.5">
                        {article.tableOfContents.map((item) => (
                          <div
                            key={item.id}
                            className="text-xs sm:text-sm text-[#E7E5EE] flex items-start gap-2.5"
                          >
                            <span className="text-[#00F5FF] font-mono shrink-0">→</span>
                            <span>{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Render Blocks if present */}
              {article.blocks && article.blocks.length > 0 && (
                <ArticleContentRenderer blocks={article.blocks} />
              )}

              {/* Contextual Service Bridge */}
              <ArticleServiceBridge
                alignedService={article.alignedService}
                projectReference={article.projectReference}
              />

              {/* Bottom Navigation */}
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/insights"
                  className="text-xs sm:text-sm font-mono text-[#9290A3] hover:text-[#00F5FF] transition-colors inline-flex items-center gap-2 group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to All Perspectives</span>
                </Link>

                <Link
                  href="/contact"
                  className="text-xs sm:text-sm font-mono text-[#00F5FF] hover:underline"
                >
                  Discuss This Architecture →
                </Link>
              </div>
            </article>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <ArticleSidebar article={article} />
            </div>
          </div>
        </ScrollReveal>

        {/* Related Insights Grid */}
        {relatedArticles.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/10">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-1">
                    Keep Reading
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Related Engineering Perspectives
                  </h2>
                </div>
                <Link
                  href="/insights"
                  className="text-xs font-mono text-[#9290A3] hover:text-[#00F5FF] transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((rel) => (
                  <InsightCard key={rel.id} article={rel} />
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Final Consultation Prompt */}
        <section className="mt-20">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#080512] border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Have Questions on This Architecture?
                </h2>
                <p className="text-sm sm:text-base text-[#9290A3] mb-8 leading-relaxed">
                  We build production software with these exact frameworks. Let&apos;s evaluate your technical specifications and build a product that scales.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button href="/contact" size="md" variant="primary">
                    Start a Technical Discussion
                  </Button>
                  <Button href="/services" size="md" variant="secondary">
                    View Our Services
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}
