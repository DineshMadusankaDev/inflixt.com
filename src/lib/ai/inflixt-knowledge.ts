import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { technologiesData } from "@/data/technologies";
import { getPublishedInsights } from "@/data/insights";
import { VALID_BUDGET_OPTIONS } from "@/lib/contact/inquiry-service";
import { getAuthoritativeProjects } from "./authoritative-projects";

/**
 * Builds the verified, structured Inflixt Knowledge Base directly from current application source files.
 * This guarantees zero stale copied data, single source of truth, and strict alignment with production.
 */
export function generateInflixtKnowledge() {
  // 1. Company
  const company = {
    brandName: companyData.brandName,
    legalName: companyData.legalName,
    tagline: companyData.tagline,
    positioning: companyData.corePositioning,
    supportingPositioning: companyData.supportingPositioning,
    location: companyData.locationDisplay,
    website: companyData.url,
    contactEmail: companyData.contactEmail,
    registration: {
      number: companyData.registration.registrationNumber,
      entityType: companyData.registration.entityType,
      statutoryBasis: companyData.registration.statutoryBasis,
      incorporationDate: companyData.registration.incorporationDate,
      jurisdiction: companyData.registration.jurisdiction,
    },
    founder: {
      fullName: companyData.founder.fullName,
      title: companyData.founder.title,
      email: companyData.founder.email,
    },
  };

  // 2. Services
  const services = servicesData.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    url: `/services#${s.id}`,
    shortDescription: s.shortDescription,
    fullDescription: s.fullDescription,
    capabilities: s.capabilities,
    deliverables: s.deliverables,
  }));

  // 3. Pricing
  const pricing = {
    budgetRanges: VALID_BUDGET_OPTIONS,
    pricingPolicy: [
      "Inflixt does not publish rigid one-size-fits-all prices because software engineering costs depend strictly on scope, architectural complexity, platform, third-party integrations, design fidelity, and timeline.",
      "The verified project budget ranges used in Inflixt's formal project consultation and inquiry intake are: 'Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000 – $10,000', and '$10,000+' (plus 'Not sure yet').",
      "When a visitor asks how much a project costs: 1) State transparently that pricing depends on scope and features; 2) Cite the starting ranges available on Inflixt (e.g., small introductory scopes start from under $1,000, while custom full-stack software and comprehensive web/mobile platforms typically span $2,500 to $10,000+); 3) Qualify the visitor by asking ONE question about their project type and requirements; 4) Never fabricate a definitive quote.",
    ],
  };

  // 4. Authoritative Portfolio
  const portfolio = getAuthoritativeProjects();

  // 5. Technologies
  const technologies = technologiesData.map((t) => ({
    name: t.name,
    category: t.category,
    description: t.description,
    badge: t.badge,
  }));

  // 6. Process
  const process = [
    {
      step: "01",
      name: "Discover",
      tagline: "Architecture & Research",
      description:
        "Understand your business, users and goals. We analyze technical constraints, user workflows, and market opportunities to define clear product requirements and database schemas.",
    },
    {
      step: "02",
      name: "Design",
      tagline: "High-Fidelity Interface & UX",
      description:
        "Turn ideas into clear, engaging digital experiences. We design responsive layouts, cohesive component libraries, and purposeful micro-interactions with spatial harmony.",
    },
    {
      step: "03",
      name: "Develop",
      tagline: "Engineering & Integration",
      description:
        "Build with modern, scalable technology. We implement type-safe Next.js, Flutter, and backend APIs backed by rigorous code hygiene and strict TypeScript.",
    },
    {
      step: "04",
      name: "Dominate",
      tagline: "Deploy, Optimize & Scale",
      description:
        "Launch, optimize and grow. We deploy to global edge CDNs, tune Core Web Vitals, implement structured SEO, and iterate based on real performance.",
    },
  ];

  // 7. Insights (Strictly published articles only — drafts are omitted)
  const publishedInsights = getPublishedInsights().map((art) => ({
    id: art.id,
    slug: art.slug,
    title: art.title,
    url: `/insights/${art.slug}`,
    topic: art.topic,
    summary: art.summary,
    readTime: art.readTime,
  }));

  // 8. Navigation & Verified Internal Routes
  const verifiedRoutes = [
    { label: "Homepage", url: "/" },
    { label: "Services Hub", url: "/services" },
    ...services.map((s) => ({ label: `Service: ${s.title}`, url: s.url })),
    { label: "Portfolio / Work Hub", url: "/work" },
    ...portfolio.map((p) => ({ label: `Case Study: ${p.title}`, url: p.caseStudyUrl })),
    { label: "About Inflixt Global", url: "/about" },
    { label: "Insights & Articles", url: "/insights" },
    ...publishedInsights.map((i) => ({ label: `Insight: ${i.title}`, url: i.url })),
    { label: "Contact & Project Inquiry", url: "/contact" },
  ];

  return {
    company,
    services,
    pricing,
    portfolio,
    technologies,
    process,
    publishedInsights,
    verifiedRoutes,
  };
}

/**
 * Serializes the knowledge base into a concise, token-efficient, highly structured system context.
 */
export function getInflixtKnowledgeText(): string {
  const k = generateInflixtKnowledge();

  return `
# INFLIXT VERIFIED BUSINESS KNOWLEDGE (SOURCE OF TRUTH)

## 1. COMPANY & FOUNDER OVERVIEW
- Brand: ${k.company.brandName} (${k.company.tagline})
- Legal Name: ${k.company.legalName}
- Core Positioning: ${k.company.positioning}
- Supporting Positioning: ${k.company.supportingPositioning}
- Operational Location: ${k.company.location} (Building practical digital products for clients worldwide)
- Official Website: ${k.company.website}
- Business Inquiries Email: ${k.company.contactEmail}

### FOUNDER & LEADERSHIP
- Founder: ${k.company.founder.fullName} (also written as Dinesh Madhusanka)
- Title: ${k.company.founder.title}
- Role & Scope: Founder and lead of Inflixt Global PVT LTD. He leads the company across web development, mobile applications, custom software engineering, and AI-powered digital solutions, with a focus on building practical, high-performance digital products for growing businesses.
- Verified Capabilities: Product architecture, full-stack web and mobile engineering, AI systems integration.
- Public Profile Boundaries: Share only verified business leadership facts. Do NOT invent personal awards, employee counts, revenue figures, or private personal data. Offer his business email (${k.company.founder.email}) only when direct communication is requested.

### STATUTORY CORPORATE REGISTRATION (REFERENCE DATA ONLY)
- Registered Entity: ${k.company.registration.entityType}, Registration No. ${k.company.registration.number}.
- Incorporation: Incorporated ${k.company.registration.incorporationDate} under ${k.company.registration.statutoryBasis} (${k.company.registration.jurisdiction}).
- NOTE: Treat this corporate registration data as reference material only. DO NOT cite company registration numbers or statutory acts in standard conversational greetings or founder bios unless the user explicitly requests legal corporate verification.

## 2. SERVICES (6 CORE PILLARS)
${k.services
  .map(
    (s) => `### ${s.title} (Slug: "${s.slug}")
- Description: ${s.shortDescription}
- Capabilities: ${s.capabilities.join(" | ")}
- Deliverables: ${s.deliverables.join(" | ")}`
  )
  .join("\n\n")}

## 3. PRICING & BUDGET GUIDANCE
- Official Inbound Budget Tiers: ${k.pricing.budgetRanges.join(", ")}
- Pricing Principles:
  ${k.pricing.pricingPolicy.join("\n  ")}

## 4. AUTHORITATIVE PORTFOLIO & VERIFIED CASE STUDIES
${k.portfolio
  .map(
    (p) => `### ${p.title} (Slug: "${p.slug}")
- Category: ${p.category}
- Verified Technologies: ${p.technologies.join(", ")}
- Content Management (CMS): ${p.cms ? p.cms : "NONE (Custom code structuring — strictly NO Sanity CMS)"}
- Summary: ${p.shortDescription}
- Capabilities: ${p.capabilities.join(" | ")}
- Verified Facts:
  * ${p.verifiedFacts.join("\n  * ")}
- STRICTLY PROHIBITED CLAIMS (NEVER CLAIM THESE FOR THIS PROJECT):
  * ${p.prohibitedClaims.join("\n  * ")}`
  )
  .join("\n\n")}

CRITICAL GROUNDING RULES:
- Never transfer technologies, CMS platforms, or features between projects.
- Studio 2020: Engineered with Next.js, TypeScript, and Tailwind CSS with custom code structuring. It has NO headless CMS (strictly NO Sanity CMS) and does not use Cloudflare Edge.
- Fair Comment: Multilingual news publishing platform engineered with Next.js, Sanity CMS, and Cloudflare CDN.
- Inflixt Global: Corporate digital platform engineered with Next.js, React, and Tailwind CSS.
- Zero Localhost: Never output localhost, 127.0.0.1, or port 3000 URLs.
- Zero Markdown Project Links: Do not output markdown links like [Studio 2020](/work/studio-2020). The UI automatically renders verified interactive cards.

## 5. CONFIRMED TECHNOLOGY CAPABILITIES
- Modern Frontend: Next.js (App Router, Server Components), React 19, TypeScript, Tailwind CSS
- Cross-Platform Mobile: Flutter, Dart (Single codebase for iOS and Android)
- Backend & APIs: Node.js, Python, FastAPI, REST, GraphQL
- Databases: PostgreSQL, MySQL
- Cloud Infrastructure: Cloudflare (Edge CDN, DNS, Security), Vercel (Edge compute)
- AI & Automation: Google Gemini LLM API, Custom AI Pipelines, Workflow Automation

## 6. DELIVERY PROCESS (4 PHASES)
${k.process.map((pr) => `- ${pr.step} ${pr.name} (${pr.tagline}): ${pr.description}`).join("\n")}
`;
}

