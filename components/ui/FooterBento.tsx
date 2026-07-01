"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterBento() {
  const handleScrollTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--color-surface-1)] border-t border-[var(--color-surface-3)] py-16 px-[var(--sp-8)] max-md:px-[var(--sp-6)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] tracking-[-0.02em]">
              Prajyot Porje
            </h3>
            <p className="text-[12px] text-[var(--color-ink-2)] max-w-[32ch] leading-relaxed">
              Product engineer designing and building high-performance web
              applications and agentic workflows.
            </p>
          </div>

          {/* Nav Links Column */}
          <div>
            <h4 className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-ink-3)] uppercase tracking-wider mb-4">
              Workspace
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/prajyot-porje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] transition-colors flex items-center gap-1 group no-underline"
                >
                  GitHub
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px]">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com/u/prajyot-porje/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] transition-colors flex items-center gap-1 group no-underline"
                >
                  LeetCode
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px]">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[12px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] transition-colors flex items-center gap-1 group no-underline"
                >
                  Blog
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px]">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Studio Column */}
          <div>
            <h4 className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-ink-3)] uppercase tracking-wider mb-4">
              Venture
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-[12px] text-[var(--color-ink-2)] block">
                  Product Engineering
                </span>
              </li>
              <li>
                <a
                  href="mailto:prajyotporje.dev@gmail.com"
                  className="text-[12px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] transition-colors flex items-center gap-1 group no-underline"
                >
                  Get in touch
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px]">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-surface-3)] pt-8 flex max-md:flex-col items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-ink-3)]">
              &copy; {new Date().getFullYear()} Prajyot Porje
            </span>
            <span className="text-[var(--color-surface-3)] text-[9px]">|</span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-ink-3)]">
              Engineered in India
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollTop}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-surface-3)] bg-[var(--color-surface-2)] text-[var(--color-ink-1)] cursor-pointer shadow-sm hover:bg-[var(--color-surface-1)] transition-colors"
            aria-label="Scroll to top"
          >
            ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
