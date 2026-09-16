import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#00F5FF]/6 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-[#8B2CFF]/8 rounded-full blur-[140px] pointer-events-none animate-ambient-purple" />

      {/* Perspective Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-40"
      >
        <div className="absolute inset-0 digital-grid-bg perspective-grid h-[150%] w-[120%] -left-[10%]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Badge variant="cyan" hasBeacon className="mb-6 animate-hero-badge">
            START A PROJECT
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6 animate-hero-title">
            LET&apos;S BUILD{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00F5FF] to-[#8B2CFF] drop-shadow-[0_0_30px_rgba(0,245,255,0.25)]">
              WHAT&apos;S NEXT.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#9290A3] max-w-2xl leading-relaxed animate-hero-desc">
            Tell us what you&apos;re building, what problem you&apos;re solving, and where you want to go.
          </p>

          {/* Architectural Coordinate Accent Line */}
          <div className="mt-8 flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-[#9290A3]/70">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00F5FF]/50" />
            <span>INFLIXT // PROJECT INITIATION</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#8B2CFF]/50" />
          </div>
        </div>
      </Container>
    </section>
  );
}
