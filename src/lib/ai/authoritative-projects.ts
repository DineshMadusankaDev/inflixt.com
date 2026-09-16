import { ProjectRecommendation } from "./types";
import { toSafeInternalHref } from "./urls";

export interface AuthoritativeProject {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  technologies: string[];
  integrations: string[];
  cms: string | null;
  liveUrl: string;
  caseStudyUrl: string;
  capabilities: string[];
  verifiedFacts: string[];
  prohibitedClaims: string[];
}

export const AUTHORITATIVE_PROJECTS: AuthoritativeProject[] = [
  {
    slug: "fair-comment",
    title: "Fair Comment",
    category: "Media & Digital Publishing",
    shortDescription:
      "A multilingual digital publishing platform engineered for Sri Lankan audiences, featuring headless CMS integration and Cloudflare edge delivery.",
    technologies: ["Next.js", "Sanity", "Cloudflare", "Multilingual Localization"],
    integrations: ["Sanity CMS", "Cloudflare Edge"],
    cms: "Sanity CMS",
    liveUrl: "https://faircomment.lk/en",
    caseStudyUrl: "/work/fair-comment",
    capabilities: [
      "Multilingual publishing (English, Sinhala, Tamil)",
      "Headless content management workflows",
      "Edge-routed content distribution via Cloudflare",
      "Server-side rendering with Next.js",
    ],
    verifiedFacts: [
      "Client is Fair Comment, an independent digital media platform in Sri Lanka.",
      "Engineered with Next.js for high-performance server rendering.",
      "Uses Sanity CMS for structured editorial content management.",
      "Uses Cloudflare for edge routing, security, and content delivery.",
      "Supports multilingual localization across English, Sinhala, and Tamil.",
    ],
    prohibitedClaims: [
      "Architecture studio",
      "Interior design",
      "Mobile app",
      "Flutter",
      "E-commerce checkout",
      "Shopify",
    ],
  },
  {
    slug: "studio-2020",
    title: "Studio 2020",
    category: "Architecture & Spatial Design",
    shortDescription:
      "A digital portfolio experience for Studio 2020 Architects, crafted with Next.js, Tailwind CSS, and responsive editorial framing for architectural spaces.",
    technologies: ["Next.js", "Tailwind CSS", "Responsive Design", "TypeScript"],
    integrations: [],
    cms: null, // STRICT: No Sanity CMS!
    liveUrl: "https://studio2020arc.com/",
    caseStudyUrl: "/work/studio-2020",
    capabilities: [
      "Responsive spatial editorial layouts",
      "High-fidelity architectural imagery presentation",
      "Contemporary typography and minimalist brand framing",
      "Custom responsive design across mobile and desktop",
    ],
    verifiedFacts: [
      "Client is Studio 2020, a chartered architecture practice led by Suraj Ramanayake in Sri Lanka.",
      "Engineered with Next.js, TypeScript, and Tailwind CSS.",
      "Focuses on architectural, interior, landscape, and spatial portfolio presentation.",
      "Features clean semantic navigation, spatial harmony, and responsive editorial layouts.",
      "Content is custom structured in modern code — it does NOT use Sanity CMS.",
    ],
    prohibitedClaims: [
      "Sanity CMS",
      "Sanity",
      "Headless CMS",
      "Cloudflare Edge",
      "Multilingual localization",
      "News publishing",
      "Editorial CMS",
      "Mobile app",
    ],
  },
  {
    slug: "inflixt-global",
    title: "Inflixt Global",
    category: "Corporate Digital Platform",
    shortDescription:
      "The corporate web platform for Inflixt Global PVT LTD, presenting international software engineering, AI automation systems, and custom software services.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    integrations: [],
    cms: null,
    liveUrl: "https://www.inflixtglobal.com/",
    caseStudyUrl: "/work/inflixt-global",
    capabilities: [
      "Corporate brand and digital capabilities presentation",
      "International engineering service showcase",
      "Responsive digital product layout and company showcase",
      "Inquiry and project engagement integration",
    ],
    verifiedFacts: [
      "Corporate web platform for Inflixt Global PVT LTD, Sri Lanka.",
      "Engineered with Next.js, React, and Tailwind CSS.",
      "Presents services across Web Development, Mobile Apps, Custom Software, and AI Automation.",
      "Built for enterprise and startup clients seeking digital engineering solutions.",
    ],
    prohibitedClaims: [
      "Sanity CMS",
      "Architecture portfolio",
      "News publishing platform",
      "E-commerce store",
    ],
  },
];

export function getAuthoritativeProjects(): AuthoritativeProject[] {
  return AUTHORITATIVE_PROJECTS;
}

export function getAuthoritativeProjectBySlug(
  slug: string
): AuthoritativeProject | undefined {
  const normalized = slug.toLowerCase().trim();
  return AUTHORITATIVE_PROJECTS.find(
    (p) => p.slug === normalized || p.title.toLowerCase() === normalized
  );
}

export function toProjectRecommendation(
  project: AuthoritativeProject
): ProjectRecommendation {
  return {
    id: project.slug,
    title: project.title,
    slug: project.slug,
    href: toSafeInternalHref(project.caseStudyUrl),
    clientDomain: project.category,
    technologies: project.technologies,
    summary: project.shortDescription,
  };
}
