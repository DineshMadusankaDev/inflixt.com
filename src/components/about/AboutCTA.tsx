import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyData } from "@/data/company";

export function AboutCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#080512] border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#00F5FF]/10 to-[#8B2CFF]/15 blur-[160px] pointer-events-none" />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <Badge variant="cyan" hasBeacon={true} size="md" className="mb-6">
              START YOUR PROJECT
            </Badge>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ready to Build{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F5FF] via-white to-[#8B2CFF]">
                What&apos;s Next?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#9290A3] max-w-2xl leading-relaxed mb-10">
              Whether you need a full-scale web platform, cross-platform mobile application, or bespoke AI software system, we are ready to discuss your requirements.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Button
                href="/contact"
                size="lg"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project Inquiry
              </Button>
              <Button
                href="/work"
                size="lg"
                variant="secondary"
              >
                Explore Case Studies
              </Button>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#9290A3] pt-4">
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
        </ScrollReveal>
      </Container>
    </section>
  );
}
