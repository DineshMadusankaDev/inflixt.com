import { CheckCircle2, BookmarkCheck } from "lucide-react";

interface ArticleTakeawaysProps {
  title?: string;
  items: string[];
}

export function ArticleTakeaways({
  title = "Key Architectural Takeaways",
  items,
}: ArticleTakeawaysProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 rounded-2xl bg-[#080512] border border-[#00F5FF]/25 p-6 sm:p-8 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F5FF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-3">
          <BookmarkCheck className="w-4 h-4" />
          <span>Architecture Summary</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-5 tracking-tight">
          {title}
        </h3>

        <div className="space-y-3.5">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-[#E7E5EE] leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
