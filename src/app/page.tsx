import { HeroSection } from "@/components/home/HeroSection";
import { CapabilityStrip } from "@/components/home/CapabilityStrip";
import { ServicesMatrix } from "@/components/home/ServicesMatrix";
import { WhyInflixt } from "@/components/home/WhyInflixt";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { TechEcosystem } from "@/components/home/TechEcosystem";
import { ProcessSection } from "@/components/home/ProcessSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* 02. Hero Section */}
      <HeroSection />

      {/* 03. Capability Strip */}
      <CapabilityStrip />

      {/* 04. What We Build (Services Matrix) */}
      <ServicesMatrix />

      {/* 05. Why Inflixt */}
      <WhyInflixt />

      {/* 06. Featured Work */}
      <FeaturedWork />

      {/* 07. Technology Ecosystem */}
      <TechEcosystem />

      {/* 08. Our Process */}
      <ProcessSection />

      {/* 09. About Inflixt */}
      <AboutSection />

      {/* 10. Final CTA */}
      <FinalCTA />
    </>
  );
}
