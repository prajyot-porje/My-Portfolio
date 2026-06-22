"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionLabel from "../ui/SectionLabel";

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const items = [
    {
      index: "01",
      role: "B.E. in Artificial Intelligence & Machine Learning",
      company: "PES Modern College of Engineering",
      period: "2023 — 2027 (Expected)",
      location: "Pune, India",
      type: "Education",
      details: [
        "Acquired deep foundations in artificial intelligence, machine learning model pipeline architectures, data structures, and computer science systems.",
        "Maintained a strong academic record with a cumulative CGPA of 8.04.",
      ],
    },
    {
      index: "02",
      role: "Software Development Engineer Intern",
      company: "System & Solution",
      period: "Jan — Feb 2026",
      location: "Pune, India",
      type: "Internship",
      details: [
        "Implemented Employee Management and Attendance features in HRDesk, a production-grade HRMS, delivering complete form validations and date-based attendance tracking across the feature lifecycle.",
        "Triaged and resolved complex UI bugs in profile management workflows; authored module documentation and contributed through Git-based code reviews in a shared team codebase.",
      ],
      tags: ["PHP", "JavaScript", "HRMS", "Git"],
    },
    {
      index: "03",
      role: "Freelance Developer",
      company: "cResults Consulting",
      period: "Jun 2025 — Jun 2026",
      location: "Remote / USA",
      type: "Contract",
      details: [
        "Refactored user portal and marketing pipeline under a strict 45-day SLA, slashing load latency from 4.5s to 150ms and improving UI responsiveness.",
        "Implemented Next.js Incremental Static Regeneration (ISR) and built a concurrent transactional CRM synchronizer.",
        "Managed on-page technical SEO, Rank Math setups, and UI/bug optimization across a portfolio of 4 WordPress websites.",
        "Authored, updated, and optimized search-engine visibility for multiple articles and copy directly on client WordPress sites.",
      ],
      tags: ["Next.js", "TypeScript", "WordPress", "SEO", "ISR", "CRM API"],
    },
    {
      index: "04",
      role: "Freelance Frontend Developer",
      company: "NAMRL",
      period: "Oct 2025 — Feb 2026",
      location: "Pune, India",
      type: "Contract",
      details: [
        "Developed and deployed the client's web application using Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.",
        "Configured and maintained deployment pipelines and hosting configurations via cPanel.",
      ],
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Framer Motion",
        "cPanel",
      ],
    },
    {
      index: "05",
      role: "Freelance Frontend Developer",
      company: "KIYOMI Facilities",
      period: "Mar — Apr 2026",
      location: "Pune, India",
      type: "Contract",
      details: [
        "Developed and deployed the client's responsive web application using Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.",
        "Configured, optimized, and deployed the production application to the client's cPanel environment.",
      ],
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Framer Motion",
        "cPanel",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 max-w-[620px]">
          <SectionLabel label="05 / TIMELINE" />
          <h2 className="text-[2.5rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
            Professional track record and{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              academic baseline.
            </span>
          </h2>
        </div>

        {/* Timeline List */}
        <div className="flex flex-col border-t border-[var(--color-surface-3)]">
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isOpen = isHovered || expandedIndex === index;

            return (
              // biome-ignore lint/a11y/useSemanticElements: custom styled timeline row acts as button
              <div
                key={item.index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => toggleExpand(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(index);
                  }
                }}
                tabIndex={0}
                role="button"
                className="border-b border-[var(--color-surface-3)] py-8 transition-colors duration-200 cursor-pointer select-none outline-none focus-visible:bg-[var(--color-surface-2)] focus-visible:ring-1 focus-visible:ring-[var(--color-ink-3)]"
                style={{
                  backgroundColor: isOpen
                    ? "var(--color-surface-2)"
                    : "transparent",
                }}
              >
                {/* Header Row */}
                <div className="flex max-md:flex-col items-start px-4 max-md:px-0">
                  {/* Period */}
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-3)] w-[180px] max-md:w-full max-md:mb-2 uppercase tracking-wider select-none">
                    {item.period}
                  </span>

                  {/* Role & Company */}
                  <div className="flex-1 flex flex-col pr-4">
                    <span className="font-[family-name:var(--font-sans)] font-semibold text-[length:var(--text-md)] text-[var(--color-ink-1)] tracking-tight">
                      {item.role}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-2)] uppercase tracking-wider mt-1.5 flex items-center gap-2">
                      {item.company}
                      <span className="w-1 h-1 bg-[var(--color-surface-4)] rounded-full" />
                      <span className="text-[9px] text-[var(--color-ink-3)] font-normal">
                        {item.location}
                      </span>
                    </span>
                  </div>

                  {/* Badge & Toggle Indicator Wrapper */}
                  <div className="flex items-center gap-3 max-md:mt-4 shrink-0">
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-2)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
                      {item.type}
                    </span>
                    <div className="text-[var(--color-ink-3)] group-hover:text-[var(--color-ink-1)] transition-colors duration-150">
                      <motion.svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <title>Toggle details</title>
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </div>
                  </div>
                </div>

                {/* Bullets Dropdown */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="pl-[196px] pr-10 pt-6 max-md:pl-0 max-md:pr-0">
                        <ul className="flex flex-col gap-3 list-none">
                          {item.details.map((detail) => (
                            <li
                              key={detail}
                              className="relative pl-5 text-[12px] font-[family-name:var(--font-mono)] text-[var(--color-ink-2)] leading-relaxed max-w-[70ch]"
                            >
                              <span className="absolute left-0 top-2 w-[4px] h-[4px] rounded-full bg-[var(--color-ink-3)]" />
                              {detail}
                            </li>
                          ))}
                        </ul>

                        {item.tags && (
                          <div className="flex flex-wrap gap-1.5 mt-5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-[family-name:var(--font-mono)] text-[8px] text-[var(--color-ink-2)] border border-[var(--color-surface-3)] bg-[var(--color-surface-2)] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
