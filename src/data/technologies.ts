import { TechItem } from "@/types";

export const technologiesData: TechItem[] = [
  // Frontend
  {
    name: "Next.js",
    category: "frontend",
    description: "Production React framework with App Router, server-rendered components, and edge routing.",
    badge: "App Router"
  },
  {
    name: "React",
    category: "frontend",
    description: "Declarative component-based UI engineering with modern React 19 standards.",
    badge: "UI Core"
  },
  {
    name: "TypeScript",
    category: "frontend",
    description: "Strict static typing across frontend interfaces, API schemas, and business logic.",
    badge: "Strict Type Safety"
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    description: "Utility-first modern styling framework providing streamlined, responsive design systems.",
    badge: "Design Engine"
  },

  // Mobile
  {
    name: "Flutter",
    category: "mobile",
    description: "Cross-platform framework delivering native performance across iOS and Android from one codebase.",
    badge: "Multi-Platform"
  },
  {
    name: "Dart",
    category: "mobile",
    description: "Optimized client-side language with ahead-of-time compilation for fast mobile execution.",
    badge: "Fast Compilation"
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    description: "Asynchronous event-driven runtime powering high-throughput web APIs and microservices.",
    badge: "API Runtime"
  },
  {
    name: "Python",
    category: "backend",
    description: "Robust programming language for data-intensive processing, automation, and AI integrations.",
    badge: "Core Logic"
  },
  {
    name: "FastAPI",
    category: "backend",
    description: "High-performance Python web framework for building modern, type-checked asynchronous REST APIs.",
    badge: "Async API"
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    description: "Enterprise-grade open-source relational database supporting complex queries and structured data integrity.",
    badge: "Relational Core"
  },
  {
    name: "MySQL",
    category: "database",
    description: "Reliable relational database management system for transactional business applications.",
    badge: "Data Store"
  },

  // Cloud & Deployment
  {
    name: "Cloudflare",
    category: "cloud",
    description: "Global edge network providing low-latency CDN delivery, DNS routing, and security protection.",
    badge: "Edge Network"
  },
  {
    name: "Vercel",
    category: "cloud",
    description: "Optimized deployment and serverless compute infrastructure tailored for Next.js architectures.",
    badge: "Serverless Compute"
  },

  // AI & Automation
  {
    name: "Google Gemini",
    category: "ai",
    description: "Next-generation multimodal foundation models integrated for intelligent business workflows.",
    badge: "Multimodal AI"
  },
  {
    name: "AI APIs",
    category: "ai",
    description: "Tailored programmatic interfaces for natural language, structured extraction, and synthesis.",
    badge: "Intelligence"
  },
  {
    name: "AI Automation",
    category: "ai",
    description: "Custom event-driven pipelines that automate repetitive business and operational tasks.",
    badge: "Automation"
  }
];
