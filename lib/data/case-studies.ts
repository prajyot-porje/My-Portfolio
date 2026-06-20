export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  decision: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  year: string;
  image: string;
  metrics: { value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "devflow",
    index: "01",
    title: "DevFlow",
    tagline: "The problem wasn't AI. The problem was context.",
    problem:
      "AI code assistants produced generic, buggy code because they lacked full codebase context. Naive context indexing was too slow and quickly overloaded LLM prompt token windows.",
    decision:
      "Engineered an AST validation layer with a Gemini-powered 2-attempt self-repair loop to auto-correct syntax errors, and optimized WebContainers by blocking node_modules traversal.",
    outcome:
      "Launched to paying users. Cut browser-native preview load times from 5 minutes to under 60 seconds, and slashed runtime preview crashes from 12% to under 0.5%.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WASM",
      "Babel AST",
      "OpenRouter",
    ],
    liveUrl: "https://devflow.in",
    year: "2026",
    image: "/images/projects/Devflow.png",
    metrics: [
      { value: "5m → <60s", label: "WASM Preview Load Time" },
      { value: "99.2%", label: "Uptime on OpenRouter Cascade" },
      { value: "<0.5%", label: "Preview Sandbox Crash Rate" },
    ],
  },
  {
    id: "contextgraph",
    index: "02",
    title: "ContextGraph",
    tagline: "Multi-tenant context architecture — designed from scratch.",
    problem:
      "Integrating a multi-tenant context engine into collaborative environments required handling high write concurrency, complex graph memory, and absolute security boundaries.",
    decision:
      "Built a production JSON-RPC 2.0 MCP server with zero-trust PostgreSQL tenant isolation and designed an automated memory decay cron that applies 8% exponential decay to stale nodes.",
    outcome:
      "Achieved sub-15ms graph query response times under simulated load of 1000 concurrent requests, and fixed a WebGL pointer-event desync between Three.js Controls.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Three.js",
      "WebGL",
      "Redis",
    ],
    year: "2026",
    image: "/images/projects/contextGraph.png",
    metrics: [
      { value: "<15ms", label: "Graph Query Response Latency" },
      { value: "8%", label: "Weekly Exponential Memory Decay" },
      { value: "Zero", label: "Security Boundary Leak Incidents" },
    ],
  },
  {
    id: "cresults",
    index: "03",
    title: "cResults / Dev Studio",
    tagline: "Enterprise client portal — shipped 5 days ahead of deadline.",
    problem:
      "A US client's legacy CRM integration had severe sync delays, causing inconsistent tenant states and critical data loss. The portal refactor had a hard 45-day SLA deadline.",
    decision:
      "Implemented a Next.js Incremental Static Regeneration (ISR) layer over PostgreSQL to decouple reads, and wrote a concurrent CRM synchronizer with transaction rollbacks.",
    outcome:
      "Delivered 5 days ahead of the 45-day deadline. Slashed portal load latency from 4.5 seconds to 150ms, boosted Lighthouse performance to 100%, and achieved zero downtime sync.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "ISR",
      "Tailwind CSS",
      "CRM API",
    ],
    liveUrl: "https://devstudio.io",
    year: "2026",
    image: "/images/projects/Kiyomi.png",
    metrics: [
      { value: "5 Days Early", label: "Delivery Speedup" },
      { value: "+40%", label: "Lighthouse Performance" },
      { value: "0.0%", label: "Data Sync Downtime" },
    ],
  },
];
