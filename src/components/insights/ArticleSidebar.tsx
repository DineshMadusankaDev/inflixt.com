import Link from "next/link";
import Image from "next/image";
import { InsightArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bookmark, Layers, ExternalLink } from "lucide-react";

interface ArticleSidebarProps {
  article: InsightArticle;
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  return (
    <aside aria-label="Article Context and Table of Contents" className="space-y-6">
      {/* Table of Contents */}
      {article.tableOfContents && article.tableOfContents.length > 0 && (
        <div className="rounded-2xl bg-[#080512] border border-white/10 p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-3">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-1.5">
            {article.tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-xs text-[#9290A3] hover:text-[#00F5FF] transition-colors py-1 leading-snug ${
                  item.level === 3 ? "pl-3 text-[11px]" : ""
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Author Card */}
      <div className="rounded-2xl bg-[#080512] border border-white/10 p-5">
        <div className="text-[11px] font-mono text-[#9290A3] uppercase tracking-wider mb-3">
          Author
        </div>
        <div className="flex items-center gap-3 mb-3">
          {article.author.avatar && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/15 bg-white/5 shrink-0">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="text-sm font-bold text-white">
              {article.author.name}
            </div>
            <div className="text-xs font-mono text-[#9290A3]">
              {article.author.role}
            </div>
          </div>
        </div>
        <p className="text-xs text-[#9290A3] leading-relaxed mb-3">
          Focusing on production software architecture, practical AI systems, and scalable product engineering at Inflixt.
        </p>
        <Link
          href="/about"
          className="text-xs font-mono text-[#00F5FF] hover:underline inline-flex items-center gap-1"
        >
          <span>View Founder Profile</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Contextual Service Callout */}
      {article.alignedService && (
        <div className="rounded-2xl bg-[#0B0717] border border-[#00F5FF]/20 p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5FF]/5 rounded-full blur-[40px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-[11px] font-mono text-[#00F5FF] uppercase tracking-wider mb-2">
              Related Studio Capability
            </div>
            <h4 className="text-sm font-bold text-white mb-2">
              {article.alignedService.title}
            </h4>
            <p className="text-xs text-[#9290A3] leading-relaxed mb-4">
              {article.alignedService.description}
            </p>
            <Button
              href={article.alignedService.href}
              size="sm"
              variant="outline"
              className="w-full justify-center text-xs"
              icon={<ArrowRight className="w-3 h-3" />}
            >
              Explore Service
            </Button>
          </div>
        </div>
      )}

      {/* Related Real Case Study */}
      {article.projectReference && (
        <div className="rounded-2xl bg-[#080512] border border-white/10 p-5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8B2CFF] uppercase tracking-wider mb-2">
            <Layers className="w-3 h-3" />
            <span>Verified Project</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1.5">
            {article.projectReference.title}
          </h4>
          <p className="text-xs text-[#9290A3] leading-relaxed mb-3">
            {article.projectReference.summary}
          </p>
          <Link
            href={article.projectReference.href}
            className="text-xs font-mono text-white hover:text-[#00F5FF] hover:underline inline-flex items-center gap-1"
          >
            <span>View Case Study</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}
    </aside>
  );
}
