"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import DepthCard from "../depth/DepthCard";
import SectionLabel from "../ui/SectionLabel";

const PRINCIPLES = [
  {
    number: "01",
    headline: "Shipping is the only real feedback loop",
    highlightedWord: "feedback",
    elaboration:
      "Everything before launch is a hypothesis. The gap between what you think users want and what they actually do is only visible in production. I optimize for deployed, not polished.",
  },
  {
    number: "02",
    headline: "Every abstraction must earn its complexity",
    highlightedWord: "complexity",
    elaboration:
      "An abstraction that saves 10 lines now but requires mental overhead every future edit is a net negative. I treat simplicity as an engineering requirement, not a luxury.",
  },
  {
    number: "03",
    headline: "Product thinking before engineering thinking",
    highlightedWord: "Product",
    elaboration:
      "The best technical solution to the wrong problem is still the wrong solution. Before designing a system, I define what the user is actually trying to accomplish - and validate that the system solves that, not a more interesting version of it.",
  },
  {
    number: "04",
    headline: "Real constraints produce better design than total freedom",
    highlightedWord: "constraints",
    elaboration:
      "Client deadlines, tight budgets, and legacy systems have produced more elegant solutions in my work than greenfield projects with no constraints. Limits force precision.",
  },
  {
    number: "05",
    headline: "Own the deploy, not just the code",
    highlightedWord: "deploy",
    elaboration:
      "Writing code that works locally is the minimum. Owning the outcome means monitoring, debugging production, and being accountable for what happens after the PR merges. I don't hand off and move on.",
  },
];

export default function Principles() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // GSAP Entrance Scroll Animation
  useGSAP(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const header = headerRef.current;
        const cards = cardRefs.current.filter(Boolean);

        if (!header || cards.length === 0) return;

        // Set initial animation state (hidden)
        if (prefersReducedMotion) {
          gsap.set(header, { opacity: 0 });
          gsap.set(cards, { opacity: 0 });
        } else {
          gsap.set(header, { opacity: 0, y: 16 });
          gsap.set(cards, { opacity: 0, y: 24 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        if (prefersReducedMotion) {
          tl.to(header, {
            opacity: 1,
            duration: 0.4,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          });

          tl.to(
            cards,
            {
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            "-=0.2",
          );
        } else {
          tl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          });

          tl.to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            "-=0.2",
          );
        }
      },
    );
  }, []);

  const renderHeadline = (headline: string, highlightedWord: string) => {
    const parts = headline.split(new RegExp(`(${highlightedWord})`, "gi"));
    return parts.map((part, index) => {
      if (part.toLowerCase() === highlightedWord.toLowerCase()) {
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: parts of headline are static
            key={index}
            className="inline-block bg-[var(--color-ink-1)] text-[var(--color-accent)] px-1.5 py-0.5 rounded-[4px] font-bold"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      ref={containerRef}
      id="principles"
      className="max-w-[1000px] mx-auto px-[var(--sp-8)] py-[var(--section-lg)] bg-[var(--color-ground)]"
    >
      {/* Section Header */}
      <div ref={headerRef} className="mb-[var(--sp-12)]">
        <SectionLabel
          label="03 / PRINCIPLES"
          className="mb-[var(--sp-3)] block"
        />
        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] text-[var(--color-ink-1)] leading-[var(--lh-heading)] mt-0 font-bold">
          How I think about building.
        </h2>
        <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-[var(--color-ink-2)] mt-[var(--sp-2)]">
          Five beliefs formed from building, not from reading about it.
        </p>
      </div>

      {/* The Five Principles */}
      <div className="flex flex-col gap-[var(--sp-3)]">
        {PRINCIPLES.map((principle, index) => (
          <DepthCard
            key={principle.number}
            level={1}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="group relative px-[var(--sp-8)] py-[var(--sp-6)] overflow-hidden cursor-default rounded-[var(--radius-md)]"
          >
            {/* Absolute Decorative Background Counter */}
            <div className="absolute right-[var(--sp-6)] top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[140px] text-[var(--color-surface-3)] opacity-60 group-hover:opacity-90 transition-opacity duration-[var(--dur-normal)] ease-[var(--ease-gentle)] pointer-events-none select-none z-0">
              {principle.number}
            </div>

            {/* Two-Column Layout */}
            <div className="relative z-[1] flex flex-row items-stretch">
              {/* Left Column (fixed 72px) */}
              <div className="w-[72px] shrink-0 flex items-center">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-md)] text-[var(--color-ink-3)] tracking-[0.02em] leading-none">
                  {principle.number}
                </span>
              </div>

              {/* Right Column */}
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-[var(--color-ink-1)] leading-[var(--lh-title)] mt-0 mb-0">
                  {renderHeadline(
                    principle.headline,
                    principle.highlightedWord,
                  )}
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[var(--lh-body)] mt-[var(--sp-3)] mb-0">
                  {principle.elaboration}
                </p>
              </div>
            </div>
          </DepthCard>
        ))}
      </div>
    </section>
  );
}
