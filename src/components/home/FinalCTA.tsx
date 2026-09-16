import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, Mail } from "lucide-react";
import { companyData } from "@/data/company";

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background dual neon glow with slow ambient drift */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#00F5FF]/15 via-[#8B2CFF]/20 to-[#00F5FF]/15 rounded-full blur-[160px] pointer-events-none animate-ambient-cyan" />
      
      {/* Distant focal radial glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00F5FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <ScrollReveal>
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0C071C] via-[#080414] to-[#04020B] border border-white/15 p-8 sm:p-14 md:p-20 text-center overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] group">
            {/* Perspective runway grid floor at bottom */}
            <div 
              className="absolute inset-x-0 bottom-0 h-48 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 245, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 245, 255, 0.15) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
                transform: "perspective(400px) rotateX(65deg)",
                transformOrigin: "bottom center",
                maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
              }}
            />

            {/* Subtle internal digital grid texture */}
            <div className="absolute inset-0 digital-grid-bg opacity-20 pointer-events-none" />

            {/* Top and bottom laser glow lines */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-80 animate-laser-sweep" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B2CFF] to-transparent opacity-70" />

            {/* Technical HUD Corner Brackets */}
            <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00F5FF]/40 tracking-widest pointer-events-none select-none hidden sm:block">
              ┌ SYS // DESTINATION
            </div>
            <div className="absolute top-3 right-3 font-mono text-[9px] text-[#8B2CFF]/50 tracking-widest pointer-events-none select-none hidden sm:block">
              DEPLOYMENT // READY ┐
            </div>
            <div className="absolute bottom-3 left-3 font-mono text-[9px] text-white/20 tracking-widest pointer-events-none select-none hidden sm:block">
              └ NETWORK // GLOBAL EDGE
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#00F5FF]/30 tracking-widest pointer-events-none select-none hidden sm:block">
              DEPLOY // VERIFIED ┘
            </div>

            <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3.5 py-1 rounded-full mb-6 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-ping" />
                NEXT STEPS
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                READY TO BUILD{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00F5FF] to-[#8B2CFF]">
                  WHAT&apos;S NEXT?
                </span>
              </h2>

              <p className="text-base sm:text-xl text-[#9290A3] max-w-xl mb-10 leading-relaxed font-normal">
                Let&apos;s turn your idea into a digital product that makes an impact.
              </p>

              {/* Action Button Container with Subtle Halo */}
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/30 to-[#8B2CFF]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Button
                  href="/contact"
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto relative shadow-[0_0_25px_rgba(0,245,255,0.25)] hover:shadow-[0_0_35px_rgba(0,245,255,0.4)] transition-all duration-300"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  START A PROJECT
                </Button>
              </div>

              {/* Direct Email Channel */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 hover:border-[#00F5FF]/40 hover:text-white hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] px-4 py-2 rounded-full transition-all duration-200">
                <Mail className="w-3.5 h-3.5 text-[#00F5FF]" />
                <span>Direct inquiries:</span>
                <a
                  href={`mailto:${companyData.contactEmail}`}
                  className="text-white hover:text-[#00F5FF] underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00F5FF] rounded"
                >
                  {companyData.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
