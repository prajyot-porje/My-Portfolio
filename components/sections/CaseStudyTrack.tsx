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
    const anims = cards.map((card, i) => {
      const targetScale = 1 - (cards.length - 1 - i) * 0.03;
      return animate(card, {
        scale: [1, targetScale],
        ease: "linear",
        autoplay: onScroll({
          target: card,
          enter: "top top",
          leave: "bottom top",
          sync: true,
        }),
      });
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

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-[var(--color-ground)] overflow-hidden border-t border-[var(--color-surface-3)]"
    >
      {/* ── PROOF STRIP (Neutral Styling) ── */}
      <div className="w-full bg-[var(--color-surface-2)] border-b border-[var(--color-surface-3)] py-[var(--sp-6)] px-[var(--sp-8)] max-md:px-[var(--sp-6)] flex max-md:flex-col justify-between items-center max-md:items-start gap-4">
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-[var(--ls-caps)]">
            01 / PROOF STRIP
          </span>
          <span className="font-semibold text-[length:var(--text-base)] text-[var(--color-ink-1)] tracking-tight mt-1">
            Factual &amp; Verifiable Metrics
          </span>
        </div>
        <div className="flex max-md:flex-wrap max-md:justify-start justify-end gap-12 max-md:gap-6">
          <div className="flex flex-col">
            <span className="text-[1.5rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
              417
            </span>
            <span className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
              LeetCode Solved
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[1.5rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
              01
            </span>
            <span className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
              JupyterLab Core PR
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[1.5rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
              04
            </span>
            <span className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
              Deployed Client Sites
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[1.5rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
              99.2%
            </span>
            <span className="text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
              Preview Sandbox Uptime
            </span>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <div className="max-w-7xl mx-auto px-[var(--sp-8)] max-md:px-[var(--sp-6)] pt-16 flex justify-between items-center w-full">
        <SectionLabel label="02 / FEATURED WORK" />
        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink-3)] uppercase max-md:hidden">
          SCROLL TO EXPLORE
        </span>
      </div>

      {/* ── STICKY CARD STACK ── */}
      <div className="flex flex-col gap-16 md:gap-24 px-[var(--sp-8)] max-md:px-[var(--sp-6)] max-w-7xl mx-auto py-12 pb-32">
        {caseStudies.map((study, idx) => {
          const activeImgIdx = activeImages[study.id] ?? 0;
          const studyImages = alternateImages[study.id] || [study.image];

          return (
            <div
              key={study.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="sticky top-24 md:top-32 w-full min-h-[640px] md:h-[75vh] md:max-h-[680px] flex flex-col-reverse md:flex-row items-stretch justify-between rounded-3xl bg-[#0D0D0D] text-[#F5F4F2] p-8 md:p-12 shadow-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden gap-8 md:gap-12"
            >
              {/* Left Column: Copy & Metrics */}
              <div className="flex-[1.1] flex flex-col justify-between text-left">
                <div>
                  <span className="font-[family-name:var(--font-mono)] text-[#9C9A96] text-[10px] font-semibold tracking-wider mb-2 block uppercase">
                    PROJECT {study.index}
                  </span>

                  <h3 className="text-[2.2rem] max-md:text-[1.6rem] font-[family-name:var(--font-sans)] leading-none text-white tracking-tight mb-4 font-bold">
                    {study.title}
                  </h3>

                  <p className="text-[13px] text-[#9C9A96] leading-relaxed mb-6 max-w-[55ch] text-wrap-pretty font-light">
                    {study.problem} {study.decision} {study.outcome}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {study.stack.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span className="text-[1.3rem] font-[family-name:var(--font-sans)] font-bold text-white leading-none">
                          {metric.value}
                        </span>
                        <span className="text-[9px] font-[family-name:var(--font-mono)] text-[#9C9A96] uppercase tracking-wider mt-1.5 leading-snug">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {study.liveUrl && (
                    <div className="mt-8">
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.15)] hover:bg-white/10 text-white font-medium text-xs transition-all pointer-events-auto"
                      >
                        <span>Explore Live Project</span>
                        <span className="inline-block transition-transform duration-200 ml-1.5">
                          ↗
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Aspect-ratio Safe Showcase Image & Interactive Thumbnails */}
              <div className="flex-[0.9] flex flex-col justify-center items-stretch shrink-0">
                {/* 3:2 Showcase frame */}
                <div className="w-full aspect-[3/2] bg-[#000000] rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden relative flex items-center justify-center">
                  <Image
                    src={studyImages[activeImgIdx]}
                    alt={`${study.title} Showcase`}
                    fill
                    priority={idx === 0}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>

                {/* Thumbnails Strip */}
                <div className="flex gap-2.5 mt-4 justify-start overflow-x-auto py-1">
                  {studyImages.map((imgUrl, tIdx) => {
                    const isActive = activeImgIdx === tIdx;
                    return (
                      <button
                        // biome-ignore lint/suspicious/noArrayIndexKey: thumbnail order is static
                        key={`${imgUrl}-${tIdx}`}
                        onClick={() => handleThumbnailClick(study.id, tIdx)}
                        type="button"
                        className={`w-[64px] h-[40px] aspect-[1.6] relative rounded-lg overflow-hidden border transition-all cursor-pointer pointer-events-auto shrink-0 bg-black ${
                          isActive
                            ? "border-white/60 ring-1 ring-white/40"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`View screenshot variant ${tIdx + 1}`}
                      >
                        <Image
                          src={imgUrl}
                          alt="Thumbnail preview"
                          fill
                          className="object-cover"
                          sizes="64px"
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
