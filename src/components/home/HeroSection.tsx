import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LivingSystemBackground } from "./LivingSystemBackground";
import { LivingProductCanvas } from "./LivingProductCanvas";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 sm:pb-24 overflow-hidden">
      {/* Living Digital Engineering System Background */}
      <LivingSystemBackground />

      <Container className="relative z-10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Timeless Project Availability Badge */}
          <div className="mb-6 sm:mb-8 animate-hero-badge">
            <Badge variant="cyan" hasBeacon={true} size="md">
              CURRENTLY ACCEPTING NEW PROJECTS
            </Badge>
          </div>

          {/* Primary Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 sm:mb-8 animate-hero-title">
            WE BUILD{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#E7E5EE] to-[#00F5FF] drop-shadow-[0_0_25px_rgba(0,245,255,0.25)]">
              WHAT&apos;S NEXT.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#9290A3] max-w-2xl leading-relaxed font-normal mb-10 sm:mb-12 animate-hero-desc">
            AI-powered websites, applications and digital solutions built to help
            ambitious businesses grow, scale and lead in a digital-first world.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-hero-cta">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Project
            </Button>
            <Button
              href="/work"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explore Our Work
            </Button>
          </div>

          {/* Primary Major Visual Anchor: Living Product Command Canvas */}
          <LivingProductCanvas />

          {/* Subdued Bottom Anchor Capability Tags */}
          <div className="mt-14 pt-8 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-3 gap-6 text-left max-w-2xl text-xs font-mono text-[#9290A3] animate-hero-tags">
            <div className="flex flex-col gap-1">
              <span className="text-[#00F5FF] font-semibold">ENGINEERING</span>
              <span>Next.js · Flutter · APIs</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#8B2CFF] font-semibold">INTELLIGENCE</span>
              <span>Gemini · AI Workflows</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
              <span className="text-white font-semibold">DELIVERY</span>
              <span>Sri Lanka → Worldwide</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
