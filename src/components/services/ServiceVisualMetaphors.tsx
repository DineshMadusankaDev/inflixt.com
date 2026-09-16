import { FC } from "react";

interface MetaphorProps {
  className?: string;
}

/**
 * 01. Web Development Metaphor: Browser / Request / Web Architecture
 * Conceptual diagram depicting client edge routing through Next.js server components to headless APIs.
 */
export const WebArchitectureMetaphor: FC<MetaphorProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-xl bg-[#080512] border border-white/10 p-4 sm:p-5 overflow-hidden select-none ${className || ""}`}
    >
      {/* Background digital grid overlay */}
      <div className="absolute inset-0 digital-grid-bg opacity-30 pointer-events-none" />

      {/* Browser frame header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#9290A3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
          <span>https://app.client.com</span>
        </div>
        <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-wider">
          EDGE ROUTE
        </span>
      </div>

      {/* SVG Architecture Diagram */}
      <svg
        viewBox="0 0 460 200"
        className="w-full h-auto max-h-52 text-xs font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B2CFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#8B2CFF" />
          </linearGradient>
        </defs>

        {/* Conduit paths */}
        <path
          d="M 90 60 L 170 60"
          stroke="url(#flowGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M 270 60 L 350 60"
          stroke="url(#flowGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M 220 100 L 220 135"
          stroke="url(#flowGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Node 1: Client Request */}
        <rect
          x="10"
          y="30"
          width="80"
          height="60"
          rx="8"
          fill="#0B0717"
          stroke="rgba(0, 245, 255, 0.4)"
          strokeWidth="1"
        />
        <text x="50" y="55" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Client DOM
        </text>
        <text x="50" y="72" fill="#9290A3" textAnchor="middle" fontSize="9">
          User Input
        </text>

        {/* Node 2: Edge & Next.js Core */}
        <rect
          x="170"
          y="25"
          width="100"
          height="70"
          rx="8"
          fill="#0B0717"
          stroke="rgba(0, 245, 255, 0.8)"
          strokeWidth="1.5"
        />
        <circle cx="220" cy="45" r="4" fill="#00F5FF" />
        <text x="220" y="65" fill="#00F5FF" textAnchor="middle" fontSize="11" fontWeight="bold">
          Next.js App
        </text>
        <text x="220" y="80" fill="#E7E5EE" textAnchor="middle" fontSize="8">
          Edge Routing · SSR
        </text>

        {/* Node 3: Headless APIs */}
        <rect
          x="350"
          y="30"
          width="90"
          height="60"
          rx="8"
          fill="#0B0717"
          stroke="rgba(139, 44, 255, 0.4)"
          strokeWidth="1"
        />
        <text x="395" y="55" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Headless API
        </text>
        <text x="395" y="72" fill="#9290A3" textAnchor="middle" fontSize="9">
          REST / Schema
        </text>

        {/* Node 4: Bottom Component Architecture Strip */}
        <rect
          x="70"
          y="135"
          width="300"
          height="45"
          rx="6"
          fill="#0B0717"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text x="220" y="155" fill="#E7E5EE" textAnchor="middle" fontSize="10" fontWeight="500">
          Modular Component System
        </text>
        <text x="220" y="170" fill="#9290A3" textAnchor="middle" fontSize="8">
          Type-Safe UI · Dynamic Rendering · State Pipeline
        </text>
      </svg>
    </div>
  );
};

/**
 * 02. E-commerce Metaphor: Product → Cart → Checkout → Delivery
 * Linear transaction flow illustrating catalog sync, stateful cart, multi-currency checkout, and order pipeline.
 */
export const EcommerceMetaphor: FC<MetaphorProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-xl bg-[#080512] border border-white/10 p-4 sm:p-5 overflow-hidden select-none ${className || ""}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <span className="text-[11px] font-mono text-[#00F5FF] uppercase tracking-wider">
          TRANSACTION PIPELINE
        </span>
        <span className="text-[10px] font-mono text-[#9290A3]">
          Multi-Currency Flow
        </span>
      </div>

      <svg
        viewBox="0 0 420 140"
        className="w-full h-auto max-h-40 text-xs font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 80 65 L 120 65 M 185 65 L 225 65 M 290 65 L 330 65"
          stroke="rgba(0, 245, 255, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Step 1: Catalog */}
        <rect x="10" y="35" width="70" height="60" rx="8" fill="#0B0717" stroke="rgba(255, 255, 255, 0.15)" />
        <circle cx="45" cy="55" r="3" fill="#00F5FF" />
        <text x="45" y="73" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Catalog
        </text>
        <text x="45" y="85" fill="#9290A3" textAnchor="middle" fontSize="8">
          Inventory
        </text>

        {/* Step 2: Dynamic Cart */}
        <rect x="120" y="35" width="65" height="60" rx="8" fill="#0B0717" stroke="rgba(0, 245, 255, 0.4)" />
        <circle cx="152" cy="55" r="3" fill="#00F5FF" />
        <text x="152" y="73" fill="#00F5FF" textAnchor="middle" fontSize="10" fontWeight="600">
          Cart Flow
        </text>
        <text x="152" y="85" fill="#9290A3" textAnchor="middle" fontSize="8">
          Session Sync
        </text>

        {/* Step 3: Global Checkout */}
        <rect x="225" y="35" width="65" height="60" rx="8" fill="#0B0717" stroke="rgba(139, 44, 255, 0.4)" />
        <circle cx="257" cy="55" r="3" fill="#8B2CFF" />
        <text x="257" y="73" fill="#8B2CFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Checkout
        </text>
        <text x="257" y="85" fill="#9290A3" textAnchor="middle" fontSize="8">
          Gateway
        </text>

        {/* Step 4: Fulfillment */}
        <rect x="330" y="35" width="80" height="60" rx="8" fill="#0B0717" stroke="rgba(255, 255, 255, 0.15)" />
        <circle cx="370" cy="55" r="3" fill="#00F5FF" />
        <text x="370" y="73" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Fulfillment
        </text>
        <text x="370" y="85" fill="#9290A3" textAnchor="middle" fontSize="8">
          Notification
        </text>
      </svg>
    </div>
  );
};

/**
 * 03. Mobile App Metaphor: Unified App Core → iOS / Android
 * Single Flutter & Dart codebase distributing into iOS and Android client binaries.
 */
export const MobileEngineMetaphor: FC<MetaphorProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-xl bg-[#080512] border border-white/10 p-4 sm:p-5 overflow-hidden select-none ${className || ""}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <span className="text-[11px] font-mono text-[#8B2CFF] uppercase tracking-wider">
          CROSS-PLATFORM ARCHITECTURE
        </span>
        <span className="text-[10px] font-mono text-[#9290A3]">
          Unified Codebase
        </span>
      </div>

      <svg
        viewBox="0 0 420 140"
        className="w-full h-auto max-h-40 text-xs font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branching conduits from central core */}
        <path
          d="M 170 70 C 220 70, 240 45, 280 45"
          stroke="rgba(0, 245, 255, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M 170 70 C 220 70, 240 95, 280 95"
          stroke="rgba(139, 44, 255, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Central Core: Flutter & Dart */}
        <rect
          x="20"
          y="35"
          width="150"
          height="70"
          rx="10"
          fill="#0B0717"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
        />
        <circle cx="45" cy="70" r="5" fill="#00F5FF" />
        <text x="105" y="65" fill="#FFFFFF" textAnchor="middle" fontSize="11" fontWeight="bold">
          Flutter & Dart Core
        </text>
        <text x="105" y="82" fill="#9290A3" textAnchor="middle" fontSize="8">
          Single Codebase Logic
        </text>

        {/* Target 1: iOS Application */}
        <rect
          x="280"
          y="20"
          width="120"
          height="45"
          rx="8"
          fill="#0B0717"
          stroke="rgba(0, 245, 255, 0.5)"
          strokeWidth="1"
        />
        <circle cx="298" cy="42" r="3" fill="#00F5FF" />
        <text x="345" y="40" fill="#00F5FF" textAnchor="middle" fontSize="10" fontWeight="600">
          iOS Platform
        </text>
        <text x="345" y="53" fill="#9290A3" textAnchor="middle" fontSize="8">
          App Store Build
        </text>

        {/* Target 2: Android Application */}
        <rect
          x="280"
          y="75"
          width="120"
          height="45"
          rx="8"
          fill="#0B0717"
          stroke="rgba(139, 44, 255, 0.5)"
          strokeWidth="1"
        />
        <circle cx="298" cy="97" r="3" fill="#8B2CFF" />
        <text x="345" y="95" fill="#B026FF" textAnchor="middle" fontSize="10" fontWeight="600">
          Android Platform
        </text>
        <text x="345" y="108" fill="#9290A3" textAnchor="middle" fontSize="8">
          Google Play Build
        </text>
      </svg>
    </div>
  );
};

/**
 * 04. Custom Software Metaphor: Data → Logic → System → Interface
 * Full-width system architectural blueprint depicting data pipelines, backend services, and role-based access.
 */
export const CustomSoftwareMetaphor: FC<MetaphorProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-xl bg-[#080512] border border-white/10 p-4 sm:p-5 overflow-hidden select-none ${className || ""}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <span className="text-[11px] font-mono text-[#00F5FF] uppercase tracking-wider">
          SYSTEM ARCHITECTURE
        </span>
        <span className="text-[10px] font-mono text-[#9290A3]">
          Tiered Service Pipeline
        </span>
      </div>

      <svg
        viewBox="0 0 540 140"
        className="w-full h-auto max-h-40 text-xs font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 115 70 L 155 70 M 265 70 L 305 70 M 415 70 L 445 70"
          stroke="rgba(0, 245, 255, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Tier 1: Data Ingestion & Storage */}
        <rect x="10" y="35" width="105" height="70" rx="8" fill="#0B0717" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="62" y="65" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Relational Core
        </text>
        <text x="62" y="80" fill="#9290A3" textAnchor="middle" fontSize="8">
          PostgreSQL / MySQL
        </text>

        {/* Tier 2: Backend Logic & Microservices */}
        <rect x="155" y="30" width="110" height="80" rx="8" fill="#0B0717" stroke="rgba(0, 245, 255, 0.6)" strokeWidth="1.5" />
        <circle cx="210" cy="50" r="3" fill="#00F5FF" />
        <text x="210" y="70" fill="#00F5FF" textAnchor="middle" fontSize="10" fontWeight="bold">
          Logic Services
        </text>
        <text x="210" y="85" fill="#E7E5EE" textAnchor="middle" fontSize="8">
          FastAPI / Node.js
        </text>
        <text x="210" y="98" fill="#9290A3" textAnchor="middle" fontSize="7">
          Async Queues
        </text>

        {/* Tier 3: Security & RBAC */}
        <rect x="305" y="35" width="110" height="70" rx="8" fill="#0B0717" stroke="rgba(139, 44, 255, 0.5)" />
        <circle cx="360" cy="55" r="3" fill="#8B2CFF" />
        <text x="360" y="72" fill="#B026FF" textAnchor="middle" fontSize="10" fontWeight="600">
          Access Control
        </text>
        <text x="360" y="87" fill="#9290A3" textAnchor="middle" fontSize="8">
          Role-Based Auth
        </text>

        {/* Tier 4: Business Interface */}
        <rect x="445" y="35" width="85" height="70" rx="8" fill="#0B0717" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="487" y="65" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Admin UI
        </text>
        <text x="487" y="80" fill="#9290A3" textAnchor="middle" fontSize="8">
          Ops Portal
        </text>
      </svg>
    </div>
  );
};

/**
 * 05. AI & Automation Metaphor: Input → Intelligence → Automation → Action
 * Model loop showing structured processing from prompt context evaluation to automated action.
 */
export const AIAutomationMetaphor: FC<MetaphorProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-xl bg-[#080512] border border-white/10 p-4 sm:p-5 overflow-hidden select-none ${className || ""}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <span className="text-[11px] font-mono text-[#00F5FF] uppercase tracking-wider">
          INTELLIGENCE LOOP
        </span>
        <span className="text-[10px] font-mono text-[#9290A3]">
          Gemini API Workflow
        </span>
      </div>

      <svg
        viewBox="0 0 420 140"
        className="w-full h-auto max-h-40 text-xs font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 90 70 L 130 70 M 250 70 L 290 70"
          stroke="rgba(0, 245, 255, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Step 1: Input */}
        <rect x="10" y="35" width="80" height="70" rx="8" fill="#0B0717" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="50" y="65" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Data Stream
        </text>
        <text x="50" y="80" fill="#9290A3" textAnchor="middle" fontSize="8">
          Unstructured
        </text>

        {/* Step 2: Gemini Context & Intelligence Core */}
        <rect x="130" y="25" width="120" height="90" rx="10" fill="#0B0717" stroke="rgba(0, 245, 255, 0.8)" strokeWidth="1.5" />
        <circle cx="190" cy="45" r="4" fill="#00F5FF" />
        <text x="190" y="65" fill="#00F5FF" textAnchor="middle" fontSize="11" fontWeight="bold">
          Google Gemini
        </text>
        <text x="190" y="80" fill="#E7E5EE" textAnchor="middle" fontSize="8">
          Context & Reasoning
        </text>
        <text x="190" y="95" fill="#9290A3" textAnchor="middle" fontSize="7">
          Structured Extraction
        </text>

        {/* Step 3: Automated Action / Webhook */}
        <rect x="290" y="35" width="120" height="70" rx="8" fill="#0B0717" stroke="rgba(139, 44, 255, 0.5)" />
        <circle cx="350" cy="55" r="3" fill="#8B2CFF" />
        <text x="350" y="73" fill="#B026FF" textAnchor="middle" fontSize="10" fontWeight="600">
          Automated Action
        </text>
        <text x="350" y="88" fill="#9290A3" textAnchor="middle" fontSize="8">
          Pipeline Webhooks
        </text>
      </svg>
    </div>
  );
};

/**
 * 06. SEO Metaphor: Structure → Discovery → Search → Growth
 * Topology graph depicting semantic markup, JSON-LD schema relations, and search engine discovery.
 */
export const SEOMetaphor: FC<MetaphorProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-xl bg-[#080512] border border-white/10 p-4 sm:p-5 overflow-hidden select-none ${className || ""}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <span className="text-[11px] font-mono text-[#8B2CFF] uppercase tracking-wider">
          TECHNICAL INDEXATION
        </span>
        <span className="text-[10px] font-mono text-[#9290A3]">
          Semantic Architecture
        </span>
      </div>

      <svg
        viewBox="0 0 420 140"
        className="w-full h-auto max-h-40 text-xs font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 100 70 L 140 70 M 240 70 L 280 70"
          stroke="rgba(139, 44, 255, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Step 1: Semantic DOM */}
        <rect x="10" y="35" width="90" height="70" rx="8" fill="#0B0717" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="55" y="65" fill="#FFFFFF" textAnchor="middle" fontSize="10" fontWeight="600">
          Semantic DOM
        </text>
        <text x="55" y="80" fill="#9290A3" textAnchor="middle" fontSize="8">
          HTML5 Structure
        </text>

        {/* Step 2: JSON-LD Graph */}
        <rect x="140" y="30" width="100" height="80" rx="8" fill="#0B0717" stroke="rgba(0, 245, 255, 0.5)" strokeWidth="1" />
        <circle cx="190" cy="50" r="3" fill="#00F5FF" />
        <text x="190" y="70" fill="#00F5FF" textAnchor="middle" fontSize="10" fontWeight="bold">
          JSON-LD Schema
        </text>
        <text x="190" y="85" fill="#E7E5EE" textAnchor="middle" fontSize="8">
          Entity Relations
        </text>
        <text x="190" y="98" fill="#9290A3" textAnchor="middle" fontSize="7">
          Crawl Optimization
        </text>

        {/* Step 3: Search Discovery */}
        <rect x="280" y="35" width="130" height="70" rx="8" fill="#0B0717" stroke="rgba(139, 44, 255, 0.5)" />
        <circle cx="345" cy="55" r="3" fill="#8B2CFF" />
        <text x="345" y="73" fill="#B026FF" textAnchor="middle" fontSize="10" fontWeight="600">
          Engine Discovery
        </text>
        <text x="345" y="88" fill="#9290A3" textAnchor="middle" fontSize="8">
          Indexation & Signals
        </text>
      </svg>
    </div>
  );
};
