import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getAllInsights, getFeaturedInsight } from "@/data/insights";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { FeaturedInsight } from "@/components/insights/FeaturedInsight";
import { InsightsFeed } from "@/components/insights/InsightsFeed";
import { WhyWeWrite } from "@/components/insights/WhyWeWrite";
import { InsightsCTA } from "@/components/insights/InsightsCTA";

export const metadata: Metadata = {
  title: "Engineering Insights & Architecture Perspectives",
  description:
    "Engineering perspectives, architectural trade-offs, and practical AI notes from the Inflixt team. An engineering studio that publishes what it learns.",
  alternates: {
    canonical: "https://inflixt.com/insights",
  },
  openGraph: {
    title: "Engineering Insights & Architecture Perspectives | Inflixt",
    description:
      "Engineering perspectives, architectural trade-offs, and practical AI notes from the Inflixt team. An engineering studio that publishes what it learns.",
    url: "https://inflixt.com/insights",
    type: "website",
    siteName: "Inflixt",
    images: [
      {
        url: "/brand/inflixt-logo.png",
        width: 776,
        height: 311,
        alt: "Inflixt Engineering Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Insights & Architecture Perspectives | Inflixt",
    description:
      "Engineering perspectives, architectural trade-offs, and practical AI notes from the Inflixt team.",
    images: ["/brand/inflixt-logo.png"],
  },
};

export default function InsightsPage() {
  const articles = getAllInsights();
  const featuredArticle = getFeaturedInsight();

  // Schema.org CollectionPage + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Inflixt Engineering Insights & Perspectives",
    description:
      "Engineering perspectives, architectural trade-offs, and practical AI notes from the Inflixt team.",
    url: "https://inflixt.com/insights",
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
          name: "Insights",
          item: "https://inflixt.com/insights",
        },
      ],
    },
  };

  return (
    <div className="relative min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01. Hero Section */}
      <InsightsHero />

      <Container>
        {/* 02. Featured Editorial Perspective */}
        {featuredArticle && (
          <ScrollReveal>
            <FeaturedInsight article={featuredArticle} />
          </ScrollReveal>
        )}

        {/* 03 & 04. Topic Filter & Latest Insights Feed */}
        <ScrollReveal>
          <InsightsFeed articles={articles} />
        </ScrollReveal>

        {/* 05. Why We Write: Editorial Manifesto */}
        <WhyWeWrite />

        {/* 06. Bottom Inquiries CTA */}
        <ScrollReveal>
          <InsightsCTA />
        </ScrollReveal>
      </Container>
    </div>
  );
}
