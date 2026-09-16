import { InsightArticle } from "@/types";

const defaultAuthor = {
  name: "Dinesh Madhusankha",
  role: "Founder, Inflixt Global",
  avatar: "/dinesh_madhusankha.webp",
  url: "/about",
};

export const article18: InsightArticle = {
  id: "api-integration-business-software-checklist",
  slug: "api-integration-business-software-checklist",
  title: "API Integration for Business Software: Architecture, Security, and Pre-Development Checklist",
  subtitle: "Designing resilient REST endpoints, managing authentication tokens, and ensuring data consistency across external systems.",
  topic: "Software Architecture",
  category: "Software Architecture",
  summary: "A comprehensive technical checklist for engineering API integrations in commercial software. Learn how to architect authentication handshakes, parse Retry-After headers, manage webhooks securely with HMAC validation, and maintain data consistency across distributed systems.",
  status: "published",
  readTime: "7 min read",
  author: defaultAuthor,
  featured: false,
  tableOfContents: [
    { id: "the-connected-software-reality", title: "1. The Modern Connected Software Ecosystem", level: 2 },
    { id: "authentication-and-credential-security", title: "2. Authentication Protocols: API Keys, OAuth 2.0 & JWTs", level: 2 },
    { id: "rate-limits-and-backoff-strategies", title: "3. Handling Rate Limits: Retry-After Headers & Exponential Backoff", level: 2 },
    { id: "data-consistency-and-idempotency", title: "4. Preventing Data Drift: Two-Phase Commits & Idempotency", level: 2 },
    { id: "webhook-security-and-signature-validation", title: "5. Webhook Security: HMAC SHA-256 Signature Validation", level: 2 },
    { id: "pre-development-api-checklist", title: "6. Pre-Development API Integration Checklist", level: 2 },
  ],
  alignedService: {
    id: "custom-software",
    title: "Custom Software",
    href: "/services#custom-software",
    description: "Architecting secure, resilient API microservices and third-party integrations that connect legacy software with modern cloud ecosystems.",
  },
  relatedSlugs: [
    "automate-business-workflows-custom-software",
    "custom-software-vs-off-the-shelf-saas",
    "scalable-web-application-nextjs-typescript",
  ],
  seo: {
    title: "API Integration for Business Software: Architecture & Security Guide",
    description: "Essential pre-development guide for business software API integrations. Master OAuth 2.0, webhook signature verification, rate-limiting, and idempotency.",
    keywords: [
      "API integration business software",
      "REST API architecture security",
      "Webhook signature validation HMAC",
      "OAuth 2.0 business software",
      "Third party API integration checklist",
      "Retry After exponential backoff",
    ],
  },
  editorial: {
    primaryTopic: "API integration for business software",
    secondaryTopics: [
      "REST API integration",
      "Webhook architecture",
      "OAuth 2.0 and API keys",
      "Data consistency and idempotency",
      "Rate limiting Retry-After header",
      "Third-party API resilience",
    ],
    searchIntent: "Informational / Pre-Project Implementation",
    targetAudience: "Backend engineers, technical leads, and product managers designing software integrations with third-party platforms.",
    sources: [
      "IETF RFC 6749: The OAuth 2.0 Authorization Framework",
      "IETF RFC 6585: Additional HTTP Status Codes (429 Too Many Requests)",
      "OWASP API Security Top 10 (owasp.org/www-project-api-security)",
      "Stripe Engineering: Designing Robust Webhook Systems with Idempotency",
    ],
    editorialNotes: "Updated retry logic to inspect RFC 6585 Retry-After header. Removed forced Fair Comment case study per editorial audit.",
  },
  blocks: [
    {
      type: "paragraph",
      content: "Modern software rarely exists in isolation. Whether synchronizing inventory with an ERP, charging credit cards through Stripe, dispatching transactional SMS via Twilio, or pulling customer records from Salesforce, the commercial utility of modern applications is defined by how reliably they communicate with external APIs through [bespoke custom software engineering](/services#custom-software).",
    },
    {
      type: "paragraph",
      content: "However, third-party API integrations are notoriously fragile when implemented hastily. Upstream services experience network outages, modify response payloads without warning, rotate security tokens, or throttle traffic during peak business hours. Engineering an enterprise-grade API integration requires defensive architecture that insulates your core business from external volatility.",
    },
    {
      type: "heading",
      level: 2,
      id: "the-connected-software-reality",
      text: "1. The Modern Connected Software Ecosystem",
    },
    {
      type: "paragraph",
      content: "Every external API call introduces network latency, potential failure states, and security liabilities. A production integration must account for three fundamental operational states: Success, Expected Client Error (4xx, such as invalid parameters), and Upstream Server Error (5xx or timeout). Code that assumes the external API will always return 200 OK within 200ms will inevitably crash under production load.",
    },
    {
      type: "heading",
      level: 2,
      id: "authentication-and-credential-security",
      text: "2. Authentication Protocols: API Keys, OAuth 2.0 & JWTs",
    },
    {
      type: "paragraph",
      content: "Never commit API secrets, private keys, or tokens to source control repositories. Always inject credentials at runtime using encrypted environment secrets managers such as Doppler, AWS Secrets Manager, or Google Secret Manager.",
    },
    {
      type: "paragraph",
      content: "For services utilizing OAuth 2.0, automate token refresh handshakes. If an Access Token expires every 60 minutes, your application must automatically intercept 401 Unauthorized responses, use the securely stored Refresh Token to negotiate a fresh Access Token, update your database store, and transparently replay the original request without disrupting the user experience.",
    },
    {
      type: "heading",
      level: 2,
      id: "rate-limits-and-backoff-strategies",
      text: "3. Handling Rate Limits: Retry-After Headers & Exponential Backoff",
    },
    {
      type: "paragraph",
      content: "When an external service returns an HTTP 429 Too Many Requests response, immediately hammering the API with repeated retries will worsen the blockage and risk permanent IP throttling. A production-ready HTTP client must inspect the standard RFC `Retry-After` header before falling back to exponential backoff with random jitter:",
    },
    {
      type: "codeBlock",
      language: "typescript",
      filename: "src/lib/api/resilientFetch.ts",
      code: `export async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429 || response.status >= 500) {
        attempt++;
        if (attempt >= maxRetries) return response;

        // Inspect standard HTTP Retry-After header (in seconds)
        const retryAfterHeader = response.headers.get("Retry-After");
        let delayMs = Math.pow(2, attempt) * 500 + Math.random() * 200;

        if (retryAfterHeader) {
          const parsedSeconds = parseInt(retryAfterHeader, 10);
          if (!isNaN(parsedSeconds)) {
            delayMs = parsedSeconds * 1000;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      return response;
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error("Maximum retry limit exceeded.");
}`,
    },
    {
      type: "heading",
      level: 2,
      id: "data-consistency-and-idempotency",
      text: "4. Preventing Data Drift: Two-Phase Commits & Idempotency",
    },
    {
      type: "paragraph",
      content: "What happens if your software charges a customer's credit card via Stripe, but your database server loses network connectivity before recording the payment in your orders table? You have created a 'ghost charge'—the customer is billed, but their order never exists in your system.",
    },
    {
      type: "paragraph",
      content: "To guarantee data consistency, pair transactional database operations with unique idempotency keys. When triggering multi-step operations, structure your backend around the event-driven patterns detailed in our [business workflow automation blueprint](/insights/automate-business-workflows-custom-software).",
    },
    {
      type: "heading",
      level: 2,
      id: "webhook-security-and-signature-validation",
      text: "5. Webhook Security: HMAC SHA-256 Signature Validation",
    },
    {
      type: "paragraph",
      content: "Because webhook endpoints are public HTTP URLs, anyone on the internet can send fabricated POST requests pretending to be Stripe or Shopify. You must never trust unverified webhook payloads.",
    },
    {
      type: "paragraph",
      content: "Always compute an HMAC SHA-256 hash of the raw, unparsed request body using your shared webhook secret, and verify that it matches the signature header sent by the provider using timing-safe string comparison. When building with modern full-stack frameworks, this validation is cleanly implemented inside server actions, as illustrated in our guide to [scalable Next.js and TypeScript applications](/insights/scalable-web-application-nextjs-typescript).",
    },
    {
      type: "takeaways",
      title: "API Integration Architecture Takeaways",
      items: [
        "Store secrets in environment vault managers; automate OAuth 2.0 refresh cycles to prevent session interruptions.",
        "Always parse the Retry-After header on HTTP 429 responses before defaulting to exponential backoff with jitter.",
        "Verify webhook signatures using HMAC SHA-256 and timing-safe equality checks before parsing payload data.",
        "Use database idempotency keys to ensure duplicate network requests never result in duplicate financial charges or records.",
      ],
    },
  ],
};
