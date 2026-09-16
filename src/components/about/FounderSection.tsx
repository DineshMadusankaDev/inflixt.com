import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyData } from "@/data/company";
import { Mail, MapPin, Terminal } from "lucide-react";

export function FounderSection() {
  return (
    <section id="founder" className="py-24 sm:py-32 relative scroll-mt-24 overflow-hidden bg-[#080512] border-y border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#8B2CFF]/8 rounded-full blur-[160px] pointer-events-none animate-ambient-purple" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Large Editorial Portrait */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative framing with subtle neon aura */}
              <div className="relative rounded-3xl p-2 bg-[#0B0717] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group transition-all duration-300 hover:border-[#00F5FF]/30 hover:shadow-[0_0_35px_rgba(0,245,255,0.15)]">
                {/* Ambient glow edge */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#00F5FF]/20 via-transparent to-[#8B2CFF]/20 opacity-40 pointer-events-none" />

                {/* Aspect Ratio Container (4:5 Editorial Portrait) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#05030D]">
                  <Image
                    src="/images/about/founder-dinesh.webp"
                    alt="Dinesh, Founder of Inflixt Global"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    priority={false}
                  />

                  {/* Subtle vignette gradient overlay at bottom for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05030D]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Corner technical indicators */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                      INFLIXT // LEADERSHIP
                    </span>
                  </div>

                  {/* Bottom portrait telemetry bar */}
                  <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-[11px] font-mono text-[#9290A3] bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl">
                    <span className="text-white font-medium">Dinesh Madhusankha</span>
                    <span className="text-[#00F5FF]">Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Founder Vision & Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal direction="up">
              <Badge variant="cyan" hasBeacon={true} className="mb-4">
                THE PERSON BEHIND INFLIXT
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2">
                Dinesh
              </h2>

              <p className="text-sm sm:text-base font-mono text-[#00F5FF] uppercase tracking-wider mb-6">
                {companyData.founder.title}
              </p>

              {/* Personal / Engineering Philosophy */}
              <div className="space-y-4 text-base sm:text-lg text-[#E7E5EE] leading-relaxed mb-8">
                <p>
                  Inflixt was founded with a singular conviction: ambitious businesses deserve digital software built with uncompromising architectural rigor, high-fidelity design, and genuine engineering discipline.
                </p>
                <p className="text-[#9290A3] text-base leading-relaxed">
                  Too often, the market forces growing companies into a compromise between sluggish generic templates, bloated codebases, and vendors that treat software as disposable. We approach engineering from the ground up—combining strict type safety, modern interface design, and practical artificial intelligence into durable platforms built to scale.
                </p>
              </div>

              {/* Editorial Quote Card */}
              <div className="p-6 rounded-2xl bg-[#0B0717] border border-white/10 relative overflow-hidden mb-8 group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00F5FF] to-[#8B2CFF]" />
                <p className="italic text-sm sm:text-base text-white/90 leading-relaxed pl-3 font-normal">
                  &ldquo;Software is not merely lines of code; it is the enduring digital infrastructure of modern commerce. When design, performance, and practical intelligence converge, businesses gain an undeniable unfair advantage.&rdquo;
                </p>
                <div className="mt-3 pl-3 text-xs font-mono text-[#9290A3]">
                  — Dinesh, Founder of Inflixt Global
                </div>
              </div>

              {/* Metadata Badges & Direct Channel */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#E7E5EE]">
                  <MapPin className="w-3.5 h-3.5 text-[#00F5FF]" />
                  <span>Base: Colombo, Sri Lanka</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#E7E5EE]">
                  <Terminal className="w-3.5 h-3.5 text-[#8B2CFF]" />
                  <span>Core: Digital Engineering & AI</span>
                </div>

                <a
                  href={`mailto:${companyData.founder.email}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/20 hover:border-[#00F5FF] transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct: {companyData.founder.email}</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
