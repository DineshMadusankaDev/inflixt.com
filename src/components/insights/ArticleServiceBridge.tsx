import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Layers, ExternalLink, Sparkles } from "lucide-react";

interface ArticleServiceBridgeProps {
  alignedService?: {
    id: string;
    title: string;
    href: string;
    description: string;
  };
  projectReference?: {
    title: string;
    slug: string;
    href: string;
    summary: string;
  };
}

export function ArticleServiceBridge({
  alignedService,
  projectReference,
}: ArticleServiceBridgeProps) {
  if (!alignedService && !projectReference) return null;

  return (
    <div className="my-12 rounded-3xl bg-[#080512] border border-white/10 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
      {/* Ambient background glows */}
      <div className="absolute inset-0 digital-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B2CFF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineering Practice & Capabilities</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
          Translating Architecture Into Production
        </h3>

        <p className="text-sm sm:text-base text-[#9290A3] leading-relaxed mb-8 max-w-2xl">
          At Inflixt, our perspectives reflect our day-to-day engineering execution. We design, build, and maintain digital platforms and custom systems for growing businesses worldwide.
        </p>

        <div
          className={`grid grid-cols-1 ${
            alignedService && projectReference ? "md:grid-cols-2" : "max-w-xl"
          } gap-6 mb-8`}
        >
          {alignedService && (
            <div className="p-6 rounded-2xl bg-[#0B0717] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-2">
                  Aligned Studio Capability
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {alignedService.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#9290A3] leading-relaxed mb-4">
                  {alignedService.description}
                </p>
              </div>
              <div>
                <Link
                  href={alignedService.href}
                  className="text-xs font-mono text-[#00F5FF] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Explore Service Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {projectReference && (
            <div className="p-6 rounded-2xl bg-[#0B0717] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#8B2CFF] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  <span>Verified Case Study</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {projectReference.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#9290A3] leading-relaxed mb-4">
                  {projectReference.summary}
                </p>
              </div>
              <div>
                <Link
                  href={projectReference.href}
                  className="text-xs font-mono text-white hover:text-[#00F5FF] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Read Verified Case Study</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#9290A3]">
            Need similar architectural execution for your product?
          </span>
          <Button
            href="/contact"
            size="sm"
            variant="primary"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Start a Project Inquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
