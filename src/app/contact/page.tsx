import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { BrandMoment } from "@/components/contact/BrandMoment";
import { ContactClosingCTA } from "@/components/contact/ContactClosingCTA";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Start a Project | Contact Inflixt",
  description:
    "Get in touch with Inflixt to discuss your web, mobile, custom software, or AI automation project.",
  alternates: {
    canonical: "https://inflixt.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      {/* 01. Hero Section */}
      <ContactHero />

      {/* 02. Project Inquiry Area (Two-Column Desktop Layout) */}
      <section id="inquiry-form" className="py-8 sm:py-12 scroll-mt-24 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" distance={16}>
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Right Column: Direct Info & 3-Step Process */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="up" distance={16} delay={80}>
                <ContactSidebar />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 03. Digital Visual / Brand Moment */}
      <ScrollReveal direction="up" distance={20} delay={100}>
        <BrandMoment />
      </ScrollReveal>

      {/* 04. Final Closing Statement CTA */}
      <ScrollReveal direction="up" distance={20} delay={120}>
        <ContactClosingCTA />
      </ScrollReveal>
    </div>
  );
}
