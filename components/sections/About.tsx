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
    const section = document.getElementById("about");
    if (!paragraph || !section) return;

    // Set initial state for the scroll reveal
    const chars = paragraph.querySelectorAll(".about-char");
    for (let i = 0; i < chars.length; i++) {
      (chars[i] as HTMLElement).style.opacity = "0.45";
    }

    const anim = animate(".about-char", {
      opacity: [0.45, 1],
      color: ["var(--color-ink-3)", "var(--color-ink-2)"],
      ease: "linear",
      autoplay: onScroll({
        target: section,
        enter: "top top",
        leave: "bottom bottom",
        sync: true,
      }),
      delay: stagger(5),
    });

    return () => {
      anim.pause();
    };
  }, [isClient, reducedMotion]);

  const lines = [
    "Hi, I'm Prajyot. I build software that works, not demos that impress.",
    "I have engineered AI tools like DevFlow and ContextGraph, also solved",
    "417 LeetCode problems, and merged a production fix in JupyterLab, and",
    "currently freelance for global clients.",
  ];

  // Corner SVG transition presets
  const cornerTransition = {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <section
      id="about"
      className="relative bg-[var(--color-ground)] border-t border-[var(--color-surface-3)] h-[200vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-[var(--sp-8)] max-md:px-[var(--sp-6)] py-[var(--sp-28)] max-md:py-[var(--sp-20)]">
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
            className="font-[family-name:var(--font-sans)] text-[1.4rem] max-md:text-[1.1rem] leading-relaxed text-[var(--color-ink-1)] tracking-tight font-light mb-10 select-text text-wrap-pretty"
          >
            {lines.map((line, lineIdx) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: line order is static
                key={lineIdx}
                className="inline"
              >
                {line.split("").map((char, charIdx) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: character order is static
                    key={`${lineIdx}-${charIdx}-${char}`}
                    className="about-char inline-block whitespace-pre-wrap select-text transition-opacity duration-75"
                    style={{
                      opacity: isClient && !reducedMotion ? 0.45 : 1,
                    }}
                  >
                    {char}
                  </span>
                ))}
                {lineIdx < lines.length - 1 && (
                  <>
                    <br className="max-md:hidden select-none" />
                    <span className="hidden max-md:inline select-none"> </span>
                  </>
                )}
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
      </div>
    </section>
  );
}
