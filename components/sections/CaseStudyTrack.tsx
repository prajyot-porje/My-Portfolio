"use client";

import { animate, onScroll } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/data/case-studies";
import SectionLabel from "../ui/SectionLabel";
import Tag from "../ui/Tag";

export default function CaseStudyTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active showcase image per project ID
  const [activeImages, setActiveImages] = useState<Record<string, number>>({
    devflow: 0,
    contextgraph: 0,
    cresults: 0,
  });

  const alternateImages: Record<string, string[]> = {
    devflow: [
      "/images/projects/Devflow.png",
      "/images/projects/contextGraph.png",
      "/images/projects/Namrl.png",
    ],
    contextgraph: [
      "/images/projects/contextGraph.png",
      "/images/projects/Devflow.png",
      "/images/projects/Kiyomi.png",
    ],
    cresults: [
      "/images/projects/Kiyomi.png",
      "/images/projects/Namrl.png",
      "/images/projects/Devflow.png",
    ],
  };

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

      {/* ── STICKY CARD STACK ── */}
      <div className="flex flex-col gap-12 md:gap-16 px-[var(--sp-8)] max-md:px-[var(--sp-6)] max-w-7xl mx-auto py-12 pb-12 md:pb-24">
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
              className={`relative md:sticky top-auto md:top-[var(--card-top)] w-full min-h-[480px] md:h-[65vh] md:max-h-[580px] flex flex-col-reverse md:flex-row items-stretch justify-between rounded-2xl p-6 md:p-10 overflow-hidden gap-6 md:gap-8 border transition-colors duration-300 ${theme.container}`}
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

                  {/* Scannable breakdown instead of a big paragraph block */}
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
                        {tag}
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

              {/* Right Column: Aspect-ratio Safe Showcase Image & Interactive Thumbnails */}
              <div className="flex-[0.8] flex flex-col justify-center items-stretch shrink-0">
                {/* 3:2 Showcase frame */}
                <div
                  className={`w-full aspect-[3/2] rounded-xl border overflow-hidden relative flex items-center justify-center ${theme.imageFrame}`}
                >
                  <Image
                    src={studyImages[activeImgIdx]}
                    alt={`${study.title} Showcase`}
                    fill
                    priority={idx === 0}
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Thumbnails Strip */}
                <div className="flex gap-2 mt-3 justify-start overflow-x-auto py-1">
                  {studyImages.map((imgUrl, tIdx) => {
                    const isActive = activeImgIdx === tIdx;
                    return (
                      <button
                        // biome-ignore lint/suspicious/noArrayIndexKey: thumbnail order is static
                        key={`${imgUrl}-${tIdx}`}
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
