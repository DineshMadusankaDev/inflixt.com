import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article01: InsightArticle = {
  id: "nextjs-app-router-seo-guide",
  slug: "nextjs-app-router-seo-guide",
  title: "Next.js App Router SEO: A Practical Guide to Metadata, Sitemaps, and Structured Data",
  subtitle: "How to configure dynamic metadata, streaming JSON-LD schemas, and automated XML sitemaps in production Next.js architectures.",
  topic: "Web Engineering",
  category: "Web Engineering",
  summary: "A production-tested implementation guide for technical SEO in the Next.js App Router, covering generateMetadata, dynamic sitemap.ts, robots directives, and Schema.org JSON-LD in Server Components.",
  status: "published",
  readTime: "6 min read",
  author: defaultAuthor,
  featured: true,
  tableOfContents: [
    { id: "the-app-router-seo-shift", title: "1. The Metadata Architecture Shift in App Router", level: 2 },
    { id: "configuring-static-dynamic-metadata", title: "2. Static vs. Dynamic Metadata with generateMetadata()", level: 2 },
    { id: "generating-dynamic-sitemaps", title: "3. Dynamic XML Sitemaps (sitemap.ts) & robots.ts", level: 2 },
    { id: "structured-data-in-server-components", title: "4. Injecting Schema.org JSON-LD via Server Components", level: 2 },
    { id: "canonical-and-open-graph", title: "5. Canonical URLs, Alternates, and OpenGraph Cards", level: 2 },
    { id: "production-tradeoffs-mistakes", title: "6. Common Mistakes & Performance Trade-Offs", level: 2 },
    { id: "summary-action-checklist", title: "7. Architecture Checklist & Service Context", level: 2 },
  ],
  alignedService: {
    id: "ai-web-development",
    title: "AI-Powered Web Development",
    href: "/services#ai-web-development",
    description: "Engineering ultra-fast, search-optimized web platforms built with Next.js App Router and edge-rendered architectures.",
  },
  projectReference: {
    title: "Fair Comment",
    slug: "fair-comment",
    href: "/work/fair-comment",
    summary: "Multilingual digital publishing platform engineered with Next.js, Sanity headless CMS, and Cloudflare edge delivery.",
  },
  relatedSlugs: [
    "nextjs-server-vs-client-components",
    "improve-core-web-vitals-nextjs",
    "technical-seo-modern-web-applications-checklist",
  ],
  seo: {
    title: "Next.js App Router SEO: Guide to Metadata, Sitemaps & Structured Data",
    description: "Learn how to master technical SEO in the Next.js App Router. Step-by-step implementation of generateMetadata, dynamic sitemaps, robots.ts, and JSON-LD structured data.",
    keywords: [
      "Next.js App Router SEO",
      "Next.js generateMetadata",
      "Next.js sitemap.ts",
      "Next.js structured data JSON-LD",
      "Next.js canonical URL",
      "App Router SEO best practices",
    ],
  },
  editorial: {
    primaryTopic: "Next.js App Router SEO",
    secondaryTopics: [
      "generateMetadata",
      "sitemap.ts",
      "robots.ts",
      "JSON-LD structured data",
      "OpenGraph metadata",
      "Canonical tags",
      "React Server Components SEO",
    ],
    searchIntent: "Informational / Implementation Guide",
    targetAudience: "Frontend engineers, technical leads, and web architects building production Next.js applications.",
    sources: [
      "Next.js Official Documentation: Metadata Files and APIs (nextjs.org/docs/app/building-your-application/optimizing/metadata)",
      "Google Search Central: Structured Data General Guidelines",
      "Schema.org Core Vocabulary Specification",
    ],
    editorialNotes: "Drafted based on production patterns tested across client platforms like Fair Comment. Excludes fake benchmarks; all code examples adhere to Next.js 15/16 conventions.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "When migrating from the legacy Next.js Pages Router to the App Router, one of the most substantial architectural shifts occurs in how search engine metadata is declared, resolved, and streamed to web crawlers. The previous pattern of dropping `<Head>` tags inside individual page templates has been replaced with a declarative, server-evaluated Metadata API across modern [AI-powered web development](/services#ai-web-development) architectures.",
    },
    {
      type: "paragraph",
      content: "For engineering teams building commercial platforms, mastering this API is essential. Because Next.js resolves metadata on the server before streaming HTML to clients, properly configured metadata guarantees that search engine bots and social media scrapers receive complete OpenGraph tags, canonical directives, and Schema.org structured data without relying on client-side JavaScript execution. For broader platform crawling concerns, see our [comprehensive technical SEO checklist](/insights/technical-seo-modern-web-applications-checklist).",
    },
    {
      type: "heading",
      level: 2,
      id: "the-app-router-seo-shift",
      text: "1. The Metadata Architecture Shift in App Router",
    },
    {
      type: "paragraph",
      content: "In the App Router, metadata is strictly separated into two models: static metadata objects and dynamic metadata functions (`generateMetadata`). Both models operate entirely on the server within [React Server Components](/insights/nextjs-server-vs-client-components). They cannot be executed inside Client Components ('use client'), preventing client-side layout thrashing and ensuring deterministic HTML generation.",
    },
    {
      type: "paragraph",
      content: "Crucially, Next.js implements hierarchical metadata inheritance. A top-level metadata definition configured in `app/layout.tsx` serves as the baseline fallback. Child layouts and leaf `page.tsx` files overwrite or shallow-merge individual fields, allowing you to establish global title templates, fallback OpenGraph assets, and default robots directives across an entire site while overriding specific attributes on granular product or editorial routes.",
    },
    {
      type: "callout",
      variant: "note",
      title: "RSC Execution Guarantee",
      content: "Because generateMetadata executes exclusively during the server-render phase, database queries and API calls inside it do not increase client bundle size. Furthermore, Next.js automatically dedupes fetch() requests across generateMetadata and page rendering.",
    },
    {
      type: "heading",
      level: 2,
      id: "configuring-static-dynamic-metadata",
      text: "2. Static vs. Dynamic Metadata with generateMetadata()",
    },
    {
      type: "paragraph",
      content: "Static metadata is appropriate for invariant marketing pages such as your Homepage, About page, or Contact route. For dynamic routes—such as product catalogs (`/products/[slug]`) or engineering perspectives (`/insights/[slug]`)—you must export the asynchronous `generateMetadata` function.",
    },
    {
      type: "paragraph",
      content: "In modern Next.js versions (v15 and v16), page parameters and search parameters are supplied as asynchronous Promises. The function must await `params` before querying your data layer or CMS:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/app/insights/[slug]/page.tsx",
      code: `import type { Metadata } from "next";
import { getArticleBySlug } from "@/data/insights";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Perspective Not Found | Inflixt",
      description: "The requested engineering perspective could not be located.",
    };
  }

  const canonicalUrl = \`https://inflixt.com/insights/\${article.slug}\`;

  return {
    title: \`\${article.title} | Inflixt Insights\`,
    description: article.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.title,
      description: article.summary,
      siteName: "Inflixt",
      images: [
        {
          url: article.ogImage || "/brand/default-og.svg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
    robots: {
      index: article.status === "published",
      follow: true,
    },
  };
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "generating-dynamic-sitemaps",
      text: "3. Dynamic XML Sitemaps (sitemap.ts) & robots.ts",
    },
    {
      type: "paragraph",
      content: "Rather than manually maintaining a brittle static XML file in your public directory, Next.js provides file-based route conventions: `app/sitemap.ts` and `app/robots.ts`. These execute at build time for statically generated sites or on-demand at edge runtimes for dynamic catalogs.",
    },
    {
      type: "paragraph",
      content: "A disciplined sitemap implementation must filter out unapproved drafts, preview URLs, and thin category doorway queries. Here is the exact architectural pattern used on production platforms:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/app/sitemap.ts",
      code: `import type { MetadataRoute } from "next";
import { getPublishedInsights } from "@/data/insights";
import { getActiveProjects } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://inflixt.com";
  const now = new Date();

  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: \`\${baseUrl}\`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: \`\${baseUrl}/services\`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: \`\${baseUrl}/work\`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: \`\${baseUrl}/insights\`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Dynamic published article routes (drafts strictly excluded)
  const articles = await getPublishedInsights();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: \`\${baseUrl}/insights/\${article.slug}\`,
    lastModified: new Date(article.updatedDate || article.publishedDate || now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "structured-data-in-server-components",
      text: "4. Injecting Schema.org JSON-LD via Server Components",
    },
    {
      type: "paragraph",
      content: "Structured data enables search engines to parse your platform's entities—such as Organizations, TechArticles, and BreadcrumbLists—and render rich search result cards. In the App Router, the cleanest pattern is to render an inline `<script type='application/ld+json'>` directly within your server component page.",
    },
    {
      type: "paragraph",
      content: "Avoid using client-side hooks like `useEffect` to inject structured data. Doing so delays script evaluation until client hydration, causing some search engine crawlers to miss the payload during initial parsing.",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/components/seo/ArticleJsonLd.tsx",
      code: `import { InsightArticle } from "@/types";

interface Props {
  article: InsightArticle;
  baseUrl: string;
}

export function ArticleJsonLd({ article, baseUrl }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    url: \`\${baseUrl}/insights/\${article.slug}\`,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: \`\${baseUrl}/about\`,
    },
    publisher: {
      "@type": "Organization",
      name: "Inflixt Global PVT LTD",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: \`\${baseUrl}/brand/inflixt-logo.png\`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "canonical-and-open-graph",
      text: "5. Canonical URLs, Alternates, and OpenGraph Cards",
    },
    {
      type: "paragraph",
      content: "Duplicate content across parameterized URLs (such as sorting, filtering, or campaign tags) is one of the most frequent sources of indexation bloat. In Next.js, always specify an absolute canonical URL via the `alternates.canonical` field.",
    },
    {
      type: "paragraph",
      content: "Configure a `metadataBase` property in your root `app/layout.tsx`. When `metadataBase` is defined, relative image and canonical paths in child components automatically resolve into absolute production URLs, preventing broken social image cards on social sharing platforms.",
    },
    {
      type: "comparisonTable",
      caption: "Metadata Strategy Comparison: Pages Router vs. App Router",
      headers: ["Dimension", "Pages Router (Legacy)", "App Router (Current Architecture)"],
      rows: [
        ["Location", "Inside JSX using <Head>", "Exported metadata or generateMetadata()"],
        ["Execution Context", "Client & Server (hydrated in DOM)", "Strictly Server Component (zero client JS)"],
        ["Sitemap Architecture", "Static public/sitemap.xml or API route", "Native app/sitemap.ts route convention"],
        ["Request Deduplication", "Manual caching or custom React context", "Automatic fetch() deduplication by Next.js"],
        ["Dynamic Parameters", "Extracted from useRouter or context", "Resolved via asynchronous params Promise"],
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "production-tradeoffs-mistakes",
      text: "6. Common Mistakes & Performance Trade-Offs",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Blocking page streaming by running un-cached, slow database queries inside generateMetadata. Use efficient cached lookups or edge key-value stores.",
        "Forgetting to set robots: { index: false } on draft or internal staging content, resulting in search engines indexing placeholder copy.",
        "Hardcoding localhost URLs in OpenGraph image paths. Always anchor through metadataBase or an environment-specific origin constant.",
        "Creating thousands of thin, programmatic category URLs in sitemaps before sufficient editorial depth is established.",
      ],
    },
    {
      type: "takeaways",
      title: "Key Architecture Takeaways",
      items: [
        "Use metadataBase in your root layout to establish a single source of truth for canonical and OpenGraph resolution.",
        "Separate static metadata on marketing routes from dynamic generateMetadata on database-driven pages.",
        "Inject Schema.org structured data directly as server-rendered JSON-LD scripts to ensure immediate crawler readability.",
        "Enforce strict sitemap filtering: only production-ready, non-draft URLs should appear in sitemap.ts.",
      ],
    },
  ],
};
