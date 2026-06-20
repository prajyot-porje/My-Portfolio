export type Principle = {
  index: string;
  statement: string;
  elaboration: string;
};

export const principles: Principle[] = [
  {
    index: "01",
    statement: "Write code that can be deleted easily.",
    elaboration:
      "Software requirements evolve rapidly. By building highly modular, self-contained files and avoiding early dry-run abstractions, we ensure that obsolete features can be completely purged from the codebase without leaving zombie code or creating hidden dependencies.",
  },
  {
    index: "02",
    statement: "Uptime is a product feature, not an operations metric.",
    elaboration:
      "Reliability directly impacts user trust and conversion rates. Implementing fault-tolerant multi-model LLM chains, self-healing code compilation, and zero-trust API layers prevents failures from ever reaching the client interface.",
  },
  {
    index: "03",
    statement: "Static is always faster than dynamic.",
    elaboration:
      "Optimize for compile-time rendering. By utilizing Next.js Incremental Static Regeneration (ISR) and aggressively caching database queries, we deliver sub-second response times and bulletproof hosting scalability.",
  },
  {
    index: "04",
    statement: "Abstract only when you have duplicated three times.",
    elaboration:
      "Early abstraction is far more expensive than duplication. Writing repetitive code in the short term keeps the architecture flexible, allowing the true structural pattern to emerge naturally before refactoring it into a library utility.",
  },
  {
    index: "05",
    statement: "UX polish is a performance optimizer.",
    elaboration:
      "Intelligent micro-interactions, magnetic elements, and spring-driven animations decrease perceived latency. Instantly reacting to user inputs within 16ms keeps the product feeling snappy, even when waiting on slow network payloads.",
  },
];
