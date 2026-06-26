"use client";

import { useState } from "react";
import DepthCard from "../depth/DepthCard";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("porjeprajyot@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col items-stretch">
        {/* Section Header */}
        <div className="flex flex-col mb-12 max-w-[620px] text-left">
          <SectionLabel label="06 / CONTACT" />
          <h2 className="text-[3.2rem] max-md:text-[2.2rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4 font-bold">
            Let&apos;s build something{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              permanent.
            </span>
          </h2>
          <p className="text-[13px] text-[var(--color-ink-2)] leading-relaxed mt-4 max-w-[50ch]">
            I am open to engineering roles, consulting engagements, and
            technical collaborations. Let&apos;s talk about systems, products,
            and codebase architecture.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-2">
          {/* Card 1: Email (Primary Channel) - Spans 2 columns */}
          <DepthCard
            level={1}
            className="md:col-span-2 bg-white p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5 text-left">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] tracking-widest uppercase font-semibold">
                  01 / PRIMARY CHANNEL
                </span>
                <span className="font-[family-name:var(--font-sans)] font-bold text-[20px] md:text-[24px] text-[var(--color-ink-1)] tracking-tight break-all mt-1">
                  porjeprajyot@gmail.com
                </span>
              </div>
              <div className="p-2 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] text-[var(--color-ink-2)] shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Mail Icon</title>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </div>

            <div className="flex max-sm:flex-col sm:items-center justify-between gap-4 mt-6">
              <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed max-w-[32ch] text-left">
                Direct inbox connection. Monitored daily. Responds within 12
                hours.
              </p>
              <div className="flex items-center gap-3 self-start sm:self-end shrink-0">
                <MagneticButton
                  type="button"
                  onClick={handleCopy}
                  className="bg-[var(--color-surface-2)] border border-[var(--color-surface-3)] hover:bg-[var(--color-surface-3)] text-[var(--color-ink-1)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider px-4 py-2 rounded-full shadow-sm select-none cursor-pointer"
                >
                  <span>{copied ? "Copied" : "Copy Address"}</span>
                </MagneticButton>
                <MagneticButton
                  asLink
                  href="mailto:porjeprajyot@gmail.com"
                  className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider px-4 py-2 rounded-full shadow-sm select-none cursor-pointer"
                >
                  <span>Email Me</span>
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                    ↗
                  </span>
                </MagneticButton>
              </div>
            </div>
          </DepthCard>

          {/* Card 2: LinkedIn */}
          <DepthCard
            level={1}
            className="col-span-1 bg-white p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5 text-left">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] tracking-widest uppercase font-semibold">
                  02 / LINKEDIN
                </span>
                <span className="font-[family-name:var(--font-sans)] font-bold text-[16px] text-[var(--color-ink-1)] tracking-tight mt-1">
                  prajyot-porje
                </span>
              </div>
              <div className="p-2 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] text-[var(--color-ink-2)] shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>LinkedIn Icon</title>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <MagneticButton
                asLink
                href="https://www.linkedin.com/in/prajyot-porje/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider w-full py-2.5 rounded-full shadow-sm select-none cursor-pointer"
              >
                <span>Connect</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                  ↗
                </span>
              </MagneticButton>
            </div>
          </DepthCard>

          {/* Card 3: GitHub */}
          <DepthCard
            level={1}
            className="col-span-1 bg-white p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5 text-left">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] tracking-widest uppercase font-semibold">
                  03 / GITHUB
                </span>
                <span className="font-[family-name:var(--font-sans)] font-bold text-[16px] text-[var(--color-ink-1)] tracking-tight mt-1">
                  prajyot-porje
                </span>
              </div>
              <div className="p-2 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] text-[var(--color-ink-2)] shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>GitHub Icon</title>
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <MagneticButton
                asLink
                href="https://github.com/prajyot-porje"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider w-full py-2.5 rounded-full shadow-sm select-none cursor-pointer"
              >
                <span>Explore</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                  ↗
                </span>
              </MagneticButton>
            </div>
          </DepthCard>

          {/* Card 4: LeetCode */}
          <DepthCard
            level={1}
            className="col-span-1 bg-white p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5 text-left">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] tracking-widest uppercase font-semibold">
                  04 / LEETCODE
                </span>
                <span className="font-[family-name:var(--font-sans)] font-bold text-[16px] text-[var(--color-ink-1)] tracking-tight mt-1">
                  prajyot-porje
                </span>
              </div>
              <div className="p-2 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] text-[var(--color-ink-2)] shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <title>LeetCode Icon</title>
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38-1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <MagneticButton
                asLink
                href="https://leetcode.com/u/prajyot-porje/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider w-full py-2.5 rounded-full shadow-sm select-none cursor-pointer"
              >
                <span>Solve</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                  ↗
                </span>
              </MagneticButton>
            </div>
          </DepthCard>

          {/* Card 5: Resume */}
          <DepthCard
            level={1}
            className="col-span-1 bg-white p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5 text-left">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] tracking-widest uppercase font-semibold">
                  05 / RESUME
                </span>
                <span className="font-[family-name:var(--font-sans)] font-bold text-[16px] text-[var(--color-ink-1)] tracking-tight mt-1">
                  View Full Resume
                </span>
              </div>
              <div className="p-2 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-surface-3)] text-[var(--color-ink-2)] shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Document Icon</title>
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <MagneticButton
                asLink
                href="/Full_Stack_Developer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider w-full py-2.5 rounded-full shadow-sm select-none cursor-pointer"
              >
                <span>View PDF</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                  ↗
                </span>
              </MagneticButton>
            </div>
          </DepthCard>
        </div>
      </div>
    </section>
  );
}
