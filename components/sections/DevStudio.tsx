"use client";

import Image from "next/image";
import DepthCard from "../depth/DepthCard";
import SectionLabel from "../ui/SectionLabel";
import Tag from "../ui/Tag";

export default function DevStudio() {
  const clients = [
    {
      id: "cresults",
      client: "cResults Consulting",
      location: "United States (Retainer)",
      role: "Full-Stack Refactor",
      problem:
        "cResults needed a complete refactoring of their customer portal and marketing pipeline under a strict 45-day deadline with zero operational downtime allowed.",
      decision:
        "Built a hybrid Headless CMS setup using Next.js Incremental Static Regeneration (ISR) and integrated it with their legacy CRM endpoints to avoid data migration risks.",
      outcome:
        "Delivered the system 5 days ahead of schedule, resulting in a 40% improvement in lighthouse performance and leading to the foundation of Dev Studio.",
      stack: [
        "Next.js",
        "TypeScript",
        "CRM Integration",
        "ISR",
        "Tailwind CSS",
      ],
      metrics: [
        { value: "-5 Days", label: "Delivery Speedup" },
        { value: "+40%", label: "Lighthouse Performance" },
        { value: "Zero", label: "Migration Downtime" },
      ],
      image: null, // Pure editorial text-focused layout
    },
    {
      id: "namrl",
      client: "NAMRL",
      location: "India",
      role: "SEO & Growth Architecture",
      problem:
        "NAMRL required search visibility for their multi-brand pharmaceutical portfolio to acquire organic business leads without paid advertising campaigns.",
      decision:
        "Engineered on-page SEO, configured custom schema structures, and optimized content publishing flows using Rank Math across 4 primary brand sites.",
      outcome:
        "Drove 41,600+ Google search impressions and 1,280+ organic clicks; successfully ranked 3 primary keywords in top-3 Google search positions.",
      stack: [
        "Next.js",
        "Rank Math",
        "SEO Engine",
        "Analytics",
        "Google Console",
      ],
      metrics: [
        { value: "41,600+", label: "Google Impressions" },
        { value: "1,280+", label: "Organic Clicks" },
        { value: "Top-3", label: "Rank Positions" },
      ],
      image: "/images/projects/Namrl.png",
    },
    {
      id: "kiyomi",
      client: "KIYOMI Facilities",
      location: "India",
      role: "Frontend Brand Engineering",
      problem:
        "KIYOMI Facilities needed an online brand showcase that matched their high-end, premium service quality and allowed clean code handoff to their internal IT team.",
      decision:
        "Developed custom, section-based landing page architectures utilizing Next.js, Framer Motion, and shadcn/ui for smooth interaction rhythm.",
      outcome:
        "Delivered a fully responsive site scoring 100% on performance and accessibility checklists, featuring 60fps animations and reusable layouts.",
      stack: [
        "Next.js",
        "TypeScript",
        "Framer Motion",
        "shadcn/ui",
        "Tailwind CSS",
      ],
      metrics: [
        { value: "100%", label: "Lighthouse Score" },
        { value: "60fps", label: "Animation Rhythm" },
        { value: "100%", label: "Component Reusability" },
      ],
      image: "/images/projects/Kiyomi.png",
    },
  ];

  return (
    <section
      id="studio"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col max-w-[620px]">
            <SectionLabel label="03 / DEV STUDIO" />
            <h2 className="text-[2.5rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
              Delivering commercial products under{" "}
              <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
                real-world constraints.
              </span>
            </h2>
          </div>
          <p className="text-[13px] text-[var(--color-ink-2)] leading-relaxed max-w-[450px]">
            Dev Studio is a boutique development agency founded to build robust,
            high-performance web products for companies globally. From US CRM
            integrations to technical SEO growth campaigns, I deliver code under
            strict deadlines.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clients.map((c) => (
            <DepthCard
              key={c.id}
              level={1}
              className="flex flex-col bg-white overflow-hidden p-6 h-full justify-between shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
            >
              <div className="flex flex-col">
                {/* Meta details */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider">
                    {c.location}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-2)] uppercase tracking-wider font-semibold">
                    {c.role}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[1.3rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-4">
                  {c.client}
                </h3>

                {/* Screenshot if available, else editorial spacing */}
                {c.image ? (
                  <div className="w-full h-[160px] relative rounded-lg overflow-hidden border border-[var(--color-surface-3)] mb-6">
                    <Image
                      src={c.image}
                      alt={c.client}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 hover:scale-102"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[160px] flex items-center justify-center bg-[var(--color-surface-2)] border border-dashed border-[var(--color-surface-3)] rounded-lg mb-6">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink-3)] uppercase">
                      Enterprise CRM Architecture
                    </span>
                  </div>
                )}

                {/* Details */}
                <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed mb-6">
                  {c.decision} {c.outcome}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {c.stack.slice(0, 4).map((tag) => (
                    <Tag key={tag} className="text-[9px] px-2 py-0.5">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Metrics Footer */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--color-surface-3)] mt-auto">
                {c.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-[1.15rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
                      {m.value}
                    </span>
                    <span className="text-[8px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </DepthCard>
          ))}
        </div>
      </div>
    </section>
  );
}
