import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquareCode } from "lucide-react";

export function InsightsCTA() {
  return (
    <section className="text-center max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#080512] border border-white/10 relative overflow-hidden shadow-2xl mb-12">
      {/* Background accents */}
      <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00F5FF]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] mx-auto mb-5">
          <MessageSquareCode className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
          Facing an Architectural Decision?
        </h2>

        <p className="text-sm sm:text-base text-[#9290A3] mb-8 leading-relaxed max-w-xl mx-auto">
          Whether you are evaluating Next.js, integrating structured AI workflows, or deciding on a cross-platform mobile architecture, our engineering team can help.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="/contact"
            size="md"
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Start a Technical Discussion
          </Button>
          <Button href="/services" size="md" variant="secondary">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
