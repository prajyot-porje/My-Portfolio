"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterGallery() {
  const letters = "PRAJYOT PORJE".split("");

  const handleScrollTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--color-ground)] border-t border-[var(--color-surface-3)] py-20 px-[var(--sp-8)] max-md:px-[var(--sp-6)] relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col justify-between h-full min-h-[400px]">
        {/* Top links grid */}
        <div className="flex max-md:flex-col justify-between items-start gap-12 pb-16">
          <div className="space-y-4">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-neutral-400 uppercase tracking-widest block">
              COLLABORATION PROTOCOL
            </span>
            <p className="font-[family-name:var(--font-sans)] text-neutral-600 text-[14px] leading-relaxed max-w-[28ch]">
              Full-stack and product engineer. Designing and building robust,
              scalable applications.
            </p>
          </div>

          <div className="flex gap-20 max-md:gap-10">
            <div>
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-neutral-400 uppercase tracking-wider block mb-4">
                CHANNELS
              </span>
              <ul className="space-y-2 text-[12px] font-medium font-[family-name:var(--font-sans)]">
                <li>
                  <a
                    href="https://github.com/prajyot-porje"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 hover:text-black transition-colors no-underline"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://leetcode.com/u/prajyot-porje/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 hover:text-black transition-colors no-underline"
                  >
                    LeetCode ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-neutral-400 uppercase tracking-wider block mb-4">
                ARCHIVE
              </span>
              <ul className="space-y-2 text-[12px] font-medium font-[family-name:var(--font-sans)]">
                <li>
                  <Link
                    href="/blog"
                    className="text-neutral-800 hover:text-black transition-colors no-underline"
                  >
                    Blog Articles ↗
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive wordmark typography */}
        <div className="border-t border-neutral-200 pt-10 select-none">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-6">
            <div className="flex overflow-hidden">
              {letters.map((char, index) => (
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static string letters mapping
                  key={`${index}-${char}`}
                  whileHover={{
                    y: -10,
                    scale: 1.1,
                    color: "var(--color-accent)",
                    transition: { type: "spring", stiffness: 350, damping: 10 },
                  }}
                  className={`inline-block text-[6vw] font-bold tracking-[-0.04em] cursor-pointer text-neutral-300 font-[family-name:var(--font-display)] leading-none transition-colors ${char === " " ? "mr-4" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleScrollTop}
              className="font-[family-name:var(--font-mono)] text-[12px] text-neutral-400 hover:text-black transition-colors pb-1 border-b border-neutral-300 hover:border-black cursor-pointer uppercase tracking-widest flex items-center gap-1.5"
            >
              UPWARD ↑
            </button>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
            <span>&copy; {new Date().getFullYear()} PRAJYOT PORJE</span>
            <span>ENGINEERED AND BUILT IN INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
