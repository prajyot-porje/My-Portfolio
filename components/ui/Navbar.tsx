"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about", targetIds: ["about"], hideOnMobile: true },
  {
    label: "Work",
    href: "#work",
    targetIds: ["work", "studio"],
    hideOnMobile: false,
  },
  {
    label: "Experience",
    href: "#experience",
    targetIds: ["experience", "principles"],
    hideOnMobile: true,
  },
  {
    label: "Achievements",
    href: "#achievements",
    targetIds: ["achievements"],
    hideOnMobile: true,
  },
  {
    label: "Contact",
    href: "#contact",
    targetIds: ["contact"],
    hideOnMobile: false,
  },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Track which section is in viewport via IntersectionObserver
  useEffect(() => {
    const allTargetIds = NAV_LINKS.flatMap((l) => l.targetIds);
    const elements = allTargetIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!bestEntry ||
              entry.intersectionRatio > bestEntry.intersectionRatio)
          ) {
            bestEntry = entry;
          }
        }
        if (bestEntry) {
          const idx = NAV_LINKS.findIndex((l) =>
            (l.targetIds as readonly string[]).includes(bestEntry.target.id),
          );
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
      const target = document.getElementById(NAV_LINKS[idx].targetIds[0]);
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
      <div className="hidden md:flex flex-shrink-0 pointer-events-auto h-11 items-center">
        <span
          className="font-semibold text-[18px] text-[var(--color-ink-1)] tracking-[var(--ls-title)]"
          style={{
            fontFamily: "var(--font-sans)",
            lineHeight: 1,
          }}
        >
          Prajyot Porje
        </span>
      </div>

      {/* CENTER — Dynamic Island navbar */}
      {/* CENTER — Dynamic Island navbar */}
      <motion.nav
        layout
        aria-label="Primary navigation"
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
          "flex flex-col md:flex-row items-center justify-start md:justify-center overflow-hidden",
          scrolled
            ? "bg-[rgba(10,10,10,0.88)] backdrop-blur-[16px]"
            : "bg-[var(--color-dark-1)]",
          isMobileOpen
            ? "rounded-[20px] py-4 px-4 w-[220px] h-[264px] border border-white/10"
            : "rounded-[var(--radius-pill)] h-11 w-auto px-5 md:px-[6px] md:w-auto md:h-11 md:flex-row md:py-0 gap-[var(--sp-1)]",
        ].join(" ")}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
        }}
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        }}
      >
        {/* Mobile Closed State Trigger Button */}
        {!isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(true)}
            type="button"
            className="max-md:flex hidden items-center justify-center gap-2 h-11 w-full text-white/70 hover:text-white transition-colors cursor-pointer outline-none select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-green)]" />
            <span className="text-[11px] uppercase tracking-widest font-semibold font-[family-name:var(--font-mono)]">
              {activeIndex !== null ? NAV_LINKS[activeIndex].label : "Menu"}
            </span>
            <svg
              className="w-3 h-3 text-white/55"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <title>Open Menu</title>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}

        {/* Mobile Open State Layout */}
        {isMobileOpen && (
          <div className="flex md:hidden flex-col w-full h-full">
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 px-2">
              <span className="text-[9px] uppercase tracking-widest font-semibold font-[family-name:var(--font-mono)] text-white/40">
                Navigation
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                type="button"
                className="text-white/60 hover:text-white transition-colors cursor-pointer outline-none p-1 rounded-full hover:bg-white/5 flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <title>Close Menu</title>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {/* Links List */}
            <div className="flex flex-col gap-1 w-full">
              {NAV_LINKS.map(({ label, href }, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => {
                      handleClick(e, idx);
                      setIsMobileOpen(false);
                    }}
                    className="flex items-center justify-between py-2 px-3 w-full rounded-lg transition-all duration-150 cursor-pointer select-none font-[family-name:var(--font-sans)] font-medium text-xs text-left"
                    style={{
                      color: isActive ? "#94ff0b" : "rgba(244, 242, 237, 0.75)",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.05)"
                        : "transparent",
                    }}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94ff0b]" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Desktop State (Standard Nav Links) */}
        <div className="max-md:hidden flex items-center gap-[var(--sp-1)]">
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
                  "focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]",
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
        </div>
      </motion.nav>

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
        <div className="w-[6px] h-[6px] bg-[var(--color-status-green)] rounded-full available-pulse" />
        <span
          className="font-normal text-[var(--color-status-green)] tracking-[0.02em]"
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
