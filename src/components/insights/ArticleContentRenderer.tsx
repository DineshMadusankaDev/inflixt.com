import Link from "next/link";
import { ContentBlock } from "@/types";
import { ArticleCodeBlock } from "./ArticleCodeBlock";
import { ArticleTakeaways } from "./ArticleTakeaways";
import { Info, Lightbulb, AlertTriangle, Quote } from "lucide-react";

function renderFormattedText(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  if (!regex.test(text)) return text;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  regex.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    elements.push(
      <Link
        key={match.index}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-[#00F5FF] underline decoration-[#00F5FF]/40 underline-offset-4 hover:decoration-[#00F5FF] hover:text-white transition-colors"
      >
        {label}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

interface ArticleContentRendererProps {
  blocks?: ContentBlock[];
}

export function ArticleContentRenderer({ blocks }: ArticleContentRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="article-content space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={idx}
                className="text-base sm:text-lg text-[#E7E5EE] leading-relaxed font-body"
              >
                {renderFormattedText(block.content)}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  id={block.id}
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-8 pb-2 border-b border-white/10 scroll-mt-28"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={idx}
                id={block.id}
                className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-6 pb-1 scroll-mt-28"
              >
                {block.text}
              </h3>
            );

          case "codeBlock":
            return (
              <ArticleCodeBlock
                key={idx}
                language={block.language}
                filename={block.filename}
                code={block.code}
              />
            );

          case "callout":
            return (
              <div
                key={idx}
                className={`my-6 p-5 sm:p-6 rounded-2xl border flex items-start gap-4 ${
                  block.variant === "warning"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                    : block.variant === "tip"
                    ? "bg-[#8B2CFF]/10 border-[#8B2CFF]/30 text-purple-200"
                    : "bg-[#00F5FF]/10 border-[#00F5FF]/30 text-cyan-200"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {block.variant === "warning" ? (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  ) : block.variant === "tip" ? (
                    <Lightbulb className="w-5 h-5 text-[#B026FF]" />
                  ) : (
                    <Info className="w-5 h-5 text-[#00F5FF]" />
                  )}
                </div>
                <div>
                  {block.title && (
                    <div className="font-bold text-white mb-1 text-sm sm:text-base">
                      {block.title}
                    </div>
                  )}
                  <div className="text-sm leading-relaxed text-[#E7E5EE]">
                    {renderFormattedText(block.content)}
                  </div>
                </div>
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="my-8 p-6 rounded-2xl bg-[#0B0717] border-l-4 border-[#00F5FF] text-lg sm:text-xl font-medium text-white italic relative"
              >
                <Quote className="w-8 h-8 text-[#00F5FF]/20 absolute top-4 right-4 pointer-events-none" />
                <p className="mb-2">&ldquo;{block.quote}&rdquo;</p>
                {block.attribution && (
                  <footer className="text-xs font-mono text-[#9290A3] not-italic">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "list":
            if (block.ordered) {
              return (
                <ol
                  key={idx}
                  className="my-4 space-y-2 list-decimal list-inside text-base text-[#E7E5EE]"
                >
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={idx}
                className="my-4 space-y-2 list-disc list-inside text-base text-[#E7E5EE]"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "comparisonTable":
            return (
              <div key={idx} className="my-8">
                {block.caption && (
                  <div className="text-xs font-mono text-[#9290A3] uppercase tracking-wider mb-2">
                    {block.caption}
                  </div>
                )}
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0B0717]">
                  <table className="w-full text-left text-sm text-[#E7E5EE]">
                    <thead className="bg-white/5 text-xs font-mono uppercase text-white border-b border-white/10">
                      <tr>
                        {block.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {block.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/[0.02]">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 leading-relaxed">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case "takeaways":
            return (
              <ArticleTakeaways
                key={idx}
                title={block.title}
                items={block.items}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
