import Link from "next/link";
import { InsightArticle } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight } from "lucide-react";

interface InsightCardProps {
  article: InsightArticle;
}

export function InsightCard({ article }: InsightCardProps) {
  const isUpcoming = article.status === "upcoming";

  return (
    <article className="rounded-2xl bg-[#0B0717] border border-white/10 hover:border-[#00F5FF]/30 p-7 transition-all duration-300 flex flex-col justify-between group h-full shadow-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.06)] relative">
      <div>
        {/* Card Header: Topic, Status & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <Badge variant="cyan" size="sm">
            {article.topic}
          </Badge>
          <div className="flex items-center gap-2">
            {isUpcoming ? (
              <span className="text-[11px] font-mono text-[#9290A3] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                Upcoming
              </span>
            ) : article.status === "draft" ? (
              <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
                Draft
              </span>
            ) : null}
            <span className="text-xs font-mono text-[#9290A3] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/insights/${article.slug}`} className="block group/title">
          <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover/title:text-[#00F5FF] transition-colors">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-[#9290A3] leading-relaxed mb-6 line-clamp-3">
          {article.summary}
        </p>
      </div>

      <div>
        {/* Contextual Service Bridge Pill */}
        {article.alignedService && (
          <div className="pt-4 mb-5 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-[#9290A3] font-mono">Service Focus:</span>
            <Link
              href={article.alignedService.href}
              className="text-[#00F5FF] hover:underline font-medium truncate max-w-[180px]"
            >
              {article.alignedService.title}
            </Link>
          </div>
        )}

        {/* Action Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="font-mono text-[#9290A3]">
            {isUpcoming ? "Architecture Note" : article.status === "draft" ? "Draft for Review" : article.publishedDate}
          </span>
          <Link
            href={`/insights/${article.slug}`}
            className="text-white group-hover:text-[#00F5FF] font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00F5FF] rounded"
          >
            <span>Explore Perspective</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
