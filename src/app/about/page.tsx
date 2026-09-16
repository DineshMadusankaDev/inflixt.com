import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderSection } from "@/components/about/FounderSection";
import { CompanyStory } from "@/components/about/CompanyStory";
import { CompanyCredentials } from "@/components/about/CompanyCredentials";
import { OperatingPrinciples } from "@/components/about/OperatingPrinciples";
import { GlobalPositioning } from "@/components/about/GlobalPositioning";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Inflixt Global | Digital Engineering & Company Profile",
  description:
    "Learn about Inflixt Global (PVT) LTD (PV 00347835): our digital engineering ethos, leadership by Founder Dinesh, verified statutory credentials, and modern software solutions.",
  alternates: {
    canonical: "https://inflixt.com/about",
  },
  openGraph: {
    title: "About Inflixt Global | Digital Engineering & Company Profile",
    description:
      "Learn about Inflixt Global (PVT) LTD (PV 00347835): our digital engineering ethos, leadership by Founder Dinesh, verified statutory credentials, and modern software solutions.",
    url: "https://inflixt.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Inflixt Global | Digital Engineering & Company Profile",
    description:
      "Learn about Inflixt Global (PVT) LTD (PV 00347835): our digital engineering ethos, leadership by Founder Dinesh, verified statutory credentials, and modern software solutions.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* 01. Hero Section */}
      <AboutHero />

      {/* 02. Founder Editorial Section */}
      <FounderSection />

      {/* 03. Company Story & Manifesto */}
      <CompanyStory />

      {/* 04. Verified Company Credentials (PV 00347835) */}
      <CompanyCredentials />

      {/* 05. Operating Principles */}
      <OperatingPrinciples />

      {/* 06. Global Positioning (Sri Lanka -> World) */}
      <GlobalPositioning />

      {/* 07. Execution Philosophy (Discover, Design, Develop, Dominate) */}
      <AboutPhilosophy />

      {/* 08. Final Closing CTA */}
      <AboutCTA />
    </>
  );
}
