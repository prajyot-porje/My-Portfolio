"use client";

import { animate, onScroll, stagger } from "animejs";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "../ui/SectionLabel";

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (!isClient || reducedMotion) return;
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    // Set initial opacity to 0.2 for the scroll reveal
    const chars = paragraph.querySelectorAll(".about-char");
    for (let i = 0; i < chars.length; i++) {
      (chars[i] as HTMLElement).style.opacity = "0.2";
    }

    const anim = animate(".about-char", {
      opacity: [0.2, 1],
      ease: "linear",
      autoplay: onScroll({
        target: paragraph,
        enter: "top 75%",
        leave: "bottom 25%",
        sync: 0.4,
      }),
      delay: stagger(5),
    });

    return () => {
      anim.pause();
    };
  }, [isClient, reducedMotion]);

  const text =
    "Prajyot doesn't wait for permission to build real things. He already has. As the founder of Dev Studio, he designs and ships production systems for active US clients, bridging engineering depth and product intelligence to build software that lasts.";

  const characters = text.split("");

  // Corner SVG transition presets
  const cornerTransition = {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <section
      id="about"
      className="relative bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-28)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-20)] overflow-hidden min-h-[90vh] flex items-center justify-center"
    >
      {/* ── CORNER MOTIFS (SVGs) ── */}
      {/* Top-Left: Code/terminal brackets */}
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 0.3, x: 0, y: 0 }
            : { opacity: 0, x: -50, y: -50 }
        }
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...cornerTransition, delay: 0.1 }}
        className="absolute top-12 left-12 max-md:top-6 max-md:left-6 text-[var(--color-ink-3)] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 max-md:w-8 max-md:h-8"
        >
          <title>Terminal Brackets</title>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </motion.div>

      {/* Top-Right: Node network graph */}
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 0.3, x: 0, y: 0 }
            : { opacity: 0, x: 50, y: -50 }
        }
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...cornerTransition, delay: 0.15 }}
        className="absolute top-12 right-12 max-md:top-6 max-md:right-6 text-[var(--color-ink-3)] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 max-md:w-8 max-md:h-8"
        >
          <title>Network Graph</title>
          <circle cx="12" cy="12" r="3" />
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <line x1="6" y1="6" x2="9.8" y2="9.8" />
          <line x1="18" y1="6" x2="14.2" y2="9.8" />
          <line x1="6" y1="18" x2="9.8" y2="14.2" />
          <line x1="18" y1="18" x2="14.2" y2="14.2" />
        </svg>
      </motion.div>

      {/* Bottom-Left: Git branch path */}
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 0.3, x: 0, y: 0 }
            : { opacity: 0, x: -50, y: 50 }
        }
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...cornerTransition, delay: 0.2 }}
        className="absolute bottom-12 left-12 max-md:bottom-6 max-md:left-6 text-[var(--color-ink-3)] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 max-md:w-8 max-md:h-8"
        >
          <title>Git Branch</title>
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      </motion.div>

      {/* Bottom-Right: Dev Studio diamond mark */}
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 0.3, x: 0, y: 0 }
            : { opacity: 0, x: 50, y: 50 }
        }
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...cornerTransition, delay: 0.25 }}
        className="absolute bottom-12 right-12 max-md:bottom-6 max-md:right-6 text-[var(--color-ink-3)] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 max-md:w-8 max-md:h-8"
        >
          <title>Diamond Mark</title>
          <path d="M12 2L2 12l10 10 10-10L12 2z" />
          <path d="M12 6L6 12l6 6 6-6-6-6z" />
        </svg>
      </motion.div>

      {/* Center Layout Container */}
      <div className="max-w-[720px] mx-auto text-center flex flex-col items-center z-[2]">
        <SectionLabel label="01 / ABOUT" />

        {/* Headings */}
        <h2 className="text-[3.2rem] max-md:text-[2.2rem] font-[family-name:var(--font-sans)] leading-none text-[var(--color-ink-1)] tracking-tight mt-6 mb-8 select-none font-bold">
          The Product Engineer
        </h2>

        {/* Scroll Reveal Paragraph */}
        <p
          ref={paragraphRef}
          className="font-[family-name:var(--font-sans)] text-[1.4rem] max-md:text-[1.1rem] leading-relaxed text-[var(--color-ink-1)] tracking-tight font-light mb-10 select-text"
        >
          {characters.map((char, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: character order is static
              key={`${index}-${char}`}
              className="about-char inline-block whitespace-pre-wrap select-text transition-opacity duration-75"
              style={{ opacity: isClient && !reducedMotion ? 0.2 : 1 }}
            >
              {char}
            </span>
          ))}
        </p>

        {/* CTA Button */}
        <motion.a
          href="#principles"
          whileHover={reducedMotion ? {} : { scale: 1.02 }}
          whileTap={reducedMotion ? {} : { scale: 0.98 }}
          className="bg-[var(--color-ink-1)] text-[var(--color-ground)] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#151413] shadow-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2 z-10"
        >
          Read the Principles
        </motion.a>
      </div>
    </section>
  );
}
