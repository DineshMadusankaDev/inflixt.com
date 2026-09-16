import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesCapabilityStrip } from "@/components/services/ServicesCapabilityStrip";
import { ServicesShowcase } from "@/components/services/ServicesShowcase";
import { ServicesTechStack } from "@/components/services/ServicesTechStack";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesCTA } from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services & Engineering Capabilities | Inflixt",
  description:
    "Explore Inflixt's full suite of digital engineering solutions: AI-powered web platforms, cross-platform mobile apps, custom software, AI automation, e-commerce, and technical SEO.",
  alternates: {
    canonical: "https://inflixt.com/services",
  },
  openGraph: {
    title: "Services & Engineering Capabilities | Inflixt",
    description:
      "Explore Inflixt's full suite of digital engineering solutions: AI-powered web platforms, cross-platform mobile apps, custom software, AI automation, e-commerce, and technical SEO.",
    url: "https://inflixt.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Engineering Capabilities | Inflixt",
    description:
      "Explore Inflixt's full suite of digital engineering solutions: AI-powered web platforms, cross-platform mobile apps, custom software, AI automation, e-commerce, and technical SEO.",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* 01. Services Hero */}
      <ServicesHero />

      {/* 02. Capability Strip */}
      <ServicesCapabilityStrip />

      {/* 03. What We Build — The Six Pillars */}
      <ServicesShowcase />

      {/* 04. Technology That Powers The Work */}
      <ServicesTechStack />

      {/* 05. How We Work — Process */}
      <ServicesProcess />

      {/* 06. Final CTA */}
      <ServicesCTA />
    </>
  );
}
