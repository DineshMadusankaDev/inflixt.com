"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface ArticleCodeBlockProps {
  language: string;
  filename?: string;
  code: string;
}

export function ArticleCodeBlock({
  language,
  filename,
  code,
}: ArticleCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="my-8 rounded-2xl bg-[#06030F] border border-white/10 overflow-hidden shadow-xl">
      {/* Code Header */}
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-[#9290A3]">
          <Terminal className="w-3.5 h-3.5 text-[#00F5FF]" />
          {filename ? (
            <span className="text-white font-medium">{filename}</span>
          ) : (
            <span className="uppercase tracking-wider">{language}</span>
          )}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#9290A3] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00F5FF]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#00F5FF]" />
              <span className="text-[#00F5FF]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container with horizontal scrolling */}
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#E7E5EE] selection:bg-[#00F5FF]/30">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
