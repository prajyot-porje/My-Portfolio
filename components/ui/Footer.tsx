"use client";

export default function Footer() {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-12)] border-t border-[var(--color-surface-4)] max-md:px-[var(--sp-6)]">
      <div className="max-w-[1000px] mx-auto flex max-md:flex-col justify-between items-center max-md:items-start gap-6">
        {/* Left: Copyright */}
        <div className="flex flex-col text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Prajyot Porje.</span>
          <span className="mt-1">All rights reserved.</span>
        </div>

        {/* Center: Back to top */}
        {/* biome-ignore lint/a11y/useValidAnchor: back to top scrolling link */}
        <a
          href="#top"
          onClick={handleScrollTop}
          className="group relative inline-flex items-center text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider no-underline hover:text-[var(--color-ink-1)] transition-colors cursor-pointer"
        >
          <span>Back to Top</span>
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 ml-1.5">
            ↑
          </span>
          <span className="cta-underline" />
        </a>

        {/* Right: Designed & Engineered & Role */}
        <div className="flex flex-col text-right max-md:text-left text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider">
          <span>Designed &amp; Engineered in India</span>
          <span className="mt-1 text-[var(--color-ink-2)] font-semibold">
            DEV STUDIO {"//"} FOUNDER
          </span>
        </div>
      </div>
    </footer>
  );
}
