import { ArrowDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GridPattern } from "@/components/ui/GridPattern";
import { companyData } from "@/data/company";

export function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 sm:pb-28 overflow-hidden">
      {/* Background Digital Grid & Ambient Glows */}
      <GridPattern hasPerspective={true} />

      {/* Decorative Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 opacity-25"
          viewBox="0 0 1000 300"
          fill="none"
        >
          <path
            d="M 50 200 L 220 200 L 320 100 L 680 100 L 780 200 L 950 200"
            stroke="url(#aboutHeroCircuit)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle cx="320" cy="100" r="3.5" fill="#00F5FF" />
          <circle cx="680" cy="100" r="3.5" fill="#8B2CFF" />
          <defs>
            <linearGradient id="aboutHeroCircuit" x1="0%" y1="0%" x2="100%" y2="0%">
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
              ABOUT INFLIXT // COMPANY PROFILE
            </Badge>
          </div>

          {/* Primary Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 sm:mb-8 animate-hero-title">
            WE ARE{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#E7E5EE] to-[#00F5FF] drop-shadow-[0_0_30px_rgba(0,245,255,0.3)]">
              INFLIXT.
            </span>
          </h1>

          {/* Core Brand Positioning */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white max-w-3xl leading-snug mb-4 animate-hero-desc">
            {companyData.corePositioning}
          </p>

          {/* Supporting Manifesto Context */}
          <p className="text-base sm:text-lg text-[#9290A3] max-w-2xl leading-relaxed mb-10 sm:mb-12 animate-hero-desc">
            {companyData.supportingPositioning}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-hero-cta">
            <Button
              href="#founder"
              variant="primary"
              size="lg"
              icon={<ArrowDown className="w-4 h-4" />}
            >
              Meet Our Leadership
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Conversation
            </Button>
          </div>

          {/* Technical Telemetry Bar */}
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 border-t border-white/10 text-left animate-hero-tags">
            <div className="p-4 rounded-xl bg-[#080512]/80 border border-white/5">
              <span className="block text-[10px] font-mono text-[#9290A3] uppercase tracking-wider mb-1">
                Legal Entity
              </span>
              <span className="text-xs font-mono font-medium text-white block truncate">
                {companyData.legalName}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080512]/80 border border-white/5">
              <span className="block text-[10px] font-mono text-[#9290A3] uppercase tracking-wider mb-1">
                Geographic Hub
              </span>
              <span className="text-xs font-mono font-medium text-[#00F5FF] block">
                {companyData.location} (UTC +05:30)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080512]/80 border border-white/5">
              <span className="block text-[10px] font-mono text-[#9290A3] uppercase tracking-wider mb-1">
                Delivery Scope
              </span>
              <span className="text-xs font-mono font-medium text-white block">
                Worldwide / Borderless
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080512]/80 border border-white/5">
              <span className="block text-[10px] font-mono text-[#9290A3] uppercase tracking-wider mb-1">
                Brand Ethos
              </span>
              <span className="text-xs font-mono font-medium text-[#B026FF] block truncate">
                {companyData.tagline}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
