import Link from "next/link";
import Image from "next/image";
import { InsightArticle } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface ArticleHeaderProps {
  article: InsightArticle;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const isUpcoming = article.status === "upcoming";
  const isDraft = article.status === "draft";

  return (
    <header className="mb-12 sm:mb-16">
      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#9290A3]">
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/insights"
            className="hover:text-[#00F5FF] transition-colors inline-flex items-center gap-1.5 group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
            <span>Insights</span>
          </Link>
          <span>/</span>
          <span className="text-[#00F5FF]">{article.topic}</span>
          <span className="hidden sm:inline">/</span>
          <span className="text-white/80 hidden sm:inline truncate max-w-xs">
            {article.title}
          </span>
        </div>
      </nav>

      {/* Badges & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Badge variant="cyan" size="md">
          {article.topic}
        </Badge>

        {isUpcoming ? (
          <span className="text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Upcoming Perspective
          </span>
        ) : isDraft ? (
          <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
            Editorial Draft (In Review)
          </span>
        ) : (
          <span className="text-xs font-mono text-[#9290A3] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#00F5FF]" />
            {article.publishedDate}
          </span>
        )}

        <span className="text-xs font-mono text-[#9290A3] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#8B2CFF]" />
          {article.readTime}
        </span>
      </div>

      {/* H1 Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
        {article.title}
      </h1>

      {/* Subtitle / Abstract */}
      {article.subtitle && (
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border-l-4 border-[#00F5FF] text-base sm:text-lg text-[#E7E5EE] leading-relaxed mb-8">
          {article.subtitle}
        </div>
      )}

      {/* Author Byline */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {article.author.avatar && (
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 bg-white/5 shrink-0">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-white">
              {article.author.name}
            </div>
            <div className="text-xs font-mono text-[#9290A3]">
              {article.author.role}
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[#9290A3] text-right hidden sm:block">
          <div>Inflixt Engineering Publication</div>
          <div className="text-[#00F5FF]">Peer-Reviewed Perspectives</div>
        </div>
      </div>
    </header>
  );
}
