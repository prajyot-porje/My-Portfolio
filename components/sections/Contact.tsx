"use client";

import { useState } from "react";
import DepthCard from "../depth/DepthCard";
import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("prajyotporje@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

        {/* Right Column: CTA card */}
        <div className="w-[45%] max-md:w-full">
          <DepthCard
            level={1}
            className="flex flex-col bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200 border border-[var(--color-surface-3)]"
          >
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider mb-6 block">
              Primary Channel
            </span>

            {/* Email Address */}
            <div className="font-[family-name:var(--font-mono)] text-[length:var(--text-md)] select-all px-4 py-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-surface-3)] mb-6 text-center text-[var(--color-ink-1)] break-all font-semibold">
              prajyotporje@gmail.com
            </div>

            {/* Frictionless actions */}
            <div className="flex gap-4">
              {/* Copy action */}
              <button
                onClick={handleCopy}
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-[12px] font-semibold transition-colors cursor-pointer border border-[var(--color-surface-3)] bg-[var(--color-surface-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-surface-3)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink-1)]"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4 text-[var(--color-status-green)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Success Checkmark</title>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[var(--color-status-green)] font-semibold">
                      Copied Address
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Copy Icon</title>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              {/* Direct Mail */}
              <a
                href="https://mail.google.com/mail/?view=cm&to=prajyotporje@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center py-3 px-4 rounded-full text-[12px] font-bold text-center no-underline cursor-pointer bg-[var(--color-ink-1)] text-[var(--color-ground)] hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink-1)]"
              >
                <span>Write Email</span>
              </a>
            </div>
          </DepthCard>
        </div>
      </div>
    </section>
  );
}
