import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article02: InsightArticle = {
  id: "nextjs-server-vs-client-components",
  slug: "nextjs-server-vs-client-components",
  title: "React Server Components vs. Client Components: Boundary Strategy for Performance and SEO",
  subtitle: "Understanding serialization costs, client bundle isolation, and data-fetching boundaries in Next.js App Router.",
  topic: "Web Engineering",
  category: "Web Engineering",
  summary: "An architectural deep-dive into where to place 'use client' boundaries in Next.js. Learn how component-level isolation reduces client JavaScript, preserves search crawlability, and avoids common serialization traps.",
  status: "published",
  readTime: "6 min read",
  author: defaultAuthor,
  featured: false,
  tableOfContents: [
    { id: "understanding-the-boundary", title: "1. The Mental Model: RSC vs. Traditional SSR", level: 2 },
    { id: "where-to-place-use-client", title: "2. Strategic Placement of the 'use client' Directive", level: 2 },
    { id: "the-serialization-boundary", title: "3. The Props Serialization Boundary & Payload Costs", level: 2 },
    { id: "seo-and-crawlability-impact", title: "4. SEO Implications: How Crawlers Parse Server Components", level: 2 },
    { id: "common-architectural-mistakes", title: "5. Five Common RSC Mistakes in Commercial Apps", level: 2 },
    { id: "practical-decision-framework", title: "6. Component Boundary Decision Framework", level: 2 },
  ],
  alignedService: {
    id: "ai-web-development",
    title: "AI-Powered Web Development",
    href: "/services#ai-web-development",
    description: "Designing modern web platforms with optimal Server Component boundaries for minimal client JavaScript and maximum rendering velocity.",
  },
  projectReference: {
    title: "Fair Comment",
    slug: "fair-comment",
    href: "/work/fair-comment",
    summary: "High-traffic digital publishing platform leveraging React Server Components for optimized low-latency editorial rendering and instant search engine indexation.",
  },
  relatedSlugs: [
    "nextjs-app-router-seo-guide",
    "improve-core-web-vitals-nextjs",
    "scalable-web-application-nextjs-typescript",
  ],
  seo: {
    title: "Next.js Server Components vs Client Components: Boundary Strategy",
    description: "Master the boundary between React Server Components and Client Components in Next.js. Understand serialization costs, bundle impact, and SEO advantages.",
    keywords: [
      "Next.js Server Components vs Client Components",
      "React Server Components SEO",
      "use client boundary Next.js",
      "RSC serialization performance",
      "Next.js bundle optimization",
    ],
  },
  editorial: {
    primaryTopic: "Next.js Server Components vs Client Components",
    secondaryTopics: [
      "React Server Components",
      "Client Components",
      "use client directive",
      "Serialization overhead",
      "Client bundle size",
      "Next.js rendering performance",
      "Search crawler parsing",
    ],
    searchIntent: "Informational / Technical Decision",
    targetAudience: "Engineering leads, full-stack developers, and technical founders architecting modern React web systems.",
    sources: [
      "React Official Documentation: Server Components Overview (react.dev)",
      "Next.js Official Documentation: Server and Client Composition Patterns (nextjs.org/docs/app/building-your-application/rendering)",
    ],
    editorialNotes: "Emphasizes practical code patterns and architectural trade-offs rather than theoretical dogma. No unverified benchmarks.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "The introduction of React Server Components (RSC) in the Next.js App Router represents the most significant architectural paradigm shift in the React ecosystem since the arrival of Hooks. Across commercial [AI-powered web development](/services#ai-web-development) projects, few architectural decisions have a greater impact on performance and search visibility than the deliberate placement of the boundary between Server and Client Components.",
    },
    {
      type: "paragraph",
      content: "Developers frequently confuse traditional Server-Side Rendering (SSR) with Server Components, or instinctively place `'use client'` at the top of entire layout trees whenever interactive state is required. Understanding how this boundary operates is critical to trimming client JavaScript, protecting [Core Web Vitals metrics](/insights/improve-core-web-vitals-nextjs), and maintaining full crawler indexability as detailed in our [Next.js App Router SEO guide](/insights/nextjs-app-router-seo-guide).",
    },
    {
      type: "heading",
      level: 2,
      id: "understanding-the-boundary",
      text: "1. The Mental Model: RSC vs. Traditional SSR",
    },
    {
      type: "paragraph",
      content: "In traditional Next.js Pages Router SSR (`getServerSideProps`), components executed on the server to produce initial HTML, but the exact same component code had to be bundled, shipped, and executed on the client to hydrate the DOM. Heavy dependencies—such as Markdown parsers, date formatting libraries, or database querying clients—inevitably inflated the user's browser bundle.",
    },
    {
      type: "paragraph",
      content: "React Server Components decouple execution from shipping. A Server Component executes exclusively on the server (or at build time). Its dependencies remain on the server. Instead of sending raw JavaScript code to the browser, Next.js streams rendered HTML and a specialized binary stream known as the RSC Payload. Only components marked with `'use client'` ship their JavaScript implementation to the browser for hydration, a core pattern in [scalable Next.js and TypeScript systems](/insights/scalable-web-application-nextjs-typescript).",
    },
    {
      type: "heading",
      level: 2,
      id: "where-to-place-use-client",
      text: "2. Strategic Placement of the 'use client' Directive",
    },
    {
      type: "paragraph",
      content: "A fundamental rule of App Router architecture is to push `'use client'` as deep down the component tree as possible. Making a parent component a Client Component forces all of its imported children to become Client Components as well, destroying the server isolation advantage.",
    },
    {
      type: "paragraph",
      content: "Consider a common eCommerce product page. The page contains product specifications, high-resolution photo galleries, related product listings, and a single 'Add to Cart' button with state. The entire page should remain a Server Component, with only the isolated button designated as a Client Component:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/components/product/AddToCartButton.tsx",
      code: `"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";

interface Props {
  productId: string;
  variantId: string;
}

export function AddToCartButton({ productId, variantId }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    // Execute client-side cart mutation
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId, variantId }),
    });
    setIsAdding(false);
    setAdded(true);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdding}
      className="px-6 py-3 rounded-xl bg-[#00F5FF] text-[#05030D] font-semibold flex items-center gap-2"
    >
      {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
      <span>{isAdding ? "Adding..." : added ? "Added to Cart" : "Add to Cart"}</span>
    </button>
  );
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "the-serialization-boundary",
      text: "3. The Props Serialization Boundary & Payload Costs",
    },
    {
      type: "paragraph",
      content: "When a Server Component passes data across the boundary to a Client Component, that data must be serializable into JSON. You cannot pass JavaScript functions, class instances with methods, or database connection cursors across this boundary.",
    },
    {
      type: "paragraph",
      content: "Furthermore, the data passed as props is serialized into the RSC payload that accompanies the HTML document. If your server query fetches a 200-field database row but your Client Component only displays three values, passing the entire raw object doubles your document size. Always project and sanitize props at the boundary:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/app/products/[id]/page.tsx",
      code: `// Server Component
import { db } from "@/lib/db";
import { ProductGallery } from "@/components/product/ProductGallery"; // Client Component

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Query full record with internal system columns
  const rawProduct = await db.products.findUnique({ where: { id } });
  
  // Sanitize and project ONLY what the client gallery needs
  const galleryProps = {
    images: rawProduct.media.map(m => m.url),
    altText: rawProduct.title,
  };

  return (
    <div>
      <h1>{rawProduct.title}</h1>
      <p>{rawProduct.description}</p>
      {/* Pass minimal serialized payload */}
      <ProductGallery {...galleryProps} />
    </div>
  );
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "seo-and-crawlability-impact",
      text: "4. SEO Implications: How Crawlers Parse Server Components",
    },
    {
      type: "paragraph",
      content: "From an organic search perspective, React Server Components provide decisive advantages. Because Server Components render to raw semantic HTML on the server before streaming, search engine crawlers receive complete text, structural headings, internal anchor tags, and Schema.org metadata in the initial HTTP response packet.",
    },
    {
      type: "paragraph",
      content: "With purely client-rendered applications (SPAs), search engines must queue the page for a second rendering wave (Web Rendering Service) to execute JavaScript and generate DOM nodes. If execution timeouts occur or external API calls stall, crawlers index blank or partial pages. Server Components eliminate this vulnerability entirely.",
    },
    {
      type: "comparisonTable",
      caption: "Server Components vs. Client Components Breakdown",
      headers: ["Capability / Characteristic", "Server Component", "Client Component ('use client')"],
      rows: [
        ["Direct Database Access", "Supported (Prisma, Drizzle, SQL directly)", "Not Supported (Requires API routes or Server Actions)"],
        ["Client JavaScript Bundle", "0 KB shipped to browser", "Includes component code & imported npm packages"],
        ["React Hooks (useState, useEffect)", "Not Available", "Fully Supported"],
        ["Browser APIs (window, localStorage)", "Not Available", "Fully Supported"],
        ["Search Engine Indexation", "Instantaneous in first HTML stream", "Requires client hydration or SSR fallback"],
        ["Secret API Keys (e.g., AI models)", "Safe (Executed strictly on server)", "Unsafe (Exposed in client bundle if imported)"],
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "common-architectural-mistakes",
      text: "5. Five Common RSC Mistakes in Commercial Apps",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Placing 'use client' at the root layout level to satisfy a theme provider or UI library, converting the entire sub-tree into client-rendered JavaScript.",
        "Passing large, un-pruned database models as props across the client boundary, creating massive hidden RSC payloads in page source.",
        "Fetching data inside Client Components via useEffect() rather than passing server-fetched data as static props.",
        "Importing heavy server-only packages (like cryptography or database drivers) into client components, causing cryptic build errors.",
        "Failing to utilize the children prop pattern: passing a Server Component as children to a Client Component preserves the Server Component's 0 KB bundle footprint.",
      ],
    },
    {
      type: "takeaways",
      title: "Key Architecture Takeaways",
      items: [
        "Default to Server Components for all pages, layouts, and display components. Only reach for 'use client' when user interaction or browser APIs are mandatory.",
        "Push client boundaries to the leaves of your component tree to keep parent layouts free of client runtime overhead.",
        "Prune and sanitize props passed across the boundary to prevent bloat in the streamed RSC payload.",
        "Use the children prop pattern to compose Server Components inside interactive Client Component wrappers without turning the inner tree into client code.",
      ],
    },
  ],
};
