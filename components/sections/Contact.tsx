"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import DepthCard from "../depth/DepthCard";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const handleCopy = () => {
    navigator.clipboard.writeText("prajyotporje@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ctx: { revert: () => void } | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          if (prefersReducedMotion) {
            tl.fromTo(
              [leftColRef.current, rightColRef.current],
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.4,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
              },
            );
          } else {
            tl.fromTo(
              leftColRef.current,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
              },
              0,
            );

            tl.fromTo(
              rightColRef.current,
              { opacity: 0, x: 20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
              },
              0,
            );
          }
        }, containerRef);
      },
    );

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const socials = [
    {
      name: "LinkedIn",
      handle: "prajyot-porje",
      url: "https://linkedin.com/in/prajyot-porje",
    },
    {
      name: "GitHub",
      handle: "prajyot-porje",
      url: "https://github.com/prajyot-porje",
    },
    {
      name: "LeetCode",
      handle: "prajyotporje",
      url: "https://leetcode.com/u/prajyotporje/",
    },
    {
      name: "Twitter/X",
      handle: "prajyotporje",
      url: "https://x.com/prajyotporje",
    },
    {
      name: "Resume",
      handle: "PDF Document",
      url: "/Full_Stack_Developer_Resume.pdf",
    },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full bg-[var(--color-surface-2)] overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-[var(--sp-8)] md:px-[var(--sp-16)] py-[var(--section-xl)] flex flex-col">
        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-[var(--sp-16)] items-center w-full">
          {/* Left Column — The Invitation */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start w-full opacity-1 md:opacity-0 will-change-[opacity,transform]"
          >
            {/* Availability status chip */}
            <div className="inline-flex items-center gap-[var(--sp-2)] bg-[var(--color-surface-1)] border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] pl-[var(--sp-2)] pr-[var(--sp-4)] py-[var(--sp-1)] rounded-[100px] mb-[var(--sp-6)]">
              <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)] available-pulse" />
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[var(--color-ink-2)] font-medium">
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] md:text-[length:var(--text-4xl)] text-[var(--color-ink-1)] leading-[var(--lh-display)] tracking-[var(--ls-display)] mt-0 mb-0">
              Let&apos;s build something real.
            </h2>

            {/* Sub-headline */}
            <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-md)] text-[var(--color-ink-2)] leading-[var(--lh-body)] mt-[var(--sp-4)] mb-0 max-w-[400px]">
              Open to software engineering internships and select client work.
              If you have a product problem, I&apos;m interested.
            </p>

            {/* Email CTA Button */}
            <div className="flex flex-col items-start mt-[var(--sp-8)] w-full sm:w-auto">
              <MagneticButton
                onClick={handleCopy}
                className="group flex items-center justify-center gap-[var(--sp-3)] bg-[var(--color-ink-1)] text-[var(--color-ground)] py-[var(--sp-4)] px-[var(--sp-8)] rounded-[14px] shadow-[var(--shadow-2)] hover:bg-[#1a1a1a] hover:shadow-[var(--shadow-3)] transition-[background-color,box-shadow] duration-[var(--dur-fast)] w-full sm:w-auto text-left"
              >
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-inherit select-none">
                  {copied ? "Copied ✓" : "prajyotporje@gmail.com"}
                </span>
                {copied ? (
                  <svg
                    className="w-4 h-4 text-inherit flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>Copied</title>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-inherit flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>Copy Email</title>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </MagneticButton>

              {/* fallback plain text email display */}
              <div className="w-full flex flex-col items-start mt-[var(--sp-4)] pl-[var(--sp-4)]">
                <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-[var(--color-ink-3)] mb-[var(--sp-1)]">
                  or
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--color-ink-3)] selection:bg-[var(--color-accent-muted)]">
                  prajyotporje@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Presence */}
          <div
            ref={rightColRef}
            className="flex flex-col items-start w-full opacity-1 md:opacity-0 will-change-[opacity,transform] max-md:mt-[var(--sp-12)]"
          >
            <SectionLabel label="FIND ME AT" className="mb-[var(--sp-6)]" />

            {/* Social Links Stack */}
            <div className="flex flex-col gap-[var(--sp-3)] w-full">
              {socials.map((social) => (
                <DepthCard
                  key={social.name}
                  as="a"
                  level={1}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-between rounded-[12px] px-[var(--sp-4)] py-[var(--sp-3)] transition-[border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-gentle)] no-underline bg-[var(--color-surface-1)]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--color-ink-2)]">
                    {social.name}
                  </span>
                  <span className="flex items-center gap-[var(--sp-2)] font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-[var(--color-ink-3)]">
                    {social.handle}
                    <svg
                      className="w-3.5 h-3.5 text-[var(--color-ink-3)] transition-transform duration-[var(--dur-fast)] ease-[var(--ease-gentle)] group-hover:translate-x-[3px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Arrow link</title>
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </DepthCard>
              ))}
            </div>

            {/* Location Tag */}
            <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-xs)] text-[var(--color-ink-3)] mt-[var(--sp-6)]">
              Based in Pune, India · UTC+5:30
            </span>
          </div>
        </div>

        {/* Footer Strip */}
        <div className="w-full mt-[var(--sp-16)] border-t border-[var(--color-surface-3)] pt-[var(--sp-6)] flex flex-col md:flex-row justify-between items-center gap-[var(--sp-4)] md:gap-0">
          <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-xs)] text-[var(--color-ink-3)]">
            Prajyot Porje © 2025
          </span>
          <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-xs)] text-[var(--color-ink-3)] italic">
            Designed and built with intention.
          </span>
          <button
            onClick={handleBackToTop}
            type="button"
            className="font-[family-name:var(--font-sans)] text-[length:var(--text-xs)] text-[var(--color-ink-3)] hover:text-[var(--color-ink-2)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-gentle)] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] border-none bg-transparent p-0"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}
