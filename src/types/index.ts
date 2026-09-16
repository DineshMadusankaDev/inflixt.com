export type TechCategory = 
  | "frontend" 
  | "mobile" 
  | "backend" 
  | "database" 
  | "cloud" 
  | "ai";

export interface TechItem {
  name: string;
  category: TechCategory;
  description: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  capabilities: string[];
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  classification: string;
  clientDomain: string;
  summary: string;
  fullOverview: string;
  whatWeBuilt: string[];
  technologies: string[];
  liveUrl: string;
  displayUrl: string;
  embedAllowed: boolean;
  architectureHighlights: { label: string; value: string }[];
  seo: {
    title: string;
    description: string;
  };
  featured: boolean;
}

export type InsightTopic =
  | "Web Engineering"
  | "AI & Automation"
  | "Mobile Systems"
  | "Software Architecture"
  | "Technical SEO";

export type InsightStatus = "published" | "draft" | "upcoming";

export interface InsightAuthor {
  name: string;
  role: string;
  avatar?: string;
  url?: string;
}

export type ContentBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      level: 2 | 3;
      id: string;
      text: string;
    }
  | {
      type: "codeBlock";
      language: string;
      filename?: string;
      code: string;
    }
  | {
      type: "callout";
      variant: "note" | "tip" | "warning";
      title?: string;
      content: string;
    }
  | {
      type: "quote";
      quote: string;
      attribution?: string;
    }
  | {
      type: "list";
      ordered?: boolean;
      items: string[];
    }
  | {
      type: "comparisonTable";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "takeaways";
      title?: string;
      items: string[];
    };

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  topic: InsightTopic;
  category: string;
  summary: string;
  status: InsightStatus;
  publishedDate?: string;
  updatedDate?: string;
  readTime: string;
  author: InsightAuthor;
  featured?: boolean;
  tableOfContents?: { id: string; title: string; level: 2 | 3 }[];
  blocks?: ContentBlock[];
  alignedService?: {
    id: string;
    title: string;
    href: string;
    description: string;
  };
  projectReference?: {
    title: string;
    slug: string;
    href: string;
    summary: string;
  };
  relatedSlugs?: string[];
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
  };
  editorial?: {
    primaryTopic: string;
    secondaryTopics: string[];
    searchIntent: string;
    targetAudience: string;
    sources: string[];
    editorialNotes?: string;
  };
}

export type InsightItem = InsightArticle;

export interface NavItem {
  label: string;
  href: string;
}
