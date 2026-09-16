import { InsightArticle } from "@/types";

// Import 20 SEO Content Program Articles
import { article01 } from "./insights/articles/01-nextjs-app-router-seo";
import { article02 } from "./insights/articles/02-nextjs-server-vs-client-components";
import { article03 } from "./insights/articles/03-improve-core-web-vitals-nextjs";
import { article04 } from "./insights/articles/04-nextjs-vs-wordpress";
import { article05 } from "./insights/articles/05-scalable-web-application-nextjs-typescript";
import { article06 } from "./insights/articles/06-practical-ai-integration-business-software";
import { article07 } from "./insights/articles/07-ai-automation-small-business";
import { article08 } from "./insights/articles/08-ai-chatbots-vs-business-workflows";
import { article09 } from "./insights/articles/09-ai-agents-repetitive-business-workflows";
import { article10 } from "./insights/articles/10-building-ai-features-existing-software";
import { article11 } from "./insights/articles/11-flutter-vs-native-mobile-development";
import { article12 } from "./insights/articles/12-mobile-app-development-cost";
import { article13 } from "./insights/articles/13-flutter-app-development-business";
import { article14 } from "./insights/articles/14-mobile-app-architecture-decisions";
import { article15 } from "./insights/articles/15-custom-software-vs-off-the-shelf";
import { article16 } from "./insights/articles/16-when-to-build-custom-software";
import { article17 } from "./insights/articles/17-automate-business-workflows-custom-software";
import { article18 } from "./insights/articles/18-api-integration-business-software";
import { article19 } from "./insights/articles/19-technical-seo-modern-web-applications";
import { article20 } from "./insights/articles/20-headless-ecommerce-growing-business";

// Combined Master Dataset
export const insightsData: InsightArticle[] = [
  article01,
  article02,
  article03,
  article04,
  article05,
  article06,
  article07,
  article08,
  article09,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
];

// Helper Query Functions
export function getAllInsights(): InsightArticle[] {
  return insightsData;
}

export function getPublishedInsights(): InsightArticle[] {
  return insightsData.filter((article) => article.status === "published");
}

export function getUpcomingInsights(): InsightArticle[] {
  return insightsData.filter((article) => article.status === "upcoming");
}

export function getDraftInsights(): InsightArticle[] {
  return insightsData.filter((article) => article.status === "draft");
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insightsData.find((article) => article.slug === slug);
}

export function getFeaturedInsight(): InsightArticle | undefined {
  return (
    insightsData.find((article) => article.featured) || insightsData[0]
  );
}

export function getRelatedInsights(currentSlug: string): InsightArticle[] {
  const current = getInsightBySlug(currentSlug);
  if (!current) return [];

  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const related = current.relatedSlugs
      .map((slug) => getInsightBySlug(slug))
      .filter((article): article is InsightArticle => article !== undefined);
    if (related.length > 0) return related;
  }

  // Fallback to matching topic
  const matchingTopic = insightsData
    .filter((article) => article.slug !== currentSlug && article.topic === current.topic)
    .slice(0, 2);

  if (matchingTopic.length > 0) return matchingTopic;

  return insightsData
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 2);
}
