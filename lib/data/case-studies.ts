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
  githubUrl?: string;
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
      "AI code assistants produced generic code due to slow, unoptimized context parsing.",
    decision:
      "Engineered a Gemini self-repair validation layer and optimized WebContainers WASM structure.",
    outcome:
      "Cut preview loads from 5m to <60s, slashing runtime sandbox crashes to <0.5%.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WASM",
      "Babel AST",
      "OpenRouter",
    ],
    liveUrl: "https://dev-flow-lime.vercel.app/",
    githubUrl: "https://github.com/prajyot-porje/DevFlow",
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
      "Multi-tenant context engines face concurrency and memory bloat under scale.",
    decision:
      "Built a JSON-RPC 2.0 MCP server with PostgreSQL tenant isolation and 8% decay cron.",
    outcome:
      "Achieved sub-15ms graph queries and resolved critical WebGL pointer-event desync.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Three.js",
      "WebGL",
      "Redis",
    ],
    liveUrl: "https://context-graph-amber.vercel.app/",
    githubUrl: "https://github.com/prajyot-porje/Context-Graph",
    year: "2026",
    image: "/images/projects/contextGraph.png",
    metrics: [
      { value: "<15ms", label: "Graph Query Response Latency" },
      { value: "8%", label: "Weekly Exponential Memory Decay" },
      { value: "Zero", label: "Security Boundary Leak Incidents" },
    ],
  },
  {
    id: "jobtracker",
    index: "03",
    title: "Job Tracker",
    tagline: "AI-automated application tracking and pipeline analytics.",
    problem:
      "Applying to dozens of roles without a central system leaves application trends and response patterns completely invisible.",
    decision:
      "Built a background email-scraping AI agent cron to parse confirmations and push structured data to Supabase.",
    outcome:
      "Shipped a native Expo client in 24 hours featuring custom Victory charts and Skia spring-animated theme switching.",
    stack: [
      "Expo",
      "React Native",
      "Supabase",
      "TypeScript",
      "Victory Native",
      "Reanimated",
    ],
    githubUrl: "https://github.com/prajyot-porje/Job-tracker",
    year: "2026",
    image: "/images/projects/Jobtracker.png",
    metrics: [
      { value: "24 Hours", label: "Design to Production" },
      { value: "100%", label: "Automated Ingestion" },
      { value: "Real-time", label: "Pipeline Sync" },
    ],
  },
];
