import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article10: InsightArticle = {
  id: "building-ai-features-existing-software",
  slug: "building-ai-features-existing-software",
  title: "Building AI Features into Existing Software: Architecture, APIs, and Data Considerations",
  subtitle: "A technical guide to retrofitting mature applications with LLMs, vector search, and tenant-isolated data pipelines.",
  topic: "AI & Automation",
  category: "AI & Automation",
  summary: "An engineering blueprint for integrating AI capabilities into established software codebases. Learn how to design Retrieval-Augmented Generation (RAG) with PostgreSQL pgvector, enforce multi-tenant data boundaries, implement semantic caching, and manage API cost budgets.",
  status: "published",
  readTime: "7 min read",
  author: defaultAuthor,
  featured: false,
  tableOfContents: [
    { id: "the-brownfield-ai-challenge", title: "1. The Brownfield AI Dilemma: Retrofitting vs. Rewriting", level: 2 },
    { id: "rag-architecture-with-pgvector", title: "2. Retrieval-Augmented Generation (RAG) in Relational Databases", level: 2 },
    { id: "understanding-vector-distance-metrics", title: "3. Clarifying Vector Operators: Cosine Distance vs. Similarity", level: 2 },
    { id: "chunking-and-ingestion-pipelines", title: "4. Document Chunking & Asynchronous Ingestion Queues", level: 2 },
    { id: "multi-tenant-data-isolation", title: "5. Multi-Tenant Data Privacy & Row-Level Security (RLS)", level: 2 },
    { id: "semantic-caching-and-cost-control", title: "6. Semantic Caching with Redis & Token Budgeting", level: 2 },
  ],
  alignedService: {
    id: "custom-software",
    title: "Custom Software",
    href: "/services#custom-software",
    description: "Modernizing legacy platforms and engineering bespoke business software with integrated AI capabilities and scalable API architectures.",
  },
  relatedSlugs: [
    "practical-ai-integration-business-software",
    "ai-agents-repetitive-business-workflows",
    "api-integration-business-software-checklist",
  ],
  seo: {
    title: "Building AI Features into Existing Software: Architecture Guide",
    description: "Learn how to retrofit existing business software with AI features. Master RAG with pgvector, multi-tenant security, API caching, and cost control.",
    keywords: [
      "Building AI features existing software",
      "RAG architecture pgvector",
      "Multi-tenant AI security",
      "LLM API integration patterns",
      "PostgreSQL vector search",
      "AI software architecture",
    ],
  },
  editorial: {
    primaryTopic: "Adding AI features to existing software",
    secondaryTopics: [
      "Retrieval-Augmented Generation (RAG)",
      "PostgreSQL pgvector",
      "Multi-tenant data isolation",
      "Semantic caching with Redis",
      "Document chunking pipelines",
      "LLM cost management",
    ],
    searchIntent: "Technical / Commercial Investigation",
    targetAudience: "Senior software engineers, SaaS founders, and engineering managers tasked with integrating AI capabilities into established codebases.",
    sources: [
      "PostgreSQL pgvector Extension Documentation (github.com/pgvector/pgvector)",
      "OWASP Top 10 for LLM Applications: Training Data Poisoning & Sensitive Information Disclosure",
      "Google Cloud Vertex AI Vector Search Guide",
    ],
    editorialNotes: "Updated to clarify pgvector distance operators, document chunking pipelines, and Redis semantic caching. Forced case study removed per editorial audit.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "Building an AI-first application from a clean slate is relatively straightforward: engineers select modern frameworks, configure an isolated vector database, and design schemas specifically for tokenized embeddings. However, in commercial technology, the vast majority of engineering value is created by retrofitting established, revenue-generating software applications with AI capabilities.",
    },
    {
      type: "paragraph",
      content: "Integrating Large Language Models into an existing 'brownfield' codebase introduces complex architectural challenges: preserving multi-tenant data boundaries, avoiding database lockups during heavy vector queries, handling unpredictable third-party API latency, and preventing proprietary customer data from leaking into public training datasets. Navigating these constraints requires treating AI as an integrated subsystem within your broader [custom software architecture](/services#custom-software).",
    },
    {
      type: "heading",
      level: 2,
      id: "the-brownfield-ai-challenge",
      text: "1. The Brownfield AI Dilemma: Retrofitting vs. Rewriting",
    },
    {
      type: "paragraph",
      content: "A frequent architectural mistake is attempting to rewrite an existing software platform simply to accommodate AI features. In reality, modern AI capabilities can be introduced incrementally as microservices or background worker pipelines connected to your primary database via standard APIs.",
    },
    {
      type: "paragraph",
      content: "Rather than spinning up an entirely separate managed vector database with its own authentication, network latency, and backup overhead, most applications can leverage their existing database engine. PostgreSQL natively supports vector storage and high-speed approximate nearest-neighbor indexing through the battle-tested `pgvector` extension.",
    },
    {
      type: "heading",
      level: 2,
      id: "rag-architecture-with-pgvector",
      text: "2. Retrieval-Augmented Generation (RAG) in Relational Databases",
    },
    {
      type: "paragraph",
      content: "Retrieval-Augmented Generation (RAG) allows an LLM to answer user queries using an organization's private documents without costly fine-tuning. By storing high-dimensional text embeddings directly alongside your existing relational records, queries can combine traditional SQL filters (such as tenant ID, date range, or user permissions) with semantic similarity vector searches.",
    },
    {
      type: "codeBlock",
      language: "sql",
      filename: "migrations/20260315_add_vector_embeddings.sql",
      code: `-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column (e.g., 768 dimensions for Gemini embeddings)
ALTER TABLE organization_documents 
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- Create HNSW index for fast approximate nearest-neighbor search
CREATE INDEX IF NOT EXISTS idx_documents_embedding 
ON organization_documents 
USING hnsw (embedding vector_cosine_ops);

-- Hybrid search query combining tenant security with semantic vector matching
SELECT id, title, content, 1 - (embedding <=> $1) AS similarity_score
FROM organization_documents
WHERE tenant_id = $2 AND is_archived = false
ORDER BY embedding <=> $1
LIMIT 5;`,
    },
    {
      type: "heading",
      level: 2,
      id: "understanding-vector-distance-metrics",
      text: "3. Clarifying Vector Operators: Cosine Distance vs. Similarity",
    },
    {
      type: "paragraph",
      content: "A critical technical detail often confused in AI documentation is the mathematical distinction between vector distance and vector similarity. In `pgvector`, the `<=>` operator computes **cosine distance**, not cosine similarity.",
    },
    {
      type: "paragraph",
      content: "Cosine distance measures how divergent two vectors are on a scale from 0 (identical direction) to 2 (directly opposing). To convert this distance metric into an intuitive similarity score where higher values represent closer relevance, the query subtracts the distance from 1: `1 - (embedding <=> $1)`. Ordering by `embedding <=> $1 ASC` ensures the database retrieves the closest semantic matches first using the HNSW index.",
    },
    {
      type: "callout",
      variant: "note",
      title: "Index Selection: HNSW vs. IVFFlat",
      content: "For production software, Hierarchical Navigable Small World (HNSW) indexes are strongly preferred over IVFFlat. HNSW provides significantly higher recall and handles dynamic insertions without requiring periodic retraining of cluster centroids.",
    },
    {
      type: "heading",
      level: 2,
      id: "chunking-and-ingestion-pipelines",
      text: "4. Document Chunking & Asynchronous Ingestion Queues",
    },
    {
      type: "paragraph",
      content: "LLMs cannot consume entire 100-page enterprise manuals in a single vector comparison. Ingestion pipelines must divide documents into focused, semantically coherent segments before generating embeddings through [practical AI integration workflows](/insights/practical-ai-integration-business-software).",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Fixed-Window with Overlap: Slicing text into 400–600 token chunks with a 50-token sliding overlap. This prevents contextual thoughts from being severed across chunk boundaries.",
        "Document Structure-Aware Chunking: Parsing markdown, HTML headers, or PDF sections to preserve header hierarchy within chunk metadata.",
        "Asynchronous Ingestion Queues: Never compute embeddings synchronously inside web request lifecycles. Offload PDF parsing, chunking, and API calls to background job workers running on BullMQ or AWS SQS.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "multi-tenant-data-isolation",
      text: "5. Multi-Tenant Data Privacy & Row-Level Security (RLS)",
    },
    {
      type: "paragraph",
      content: "In multi-tenant SaaS platforms, the highest-severity risk is data cross-contamination: allowing Tenant A's private internal records to appear in an AI-generated summary presented to Tenant B. Standard vector search indexes, if queried without explicit predicates, are completely blind to organizational boundaries.",
    },
    {
      type: "paragraph",
      content: "Enforce Row-Level Security (RLS) at the PostgreSQL layer, or mandate that every vector query incorporates a parameterized `tenant_id` filter prior to nearest-neighbor calculation. Furthermore, verify enterprise API agreements with model vendors to guarantee that inference payloads are zero-retention and strictly excluded from model training cycles.",
    },
    {
      type: "heading",
      level: 2,
      id: "semantic-caching-and-cost-control",
      text: "6. Semantic Caching with Redis & Token Budgeting",
    },
    {
      type: "paragraph",
      content: "External LLM APIs introduce variable latency and token-based billing that can spike unexpectedly. In high-volume systems, implementing defensive caching and rate-limiting patterns is essential for operational stability, mirroring best practices in [resilient API integration](/insights/api-integration-business-software-checklist).",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Semantic Redis Caching: Store previous user prompt embeddings in Redis. When an incoming query matches an existing embedding with >0.96 cosine similarity, return the cached completion instantly, reducing latency to under 30ms and eliminating API token costs.",
        "Per-Tenant Token Quotas: Implement token rate-limiters at your application API gateway using leaky bucket algorithms to protect against compromised credentials or accidental runaway loops.",
        "Model Tier Fallbacks: Configure automatic fallbacks from high-capability frontier models to faster, cost-effective models for routine summarization or classification tasks.",
      ],
    },
    {
      type: "takeaways",
      title: "Brownfield AI Architecture Takeaways",
      items: [
        "Use PostgreSQL with pgvector and HNSW indexes instead of introducing isolated, unmonitored external vector infrastructure.",
        "Remember that the <=> operator computes cosine distance; subtract distance from 1 to calculate cosine similarity.",
        "Process document chunking and vector generation asynchronously in background job queues.",
        "Enforce strict tenant_id parameters on every vector search to completely eliminate multi-tenant data leaks.",
        "Deploy semantic Redis caching to deflect redundant queries, slash token expenses, and maintain sub-second response times.",
      ],
    },
  ],
};
