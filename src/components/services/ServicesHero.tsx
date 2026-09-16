import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GridPattern } from "@/components/ui/GridPattern";

export function ServicesHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Digital Grid & Atmospheric Glows */}
      <GridPattern hasPerspective={true} />

      {/* Decorative vector circuit path */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 opacity-20"
          viewBox="0 0 1000 300"
          fill="none"
        >
          <path
            d="M 50 150 L 250 150 L 350 80 L 650 80 L 750 150 L 950 150"
            stroke="url(#servicesCircuit)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle cx="350" cy="80" r="3.5" fill="#00F5FF" />
          <circle cx="650" cy="80" r="3.5" fill="#8B2CFF" />
          <defs>
            <linearGradient id="servicesCircuit" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00F5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B2CFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Section Indicator Badge */}
          <div className="mb-6 sm:mb-8 animate-hero-badge">
            <Badge variant="cyan" hasBeacon={true} size="md">
              SERVICES & CAPABILITIES
            </Badge>
          </div>

          {/* Primary Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 sm:mb-8 animate-hero-title">
            WE BUILD{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#E7E5EE] to-[#00F5FF] drop-shadow-[0_0_25px_rgba(0,245,255,0.25)]">
              DIGITAL SYSTEMS.
            </span>
          </h1>

          {/* Factual Positioning Copy (Neutral & Grounded) */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#9290A3] max-w-2xl leading-relaxed font-normal mb-10 sm:mb-12 animate-hero-desc">
            AI-powered websites, cross-platform mobile apps, custom software and intelligent automation solutions built around real business needs.
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
              href="#what-we-build"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explore Services ↓
            </Button>
          </div>

          {/* Core Discipline Overview Anchor Tags */}
          <div className="mt-16 pt-8 border-t border-white/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-2xl text-xs font-mono text-[#9290A3] animate-hero-tags">
            <div className="flex flex-col gap-1">
              <span className="text-[#00F5FF] font-semibold">WEB ARCHITECTURE</span>
              <span>Next.js · Headless · APIs</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#8B2CFF] font-semibold">CROSS-PLATFORM</span>
              <span>Flutter · iOS · Android</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold">INTELLIGENCE</span>
              <span>Gemini AI · Automation</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
