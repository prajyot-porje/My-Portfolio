"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("porjeprajyot@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const links = [
    {
      index: "01",
      label: "EMAIL",
      value: "porjeprajyot@gmail.com",
      href: "mailto:porjeprajyot@gmail.com",
      isEmail: true,
    },
    {
      index: "02",
      label: "LINKEDIN",
      value: "linkedin.com/in/prajyot-porje",
      href: "https://www.linkedin.com/in/prajyot-porje/",
    },
    {
      index: "03",
      label: "GITHUB",
      value: "github.com/prajyot-porje",
      href: "https://github.com/prajyot-porje",
    },
    {
      index: "04",
      label: "LEETCODE",
      value: "leetcode.com/u/prajyot-porje",
      href: "https://leetcode.com/u/prajyot-porje/",
    },
    {
      index: "05",
      label: "RESUME",
      value: "View Full Resume (PDF)",
      href: "/Full_Stack_Developer_Resume.pdf",
    },
  ];

  return (
    <section
      id="contact"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto flex max-md:flex-col justify-between items-start gap-12">
        {/* Left Column: Headline */}
        <div className="w-[50%] max-md:w-full flex flex-col">
          <SectionLabel label="07 / CONTACT" />
          <h2 className="text-[2.8rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
            Let&apos;s build something{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              permanent.
            </span>
          </h2>
          <p className="text-[13px] text-[var(--color-ink-2)] leading-relaxed mt-6 max-w-[40ch]">
            I am open to engineering roles, consulting engagements, and
            technical collaborations. Let&apos;s talk about systems, products,
            and codebase architecture.
          </p>
        </div>

        {/* Right Column: Redesigned Editorial Vertical Stack List */}
        <div className="w-[45%] max-md:w-full flex flex-col relative">
          <div className="flex flex-col border-t border-[var(--color-surface-3)] relative">
            {links.map((link, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.isEmail ? undefined : "_blank"}
                  rel={link.isEmail ? undefined : "noopener noreferrer"}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative flex items-center justify-between py-6 px-4 border-b border-[var(--color-surface-3)] no-underline cursor-pointer overflow-hidden transition-colors duration-200"
                >
                  {/* Sliding Hover Background Pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="contact-hover-pill"
                      className="absolute inset-0 bg-[var(--color-surface-2)] z-0"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col gap-1 text-left">
                    {/* Index & Label */}
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] tracking-widest uppercase font-semibold">
                      {link.index} {"//"} {link.label}
                    </span>
                    {/* Value */}
                    <span className="font-[family-name:var(--font-sans)] font-semibold text-[15px] text-[var(--color-ink-1)] tracking-tight">
                      {link.value}
                    </span>
                  </div>

                  {/* Right side arrow / copy action */}
                  <div className="relative z-10 flex items-center gap-3">
                    {link.isEmail && (
                      <button
                        onClick={handleCopy}
                        type="button"
                        className="text-[9px] font-[family-name:var(--font-mono)] font-bold text-[var(--color-ink-2)] border border-[var(--color-surface-3)] bg-white px-2.5 py-1 rounded-full uppercase tracking-wider hover:bg-[var(--color-surface-2)] active:scale-[0.97] transition-all duration-150 cursor-pointer"
                        title="Copy email address"
                      >
                        {copied ? (
                          <span className="text-green-600 font-semibold">
                            Copied
                          </span>
                        ) : (
                          <span>Copy</span>
                        )}
                      </button>
                    )}

                    {/* Arrow Icon */}
                    <svg
                      className="w-4 h-4 text-[var(--color-ink-3)] group-hover:text-[var(--color-ink-1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Arrow Up Right</title>
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
