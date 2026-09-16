import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article03: InsightArticle = {
  id: "improve-core-web-vitals-nextjs",
  slug: "improve-core-web-vitals-nextjs",
  title: "How to Improve Core Web Vitals in Next.js: Practical Engineering for LCP, INP, and CLS",
  subtitle: "Engineering strategies for Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift using modern Next.js primitives.",
  topic: "Web Engineering",
  category: "Web Engineering",
  summary: "A practical guide to diagnosing and improving Core Web Vitals in Next.js applications. Covers image priority strategies for LCP, JavaScript main-thread budget management for INP, and layout stability techniques for CLS.",
  status: "published",
  readTime: "6 min read",
  author: defaultAuthor,
  featured: false,
  tableOfContents: [
    { id: "the-core-web-vitals-landscape", title: "1. The 2026 Core Web Vitals Metrics Overview", level: 2 },
    { id: "optimizing-lcp-next-image", title: "2. Largest Contentful Paint (LCP): next/image & Server Streaming", level: 2 },
    { id: "mastering-inp-main-thread", title: "3. Interaction to Next Paint (INP): Main-Thread Budget & Hydration", level: 2 },
    { id: "eliminating-cls-layout-shifts", title: "4. Cumulative Layout Shift (CLS): Font Loading & Aspect Ratios", level: 2 },
    { id: "real-user-monitoring-vs-synthetic", title: "5. Real User Monitoring (RUM) vs. Synthetic Benchmarks", level: 2 },
    { id: "production-optimization-checklist", title: "6. Production Architecture Checklist", level: 2 },
  ],
  alignedService: {
    id: "ai-web-development",
    title: "AI-Powered Web Development",
    href: "/services#ai-web-development",
    description: "Building resilient, performant web platforms optimized for Core Web Vitals and frictionless user experiences.",
  },
  projectReference: {
    title: "Studio 2020",
    slug: "studio-2020",
    href: "/work/studio-2020",
    summary: "Visual-rich architecture portfolio engineered with Next.js, featuring optimized responsive images and minimized cumulative layout shift.",
  },
  relatedSlugs: [
    "nextjs-app-router-seo-guide",
    "nextjs-server-vs-client-components",
    "technical-seo-modern-web-applications-checklist",
  ],
  seo: {
    title: "How to Improve Core Web Vitals in Next.js: LCP, INP & CLS Guide",
    description: "Learn practical engineering techniques to improve Core Web Vitals in Next.js. Master LCP image loading, INP main-thread performance, and CLS stability.",
    keywords: [
      "Next.js Core Web Vitals",
      "Improve LCP Next.js",
      "INP optimization Next.js",
      "Next.js CLS layout shift",
      "next/image optimization",
      "Web performance engineering",
    ],
  },
  editorial: {
    primaryTopic: "Core Web Vitals Next.js",
    secondaryTopics: [
      "Largest Contentful Paint (LCP)",
      "Interaction to Next Paint (INP)",
      "Cumulative Layout Shift (CLS)",
      "next/image priority",
      "next/font optimization",
      "JavaScript main thread optimization",
      "Real User Monitoring (RUM)",
    ],
    searchIntent: "Informational / Practical Implementation",
    targetAudience: "Frontend engineers, web performance specialists, and digital product managers.",
    sources: [
      "Google Search Central & Web.dev: Core Web Vitals Guidance (web.dev/explore/metrics)",
      "Next.js Official Documentation: Image Optimization (nextjs.org/docs/app/building-your-application/optimizing/images)",
      "Next.js Official Documentation: Font Optimization (nextjs.org/docs/app/building-your-application/optimizing/fonts)",
    ],
    editorialNotes: "Strictly avoids arbitrary Lighthouse score promises. Focuses on field metrics (CrUX) and real user telemetry.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "Core Web Vitals are standardized user-experience metrics established by Google to evaluate the real-world health of web applications. They focus on three foundational pillars: loading speed (Largest Contentful Paint), user responsiveness and interactivity (Interaction to Next Paint), and visual stability (Cumulative Layout Shift). Within high-performance [AI-powered web development](/services#ai-web-development), passing these metrics is an engineering baseline.",
    },
    {
      type: "paragraph",
      content: "While Next.js provides built-in optimization primitives, using the framework does not automatically guarantee passing field scores. Performance depends entirely on how effectively engineers architect [Server and Client Component boundaries](/insights/nextjs-server-vs-client-components), manage third-party scripts, and handle dynamic assets. As highlighted in our [Next.js App Router SEO guide](/insights/nextjs-app-router-seo-guide), optimizing for real-world user metrics collected in the Chrome User Experience Report (CrUX) directly protects search engine rankings.",
    },
    {
      type: "heading",
      level: 2,
      id: "the-core-web-vitals-landscape",
      text: "1. The 2026 Core Web Vitals Metrics Overview",
    },
    {
      type: "paragraph",
      content: "Google evaluates Core Web Vitals based on the 75th percentile of mobile and desktop visits across rolling 28-day windows. Our work on the visual-rich [Studio 2020 architecture portfolio](/work/studio-2020) demonstrated how strict image budgeting and minimized cumulative layout shift preserve both user engagement and search visibility. The three defining metrics are:",
    },
    {
      type: "comparisonTable",
      caption: "Core Web Vitals Thresholds & Targets (75th Percentile)",
      headers: ["Metric", "Measurement Focus", "Good (Pass)", "Needs Improvement", "Poor"],
      rows: [
        ["Largest Contentful Paint (LCP)", "Perceived loading speed of primary visual element", "≤ 2.5 seconds", "2.5s – 4.0s", "> 4.0 seconds"],
        ["Interaction to Next Paint (INP)", "Overall responsiveness to clicks, taps, and key presses", "≤ 200 ms", "200ms – 500ms", "> 500 ms"],
        ["Cumulative Layout Shift (CLS)", "Visual stability and unexpected layout movement", "≤ 0.1", "0.1 – 0.25", "> 0.25"],
      ],
    },
    {
      type: "callout",
      variant: "note",
      title: "INP Replaced FID",
      content: "Interaction to Next Paint (INP) officially replaced First Input Delay (FID) as a Core Web Vital. Unlike FID, which only measured the initial delay of the very first click, INP assesses all user interactions across the entire session lifecycle, making long-running main-thread tasks immediately visible in real-user data.",
    },
    {
      type: "heading",
      level: 2,
      id: "optimizing-lcp-next-image",
      text: "2. Largest Contentful Paint (LCP): next/image & Server Streaming",
    },
    {
      type: "paragraph",
      content: "In modern marketing websites and digital publications, the LCP element is almost always a prominent hero image, a large headline font, or a featured media card. Delays in LCP typically stem from three culprits: slow server time to first byte (TTFB), resource load delay, or render-blocking client JavaScript.",
    },
    {
      type: "paragraph",
      content: "When using Next.js's `<Image />` component, any image visible above the fold on mobile or desktop must include the `priority` property. This instructs the browser to generate a high-priority `<link rel='preload'>` in the document head, bypassing the HTML parser queue:",
    },
    {
      type: "codeBlock",
      language: "tsx",
      filename: "src/components/home/HeroBanner.tsx",
      code: `import Image from "next/image";

export function HeroBanner() {
  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-3xl">
      <Image
        src="/assets/hero-architecture.webp"
        alt="Studio 2020 Architectural Spatial Design"
        fill
        priority // Crucial: Preloads asset to prevent LCP delay
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="object-cover"
      />
    </div>
  );
}`,
    },
    {
      type: "paragraph",
      content: "Avoid lazy loading images that appear above the fold. Applying `loading='lazy'` to an LCP candidate introduces artificial browser delays while the layout engine calculates whether the element intersects the viewport.",
    },
    {
      type: "heading",
      level: 2,
      id: "mastering-inp-main-thread",
      text: "3. Interaction to Next Paint (INP): Main-Thread Budget & Hydration",
    },
    {
      type: "paragraph",
      content: "INP measures the latency between when a user clicks, taps, or types and when the browser paints the updated UI frame. In Next.js applications, poor INP is almost always caused by large client-side JavaScript hydration tasks or heavy synchronous event handlers blocking the browser's main thread.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Audit client components and remove heavy third-party packages from interactive event paths. Defer analytics and tracker scripts using next/script with strategy='afterInteractive' or strategy='lazyOnload'.",
        "Use React transitions (useTransition) for state updates that trigger heavy DOM re-renders, allowing urgent user inputs to interrupt background rendering.",
        "Avoid long-running synchronous JavaScript execution (over 50ms) inside click handlers. Break large computation tasks using requestAnimationFrame or web workers.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "eliminating-cls-layout-shifts",
      text: "4. Cumulative Layout Shift (CLS): Font Loading & Aspect Ratios",
    },
    {
      type: "paragraph",
      content: "Cumulative Layout Shift occurs when visible page content unexpectedly changes position during rendering. The two primary causes in modern web apps are unsized media containers and web font swapping (FOUT/FOIT).",
    },
    {
      type: "paragraph",
      content: "Next.js eliminates web font layout shifts through `next/font`. By self-hosting Google Fonts at build time and calculating fallback font size-adjust metrics, `next/font` ensures that local system fallback fonts match the exact bounding dimensions of the downloaded custom font before it swaps in:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/app/layout.tsx",
      code: `import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap", // Zero-layout-shift font adjustment
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${spaceGrotesk.variable} \${inter.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "real-user-monitoring-vs-synthetic",
      text: "5. Real User Monitoring (RUM) vs. Synthetic Benchmarks",
    },
    {
      type: "paragraph",
      content: "Lighthouse running in Chrome DevTools is a synthetic simulation running on an emulated mobile CPU with simulated throttling. While helpful for identifying obvious regressions during local development, Lighthouse does not represent real user experiences.",
    },
    {
      type: "paragraph",
      content: "Google assesses search rankings exclusively based on field data gathered from actual human visitors over 28-day windows. Engineering teams should integrate Real User Monitoring (RUM) libraries, such as the official `web-vitals` package or Vercel Analytics, to track authentic 75th percentile scores across varying device tiers and network conditions.",
    },
    {
      type: "takeaways",
      title: "Core Web Vitals Engineering Takeaways",
      items: [
        "Prioritize above-the-fold hero images with priority and accurate sizes attributes; never lazy-load your LCP element.",
        "Keep the browser main thread clear during user interactions to safeguard INP below 200 milliseconds.",
        "Use next/font to automatically eliminate font-swap layout shift through calculated font metrics.",
        "Evaluate web performance using 75th percentile field data (CrUX / RUM) rather than artificial lab Lighthouse benchmarks.",
      ],
    },
  ],
};
