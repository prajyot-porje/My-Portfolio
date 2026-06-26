"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about", targetIds: ["about"], hideOnMobile: true },
  {
    label: "Work",
    href: "#work",
    targetIds: ["work"],
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

const getMobileIcon = (label: string) => {
  switch (label) {
    case "About":
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "Work":
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "Experience":
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case "Achievements":
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    case "Contact":
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return null;
  }
};

interface NavbarProps {
  isIntroActive?: boolean;
}

export default function Navbar({ isIntroActive = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Flag to avoid scroll observer updates during click-triggered smooth scrolls
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track which section is in viewport via IntersectionObserver
  useEffect(() => {
    const allTargetIds = NAV_LINKS.flatMap((l) => l.targetIds);
    const elements = allTargetIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
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
        isScrollingRef.current = true;
        setActiveIndex(idx);
        target.scrollIntoView({ behavior: "smooth" });

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    },
    [],
  );

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 380,
        damping: 30,
      };

  return (
    <>
      {/* Desktop Header Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isIntroActive ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        data-cursor-no-ring="true"
        className="fixed top-[var(--sp-5)] left-0 right-0 z-[100] h-[52px] hidden md:flex items-center px-[var(--sp-8)] pointer-events-none"
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
        <motion.nav
          layout
          aria-label="Primary navigation"
          className={[
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
            "flex items-center justify-center overflow-hidden",
            scrolled
              ? "bg-[rgba(10,10,10,0.88)] backdrop-blur-[16px]"
              : "bg-[var(--color-dark-1)]",
            "rounded-[var(--radius-pill)] h-11 px-[6px] gap-[var(--sp-1)]",
          ].join(" ")}
          transition={transition}
          style={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
          }}
        >
          <div className="flex items-center gap-[var(--sp-1)]">
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
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-[var(--radius-pill)]"
                        style={{
                          zIndex: -1,
                          backgroundColor: "rgba(255, 255, 255, 0.93)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={transition}
                      />
                    )}
                  </AnimatePresence>
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
      </motion.header>

      {/* Mobile/Tablet Header (Name Wordmark) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isIntroActive ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[100] h-14 flex md:hidden items-center justify-between px-[var(--sp-5)] bg-[var(--canvas)]/80 backdrop-blur-md border-b border-[var(--color-surface-3)] pointer-events-auto"
      >
        <span
          className="font-semibold text-[16px] text-[var(--color-ink-1)] tracking-[var(--ls-title)]"
          style={{
            fontFamily: "var(--font-sans)",
            lineHeight: 1,
          }}
        >
          Prajyot Porje
        </span>
        <div className="flex items-center gap-[var(--sp-1)] bg-[var(--color-dark-1)] rounded-full px-[var(--sp-3)] py-[var(--sp-1)] shadow-sm">
          <div className="w-[5px] h-[5px] bg-[var(--color-status-green)] rounded-full available-pulse" />
          <span className="font-semibold text-[var(--color-status-green)] text-[9px] uppercase tracking-wider font-[family-name:var(--font-sans)]">
            Available
          </span>
        </div>
      </motion.header>

      {/* Mobile/Tablet Bottom Dock Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isIntroActive ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="md:hidden fixed left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full py-[6px] px-[8px] flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.36),0_0_0_1px_rgba(255,255,255,0.05)] w-[92%] max-w-[380px]"
        >
          {NAV_LINKS.map(({ label, href }, idx) => {
            const isActive = activeIndex === idx;
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => handleClick(e, idx)}
                className={[
                  "relative flex flex-col items-center justify-center rounded-full transition-colors duration-200 outline-none flex-1 h-11 py-1 select-none",
                  "focus-visible:outline focus-visible:outline-2",
                  "focus-visible:outline-offset-2 focus-visible:outline-white",
                ].join(" ")}
                style={{
                  color: isActive
                    ? "var(--color-dark-1)"
                    : "rgba(255, 255, 255, 0.5)",
                  zIndex: 2,
                }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-active-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      style={{ zIndex: -1 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={transition}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 flex items-center justify-center">
                  {getMobileIcon(label)}
                </span>
                <span
                  className="relative z-10 text-[8px] font-semibold tracking-[0.03em] uppercase font-mono mt-0.5"
                  style={{
                    color: isActive
                      ? "var(--color-dark-1)"
                      : "rgba(255, 255, 255, 0.4)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}
