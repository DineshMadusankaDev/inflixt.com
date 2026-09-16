import { Container } from "@/components/ui/Container";

export function CapabilityStrip() {
  const capabilities = [
    "WEB DEVELOPMENT",
    "MOBILE",
    "SOFTWARE",
    "AI",
    "AUTOMATION",
    "SEO"
  ];

  return (
    <section className="border-y border-white/10 bg-[#080512]/80 backdrop-blur-md relative z-20 py-4 sm:py-5 overflow-hidden">
      {/* Moving Signal Trace on border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent animate-laser-sweep" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B2CFF]/30 to-transparent" />

      <Container>
        <div className="flex items-center justify-between flex-wrap gap-y-3 gap-x-6 text-xs sm:text-sm font-mono tracking-wider text-[#9290A3]">
          {/* Subtle System Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-white/10 text-[11px] text-[#00F5FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
            <span className="text-[#E7E5EE]/90">SYS // ARCHITECTURE</span>
          </div>

          <div className="flex items-center justify-between flex-1 flex-wrap gap-y-3 gap-x-6">
            {capabilities.map((item, idx) => (
              <div key={item} className="flex items-center gap-4 group">
                <span className="text-white/90 group-hover:text-[#00F5FF] transition-colors duration-200 font-medium">
                  {item}
                </span>
                {idx < capabilities.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]/40 hidden sm:inline-block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
