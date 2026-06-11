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
    problem: "",
    decision: "",
    outcome: "",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "",
    year: "2024",
  },
  {
    id: "contextgraph",
    index: "02",
    title: "ContextGraph",
    tagline:
      "Multi-tenant context architecture — built when no pattern existed.",
    problem: "",
    decision: "",
    outcome: "",
    stack: ["Next.js", "TypeScript"],
    year: "2025",
  },
  {
    id: "dev-studio",
    index: "03",
    title: "Dev Studio × cResults",
    tagline:
      "Shipped for a US client under real constraints. Then turned it into a studio.",
    problem: "",
    decision: "",
    outcome: "",
    stack: ["WordPress", "Next.js", "SEO"],
    liveUrl: "https://dev-studio.in",
    year: "2024 — Present",
  },
];
