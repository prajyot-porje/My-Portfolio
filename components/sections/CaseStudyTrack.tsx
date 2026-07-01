"use client";

import { animate, onScroll } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/data/case-studies";
import SectionLabel from "../ui/SectionLabel";
import Tag from "../ui/Tag";

const alternateImages: Record<string, string[]> = {
  devflow: [
    "/images/projects/Devflow.png",
    "/images/projects/Devflow_1.png",
    "/images/projects/Devflow_2.png",
  ],
  contextgraph: ["/images/projects/contextGraph.png"],
  jobtracker: [
    "/images/projects/Jobtracker.png",
    "/images/projects/Jobtracker1.png",
    "/images/projects/Jobtracker2.png",
  ],
};

function getTechIcon(tech: string) {
  const cleanTech = tech.toLowerCase().trim();
  switch (cleanTech) {
    case "next.js":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <title>Next.js</title>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 16.424l-4.962-6.402V18.5h-1.25V9.5h1.25l4.893 6.314V9.5h1.25v9.002c-.407-.061-.83-.16-1.181-.578zM12 9.5a1 1 0 011 1v4.73l-2-2.58V10.5a1 1 0 011-1z" />
        </svg>
      );
    case "typescript":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <title>TypeScript</title>
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.58 12.3c.72 0 1.343.195 1.867.585.525.39.877.945 1.058 1.665H18.78c-.12-.345-.315-.615-.585-.81-.27-.195-.615-.293-1.035-.293-.435 0-.795.12-1.08.36-.285.24-.428.555-.428.945 0 .345.105.615.315.81.21.195.585.345 1.125.45l1.035.21c1.23.255 2.145.69 2.745 1.305.6.615.9 1.44.9 2.475 0 1.11-.42 1.995-1.26 2.655-.84.66-1.95.99-3.33.99-1.26 0-2.31-.33-3.15-.99-.84-.66-1.35-1.56-1.53-2.7h1.935c.15.54.45.96.9 1.26.45.3.99.45 1.62.45.495 0 .915-.12 1.26-.36.345-.24.518-.585.518-1.035 0-.42-.15-.735-.45-.945-.3-.21-.825-.39-1.575-.54l-1.035-.21c-1.08-.225-1.905-.63-2.475-1.215-.57-.585-.855-1.35-.855-2.295 0-1.02.39-1.83 1.17-2.43.78-.6 1.785-.9 3.015-.9zm-11.46.075H13.62V14.1H10.5v8.025H8.355V14.1H5.245v-1.725z" />
        </svg>
      );
    case "tailwind css":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <title>Tailwind CSS</title>
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.714,10.662,15.026,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.288,6.138,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.225,1.238,2.537,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.288,13.338,8.976,12,6.001,12z" />
        </svg>
      );
    case "postgresql":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>PostgreSQL</title>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "redis":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Redis</title>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "three.js":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Three.js</title>
          <polygon points="12 2 22 8.5 22 19.5 12 22 2 19.5 2 8.5" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <line x1="12" y1="12" x2="2" y2="8.5" />
          <line x1="12" y1="12" x2="22" y2="8.5" />
        </svg>
      );
    case "webgl":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>WebGL</title>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "wasm":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>WASM</title>
          <polygon points="12 2 22 8.5 22 19.5 12 22 2 19.5 2 8.5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="8.5" x2="22" y2="8.5" />
        </svg>
      );
    case "babel ast":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Babel AST</title>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="6" cy="15" r="2.5" />
          <circle cx="18" cy="15" r="2.5" />
          <line x1="12" y1="7.5" x2="6.5" y2="12.5" />
          <line x1="12" y1="7.5" x2="17.5" y2="12.5" />
        </svg>
      );
    case "openrouter":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>OpenRouter</title>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M6 8v4a2 2 0 002 2h8a2 2 0 002-2V8" />
          <line x1="12" y1="14" x2="12" y2="16" />
        </svg>
      );
    case "isr":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>ISR</title>
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" />
        </svg>
      );
    case "crm api":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>CRM API</title>
          <rect x="4" y="4" width="16" height="6" rx="1" />
          <rect x="4" y="14" width="16" height="6" rx="1" />
          <line x1="12" y1="10" x2="12" y2="14" />
        </svg>
      );
    case "expo":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <title>Expo</title>
          <path d="M12 2.5L2 19.5h20L12 2.5zM12 7.7l6.8 10H5.2l6.8-10z" />
        </svg>
      );
    case "react native":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>React Native</title>
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(30 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(90 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(150 12 12)"
          />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "supabase":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <title>Supabase</title>
          <path d="M21 10.74h-7.8l4.4-8.8a.4.4 0 00-.35-.6H8.25a.4.4 0 00-.38.26l-5.1 11.56a.4.4 0 00.37.54h7.8l-4.4 8.8a.4.4 0 00.35.6h9a.4.4 0 00.38-.26l5.1-11.56a.4.4 0 00-.37-.54z" />
        </svg>
      );
    case "victory native":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Victory Native</title>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "reanimated":
      return (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Reanimated</title>
          <path d="M3 12h3l3-9 6 18 3-9h3" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CaseStudyTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active showcase image per project ID
  const [activeImages, setActiveImages] = useState<Record<string, number>>({
    devflow: 0,
    contextgraph: 0,
    jobtracker: 0,
  });

  const lastManualClickRef = useRef<Record<string, number>>({});
  const [activeMobileCard, setActiveMobileCard] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.85;
    const index = Math.round(scrollLeft / (cardWidth + 20));
    if (index >= 0 && index < caseStudies.length) {
      setActiveMobileCard(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImages((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const projectId in alternateImages) {
          const imgs = alternateImages[projectId];
          if (imgs.length > 1) {
            const lastClick = lastManualClickRef.current[projectId] || 0;
            if (Date.now() - lastClick >= 10000) {
              next[projectId] = (prev[projectId] + 1) % imgs.length;
              changed = true;
            }
          }
        }
        return changed ? next : prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const cards = cardRefs.current.filter(
      (c): c is HTMLDivElement => c !== null,
    );
    if (cards.length === 0) return;

    // Stacking scaling effect synced to scroll position
    const anims: ReturnType<typeof animate>[] = [];
    cards.forEach((card, i) => {
      // The last card doesn't need to scale down
      if (i === cards.length - 1) return;

      const nextCard = cards[i + 1];

      anims.push(
        animate(card, {
          scale: [1, 0.94],
          opacity: [1, 0.4],
          filter: ["blur(0px)", "blur(4px)"],
          ease: "linear",
          autoplay: onScroll({
            target: nextCard,
            enter: "top bottom",
            leave: "top 25%", // Finishes animation as the next card settles into its sticky position
            sync: true,
          }),
        }),
      );
    });

    return () => {
      for (const anim of anims) {
        anim.pause();
      }
    };
  }, []);

  const handleThumbnailClick = (projectId: string, index: number) => {
    setActiveImages((prev) => ({ ...prev, [projectId]: index }));
    lastManualClickRef.current[projectId] = Date.now();
  };

  const CARD_THEMES = [
    // Index 0: Black Theme (DevFlow)
    {
      container:
        "bg-[#0a0a0a] text-[#f4f2ed] border-white/[0.06] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]",
      indexLabel: "text-[#9b9891]",
      title: "text-[#f4f2ed]",
      description: "text-zinc-400",
      tagClass: "bg-white/[0.03] border-white/[0.06] text-zinc-400",
      divider: "border-white/[0.06]",
      metricValue: "text-[#f4f2ed]",
      metricLabel: "text-[#9b9891]",
      button:
        "border-white/[0.1] bg-[#171717] hover:bg-[#222222] text-[#f4f2ed]",
      imageFrame: "bg-black/40 border-white/[0.05]",
      thumbActive: "border-white/60 ring-1 ring-white/30",
      thumbInactive: "border-white/[0.06]",
    },
    // Index 1: White Theme (ContextGraph)
    {
      container:
        "bg-white text-[var(--color-ink-1)] border-[var(--color-surface-3)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]",
      indexLabel: "text-[var(--color-ink-3)]",
      title: "text-[var(--color-ink-1)]",
      description: "text-[var(--color-ink-2)]",
      tagClass:
        "bg-[var(--color-surface-2)] border-[var(--color-surface-3)] text-[var(--color-ink-2)]",
      divider: "border-[var(--color-surface-3)]",
      metricValue: "text-[var(--color-ink-1)]",
      metricLabel: "text-[var(--color-ink-3)]",
      button:
        "border-[var(--color-surface-3)] bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-1)]",
      imageFrame: "bg-[var(--color-surface-2)] border-[var(--color-surface-3)]",
      thumbActive:
        "border-[var(--color-ink-2)] ring-1 ring-[var(--color-ink-3)]",
      thumbInactive: "border-[var(--color-surface-3)]",
    },
    // Index 2: Dark Grey Theme (cResults)
    {
      container:
        "bg-[#171717] text-[#f4f2ed] border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
      indexLabel: "text-[#9b9891]",
      title: "text-[#f4f2ed]",
      description: "text-zinc-400",
      tagClass: "bg-white/[0.04] border-white/[0.08] text-zinc-400",
      divider: "border-white/[0.08]",
      metricValue: "text-[#f4f2ed]",
      metricLabel: "text-[#9b9891]",
      button:
        "border-white/[0.12] bg-[#222222] hover:bg-[#2e2e2e] text-[#f4f2ed]",
      imageFrame: "bg-black/20 border-white/[0.06]",
      thumbActive: "border-white/60 ring-1 ring-white/30",
      thumbInactive: "border-white/[0.08]",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-[var(--color-ground)] overflow-x-clip border-t border-[var(--color-surface-3)]"
    >
      {/* ── HEADER ── */}
      <div className="max-w-7xl mx-auto px-[var(--sp-8)] max-md:px-[var(--sp-6)] pt-32 pb-8 flex flex-col items-center justify-center w-full text-center">
        <SectionLabel label="02 / FEATURED WORK" className="mb-6" />
        <h2 className="text-[3.2rem] max-md:text-[2.2rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] tracking-tight leading-none">
          Proof of Work.
        </h2>
      </div>

      {/* ── DESKTOP STICKY CARD STACK (Desktop only) ── */}
      <div className="hidden md:flex flex-col gap-12 md:gap-16 px-[var(--sp-8)] max-w-7xl mx-auto py-12 pb-24">
        {caseStudies.map((study, idx) => {
          const activeImgIdx = activeImages[study.id] ?? 0;
          const studyImages = alternateImages[study.id] || [study.image];
          const theme = CARD_THEMES[idx] || CARD_THEMES[0];

          return (
            <div
              key={study.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={
                {
                  "--card-top": `calc(6.5rem + ${idx * 48}px)`,
                } as React.CSSProperties
              }
              className={`relative md:sticky top-auto md:top-[var(--card-top)] w-full min-h-[480px] md:h-[65vh] md:max-h-[580px] flex flex-col-reverse md:flex-row items-stretch justify-between rounded-xl p-6 md:p-10 overflow-hidden gap-6 md:gap-8 border transition-colors duration-300 ${theme.container}`}
            >
              {/* Left Column: Copy & Metrics */}
              <div className="flex-[1.2] flex flex-col justify-between text-left">
                <div>
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-wider mb-2 block uppercase ${theme.indexLabel}`}
                  >
                    PROJECT {study.index}
                  </span>

                  <h3
                    className={`text-[2rem] max-md:text-[1.5rem] font-[family-name:var(--font-sans)] leading-none tracking-tight mb-4 font-bold ${theme.title}`}
                  >
                    {study.title}
                  </h3>

                  {/* Scannable breakdown */}
                  <div
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 pt-6 border-t ${theme.divider} text-[13px] leading-relaxed`}
                  >
                    <div>
                      <span className="font-semibold block mb-1.5 font-[family-name:var(--font-sans)] uppercase tracking-wider text-[10px] opacity-80">
                        Context
                      </span>
                      <span className={theme.description}>{study.problem}</span>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1.5 font-[family-name:var(--font-sans)] uppercase tracking-wider text-[10px] opacity-80">
                        Execution
                      </span>
                      <span className={theme.description}>
                        {study.decision}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1.5 font-[family-name:var(--font-sans)] uppercase tracking-wider text-[10px] opacity-80">
                        Impact
                      </span>
                      <span className={theme.description}>{study.outcome}</span>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {study.stack.map((tag) => (
                      <Tag key={tag} className={theme.tagClass}>
                        <span className="inline-flex items-center gap-1.5">
                          {getTechIcon(tag)}
                          <span>{tag}</span>
                        </span>
                      </Tag>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Metrics */}
                  <div
                    className={`grid grid-cols-3 gap-2 md:gap-4 pt-4 border-t ${theme.divider}`}
                  >
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span
                          className={`text-[1.2rem] font-[family-name:var(--font-sans)] font-bold leading-none ${theme.metricValue}`}
                        >
                          {metric.value}
                        </span>
                        <span
                          className={`text-[8px] font-[family-name:var(--font-mono)] uppercase tracking-wider mt-1 leading-snug ${theme.metricLabel}`}
                        >
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs: Live + GitHub Links */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-full border active:scale-[0.97] font-semibold text-[10px] transition-[transform,background-color] duration-200 ease-out pointer-events-auto shadow-sm ${theme.button}`}
                      >
                        <span>Explore Live</span>
                        <span className="inline-block transition-transform duration-200 ml-1">
                          ↗
                        </span>
                      </a>
                    )}

                    {study.githubUrl && (
                      <a
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-full border active:scale-[0.97] font-semibold text-[10px] transition-[transform,background-color] duration-200 ease-out pointer-events-auto shadow-sm ${
                          idx === 1
                            ? "border-[var(--color-surface-3)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] text-[var(--color-ink-1)]"
                            : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-1.5 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <title>GitHub</title>
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Image & Thumbnails */}
              <div className="flex-[0.8] flex flex-col justify-center items-stretch shrink-0">
                <div
                  className={`w-full aspect-[3/2] rounded-xl border overflow-hidden relative flex items-center justify-center ${theme.imageFrame}`}
                >
                  <Image
                    src={studyImages[activeImgIdx]}
                    alt={`${study.title} Showcase`}
                    fill
                    priority={idx === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Thumbnails Strip */}
                {studyImages.length > 1 && (
                  <div className="flex gap-2 mt-3 justify-start overflow-x-auto py-1">
                    {studyImages.map((imgUrl, tIdx) => {
                      const isActive = activeImgIdx === tIdx;
                      return (
                        <button
                          key={imgUrl}
                          onClick={() => handleThumbnailClick(study.id, tIdx)}
                          type="button"
                          className={`w-[56px] h-[35px] aspect-[1.6] relative rounded overflow-hidden border transition-[transform,border-color,opacity,box-shadow] duration-200 ease-out active:scale-[0.97] cursor-pointer pointer-events-auto shrink-0 ${
                            isActive
                              ? theme.thumbActive
                              : `opacity-50 hover:opacity-100 ${theme.thumbInactive}`
                          }`}
                          aria-label={`View screenshot variant ${tIdx + 1}`}
                        >
                          <Image
                            src={imgUrl}
                            alt="Thumbnail preview"
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE SWIPEABLE CARDS (Mobile only) ── */}
      <div className="md:hidden w-full overflow-hidden py-10 pb-16 max-md:px-[var(--sp-6)]">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {caseStudies.map((study, idx) => {
            const activeImgIdx = activeImages[study.id] ?? 0;
            const studyImages = alternateImages[study.id] || [study.image];
            const theme = CARD_THEMES[idx] || CARD_THEMES[0];

            return (
              <div
                key={study.id}
                className={`snap-center shrink-0 w-[90vw] max-w-[420px] h-auto flex flex-col justify-between rounded-xl p-6 border ${theme.container}`}
              >
                {/* Top: Title & Index */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-wider uppercase ${theme.indexLabel}`}
                    >
                      PROJECT {study.index}
                    </span>
                  </div>
                  <h3
                    className={`text-[1.35rem] font-[family-name:var(--font-sans)] leading-tight tracking-tight mb-3 font-bold ${theme.title}`}
                  >
                    {study.title}
                  </h3>

                  {/* Context & Description */}
                  <div
                    className={`flex flex-col gap-3 text-[11px] leading-relaxed mb-4 border-t pt-3 ${theme.divider}`}
                  >
                    <div>
                      <span className="font-semibold block mb-0.5 text-[9px] uppercase tracking-wider opacity-85">
                        Context
                      </span>
                      <p className={theme.description}>{study.problem}</p>
                    </div>
                    <div>
                      <span className="font-semibold block mb-0.5 text-[9px] uppercase tracking-wider opacity-85">
                        Execution
                      </span>
                      <p className={theme.description}>{study.decision}</p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {study.stack.map((tag) => (
                      <Tag
                        key={tag}
                        className={`${theme.tagClass} text-[9px] px-2 py-0.5`}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>

                {/* Bottom: Image & CTAs */}
                <div className="flex flex-col gap-4 mt-auto">
                  {/* Small showcase image */}
                  <div
                    className={`w-full aspect-[16/9] rounded-lg border overflow-hidden relative shrink-0 ${theme.imageFrame}`}
                  >
                    <Image
                      src={studyImages[activeImgIdx]}
                      alt={`${study.title} Mobile Showcase`}
                      fill
                      className="object-cover"
                      sizes="80vw"
                    />
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 inline-flex items-center justify-center py-2 rounded-full border active:scale-[0.97] font-semibold text-[10px] shadow-sm ${theme.button}`}
                      >
                        <span>Explore Live ↗</span>
                      </a>
                    )}
                    {study.githubUrl && (
                      <a
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 inline-flex items-center justify-center py-2 rounded-full border active:scale-[0.97] font-semibold text-[10px] shadow-sm ${
                          idx === 1
                            ? "border-[var(--color-surface-3)] bg-[var(--color-surface-2)] text-[var(--color-ink-1)]"
                            : "border-white/10 bg-white/5 text-white"
                        }`}
                      >
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Swiper Indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-2">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeMobileCard === idx
                  ? "bg-[var(--color-ink-1)] w-3"
                  : "bg-[var(--color-surface-3)]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
