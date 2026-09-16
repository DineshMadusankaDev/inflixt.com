import { Container } from "@/components/ui/Container";

export function ServicesCapabilityStrip() {
  const capabilities = [
    "WEB DEVELOPMENT",
    "E-COMMERCE",
    "MOBILE",
    "CUSTOM SOFTWARE",
    "AI & AUTOMATION",
    "SEO & GROWTH",
  ];

  return (
    <section className="border-y border-white/10 bg-[#080512]/90 relative z-20 py-4 sm:py-5 overflow-hidden">
      <Container>
        <div className="flex items-center justify-between flex-wrap gap-y-3 gap-x-6 text-xs sm:text-sm font-mono tracking-wider text-[#9290A3]">
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
      </Container>
    </section>
  );
}
