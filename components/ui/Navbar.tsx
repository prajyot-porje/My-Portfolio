"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work", sectionId: "work", hideOnMobile: false },
  { label: "Studio", href: "#studio", sectionId: "studio", hideOnMobile: false },
  { label: "Blog", href: "#blog", sectionId: "blog", hideOnMobile: true },
  { label: "Principles", href: "#principles", sectionId: "principles", hideOnMobile: true },
  { label: "Contact", href: "#contact", sectionId: "contact", hideOnMobile: false },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Track which section is in viewport via IntersectionObserver
  useEffect(() => {
    const sectionIds: string[] = NAV_LINKS.map((l) => l.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio)
          ) {
            bestEntry = entry;
          }
        }
        if (bestEntry) {
          const idx = sectionIds.indexOf(bestEntry.target.id);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll detection for backdrop blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset active when at the very top (hero area)
  useEffect(() => {
    const handleScrollTop = () => {
      if (window.scrollY < 200) setActiveIndex(null);
    };
    window.addEventListener("scroll", handleScrollTop, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollTop);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
      e.preventDefault();
      const target = document.getElementById(NAV_LINKS[idx].sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActiveIndex(idx);
      }
    },
    [],
  );

  return (
    <header
      data-cursor-no-ring="true"
      className="fixed top-[var(--sp-5)] left-0 right-0 z-[100] h-[52px] flex items-center px-[var(--sp-8)] pointer-events-none"
    >
      {/* LEFT — Name wordmark */}
      <div className="hidden md:block flex-shrink-0 pointer-events-auto self-center">
        <span
          className="font-semibold text-[length:var(--text-base)] text-[var(--color-ink-1)] tracking-[var(--ls-title)]"
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 1,
          }}
        >
          Prajyot Porje
        </span>
      </div>

      {/* CENTER — Dynamic Island navbar */}
      <nav
        aria-label="Primary navigation"
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
          "h-11 flex items-center justify-center rounded-[var(--radius-pill)]",
          "px-[6px] gap-[var(--sp-1)]",
          scrolled
            ? "bg-[rgba(10,10,10,0.88)] backdrop-blur-[16px]"
            : "bg-[var(--color-dark-1)]",
        ].join(" ")}
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
          transition: `background-color var(--dur-deliberate) var(--ease-gentle), 
                       backdrop-filter var(--dur-deliberate) var(--ease-gentle)`,
        }}
      >

        {NAV_LINKS.map(({ label, href, hideOnMobile }, idx) => {
          const isActive = activeIndex === idx;
          const isHovered = hoveredIndex === idx;

          return (
            <a
              key={label}
              href={href}
              onClick={(e) => handleClick(e, idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={[
                "relative font-[family-name:var(--font-sans)]",
                "text-[length:var(--text-sm)] font-medium",
                "px-[var(--sp-4)] py-[6px] rounded-[var(--radius-pill)]",
                "no-underline cursor-pointer flex items-center justify-center",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
                hideOnMobile ? "hidden md:inline-flex" : "inline-flex",
              ].join(" ")}
              style={{
                position: "relative",
                zIndex: 2,
                color: isActive
                  ? "var(--color-dark-1)"
                  : isHovered
                    ? "rgba(244, 242, 237, 0.9)"
                    : "rgba(244, 242, 237, 0.55)",
                transition: `color var(--dur-fast) var(--ease-gentle)`,
              }}
            >
              {/* Active pill — white bg, slides between tabs */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-[var(--radius-pill)]"
                  style={{
                    zIndex: -1,
                    backgroundColor: "rgba(255, 255, 255, 0.93)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                    mass: 0.8,
                  }}
                />
              )}
              <span className="relative z-[1]">{label}</span>
            </a>
          );
        })}
      </nav>

      {/* RIGHT — Available tag */}
      <div
        className={[
          "hidden md:flex ml-auto flex-shrink-0 pointer-events-auto",
          "h-11 items-center justify-center rounded-[var(--radius-pill)]",
          "px-[var(--sp-5)] gap-[var(--sp-2)]",
          "bg-[var(--color-dark-1)]",
          "shadow-[0_0_0_0.5px_rgba(255,255,255,0.10),0_8px_32px_rgba(0,0,0,0.28)]",
        ].join(" ")}
      >
        <div className="w-[6px] h-[6px] bg-[var(--color-accent)] rounded-full available-pulse" />
        <span
          className="font-normal text-[var(--color-accent)] tracking-[0.02em]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
          }}
        >
          Available
        </span>
      </div>
    </header>
  );
}
