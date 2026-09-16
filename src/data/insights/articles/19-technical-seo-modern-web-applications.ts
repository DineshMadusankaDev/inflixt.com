import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article19: InsightArticle = {
  id: "technical-seo-modern-web-applications-checklist",
  slug: "technical-seo-modern-web-applications-checklist",
  title: "Technical SEO for Modern Web Applications: A Production-Ready Engineering Checklist",
  subtitle: "Crawl budget management, JavaScript rendering pipelines, semantic hierarchy, and Schema.org structured data.",
  topic: "Technical SEO",
  category: "Technical SEO",
  summary: "A developer-focused engineering checklist for technical SEO in modern web applications. Learn how search engine crawlers process JavaScript, how RFC 9309 rules govern robots.txt, how to eliminate indexation bloat with canonicals, and how to structure Schema.org JSON-LD.",
  status: "published",
  readTime: "7 min read",
  author: defaultAuthor,
  featured: false,
  tableOfContents: [
    { id: "the-role-of-technical-seo", title: "1. The True Role of Technical SEO in Search Rankings", level: 2 },
    { id: "javascript-rendering-and-two-wave-indexing", title: "2. How Googlebot Processes JavaScript: The Two-Wave Indexing Model", level: 2 },
    { id: "crawl-budget-and-indexation-hygiene", title: "3. Crawl Budget Management, RFC 9309 & Robots Hygiene", level: 2 },
    { id: "canonicalization-and-parameter-traps", title: "4. Canonicalization: Preventing Duplicate Content from URL Parameters", level: 2 },
    { id: "schema-org-entity-architecture", title: "5. Structured Data Architecture: Building Semantic Knowledge Graphs", level: 2 },
    { id: "the-production-technical-seo-checklist", title: "6. The Production Technical SEO Engineering Checklist", level: 2 },
  ],
  alignedService: {
    id: "seo-digital-growth",
    title: "SEO & Digital Growth",
    href: "/services#seo-digital-growth",
    description: "Embedding technical SEO directly into source code: semantic HTML, JSON-LD schemas, Core Web Vitals, and indexation hygiene.",
  },
  projectReference: {
    title: "Fair Comment",
    slug: "fair-comment",
    href: "/work/fair-comment",
    summary: "Multilingual digital publishing platform engineered with dynamic XML sitemaps, localized canonical tags, and structured Schema.org markup.",
  },
  relatedSlugs: [
    "nextjs-app-router-seo-guide",
    "improve-core-web-vitals-nextjs",
    "headless-ecommerce-growing-business-guide",
  ],
  seo: {
    title: "Technical SEO for Modern Web Applications: Engineering Checklist",
    description: "Production-ready technical SEO checklist for developers. Master JavaScript indexing, crawl budget optimization, canonical tags, and Schema.org.",
    keywords: [
      "Technical SEO checklist web applications",
      "JavaScript SEO Googlebot",
      "Next.js technical SEO",
      "Schema.org structured data JSON-LD",
      "Crawl budget optimization",
      "Canonical URL best practices",
    ],
  },
  editorial: {
    primaryTopic: "Technical SEO modern web applications",
    secondaryTopics: [
      "JavaScript SEO",
      "Two-wave indexing model",
      "Schema.org structured data",
      "Canonical tags",
      "XML sitemaps and RFC 9309 robots",
      "Crawl budget optimization",
      "Core Web Vitals",
    ],
    searchIntent: "Informational / Implementation Guide",
    targetAudience: "Frontend engineers, full-stack developers, and technical SEO consultants auditing modern web platforms.",
    sources: [
      "Google Search Central: Understanding How Googlebot Crawls and Renders JavaScript (developers.google.com/search)",
      "IETF RFC 9309: Robots Exclusion Protocol Standard",
      "Schema.org Community Vocabulary Specifications",
      "W3C Web Standards on Semantic Markup and Accessibility",
    ],
    editorialNotes: "Emphasizes that technical SEO removes discoverability friction rather than magically guaranteeing #1 rankings. Details RFC 9309 crawler nuances.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "In modern software engineering, technical SEO is frequently treated as an afterthought—something outsourced to marketing teams weeks after a web application has already been deployed. The result is often an application with elegant visual design that remains virtually invisible to search engine crawlers.",
    },
    {
      type: "paragraph",
      content: "It is critical to establish a foundational truth: technical SEO alone does not guarantee high search rankings. Even the most pristine technical implementation will fail to rank if the content lacks topical authority, user utility, or external backlinks. What our [technical SEO and digital growth engineering](/services#seo-digital-growth) achieves is removing the technical friction that prevents search engines from crawling, parsing, and correctly understanding your application's entities.",
    },
    {
      type: "heading",
      level: 2,
      id: "the-role-of-technical-seo",
      text: "1. The True Role of Technical SEO in Search Rankings",
    },
    {
      type: "paragraph",
      content: "Search engines operate through three discrete stages: Crawling (discovering URLs), Indexing (understanding the text, links, and structured data on the page), and Ranking (evaluating relevance and authority against a user's search query).",
    },
    {
      type: "paragraph",
      content: "Technical SEO is the bridge between Crawling and Indexing. If your application relies on client-side JavaScript that fails during crawler execution, or if search bots become trapped in an infinite loop of sorting parameters, your content will never enter the index to be evaluated for ranking. For framework-specific implementation patterns, consult our dedicated guide to [Next.js App Router SEO](/insights/nextjs-app-router-seo-guide).",
    },
    {
      type: "heading",
      level: 2,
      id: "javascript-rendering-and-two-wave-indexing",
      text: "2. How Googlebot Processes JavaScript: The Two-Wave Indexing Model",
    },
    {
      type: "paragraph",
      content: "Googlebot renders pages using a headless Chromium browser instance known as the Web Rendering Service (WRS). However, rendering JavaScript is computationally expensive across billions of web pages. Therefore, Google implements 'two-wave indexing':",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "First Wave: Googlebot fetches the raw HTTP server response. If the page is server-rendered (SSR/RSC) or pre-rendered static HTML, the text, headings, and links are parsed and indexed immediately.",
        "Second Wave: If the HTML is a blank container that requires client-side JavaScript execution (like a legacy Single Page Application), the URL is placed into a deferred rendering queue until computing resources become available. This delay can take hours or even days.",
      ],
    },
    {
      type: "paragraph",
      content: "By employing React Server Components and edge caching, your platform guarantees that the first wave receives 100% of your semantic text, eliminating indexing delays.",
    },
    {
      type: "heading",
      level: 2,
      id: "crawl-budget-and-indexation-hygiene",
      text: "3. Crawl Budget Management, RFC 9309 & Robots Hygiene",
    },
    {
      type: "paragraph",
      content: "Search engines assign each domain a 'crawl budget' based on its server response speed and perceived importance. If an application generates thousands of low-value parameter URLs—such as search queries (`?q=term`) or faceted navigation filters (`?color=blue&size=m`)—Googlebot wastes its crawl budget indexing thin pages rather than your core revenue routes.",
    },
    {
      type: "paragraph",
      content: "Use `robots.txt` disallows to block search engines from crawling internal administrative routes and query strings. However, engineers should understand crawler nuances: while Googlebot and Bingbot support pattern-matching wildcards (`*` and `$`), the baseline RFC 9309 standard leaves wildcard support implementation-defined. Never rely on `robots.txt` alone to hide sensitive URLs; use authenticated middleware and meta `noindex` directives:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/app/robots.ts",
      code: `import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/search", "/*?*sort=", "/*?*filter="],
    },
    sitemap: "https://inflixt.com/sitemap.xml",
  };
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "canonicalization-and-parameter-traps",
      text: "4. Canonicalization: Preventing Duplicate Content from URL Parameters",
    },
    {
      type: "paragraph",
      content: "E-commerce and SaaS platforms frequently generate duplicate pages through tracking parameters (`utm_source`), sorting flags, and currency selectors. Every page must declare a self-referential canonical URL pointing to the authoritative, clean permalink:",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Canonical Rule",
      content: "The canonical tag must always specify the absolute URL (including https:// and correct trailing-slash conventions). Strip all query parameters, sorting flags, and session IDs from the canonical link.",
    },
    {
      type: "paragraph",
      content: "Furthermore, search engines prioritize pages that deliver exceptional real user experiences, making speed and visual stability directly complementary to indexation health, as detailed in our guide on [improving Core Web Vitals in Next.js](/insights/improve-core-web-vitals-nextjs).",
    },
    {
      type: "heading",
      level: 2,
      id: "schema-org-entity-architecture",
      text: "5. Structured Data Architecture: Building Semantic Knowledge Graphs",
    },
    {
      type: "paragraph",
      content: "Search engines no longer merely index keywords; they construct knowledge graphs of entities (Organizations, Articles, SoftwareApplications, Products). Providing structured data via Schema.org JSON-LD scripts removes ambiguity and enables rich SERP snippets:",
    },
    {
      type: "comparisonTable",
      caption: "Essential Schema.org Entity Types for Commercial Platforms",
      headers: ["Schema Entity", "Application Context", "Key Properties Required"],
      rows: [
        ["Organization", "Homepage / About Page", "name, url, logo, sameAs (social profiles)"],
        ["TechArticle / BlogPosting", "Engineering Perspectives & Insights", "headline, datePublished, author, publisher, description"],
        ["SoftwareApplication", "SaaS & Product Pages", "name, operatingSystem, applicationCategory, offers"],
        ["Product", "E-commerce Catalogs", "name, image, description, sku, offers (price, currency)"],
      ],
    },
    {
      type: "takeaways",
      title: "Technical SEO Engineering Takeaways",
      items: [
        "Technical SEO removes crawling and indexing friction; it creates the foundation for content quality and domain authority.",
        "Serve pre-rendered HTML or Server Components to ensure Googlebot indexes your semantic text in Wave 1 without WRS delays.",
        "Protect your crawl budget by blocking parameter sorting and faceted filter loops in robots.txt using RFC 9309 conventions.",
        "Declare self-referential canonical tags on every page to prevent duplicate content indexation bloat.",
        "Inject Schema.org JSON-LD to explicitly establish entities, authorship, and product properties in search engine knowledge graphs.",
      ],
    },
  ],
};
