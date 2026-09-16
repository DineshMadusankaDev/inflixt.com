import { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    id: "fair-comment",
    slug: "fair-comment",
    title: "Fair Comment",
    classification: "Multilingual Digital Publishing Platform",
    clientDomain: "Media & Digital Publishing",
    summary:
      "A digital publishing platform engineered for Sri Lankan audiences, featuring multilingual content architecture, headless CMS integration, and Cloudflare edge delivery.",
    fullOverview:
      "Fair Comment is an independent digital media platform serving multilingual audiences in Sri Lanka. The platform delivers political commentary, investigative reports, and opinion editorials across localized languages. Inflixt engineered the digital platform utilizing Next.js for high-performance server rendering, Sanity CMS for structured editorial workflows, and Cloudflare for edge routing and secure content delivery.",
    whatWeBuilt: [
      "Digital publishing platform architecture",
      "Multilingual localization support",
      "Headless content management integration with Sanity",
      "Edge-routed content delivery with Cloudflare",
    ],
    technologies: ["Next.js", "Sanity", "Cloudflare", "Multilingual Localization"],
    liveUrl: "https://faircomment.lk/en",
    displayUrl: "faircomment.lk/en",
    embedAllowed: false, // Set to false per real browser verification: renders blank iframe due to origin Cloudflare policy; gracefully uses polished fallback preview
    architectureHighlights: [
      { label: "Frontend Framework", value: "Next.js" },
      { label: "Content Management", value: "Sanity CMS" },
      { label: "Delivery Network", value: "Cloudflare" },
      { label: "Localization", value: "Multilingual (EN / SI / TA)" },
    ],
    seo: {
      title: "Fair Comment | Case Study | Inflixt",
      description:
        "Case study for Fair Comment, a multilingual digital publishing platform engineered with Next.js, Sanity CMS, and Cloudflare edge deployment.",
    },
    featured: true,
  },
  {
    id: "studio-2020",
    slug: "studio-2020",
    title: "Studio 2020",
    classification: "Contemporary Architecture Studio Digital Experience",
    clientDomain: "Architecture & Spatial Design",
    summary:
      "A digital portfolio experience for Studio 2020 Architects, crafted with Next.js, Tailwind CSS, and responsive editorial framing for architectural spaces.",
    fullOverview:
      "Studio 2020 is a chartered architecture practice led by Suraj Ramanayake, producing architectural, interior, landscape, and spatial designs across Sri Lanka and internationally. Inflixt developed the studio's digital web experience, emphasizing spatial harmony, typography hierarchy, responsive editorial layouts, and high-fidelity visual presentation across devices.",
    whatWeBuilt: [
      "Contemporary architecture studio digital experience",
      "Responsive design architecture across desktop and mobile",
      "Editorial project showcase and portfolio layouts",
      "Clean semantic navigation and studio presentation",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Responsive Design"],
    liveUrl: "https://studio2020arc.com/",
    displayUrl: "studio2020arc.com",
    embedAllowed: true,
    architectureHighlights: [
      { label: "Frontend Framework", value: "Next.js" },
      { label: "Styling System", value: "Tailwind CSS" },
      { label: "Layout Paradigm", value: "Responsive Spatial Editorial" },
      { label: "Practice", value: "Studio 2020 Architects" },
    ],
    seo: {
      title: "Studio 2020 | Case Study | Inflixt",
      description:
        "Case study for Studio 2020 Architects, a contemporary architecture studio digital experience engineered with Next.js and Tailwind CSS.",
    },
    featured: true,
  },
  {
    id: "inflixt-global",
    slug: "inflixt-global",
    title: "Inflixt Global",
    classification: "Corporate Digital Platform",
    clientDomain: "Corporate Digital Platform",
    summary:
      "The corporate web platform for Inflixt Global PVT LTD, presenting international digital engineering capabilities, AI automation systems, and custom software services.",
    fullOverview:
      "Inflixt Global is the corporate digital web platform for Inflixt Global PVT LTD. Serving international enterprise and startup clients, the website provides a comprehensive presentation of the company's service offerings, including Next.js web application development, AI automation workflows, SaaS platform engineering, and custom software solutions. Note: This represents the corporate web presence of Inflixt Global PVT LTD, distinct from the Inflixt.com product platform.",
    whatWeBuilt: [
      "Corporate digital web presence for Inflixt Global PVT LTD",
      "Service and technical capability presentation architecture",
      "Responsive digital product layout and company showcase",
      "Inquiry and project engagement integration",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://www.inflixtglobal.com/",
    displayUrl: "inflixtglobal.com",
    embedAllowed: false, // Explicitly false due to verified X-Frame-Options: DENY
    architectureHighlights: [
      { label: "Platform Entity", value: "Inflixt Global PVT LTD" },
      { label: "Frontend Stack", value: "Next.js & React" },
      { label: "Styling Architecture", value: "Tailwind CSS" },
      { label: "Deployment", value: "Global Cloud Infrastructure" },
    ],
    seo: {
      title: "Inflixt Global | Corporate Digital Platform | Inflixt",
      description:
        "Case study for Inflixt Global, the corporate digital platform for Inflixt Global PVT LTD built with Next.js, React, and Tailwind CSS.",
    },
    featured: true,
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectsData.find((p) => p.slug === slug);
}
