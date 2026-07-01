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
    label: "Activity",
    href: "#activity",
    targetIds: ["activity"],
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
    case "Activity":
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
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Bug-fix #1: Track ALL intersecting sections in a persistent map (id → ratio)
  // so we always pick the winner from the full set, not just the current callback batch.
  const intersectionMapRef = useRef<Map<string, number>>(new Map());

  // Track which section is in viewport via IntersectionObserver
  useEffect(() => {
    const allTargetIds = NAV_LINKS.flatMap((l) => l.targetIds);
    // Bug-fix #2: Also observe the hero section as a sentinel for top-of-page
    const sentinelId = "hero";
    const observedIds = [sentinelId, ...allTargetIds];
    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const map = intersectionMapRef.current;

        // Update the map with current batch
        for (const entry of entries) {
          if (entry.isIntersecting) {
            map.set(entry.target.id, entry.intersectionRatio);
          } else {
            map.delete(entry.target.id);
          }
        }

        // Pick the section with the highest ratio from the ENTIRE map
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of map) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        // If hero is the most visible (or nothing is intersecting), clear active
        if (!bestId || bestId === sentinelId) {
          setActiveIndex(null);
          return;
        }

        // Map the winning section ID to its nav link index
        const idx = NAV_LINKS.findIndex((l) =>
          (l.targetIds as readonly string[]).includes(bestId),
        );
        if (idx !== -1) setActiveIndex(idx);
      },
      {
        // Bug-fix #3: Wider detection zone (50% of viewport instead of 20%)
        rootMargin: "-10% 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => {
      observer.disconnect();
      intersectionMapRef.current.clear();
    };
  }, []);

  // Bug-fix #2: Single merged scroll listener for backdrop blur + fallback top-of-page detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Fallback: if no sections are intersecting and we're near the top, clear active
      if (window.scrollY < 100 && intersectionMapRef.current.size === 0) {
        setActiveIndex(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      <header
        data-cursor-no-ring="true"
        className="fixed top-[var(--sp-5)] left-0 right-0 z-[100] h-[52px] hidden md:flex items-center px-[var(--sp-8)] pointer-events-none"
      >
        {/* LEFT — Name wordmark */}
        <div className="hidden md:flex flex-shrink-0 pointer-events-auto h-11 items-center">
          <span
            className="font-bold text-[22px] text-[var(--color-ink-1)] tracking-[-0.03em]"
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
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-[var(--radius-pill)]"
                      style={{
                        zIndex: -1,
                        backgroundColor: "rgba(255, 255, 255, 0.93)",
                      }}
                      transition={transition}
                    />
                  )}
                  <span className="relative z-[1]">{label}</span>
                </a>
              );
            })}
          </div>
        </motion.nav>

        {/* RIGHT — Blog button */}
        <a
          href="/blog"
          className={[
            "flex items-center gap-2 ml-auto flex-shrink-0 pointer-events-auto",
            "h-11 rounded-[var(--radius-pill)]",
            "pl-[var(--sp-5)] pr-3 bg-[var(--color-dark-1)] hover:bg-[#151413] transition-all duration-200 active:scale-[0.98]",
            "shadow-[0_0_0_0.5px_rgba(255,255,255,0.10),0_8px_32px_rgba(0,0,0,0.28)]",
            "text-white/80 hover:text-white font-medium text-[length:var(--text-sm)] font-[family-name:var(--font-sans)] no-underline",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]",
          ].join(" ")}
        >
          <span>View Blog</span>
          <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white/15 text-[10px] ml-1 select-none font-mono">
            ↗
          </span>
        </a>
      </header>

      {/* Mobile/Tablet Bottom Dock Navigation */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <motion.nav
          layout
          aria-label="Mobile navigation"
          className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full py-[6px] px-[8px] flex items-center justify-between gap-[6px] shadow-[0_8px_32px_rgba(0,0,0,0.36),0_0_0_1px_rgba(255,255,255,0.05)] max-w-full"
        >
          {NAV_LINKS.map(({ label, href }, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.a
                layout
                key={label}
                href={href}
                onClick={(e) => handleClick(e, idx)}
                className={[
                  "relative flex items-center justify-center rounded-full transition-colors duration-200 outline-none",
                  "focus-visible:outline focus-visible:outline-2",
                  "focus-visible:outline-offset-2 focus-visible:outline-white",
                  isActive ? "px-3.5 py-[7px] gap-1.5" : "p-[10px]",
                ].join(" ")}
                style={{
                  color: isActive
                    ? "var(--color-dark-1)"
                    : "rgba(255, 255, 255, 0.55)",
                  zIndex: 2,
                }}
                transition={transition}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active-pill"
                    className="absolute inset-0 bg-white rounded-full"
                    style={{ zIndex: -1 }}
                    transition={transition}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  {getMobileIcon(label)}
                </span>
                {/* Bug-fix #4: AnimatePresence prevents rapid mount/unmount flicker */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      key={label}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      className="relative z-10 text-[10px] font-semibold tracking-wider uppercase font-[family-name:var(--font-sans)] select-none whitespace-nowrap flex-shrink-0"
                      transition={transition}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}
