"use client";

import { useState } from "react";
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
      className="bg-[#0a0a0a] text-white px-[var(--sp-8)] py-[var(--sp-24)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col items-stretch">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Connect Statement */}
          <div className="flex flex-col gap-6 text-left">
            <SectionLabel label="06 / CONNECT" className="text-white/40" />
            <h2 className="text-[2.8rem] max-md:text-[2rem] font-[family-name:var(--font-sans)] font-semibold leading-[1.1] text-white tracking-tight">
              <span className="uppercase">Let&apos;s build something </span>
              <span className="font-[family-name:var(--font-display)] italic text-white/90 font-normal">
                permanent.
              </span>
            </h2>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[45ch]">
              I am open to engineering roles, consulting engagements, and
              technical collaborations. Let&apos;s talk about systems, products,
              and codebase architecture.
            </p>
          </div>

          {/* Right Column: Connect Card */}
          <div className="flex justify-end max-md:justify-start w-full">
            <div className="group relative block w-full max-w-[400px] p-[8px] select-none text-left outer-shell hover:-translate-y-0.5 transition-transform duration-200 ease-[var(--ease-cinematic)]">
              <div className="relative w-full overflow-hidden inner-container bg-[#121214] p-8 flex flex-col gap-8 rounded-[25px]">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 50% 0%, rgba(48,48,52,0.4) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 100%, rgba(32,32,36,0.3) 0%, transparent 50%),
                      linear-gradient(170deg, #161618 0%, #0d0d0f 100%)
                    `,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-[1] flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.15em] uppercase text-white/35">
                      PRIMARY CHANNEL
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-status-green)] opacity-75 motion-reduce:animate-none" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-status-green)]" />
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.1em] uppercase font-semibold text-white/60">
                        Online
                      </span>
                    </div>
                  </div>

                  {/* Email button copy */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleCopy}
                      type="button"
                      className="group/mail text-left w-full outline-none cursor-pointer"
                    >
                      <span className="font-[family-name:var(--font-mono)] tracking-tight text-[18px] md:text-[20px] text-white group-hover/mail:text-white/80 transition-colors duration-200 ease-[var(--ease-gentle)] block break-all">
                        porjeprajyot@gmail.com
                      </span>
                    </button>
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-white/30">
                      {copied ? "COPIED TO CLIPBOARD" : "CLICK TO COPY EMAIL"}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-white/10" />

                  {/* Social / Info Links */}
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <a
                      href="https://github.com/prajyot-porje"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-mono)] text-[10px] text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider no-underline"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href="https://www.linkedin.com/in/prajyot-porje/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-mono)] text-[10px] text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider no-underline"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href="https://leetcode.com/u/prajyot-porje/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-mono)] text-[10px] text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider no-underline"
                    >
                      LeetCode ↗
                    </a>
                    <a
                      href="/Full_Stack_Developer_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-mono)] text-[10px] text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider no-underline"
                    >
                      Resume ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
