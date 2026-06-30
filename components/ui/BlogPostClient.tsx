"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type BlogPost, blogs } from "@/lib/data/blogs";

interface BlogPostClientProps {
  post: BlogPost;
}

// ── Code Block Component with Syntax Highlighting & Copy Action ──────
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = (txt: string) => {
    // Escape HTML entities to prevent rendering injection
    let escaped = txt
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Single-line comments highlight
    escaped = escaped.replace(
      /(\/\/.*)/g,
      '<span class="text-[var(--color-ink-3)] font-light opacity-80">$1</span>',
    );

    // Javascript/Typescript keywords highlight
    const keywords =
      /\b(const|let|var|function|return|import|from|export|default|class|extends|interface|type|async|await|if|else|for|while|try|catch|new|throw)\b/g;
    escaped = escaped.replace(
      keywords,
      '<span class="text-[var(--color-ink-1)] font-semibold">$1</span>',
    );

    // Strings highlight
    escaped = escaped.replace(
      /(["'`])(.*?)\1/g,
      '<span class="text-[var(--color-ink-2)] italic opacity-90">$1$2$1</span>',
    );

    return escaped;
  };

  return (
    <div className="relative border border-[var(--color-surface-3)]/60 rounded-xl overflow-hidden my-8 bg-[var(--color-surface-2)]/30 w-full max-w-[68ch]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-surface-3)]/40 bg-[var(--color-surface-2)]/50 text-[10px] font-mono tracking-wider text-[var(--color-ink-3)] uppercase select-none">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="hover:text-[var(--color-ink-1)] transition-colors duration-150 active:scale-95 outline-none cursor-pointer"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {/* Pre-formatted block */}
      <pre className="p-5 overflow-x-auto font-mono text-[13px] leading-relaxed text-[var(--color-ink-2)] bg-[var(--color-surface-1)]">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: highlighted code syntax is escaped and safe */}
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  );
}

// ── Share Buttons Component ──────────────────────────────────────────
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(
    `https://www.prajyotporje.in/blog/${slug}`,
  );

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just read "${title}" by @prajyot_porje`)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex items-center gap-3 mt-10 select-none">
      <span className="font-mono text-[9px] tracking-wider text-[var(--color-ink-3)] uppercase">
        Share Log:
      </span>
      <button
        type="button"
        onClick={copyToClipboard}
        className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider bg-[var(--color-surface-2)]/60 hover:bg-[var(--color-ink-1)] hover:text-[var(--color-ground)] px-3 py-1.5 rounded-full border border-[var(--color-surface-3)]/60 transition-all duration-200 cursor-pointer text-[var(--color-ink-2)]"
      >
        {copied ? "Copied" : "Copy Link"}
      </button>
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider bg-[var(--color-surface-2)]/60 hover:bg-[var(--color-ink-1)] hover:text-[var(--color-ground)] px-3 py-1.5 rounded-full border border-[var(--color-surface-3)]/60 transition-all duration-200 text-[var(--color-ink-2)] no-underline"
      >
        X / Twitter
      </a>
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider bg-[var(--color-surface-2)]/60 hover:bg-[var(--color-ink-1)] hover:text-[var(--color-ground)] px-3 py-1.5 rounded-full border border-[var(--color-surface-3)]/60 transition-all duration-200 text-[var(--color-ink-2)] no-underline"
      >
        LinkedIn
      </a>
    </div>
  );
}

// ── Main Client Component ────────────────────────────────────────────
export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // ease-cinematic
      },
    },
  };

  // Find next and previous posts
  const currentIndex = blogs.findIndex((b) => b.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  return (
    <main className="min-h-[100dvh] w-full bg-[var(--color-ground)] text-[var(--color-ink-1)] flex flex-col justify-between selection:bg-[rgba(13,13,13,0.08)]">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--color-ink-1)] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <header className="w-full max-w-[800px] mx-auto px-6 py-6 flex items-center justify-between z-10 select-none">
        <Link
          href="/"
          className="flex items-center gap-3 group no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] rounded-[4px]"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-surface-3)] shrink-0 shadow-sm bg-white select-none">
            <Image
              src="/images/profile/new.png"
              alt="Prajyot Porje"
              fill
              sizes="48px"
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-medium text-[15px] md:text-[16px] text-[var(--color-ink-1)] tracking-[-0.02em] font-[family-name:var(--font-sans)] group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-none">
              Prajyot Porje
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-ink-3)] mt-1.5 leading-none">
              Product Engineer
            </span>
          </div>
        </Link>

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider bg-[var(--color-ink-1)] text-[var(--color-ground)] px-4 py-2.5 rounded-full hover:bg-[var(--color-accent-hover)] transition-all duration-200 shadow-sm hover:shadow-md outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] active:scale-[0.97] select-none shrink-0"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
            &larr;
          </span>{" "}
          ALL LOGS
        </Link>
      </header>

      {/* Main Post Content */}
      <article className="grow w-full max-w-[800px] mx-auto px-6 py-10 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col"
        >
          {/* Post Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[9px] tracking-wider text-[var(--color-ink-3)] uppercase mb-3.5 select-none">
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-[var(--color-surface-3)] rounded-full" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-ink-1)] font-[family-name:var(--font-sans)] leading-[1.2] text-balance">
              {post.title}
            </h1>
          </motion.div>

          {/* Hairline Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-[var(--color-surface-3)] w-full mb-10"
          />

          {/* Post Body (rendered dynamically by staggered blocks) */}
          {post.content.map((block, idx) => {
            if (block.type === "heading") {
              return (
                <motion.h2
                  // biome-ignore lint/suspicious/noArrayIndexKey: static blog content blocks, indices are stable
                  key={idx}
                  variants={itemVariants}
                  className="font-[family-name:var(--font-sans)] text-lg md:text-xl font-bold tracking-tight text-[var(--color-ink-1)] mt-10 mb-3 leading-snug max-w-[68ch] w-full"
                >
                  {block.text}
                </motion.h2>
              );
            }

            if (block.type === "quote") {
              return (
                <motion.blockquote
                  // biome-ignore lint/suspicious/noArrayIndexKey: static blog content blocks, indices are stable
                  key={idx}
                  variants={itemVariants}
                  className="my-10 md:my-12 pl-6 border-l-[2px] border-l-[var(--color-ink-1)] max-w-[68ch] w-full"
                >
                  <p className="font-serif italic text-base md:text-[18px] text-[var(--color-ink-1)] leading-relaxed">
                    &ldquo;{block.text}&rdquo;
                  </p>
                  {block.subtitle && (
                    <cite className="font-[family-name:var(--font-mono)] text-[9px] tracking-wider text-[var(--color-ink-3)] uppercase mt-3 block not-italic select-none">
                      &mdash; {block.subtitle}
                    </cite>
                  )}
                </motion.blockquote>
              );
            }

            if (block.type === "code") {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: static blog content blocks, indices are stable
                <motion.div key={idx} variants={itemVariants}>
                  <CodeBlock code={block.text} language={block.subtitle} />
                </motion.div>
              );
            }

            if (block.type === "list") {
              return (
                <motion.ul
                  // biome-ignore lint/suspicious/noArrayIndexKey: static blog content blocks, indices are stable
                  key={idx}
                  variants={itemVariants}
                  className="list-disc pl-6 mb-6 max-w-[68ch] w-full text-[var(--color-ink-2)] leading-[1.75] font-[family-name:var(--font-sans)] text-[15px] md:text-[16px] flex flex-col gap-2"
                >
                  {block.items?.map((item, itemIdx) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static blog content items, indices are stable
                      key={itemIdx}
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: inline HTML tags are safe
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </motion.ul>
              );
            }

            return (
              <motion.p
                // biome-ignore lint/suspicious/noArrayIndexKey: static blog content blocks, indices are stable
                key={idx}
                variants={itemVariants}
                className="text-wrap-pretty text-[var(--color-ink-2)] leading-[1.75] font-[family-name:var(--font-sans)] text-[15px] md:text-[16px] mb-6 max-w-[68ch] w-full"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: inline HTML tags are safe
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );
          })}

          {/* Signature sign-off */}
          <motion.div
            variants={itemVariants}
            className="mt-12 mb-4 flex justify-start max-w-[68ch] w-full"
          >
            <div className="text-left font-[family-name:var(--font-sans)]">
              <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-widest text-[var(--color-ink-3)] uppercase block select-none">
                SIGNING OFF
              </span>
              <span className="font-medium text-lg text-[var(--color-ink-1)] mt-1.5 block">
                Prajyot
              </span>
            </div>
          </motion.div>

          {/* Sharing Buttons */}
          <motion.div variants={itemVariants}>
            <ShareButtons title={post.title} slug={post.slug} />
          </motion.div>

          {/* Article Navigation */}
          {(prevPost || nextPost) && (
            <motion.div
              variants={itemVariants}
              className="mt-16 pt-8 border-t border-[var(--color-surface-3)] w-full max-w-[68ch] flex flex-col sm:flex-row gap-4 justify-between"
            >
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex-1 flex flex-col justify-between p-5 border border-[var(--color-surface-3)]/60 rounded-xl bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-2)]/30 active:scale-[0.985] transition-all duration-200 text-left"
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink-3)] mb-1">
                    Previous Log
                  </span>
                  <span className="font-semibold text-sm md:text-base text-[var(--color-ink-1)] group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-snug">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex-1 flex flex-col justify-between p-5 border border-[var(--color-surface-3)]/60 rounded-xl bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-2)]/30 active:scale-[0.985] transition-all duration-200 text-right"
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink-3)] mb-1">
                    Next Log
                  </span>
                  <span className="font-semibold text-sm md:text-base text-[var(--color-ink-1)] group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-snug">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </motion.div>
          )}
        </motion.div>
      </article>

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
