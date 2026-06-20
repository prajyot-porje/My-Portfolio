"use client";

import { motion, useReducedMotion } from "framer-motion";
import { principles } from "@/lib/data/principles";
import SectionLabel from "../ui/SectionLabel";

export default function Principles() {
  const prefersReducedMotion = useReducedMotion();

  const rowVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: i * 0.1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        }),
      };

  return (
    <section
      id="principles"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 max-w-[620px]">
          <SectionLabel label="04 / PRINCIPLES" />
          <h2 className="text-[2.5rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
            Engineering beliefs developed in{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              active production.
            </span>
          </h2>
        </div>

        {/* Principles list */}
        <div className="flex flex-col border-t border-[var(--color-surface-3)]">
          {principles.map((p, index) => (
            <motion.div
              key={p.index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={rowVariants}
              className="flex flex-col md:flex-row items-start md:items-center py-8 sm:py-10 md:py-12 border-b border-[var(--color-surface-3)] gap-4 md:gap-12"
            >
              {/* Number Index */}
              <span
                className="font-[family-name:var(--font-sans)] font-extrabold text-[var(--color-ink-1)] select-none shrink-0"
                style={{
                  fontSize: "clamp(3rem, 10vw, 140px)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                {p.index}
              </span>

              {/* Statement + Elaboration */}
              <div className="flex-1 flex flex-col gap-2">
                <h3
                  className="font-[family-name:var(--font-sans)] font-semibold uppercase text-[var(--color-ink-1)] tracking-tight"
                  style={{
                    fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                    lineHeight: 1.2,
                  }}
                >
                  {p.statement}
                </h3>
                <p
                  className="font-[family-name:var(--font-sans)] font-light text-[var(--color-ink-2)]"
                  style={{
                    fontSize: "clamp(0.85rem, 1.6vw, 1.05rem)",
                    opacity: 0.7,
                    lineHeight: 1.5,
                    maxWidth: "75ch",
                  }}
                >
                  {p.elaboration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
