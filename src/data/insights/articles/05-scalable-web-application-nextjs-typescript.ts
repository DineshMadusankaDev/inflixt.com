import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article05: InsightArticle = {
  id: "scalable-web-application-nextjs-typescript",
  slug: "scalable-web-application-nextjs-typescript",
  title: "Building Scalable Web Applications with Next.js and TypeScript: Architecture Patterns",
  subtitle: "Directory modularity, end-to-end type safety, Server Actions validation, and resilient database connection patterns.",
  topic: "Web Engineering",
  category: "Web Engineering",
  summary: "An engineering architectural blueprint for structuring production Next.js and TypeScript web applications. Learn how feature-sliced directories, type-safe Server Actions, and connection pooling maintain engineering velocity at scale.",
  status: "published",
  readTime: "6 min read",
  author: defaultAuthor,
  featured: false,
  tableOfContents: [
    { id: "the-scalability-challenge", title: "1. Why Next.js Applications Break Down at Scale", level: 2 },
    { id: "feature-based-directory-architecture", title: "2. Feature-Sliced Directory Architecture vs. Layered Monolith", level: 2 },
    { id: "end-to-end-type-contracts", title: "3. End-to-End Type Safety: Database to Client Boundary", level: 2 },
    { id: "type-safe-server-actions", title: "4. Type-Safe Server Actions with Zod Schema Validation", level: 2 },
    { id: "resilient-database-connection-pooling", title: "5. Connection Pooling and Serverless Database Hygiene", level: 2 },
    { id: "architecture-hardening-checklist", title: "6. Production Architecture Checklist", level: 2 },
  ],
  alignedService: {
    id: "custom-software",
    title: "Custom Software",
    href: "/services#custom-software",
    description: "Designing bespoke business web platforms and scalable microservices engineered with Next.js, Node.js, and TypeScript.",
  },
  projectReference: undefined,
  relatedSlugs: [
    "nextjs-server-vs-client-components",
    "nextjs-app-router-seo-guide",
    "api-integration-business-software-checklist",
  ],
  seo: {
    title: "Scalable Next.js & TypeScript Architecture: Production Patterns",
    description: "Architect scalable enterprise Next.js applications using TypeScript. Master modular directory structures, type-safe Server Actions with Zod, and database pooling.",
    keywords: [
      "Next.js TypeScript architecture",
      "Scalable Next.js project structure",
      "Next.js Server Actions validation",
      "Next.js Zod validation",
      "Enterprise Next.js patterns",
      "React Server Components scalability",
    ],
  },
  editorial: {
    primaryTopic: "Scalable Next.js TypeScript architecture",
    secondaryTopics: [
      "Next.js folder structure",
      "Modular directory organization",
      "Server Actions validation",
      "Zod schema validation",
      "Serverless database connection pooling",
      "End-to-end type safety",
    ],
    searchIntent: "Informational / Technical Implementation",
    targetAudience: "Full-stack engineers, software architects, and engineering teams scaling Next.js production platforms.",
    sources: [
      "TypeScript Official Handbook (typescriptlang.org)",
      "Next.js Official Documentation: Project Organization and File Colocation (nextjs.org/docs/app/building-your-application/routing/colocation)",
      "Prisma / Drizzle ORM Serverless Connection Guides",
    ],
    editorialNotes: "Avoids generic code snippets. Uses production-grade TypeScript patterns including Server Action action-state validation.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "Next.js makes building initial web prototypes effortless. However, as an application expands beyond initial marketing routes into authenticated customer dashboards, complex relational schemas, and third-party integrations, uncoordinated codebases rapidly suffer from architectural decay: circular dependencies, sprawling utility files, and untracked client-server boundaries. When designing [custom software systems](/services#custom-software), engineering modularity from day one is critical.",
    },
    {
      type: "paragraph",
      content: "Building an enterprise-ready Next.js application requires establishing strict architectural boundaries. By combining TypeScript's static type system with feature-sliced modularity, disciplined [React Server Component boundaries](/insights/nextjs-server-vs-client-components), and safe [API integration patterns](/insights/api-integration-business-software-checklist), engineering teams can maintain high delivery velocity without sacrificing system stability.",
    },
    {
      type: "heading",
      level: 2,
      id: "the-scalability-challenge",
      text: "1. Why Next.js Applications Break Down at Scale",
    },
    {
      type: "paragraph",
      content: "Most scalability bottlenecks in Next.js codebases are organizational rather than computational. The default convention of grouping files strictly by technical role—placing all components in `/components`, all database queries in `/lib`, and all types in `/types`—creates severe cognitive load once a project exceeds 50 routes.",
    },
    {
      type: "paragraph",
      content: "When an engineer modifies a billing workflow, they must jump across five disparate root folders to inspect the schema, API route, button component, and type definition. Modularity collapses, dead code accumulates, and testing individual subsystems becomes nearly impossible.",
    },
    {
      type: "heading",
      level: 2,
      id: "feature-based-directory-architecture",
      text: "2. Feature-Sliced Directory Architecture vs. Layered Monolith",
    },
    {
      type: "paragraph",
      content: "In production-grade Next.js systems, we recommend a feature-based colocation model. The `src/app` directory should remain strictly responsible for routing, layout hierarchy, and parameter extraction. All business domain logic, data models, and isolated components reside inside dedicated domain modules in `src/features/` (or `src/modules/`):",
    },
    {
      type: "codeBlock",
      language: "text",
      filename: "Project Structure Blueprint",
      code: `src/
├── app/                      # Route handlers & layout composition only
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/billing/page.tsx
│   └── layout.tsx
├── features/                 # Self-contained business domains
│   ├── billing/
│   │   ├── components/       # UI isolated to billing (InvoiceTable, PlanCard)
│   │   ├── actions/          # Server Actions (updatePaymentMethod, cancelPlan)
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── types/            # Domain interfaces (Subscription, Invoice)
│   │   └── services/         # Database and Stripe integration queries
│   └── auth/
├── components/               # Shared, domain-agnostic UI primitives
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Input.tsx
├── lib/                      # Infrastructure clients (db.ts, logger.ts, redis.ts)
└── types/                    # Global ambient types`,
    },
    {
      type: "heading",
      level: 2,
      id: "end-to-end-type-contracts",
      text: "3. End-to-End Type Safety: Database to Client Boundary",
    },
    {
      type: "paragraph",
      content: "True scalability requires that a schema modification in your database instantly propagates type errors across any UI component consuming that data. Modern ORMs like Prisma or Drizzle generate TypeScript interfaces directly from your database migrations.",
    },
    {
      type: "paragraph",
      content: "However, database types should never be passed un-sanitized to the browser. Use TypeScript utility types (`Pick`, `Omit`) or schema inference (`z.infer<typeof Schema>`) to define public-facing Data Transfer Objects (DTOs), guaranteeing that sensitive columns (such as password hashes or internal billing tokens) never cross the client serialization boundary.",
    },
    {
      type: "heading",
      level: 2,
      id: "type-safe-server-actions",
      text: "4. Type-Safe Server Actions with Zod Schema Validation",
    },
    {
      type: "paragraph",
      content: "Next.js Server Actions allow client components to invoke server-side functions without manually wiring REST API endpoints. However, because Server Actions expose public HTTP POST endpoints under the hood, they must never trust client input. Always validate payloads using a runtime validation library such as Zod:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/features/inquiries/actions/submitInquiry.ts",
      code: `"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const InquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectType: z.enum(["web", "mobile", "ai", "custom"]),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must provide technical context"),
});

export type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitInquiry(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = InquirySchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the highlighted errors.",
    };
  }

  try {
    await db.inquiries.create({
      data: validated.data,
    });
    revalidatePath("/contact");
    return { success: true, message: "Inquiry received. We will respond within 24 hours." };
  } catch (error) {
    console.error("Failed to persist inquiry", error);
    return { success: false, message: "Server error. Please try again shortly." };
  }
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "resilient-database-connection-pooling",
      text: "5. Connection Pooling and Serverless Database Hygiene",
    },
    {
      type: "paragraph",
      content: "When running Next.js on serverless or edge environments (such as Vercel or AWS Lambda), each incoming request can spawn an isolated Node.js container. If your application opens a direct database connection per container, a sudden spike of 1,000 visitors will quickly exhaust your database's connection pool limits, bringing the database down.",
    },
    {
      type: "paragraph",
      content: "Always use connection poolers (such as PgBouncer, Supabase Pooler, or Prisma Accelerate) and instantiate your database client as a global singleton during development to prevent hot-reloading from creating hundreds of orphaned connections:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/lib/db.ts",
      code: `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;`,
    },
    {
      type: "takeaways",
      title: "Scalable Architecture Takeaways",
      items: [
        "Colocate code by business feature rather than technical role to keep domain logic self-contained.",
        "Enforce strict runtime validation on all Server Actions with Zod before touching your database.",
        "Sanitize and project database records into explicit DTOs before passing them across Server-Client boundaries.",
        "Implement connection pooling on serverless deployments to protect relational databases under high concurrency.",
      ],
    },
  ],
};
