import Link from "next/link";
import Image from "next/image";
import { InsightArticle } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight, Layers, Sparkles } from "lucide-react";

interface FeaturedInsightProps {
  article: InsightArticle;
}

export function FeaturedInsight({ article }: FeaturedInsightProps) {
  return (
    <div className="relative group rounded-3xl bg-[#0B0717] border border-white/15 p-8 sm:p-10 lg:p-12 hover:border-[#00F5FF]/40 transition-all duration-300 shadow-2xl overflow-hidden mb-16">
      {/* Subtle digital grid pattern & ambient glow */}
      <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00F5FF]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#00F5FF]/15 transition-all duration-500" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Col: Editorial Metadata & Headlines */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider flex items-center gap-1.5 bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                Featured Perspective
              </span>
              <Badge variant="purple" size="sm">
                {article.topic}
              </Badge>
              {article.status === "upcoming" ? (
                <span className="text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  Upcoming Perspective
                </span>
              ) : (
                <span className="text-xs font-mono text-[#9290A3]">
                  {article.publishedDate}
                </span>
              )}
              <span className="text-xs font-mono text-[#9290A3] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <Link href={`/insights/${article.slug}`} className="block group/link">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug group-hover/link:text-[#00F5FF] transition-colors">
                {article.title}
              </h2>
            </Link>

            {article.subtitle && (
              <p className="text-sm sm:text-base font-mono text-[#00F5FF] mb-4">
                {article.subtitle}
              </p>
            )}

            <p className="text-sm sm:text-base text-[#9290A3] leading-relaxed mb-6 max-w-3xl">
              {article.summary}
            </p>
          </div>

          {/* Author & Action */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {article.author.avatar && (
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-white/5">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-xs sm:text-sm font-medium text-white">
                  {article.author.name}
                </div>
                <div className="text-[11px] font-mono text-[#9290A3]">
                  {article.author.role}
                </div>
              </div>
            </div>

            <Link
              href={`/insights/${article.slug}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white group-hover:text-[#00F5FF] transition-colors"
            >
              <span>Read Architecture Perspective</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#00F5FF]" />
            </Link>
          </div>
        </div>

        {/* Right Col: Scope Highlights / Architecture Preview */}
        <div className="lg:col-span-4 rounded-2xl bg-[#080512] border border-white/10 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Scope</span>
            </div>

            <div className="space-y-3 mb-6">
              {article.tableOfContents && article.tableOfContents.length > 0 ? (
                article.tableOfContents.map((item) => (
                  <div
                    key={item.id}
                    className="text-xs text-[#E7E5EE] flex items-start gap-2 py-1.5 border-b border-white/5 last:border-0"
                  >
                    <span className="text-[#00F5FF] font-mono shrink-0">→</span>
                    <span>{item.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#9290A3]">
                  Comprehensive production analysis and verified code architecture.
                </p>
              )}
            </div>
          </div>

          {article.alignedService && (
            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] font-mono text-[#9290A3] mb-1">
                Aligned Engineering Service:
              </div>
              <Link
                href={article.alignedService.href}
                className="text-xs text-[#00F5FF] hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>{article.alignedService.title}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
