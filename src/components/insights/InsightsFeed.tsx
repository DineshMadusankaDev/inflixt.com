"use client";

import { useState, useMemo } from "react";
import { InsightArticle } from "@/types";
import { InsightsTopicFilter, allTopics } from "./InsightsTopicFilter";
import { InsightCard } from "./InsightCard";

interface InsightsFeedProps {
  articles: InsightArticle[];
}

export function InsightsFeed({ articles }: InsightsFeedProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics");

  // Calculate dynamic counts
  const counts = useMemo(() => {
    const map: Record<string, number> = {
      "All Topics": articles.length,
    };
    allTopics.forEach((t) => {
      if (t !== "All Topics") {
        map[t] = articles.filter((a) => a.topic === t).length;
      }
    });
    return map;
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    if (selectedTopic === "All Topics") return articles;
    return articles.filter((a) => a.topic === selectedTopic);
  }, [articles, selectedTopic]);

  return (
    <div className="mb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-1">
            Perspectives Feed
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Architectural Notes & Articles
          </h2>
        </div>
        <div className="text-xs font-mono text-[#9290A3]">
          Showing {filteredArticles.length} of {articles.length} perspectives
        </div>
      </div>

      {/* Filter Bar */}
      <InsightsTopicFilter
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
        counts={counts}
      />

      {/* Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <InsightCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#080512] border border-white/10">
          <p className="text-sm text-[#9290A3] mb-4">
            No perspectives currently published under this topic.
          </p>
          <button
            onClick={() => setSelectedTopic("All Topics")}
            className="text-xs font-mono text-[#00F5FF] hover:underline"
          >
            ← View All Topics
          </button>
        </div>
      )}
    </div>
  );
}
