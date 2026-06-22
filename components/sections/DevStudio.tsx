"use client";

import DepthCard from "../depth/DepthCard";
import SectionLabel from "../ui/SectionLabel";
import Tag from "../ui/Tag";

export default function DevStudio() {
  return (
    <section
      id="studio"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        {/* Left Column: Origin Story & Brand Narrative */}
        <div className="w-full md:w-[45%] flex flex-col">
          <SectionLabel label="03 / DEV STUDIO" />

          <h2 className="text-[2.6rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
            Boutique product engineering for{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              global clients.
            </span>
          </h2>

          <p className="text-[13px] text-[var(--color-ink-2)] leading-relaxed mt-6 max-w-[42ch]">
            Dev Studio was founded to engineer high-performance web products
            under intense commercial constraints. What started as a rapid 45-day
            refactor for a US customer portal has grown into a specialized
            boutique agency shipping clean Next.js architectures, secure
            database integrations, and high-visibility SEO engines.
          </p>

          <p className="text-[13px] text-[var(--color-ink-2)] leading-relaxed mt-4 max-w-[42ch]">
            Whether it is establishing zero-trust database security boundaries,
            syncing legacy CRM platforms, or optimizing on-page SEO pipelines, I
            build systems that work under real-world constraints.
          </p>

          {/* Agency Metric Summary */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[var(--color-surface-3)] max-w-[320px]">
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
                100%
              </span>
              <span className="text-[8px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1.5">
                Delivery Success
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
                41k+
              </span>
              <span className="text-[8px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1.5">
                Organic search impressions
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Capabilities Stack */}
        <div className="w-full md:w-[55%] flex flex-col gap-6">
          {/* Card 1: Frontend Architecture */}
          <DepthCard
            level={1}
            className="bg-white p-6 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] shrink-0 text-[var(--color-ink-2)]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <title>Code Icon</title>
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)]">
                  Performance-First Next.js Systems
                </h3>
                <p className="text-[11.5px] text-[var(--color-ink-2)] leading-relaxed mt-1.5 mb-4">
                  Engineering bespoke web interfaces optimized for Core Web
                  Vitals, sub-second route changes, and smooth 60fps interaction
                  rhythm.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Tag className="text-[8px] px-2 py-0.5">Next.js 14</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">TypeScript</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">Tailwind v4</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">Framer Motion</Tag>
                </div>
              </div>
            </div>
          </DepthCard>

          {/* Card 2: System Migrations */}
          <DepthCard
            level={1}
            className="bg-white p-6 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] shrink-0 text-[var(--color-ink-2)]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <title>Database Migration Icon</title>
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)]">
                  CRM Integration & Database Security
                </h3>
                <p className="text-[11.5px] text-[var(--color-ink-2)] leading-relaxed mt-1.5 mb-4">
                  Refactoring legacy synchronization pipelines and establishing
                  isolated database boundaries with transactional protection to
                  ensure zero data loss.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Tag className="text-[8px] px-2 py-0.5">PostgreSQL</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">CRM APIs</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">Zero-Trust SQL</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">Better Auth</Tag>
                </div>
              </div>
            </div>
          </DepthCard>

          {/* Card 3: SEO Architecture */}
          <DepthCard
            level={1}
            className="bg-white p-6 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] shrink-0 text-[var(--color-ink-2)]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <title>Search SEO Icon</title>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)]">
                  SEO Architecture & Organic Conversion
                </h3>
                <p className="text-[11.5px] text-[var(--color-ink-2)] leading-relaxed mt-1.5 mb-4">
                  Structuring clean site indexing, metadata systems, and schema
                  scripts that rank primary keywords in top search positions
                  organically.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Tag className="text-[8px] px-2 py-0.5">Rank Math</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">ISR Caching</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">JSON-LD</Tag>
                  <Tag className="text-[8px] px-2 py-0.5">Console Engine</Tag>
                </div>
              </div>
            </div>
          </DepthCard>
        </div>
      </div>
    </section>
  );
}
