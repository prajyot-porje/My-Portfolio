"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { caseStudies } from "@/lib/data/case-studies";
import SectionLabel from "../ui/SectionLabel";
import CaseStudyPanel from "./CaseStudyPanel";

export default function CaseStudyTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Map project IDs to their respective public images
  const getImageForProject = (id: string) => {
    switch (id) {
      case "devflow":
        return "/images/projects/Devflow.png";
      case "contextgraph":
        return "/images/projects/contextGraph.png";
      case "dev-studio":
        return "/images/projects/Kiyomi.png"; // Kiyomi represents the core client success
      default:
        return "/images/projects/Devflow.png";
    }
  };

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (prefersReducedMotion || isMobile) return;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const totalScrollWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollAmount = totalScrollWidth - viewportWidth;

        if (scrollAmount <= 0) return;

        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1, // Smooth scrub interaction
            start: "top top",
            end: () => `+=${scrollAmount}`,
            invalidateOnRefresh: true,
          },
        });
      },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      id="work"
      className="relative w-full bg-[var(--color-ground)]"
    >
      {/* ── DESKTOP HORIZONTAL TRACK ── */}
      <div className="hidden md:block overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex flex-row flex-nowrap h-screen w-max items-center"
        >
          {/* Intro Panel within the Track */}
          <div className="w-[45vw] h-screen flex-shrink-0 flex flex-col justify-center px-[var(--sp-16)] bg-[var(--color-ground)]">
            <SectionLabel label="01 / WORK" className="mb-[var(--sp-4)]" />
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] text-[var(--color-ink-1)] tracking-[var(--ls-display)] leading-[var(--lh-display)]">
              Shipped Projects &amp; Systems.
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-[var(--color-ink-2)] mt-[var(--sp-4)] max-w-sm leading-[var(--lh-body)]">
              A collection of architectural decisions, technical execution, and
              client deliveries designed to perform in production.
            </p>
            <div className="mt-[var(--sp-8)] flex items-center gap-[var(--sp-3)] text-[var(--color-ink-3)]">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] animate-pulse">
                Scroll down to traverse
              </span>
              <span className="text-lg">→</span>
            </div>
          </div>

          {/* Render horizontal case study panels */}
          {caseStudies.map((project) => (
            <div key={project.id} className="case-panel h-screen">
              <CaseStudyPanel
                project={project}
                imageSrc={getImageForProject(project.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE FALLBACK STACK ── */}
      <div className="block md:hidden px-[var(--sp-8)] py-[var(--section-lg)] bg-[var(--color-ground)]">
        <div className="mb-[var(--sp-8)]">
          <SectionLabel label="01 / WORK" />
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-[var(--color-ink-1)] tracking-[var(--ls-display)] mt-[var(--sp-2)]">
            Shipped Projects.
          </h2>
        </div>

        <div className="flex flex-col gap-[var(--sp-8)]">
          {caseStudies.map((project) => (
            <div key={project.id} className="w-full">
              <CaseStudyPanel
                project={project}
                imageSrc={getImageForProject(project.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
