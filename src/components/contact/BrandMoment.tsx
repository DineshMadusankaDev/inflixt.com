import { Container } from "@/components/ui/Container";

export function BrandMoment() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" aria-hidden="true">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[260px] bg-gradient-to-r from-[#00F5FF]/6 via-[#8B2CFF]/8 to-[#00F5FF]/6 rounded-full blur-[130px] pointer-events-none animate-ambient-cyan" />

      <Container>
        <div className="relative rounded-3xl bg-[#080512] border border-white/10 p-8 sm:p-14 overflow-hidden text-center shadow-xl">
          {/* Subtle Top & Bottom Accent Lines */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B2CFF]/40 to-transparent" />

          {/* Technical Vector Coordinate Graphic (Pure 2D SVG, no 3D/WebGL) */}
          <div className="relative max-w-xl mx-auto flex flex-col items-center">
            {/* Architectural Grid Radar Element */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
              {/* Outer concentric ring */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              {/* Mid concentric ring */}
              <div className="absolute inset-4 rounded-full border border-[#00F5FF]/20 animate-pulse-glow" />
              {/* Inner ring */}
              <div className="absolute inset-10 rounded-full border border-[#8B2CFF]/25" />

              {/* Crosshair coordinate lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

              {/* Center Beacon */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF]/30 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5FF] shadow-[0_0_12px_#00F5FF]" />
              </div>

              {/* Corner tick marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00F5FF]/60" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#00F5FF]/60" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#8B2CFF]/60" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#8B2CFF]/60" />
            </div>

            {/* Signal Labels */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3.5 py-1 rounded-full mb-3">
              INFLIXT // DIGITAL SIGNAL
            </div>

            <p className="text-base sm:text-lg font-medium text-white max-w-md leading-relaxed mb-2">
              Modern digital engineering built with architectural precision.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[#9290A3]">
              <span>SRI LANKA → GLOBAL</span>
              <span className="text-white/20">|</span>
              <span className="text-[#9290A3]/80">07°N 80°E</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
