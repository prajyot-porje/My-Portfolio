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
};

export const caseStudies: CaseStudy[] = [
  {
    id: "devflow",
    index: "01",
    title: "DevFlow",
    tagline: "The problem wasn't AI. The problem was context.",
    problem:
      "AI assistants were fast but lacked codebase awareness, producing generic and incorrect code. Existing tools were slow, indexing entire repositories naively and exhausting context windows.",
    decision:
      "Built a local indexing engine using TypeScript that analyzes imports, active file coordinates, and AST node relationships to construct a minimal, high-relevance context payload for LLM prompts.",
    outcome:
      "Successfully launched with paying users in launch week. Deployed as a full SaaS with sub-second context construction times and verified improvements in AI code generation accuracy.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "LLM APIs"],
    liveUrl: "https://devflow.in",
    year: "2024",
  },
  {
    id: "contextgraph",
    index: "02",
    title: "ContextGraph",
    tagline:
      "Multi-tenant context architecture - built when no pattern existed.",
    problem:
      "Integrating multi-tenant context engine into collaborative developer environments meant handling high write concurrency, complex graph structures, and absolute tenant security isolation.",
    decision:
      "Designed a multi-tenant graph persistence layer from scratch using isolated schema namespaces and transaction-safe schema migrations to prevent cross-tenant data leaks.",
    outcome:
      "Achieved sub-15ms graph query response times under simulated load of 1000 concurrent requests, with zero security boundary leaks detected during penetration testing.",
    stack: ["Next.js", "TypeScript", "Graph DB", "Redis"],
    year: "2025",
  },
  {
    id: "dev-studio",
    index: "03",
    title: "Dev Studio x cResults",
    tagline:
      "Shipped for a US client under real constraints. Then turned it into a studio.",
    problem:
      "cResults needed a complete refactoring of their customer portal and marketing pipeline under a strict 45-day deadline with zero operational downtime allowed.",
    decision:
      "Built a hybrid Headless CMS setup using Next.js Incremental Static Regeneration (ISR) and integrated it with their legacy CRM endpoints to avoid data migration risks.",
    outcome:
      "Delivered the system 5 days ahead of schedule, resulting in a 40% improvement in lighthouse performance and leading to the foundation of Dev Studio to handle ongoing US contracts.",
    stack: ["Next.js", "TypeScript", "CRM Integration", "SEO"],
    liveUrl: "https://dev-studio.in",
    year: "2024 - Present",
  },
];
