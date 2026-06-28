"use client";

export default function Footer() {
  const handleScrollTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a]">
      <div className="max-w-[1000px] mx-auto px-[var(--sp-8)] pb-12 pt-6 max-md:px-[var(--sp-6)]">
        {/* ── Hairline ─────────────────────────────────── */}
        <div className="border-t border-white/10 mb-6" />

        {/* ── Tier 3: Utility ──────────────────────────── */}
        <div className="flex max-md:flex-col items-center max-md:items-start justify-between gap-[var(--sp-3)]">
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-white/25 select-none">
            &copy; {new Date().getFullYear()} Prajyot Porje
          </span>

          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-white/25 select-none max-md:order-2">
            Engineered in India
          </span>

          {/* Back to top */}
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Back to top"
            className="group font-[family-name:var(--font-mono)] text-[14px] leading-none text-white/25 transition-colors duration-200 ease-[var(--ease-gentle)] hover:text-white/60 cursor-pointer max-md:order-3 max-md:mx-auto max-md:mt-[var(--sp-4)]"
          >
            <span className="inline-block transition-transform duration-200 ease-[var(--ease-gentle)] group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
