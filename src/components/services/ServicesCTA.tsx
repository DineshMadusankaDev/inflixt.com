import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, Mail } from "lucide-react";
import { companyData } from "@/data/company";

export function ServicesCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background dual neon ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#00F5FF]/10 via-[#8B2CFF]/15 to-[#00F5FF]/10 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan"
        aria-hidden="true"
      />

      <Container>
        <ScrollReveal>
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0B0717] via-[#080512] to-[#05030D] border border-white/15 p-8 sm:p-14 md:p-20 text-center overflow-hidden shadow-2xl">
            {/* Top laser glow sweep */}
            <div
              className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-70 animate-laser-sweep"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B2CFF] to-transparent opacity-70"
              aria-hidden="true"
            />

            <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3.5 py-1 rounded-full mb-6">
                NEXT STEPS
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                READY TO BUILD{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00F5FF] to-[#8B2CFF]">
                  WHAT&apos;S NEXT?
                </span>
              </h2>

              <p className="text-base sm:text-xl text-[#9290A3] max-w-xl mb-10 leading-relaxed">
                Let&apos;s turn your requirements into modern, scalable software built for real business impact.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
                <Button
                  href="/contact"
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  START A PROJECT
                </Button>
              </div>

              {/* Direct Inquiries Channel */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Mail className="w-3.5 h-3.5 text-[#00F5FF]" />
                <span>Direct inquiries:</span>
                <a
                  href={`mailto:${companyData.contactEmail}`}
                  className="text-white hover:text-[#00F5FF] underline transition-colors"
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
