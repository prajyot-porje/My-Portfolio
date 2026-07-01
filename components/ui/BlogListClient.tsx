"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DepthCard from "@/components/depth/DepthCard";
import type { BlogPost } from "@/lib/data/blogs";

interface BlogListClientProps {
  blogs: BlogPost[];
}

export default function BlogListClient({ blogs }: BlogListClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // ease-cinematic
      },
    },
  };

  return (
    <main className="min-h-[100dvh] w-full bg-[var(--color-ground)] text-[var(--color-ink-1)] flex flex-col justify-between selection:bg-[rgba(13,13,13,0.08)]">
      {/* Main Content Area */}
      <div className="grow w-full max-w-[800px] mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-24 flex flex-col justify-start">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex-grow flex flex-col"
        >
          {/* Header Profile Banner & Navigation (Unified Row Layout) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 mb-12"
          >
            {/* Profile row + button (desktop inline, mobile stacked) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[var(--color-surface-3)] shrink-0 shadow-[var(--shadow-1)] bg-white select-none">
                  <Image
                    src="/images/profile/new.png"
                    alt="Prajyot Porje"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center h-24 min-w-0">
                  <h1 className="text-base md:text-lg font-medium tracking-tight text-[var(--color-ink-1)] font-[family-name:var(--font-sans)] leading-none select-none">
                    Prajyot Porje
                  </h1>
                  <p className="font-[family-name:var(--font-sans)] text-[var(--color-ink-2)] text-sm md:text-[15px] leading-[1.3] max-w-[430px] font-normal mt-1.5 text-wrap-pretty">
                    Building with obsession, writing with clarity, paying
                    attention when the world is moving fast.
                  </p>
                </div>
              </div>

              {/* Portfolio button — inline on sm+, hidden inline on mobile */}
              <div className="hidden sm:flex shrink-0 self-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider bg-[var(--color-ink-1)] text-[var(--color-ground)] px-4 py-2.5 rounded-full hover:bg-[var(--color-accent-hover)] transition-all duration-200 shadow-sm hover:shadow-md outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] active:scale-[0.97] select-none shrink-0"
                >
                  <span>&larr;</span> PORTFOLIO
                </Link>
              </div>
            </div>

            {/* Portfolio button — below profile on mobile only */}
            <div className="flex sm:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider bg-[var(--color-ink-1)] text-[var(--color-ground)] px-4 py-2.5 rounded-full hover:bg-[var(--color-accent-hover)] transition-all duration-200 shadow-sm hover:shadow-md outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] active:scale-[0.97] select-none"
              >
                <span>&larr;</span> PORTFOLIO
              </Link>
            </div>
          </motion.div>

          {/* Directory Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t-2 border-[var(--color-surface-3)] w-full mb-12"
          />

          {/* Blogs Directory List */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 md:gap-5"
          >
            {blogs.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block no-underline rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[0.985] transition-transform duration-200"
                >
                  <DepthCard
                    level={1}
                    className="p-5 md:p-6 flex flex-col gap-3 relative overflow-hidden bg-[var(--color-surface-1)] border border-[var(--color-surface-3)]/60 rounded-xl"
                  >
                    {/* Date, Read Time, and Arrow indicator */}
                    <div className="flex items-center justify-between gap-4 select-none">
                      <div className="flex items-center gap-2.5 text-[9px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-[0.12em]">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-[var(--color-surface-3)] rounded-full" />
                        <span>{post.readTime}</span>
                      </div>

                      {/* Small arrow indicator */}
                      <div className="w-7 h-7 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-surface-3)]/60 group-hover:bg-[var(--color-ink-1)] group-hover:text-[var(--color-ground)] group-hover:border-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                        <svg
                          role="img"
                          aria-label="Arrow pointing top-right"
                          className="w-3.5 h-3.5 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <title>Arrow pointing top-right</title>
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>

                    {/* Content Wrapper to align right boundaries of title & excerpt */}
                    <div className="flex flex-col gap-2 max-w-[60ch]">
                      {/* Title */}
                      <h2 className="text-base md:text-lg font-bold tracking-tight text-[var(--color-ink-1)] font-[family-name:var(--font-sans)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-[family-name:var(--font-sans)] text-xs md:text-[13px] text-[var(--color-ink-2)] leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-200 text-wrap-pretty">
                        {post.excerpt}
                      </p>
                    </div>
                  </DepthCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[800px] mx-auto px-6 py-8">
        <div className="border-t border-[var(--color-surface-3)] pt-6 flex items-center justify-between text-[var(--color-ink-3)] select-none">
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Prajyot Porje
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-right">
            ENGINEERED IN INDIA
          </span>
        </div>
      </footer>
    </main>
  );
}
