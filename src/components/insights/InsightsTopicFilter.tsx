"use client";

import { InsightTopic } from "@/types";
import { cn } from "@/lib/utils";

export const allTopics: (InsightTopic | "All Topics")[] = [
  "All Topics",
  "Web Engineering",
  "AI & Automation",
  "Mobile Systems",
  "Software Architecture",
  "Technical SEO",
];

interface InsightsTopicFilterProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
  counts?: Record<string, number>;
}

export function InsightsTopicFilter({
  selectedTopic,
  onSelectTopic,
  counts,
}: InsightsTopicFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter insights by topic"
      className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10"
    >
      {allTopics.map((topic) => {
        const isSelected = selectedTopic === topic;
        const count = counts ? counts[topic] : undefined;

        return (
          <button
            key={topic}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectTopic(topic)}
            className={cn(
              "text-xs sm:text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF]",
              isSelected
                ? "bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/40 shadow-[0_0_15px_rgba(0,245,255,0.15)] font-semibold"
                : "bg-[#0B0717] text-[#9290A3] border border-white/10 hover:border-white/20 hover:text-white"
            )}
          >
            <span>{topic}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                  isSelected
                    ? "bg-[#00F5FF]/20 text-[#00F5FF]"
                    : "bg-white/5 text-[#9290A3]"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
