import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyData } from "@/data/company";
import { Globe, MapPin, Radio } from "lucide-react";

export function GlobalPositioning() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#080512] border-y border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#8B2CFF]/8 rounded-full blur-[160px] pointer-events-none animate-ambient-purple" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Thesis & Statement */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <Badge variant="cyan" hasBeacon={true} className="mb-4">
                GLOBAL PERSPECTIVE
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Based in Sri Lanka.
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F5FF] via-white to-[#8B2CFF]">
                  Building for the World.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#E7E5EE] leading-relaxed mb-6">
                {companyData.supportingPositioning}
              </p>

              <p className="text-sm text-[#9290A3] leading-relaxed mb-8">
                From our engineering base in Sri Lanka, we build digital solutions for forward-thinking businesses across international markets. Modern software engineering knows no borders—our delivery workflow is designed for seamless asynchronous collaboration, institutional repository standards, and global edge deployments.
              </p>

              {/* Geographic Telemetry Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0B0717] border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>ENGINEERING HUB</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Colombo, Sri Lanka
                  </div>
                  <div className="text-xs font-mono text-[#9290A3] mt-0.5">
                    Timezone: UTC +05:30
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0717] border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8B2CFF] mb-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>DELIVERY REACH</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Global Clients
                  </div>
                  <div className="text-xs font-mono text-[#9290A3] mt-0.5">
                    Edge Infrastructure
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Global Schematic Graphic */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <div className="relative rounded-3xl bg-[#0B0717] border border-white/10 p-8 sm:p-10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                {/* Background micro grid */}
                <div className="absolute inset-0 digital-grid-bg opacity-40 pointer-events-none" />

                {/* Vector Connection Graphic */}
                <div className="relative z-10 flex flex-col items-center justify-center py-8">
                  {/* Top: Global Digital Node */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white mb-3 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                      <Globe className="w-8 h-8 text-[#00F5FF]" />
                    </div>
                    <span className="text-xs font-mono text-white font-semibold uppercase tracking-wider">
                      Global Digital Products
                    </span>
                    <span className="text-[11px] font-mono text-[#9290A3]">
                      Next.js · Flutter · Cloud AI · API Infrastructure
                    </span>
                  </div>

                  {/* Pulsing Connector Lines */}
                  <div className="my-6 flex flex-col items-center">
                    <div className="w-px h-12 bg-gradient-to-b from-[#00F5FF] via-white to-[#8B2CFF] relative">
                      <span className="w-2 h-2 rounded-full bg-[#00F5FF] absolute -top-1 -left-[3px] animate-beacon" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#E7E5EE] my-1">
                      <Radio className="w-3 h-3 text-[#00F5FF] animate-pulse" />
                      SYNCHRONIZED ENGINEERING PIPELINE
                    </span>
                    <div className="w-px h-12 bg-gradient-to-b from-[#8B2CFF] via-white to-[#00F5FF] relative">
                      <span className="w-2 h-2 rounded-full bg-[#8B2CFF] absolute -bottom-1 -left-[3px] animate-beacon" />
                    </div>
                  </div>

                  {/* Bottom: Sri Lanka Hub */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] mb-3 shadow-[0_0_25px_rgba(0,245,255,0.25)]">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono text-white font-semibold uppercase tracking-wider">
                      Inflixt Global Headquarters
                    </span>
                    <span className="text-[11px] font-mono text-[#00F5FF]">
                      Sri Lanka · Dedicated Core Team
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
