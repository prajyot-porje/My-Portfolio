"use client";

import { animate, onScroll } from "animejs";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "../ui/MagneticButton";
import { TextEffect } from "../ui/text-effect";

interface HeroProps {
  isIntroActive: boolean;
}

export default function Hero({ isIntroActive }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Left copy refs
  const chipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Right card refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Card 3 Copy state
  const [card3Copied, setCard3Copied] = useState(false);
  const handleCard3Click = () => {
    navigator.clipboard.writeText("porjeprajyot@gmail.com").then(() => {
      setCard3Copied(true);
      setTimeout(() => setCard3Copied(false), 2000);
    });
  };

  // Scroll indicator refs
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [imgError, setImgError] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeMobileImg, setActiveMobileImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileImg((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // biome-ignore lint/suspicious/noExplicitAny: GSAP animation instance is loaded dynamically
  const scrollLineAnim = useRef<any>(null);
  const cursorCoordinates = useRef({ x: 0, y: 0 });
  const blobPhase = useRef(0);

  // ── Track scroll state ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Scroll Indicator Play/Pause ────────────────────────────────────
  useEffect(() => {
    if (!scrollLineAnim.current) return;
    if (hasScrolled) {
      scrollLineAnim.current.pause();
    } else {
      scrollLineAnim.current.play();
    }
  }, [hasScrolled]);

  // ── Scroll Parallax (anime.js v4 onScroll, desktop only) ───────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (prefersReducedMotion || isMobile) return;

    const photo = photoRef.current;
    const veil = veilRef.current;
    const content = contentRef.current;
    const container = containerRef.current;
    if (!photo || !veil || !content || !container) return;

    // Photo + veil drift at 0.2x scroll speed
    const anim1 = animate([photo, veil], {
      translateY: [0, window.innerHeight * 0.2],
      ease: "linear",
      autoplay: onScroll({
        target: container,
        enter: "top top",
        leave: "bottom top",
        sync: 0.3,
      }),
    });

    // Content drifts at 0.08x scroll speed
    const anim2 = animate(content, {
      translateY: [0, window.innerHeight * 0.08],
      ease: "linear",
      autoplay: onScroll({
        target: container,
        enter: "top top",
        leave: "bottom top",
        sync: 0.3,
      }),
    });

    return () => {
      anim1.pause();
      anim2.pause();
    };
  }, []);

  // ── Cursor mask hover effect (Liquid Canvas Mask, vanilla lerp) ───
  useEffect(() => {
    if (isIntroActive) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const mask = maskRef.current;
    if (!container || !canvas || !mask) return;

    const handleResize = () => {
      canvas.width = Math.ceil(container.clientWidth / 2);
      canvas.height = Math.ceil(container.clientHeight / 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const currentCoords = { x: 0, y: 0 };
    let currentR = 0;
    let targetR = 0;

    const tick = () => {
      currentCoords.x += (cursorCoordinates.current.x - currentCoords.x) * 0.08;
      currentCoords.y += (cursorCoordinates.current.y - currentCoords.y) * 0.08;
      currentR += (targetR - currentR) * 0.08;

      const scale = 0.5;
      const x = currentCoords.x * scale;
      const y = currentCoords.y * scale;
      const r = currentR * scale;

      blobPhase.current += 0.015;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (r > 0) {
          const segments = 120;
          const angleStep = (Math.PI * 2) / segments;
          const phase = blobPhase.current;

          ctx.beginPath();
          for (let i = 0; i <= segments; i++) {
            const angle = i * angleStep;
            const displacement =
              Math.sin(angle * 3 + phase * 1.2) * 0.08 +
              Math.sin(angle * 5 - phase * 0.9) * 0.05 +
              Math.sin(angle * 7 + phase * 1.7) * 0.03;
            const blobR = r * (1 + displacement);
            const px = x + Math.cos(angle) * blobR;
            const py = y + Math.sin(angle) * blobR;
            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();

          const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 1.1);
          grad.addColorStop(0, "rgba(255, 255, 255, 1)");
          grad.addColorStop(0.7, "rgba(255, 255, 255, 1)");
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = grad;
          ctx.fill();

          const dataUrl = canvas.toDataURL("image/png");
          mask.style.webkitMaskImage = `url(${dataUrl})`;
          mask.style.maskImage = `url(${dataUrl})`;
          mask.style.webkitMaskRepeat = "no-repeat";
          mask.style.maskRepeat = "no-repeat";
          mask.style.webkitMaskSize = "100% 100%";
          mask.style.maskSize = "100% 100%";
          mask.style.opacity = "1";
        } else {
          mask.style.webkitMaskImage = "none";
          mask.style.maskImage = "none";
          mask.style.opacity = "0";
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      cursorCoordinates.current.x = mouseX;
      cursorCoordinates.current.y = mouseY;
      currentCoords.x = mouseX;
      currentCoords.y = mouseY;
      targetR = 220;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      cursorCoordinates.current.x = e.clientX - rect.left;
      cursorCoordinates.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetR = 0;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isIntroActive]);

  // ── Magnetic CTA Button Behavior (anime.js v4) ────────────────────
  useEffect(() => {
    if (isIntroActive) return;
    if (typeof window === "undefined") return;

    const cta = ctaRef.current;
    if (!cta) return;

    let isMagnetic = false;

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const closestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const closestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      const distance = Math.hypot(e.clientX - closestX, e.clientY - closestY);

      if (distance < 60) {
        isMagnetic = true;
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const dx = e.clientX - btnCenterX;
        const dy = e.clientY - btnCenterY;

        const angle = Math.atan2(dy, dx);
        const factor = (1 - distance / 60) * 8;
        const targetX = Math.cos(angle) * factor;
        const targetY = Math.sin(angle) * factor;

        animate(cta, {
          translateX: targetX,
          translateY: targetY,
          duration: 200,
          ease: "easeOutQuad",
        });
      } else {
        if (isMagnetic) {
          isMagnetic = false;
          animate(cta, {
            translateX: 0,
            translateY: 0,
            duration: 400,
            ease: "easeOutElastic(1, .6)",
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
    };
  }, [isIntroActive]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero"
      className="relative w-full min-h-[100dvh] md:h-[100svh] md:overflow-hidden bg-[var(--color-ground)]"
    >
      {/* ── DESKTOP-ONLY HERO LAYOUT ───────────────────────── */}
      <div className="max-md:hidden absolute inset-0">
        {/* ── LAYER 1: Photo background ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isIntroActive ? {} : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            ref={photoRef}
            data-cursor="photo"
            className="absolute inset-0 will-change-[transform]"
          >
            {imgError ? (
              <div className="w-full h-full bg-[var(--color-surface-3)]" />
            ) : (
              <>
                {/* Image 1 (base): always visible */}
                <Image
                  src="/images/profile/hero.png?v=3"
                  alt="Prajyot Porje"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-[center_top]"
                  onError={() => setImgError(true)}
                />
                {/* Image 2 (mask): revealed via canvas-generated organic mask */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-0 z-10"
                />
                <Image
                  src="/images/profile/hero-mask.png?v=3"
                  alt="Prajyot Porje Mask"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-[center_top] pointer-events-none absolute inset-0 z-10"
                  style={{ opacity: 0 }}
                  ref={maskRef}
                  onError={() => setImgError(true)}
                />
              </>
            )}
          </div>
        </motion.div>

        {/* ── LAYER 2: Gradient veil ─────────────────────────────── */}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none hero-veil will-change-transform"
        />

        {/* ── LAYER 3: Content ───────────────────────────────────── */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[2] will-change-transform"
        >
          {/* ── BOTTOM-LEFT: Hero copy ───────────────────────── */}
          <div className="absolute left-[var(--sp-8)] top-1/2 -translate-y-1/2 max-w-[480px]">
            {/* Location + time chip */}
            <motion.div
              ref={chipRef}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-flex items-center gap-[var(--sp-2)] bg-[rgba(13,13,13,0.04)] border border-[var(--color-surface-3)] rounded-[var(--radius-pill)] px-[var(--sp-3)] py-[var(--sp-1)] mb-[var(--sp-5)] w-fit"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-ink-1)] opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-ink-1)]" />
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[var(--ls-caps)] uppercase font-semibold text-[var(--color-ink-2)]">
                ACTIVE SPRINT {"//"} AVAILABLE
              </span>
            </motion.div>

            {/* Main headline with text shadow and TextEffect reveal */}
            <h1
              ref={headlineRef}
              className="hero-headline text-wrap-balance tracking-[var(--ls-display)] leading-[var(--lh-display)] mb-[var(--sp-4)] text-[var(--color-ink-1)] select-none"
              style={{ textShadow: "0 2px 12px rgba(13,13,13,0.08)" }}
            >
              <TextEffect
                as="span"
                per="char"
                delay={0.2}
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.03 },
                    },
                  },
                  item: {
                    hidden: { opacity: 0, rotateX: 90, y: 10 },
                    visible: {
                      opacity: 1,
                      rotateX: 0,
                      y: 0,
                      transition: { duration: 0.2 },
                    },
                  },
                }}
                className="font-[family-name:var(--font-sans)] uppercase font-semibold text-[var(--color-ink-1)]"
              >
                Built to
              </TextEffect>
              <TextEffect
                as="span"
                per="char"
                delay={0.45}
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.03 },
                    },
                  },
                  item: {
                    hidden: { opacity: 0, rotateX: 90, y: 10 },
                    visible: {
                      opacity: 1,
                      rotateX: 0,
                      y: 0,
                      transition: { duration: 0.2 },
                    },
                  },
                }}
                className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal"
              >
                Ship.
              </TextEffect>
            </h1>

            {/* Body line (2 lines exactly) */}
            <TextEffect
              as="p"
              per="word"
              delay={0.8}
              className="font-[family-name:var(--font-sans)] font-normal text-wrap-pretty text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[var(--lh-body)] mb-[var(--sp-6)]"
            >
              Product Engineer. I design robust architectures and ship
              high-performance software.
            </TextEffect>

            {/* CTA — Magnetic pill button with arrow interaction */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
              transition={{
                delay: 1.0,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: "inline-block" }}
            >
              <MagneticButton
                ref={ctaRef}
                asLink
                href="#work"
                className={[
                  "bg-[var(--color-ink-1)] text-[var(--color-ground)] px-[24px] py-[12px] rounded-[100px] hover:bg-[#151413] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] text-[length:var(--text-sm)] font-medium z-20 group relative overflow-hidden",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]",
                ].join(" ")}
                style={{ display: "inline-block" }}
              >
                <span>
                  See the work{" "}
                  <span className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-spring)] group-hover:translate-y-0.5 group-hover:scale-105 ml-1.5">
                    ↓
                  </span>
                </span>
              </MagneticButton>
            </motion.div>
          </div>
          {/* ── BOTTOM-RIGHT (FLOATING CARDS): right-side hero content ───────────────── */}
          ﻿{" "}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="absolute top-1/2 -translate-y-1/2 right-[var(--sp-8)] flex flex-col gap-[var(--sp-3)] z-[3] max-md:hidden pointer-events-auto"
          >
            {/* CARD 1 — Contribution Heatmap (Signal: activity) */}
            <motion.div
              ref={card1Ref}
              data-cursor-no-ring="true"
              variants={
                prefersReducedMotion
                  ? {
                      hidden: { opacity: 1, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }
                  : {
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className={[
                "group relative block w-[340px] h-[144px] p-[8px] select-none outer-shell",
                "transition-transform duration-200 ease-[var(--ease-cinematic)]",
                "hover:-translate-y-0.5",
                "motion-reduce:transform-none motion-reduce:transition-none",
              ].join(" ")}
            >
              <div className="relative w-full h-full overflow-hidden inner-container">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 20% 0%, rgba(48,48,50,1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 100%, rgba(32,32,35,1) 0%, transparent 60%),
                      linear-gradient(145deg, #1e1e20 0%, #151517 30%, #0e0e10 60%, #121214 100%)
                    `,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-[1] px-5 py-4 h-full flex flex-col justify-between">
                  {/* Label */}
                  <div className="flex justify-between items-center">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/40">
                      GITHUB {"//"} ACTIVITY
                    </span>
                  </div>

                  {/* Commit Sparkline Bar Chart Visual */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 text-left select-none">
                      <span className="font-[family-name:var(--font-sans)] text-[26px] font-bold text-white leading-none tracking-tight">
                        680+
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-wider text-white/40 whitespace-nowrap">
                        Lifetime Commits
                      </span>
                    </div>

                    <div className="flex items-end gap-1.5 h-[48px] pb-1">
                      {[
                        35, 55, 20, 65, 80, 45, 95, 60, 75, 40, 85, 30, 70, 90,
                      ].map((val, idx) => (
                        <div
                          // biome-ignore lint/suspicious/noArrayIndexKey: Static array data visualizer
                          key={idx}
                          className="w-1.5 bg-white/20 hover:bg-white/85 transition-colors duration-200 rounded-t-[1.5px]"
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2 — Performance Gauge (Signal: latency + status) */}
            <motion.div
              ref={card2Ref}
              data-cursor-no-ring="true"
              variants={
                prefersReducedMotion
                  ? {
                      hidden: { opacity: 1, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }
                  : {
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className={[
                "group relative block w-[340px] h-[144px] p-[8px] select-none outer-shell",
                "transition-transform duration-200 ease-[var(--ease-cinematic)]",
                "hover:-translate-y-0.5",
                "motion-reduce:transform-none motion-reduce:transition-none",
              ].join(" ")}
            >
              <div className="relative w-full h-full overflow-hidden inner-container">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 70% 20%, rgba(44,44,48,1) 0%, transparent 55%),
                      radial-gradient(ellipse at 10% 80%, rgba(36,36,40,1) 0%, transparent 50%),
                      linear-gradient(160deg, #19191b 0%, #121214 40%, #0d0d0f 70%, #161618 100%)
                    `,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-[1] px-5 py-4 h-full flex flex-col justify-between">
                  {/* Label */}
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/40">
                    LEETCODE {"//"} METRICS
                  </span>

                  {/* Donut Chart and Stats breakdown */}
                  <div className="flex items-center justify-between gap-8">
                    {/* Donut chart on left */}
                    <div className="relative w-[72px] h-[72px] shrink-0 select-none">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <title>LeetCode Solved Algorithms Donut Chart</title>
                        <g
                          transform="rotate(-90)"
                          style={{ transformOrigin: "18px 18px" }}
                        >
                          {/* Background circle */}
                          <circle
                            cx="18"
                            cy="18"
                            r="15.9155"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="3.5"
                          />
                          {/* Easy Segment */}
                          <circle
                            cx="18"
                            cy="18"
                            r="15.9155"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.95)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray="45.8 100"
                            strokeDashoffset="-2.75"
                          />
                          {/* Medium Segment */}
                          <circle
                            cx="18"
                            cy="18"
                            r="15.9155"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.60)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray="31.7 100"
                            strokeDashoffset="-54.05"
                          />
                          {/* Hard Segment */}
                          <circle
                            cx="18"
                            cy="18"
                            r="15.9155"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.35)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray="6.0 100"
                            strokeDashoffset="-91.25"
                          />
                        </g>
                      </svg>
                      {/* Central Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                        <span className="font-[family-name:var(--font-sans)] text-base font-bold text-white leading-none">
                          424
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.12em] text-white/45 mt-0.5">
                          SOLVED
                        </span>
                      </div>
                    </div>

                    {/* Stats on right */}
                    <div className="flex flex-col gap-1.5 text-left select-none grow">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/95" />
                          <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-wider text-white/60 leading-none">
                            Easy
                          </span>
                        </div>
                        <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-white/90 leading-none">
                          226<span className="text-white/35">/951</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                          <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-wider text-white/60 leading-none">
                            Med
                          </span>
                        </div>
                        <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-white/90 leading-none">
                          166<span className="text-white/35">/2074</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/35" />
                          <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-wider text-white/60 leading-none">
                            Hard
                          </span>
                        </div>
                        <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-white/90 leading-none">
                          32<span className="text-white/35">/948</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 3 — Connect (Signal: functional email copy) */}
            <motion.div
              ref={card3Ref}
              data-cursor-no-ring="true"
              variants={
                prefersReducedMotion
                  ? {
                      hidden: { opacity: 1, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }
                  : {
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className={[
                "group relative block w-[340px] h-[144px] p-[8px] select-none text-left outer-shell",
                "transition-transform duration-200 ease-[var(--ease-cinematic)]",
                "hover:-translate-y-0.5",
                "motion-reduce:transform-none motion-reduce:transition-none",
              ].join(" ")}
            >
              <div className="relative w-full h-full overflow-hidden inner-container">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 50% 0%, rgba(42,42,46,1) 0%, transparent 60%),
                      radial-gradient(ellipse at 90% 90%, rgba(34,34,38,1) 0%, transparent 50%),
                      linear-gradient(170deg, #1b1b1d 0%, #101012 50%, #141416 100%)
                    `,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-[1] w-full h-full flex flex-col justify-between p-4">
                  {/* Label */}
                  <div className="flex justify-between items-center select-none pb-2 border-b border-white/[0.08]">
                    <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.16em] uppercase text-white/30">
                      CONNECT DIRECTORY
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[8px] text-white/30 uppercase tracking-[0.08em]">
                      INDEX // 06
                    </span>
                  </div>

                  {/* List layout */}
                  <div className="flex flex-col mt-2 grow justify-around gap-1 font-[family-name:var(--font-mono)]">
                    {/* Gmail */}
                    <button
                      onClick={handleCard3Click}
                      type="button"
                      className="group/item flex items-center justify-between text-left py-1 outline-none cursor-pointer border-b border-white/[0.03]"
                    >
                      <span className="text-[8px] text-white/35 group-hover/item:text-[var(--color-accent)] transition-colors duration-150">
                        EMAIL
                      </span>
                      <span className="text-[9px] text-white/60 group-hover/item:text-white transition-colors duration-150 flex items-center gap-1">
                        {card3Copied ? "copied to clipboard" : "porjeprajyot@gmail.com"}
                        {!card3Copied && <span className="text-[9px] opacity-25 group-hover/item:opacity-80 transition-opacity">📋</span>}
                      </span>
                    </button>

                    {/* GitHub */}
                    <a
                      href="https://github.com/prajyot-porje"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between py-1 no-underline border-b border-white/[0.03]"
                    >
                      <span className="text-[8px] text-white/35 group-hover/item:text-white transition-colors duration-150">
                        GITHUB
                      </span>
                      <span className="text-[9px] text-white/60 group-hover/item:text-white transition-colors duration-150 flex items-center gap-1">
                        github.com/prajyot-porje
                        <span className="text-[8px] opacity-25 group-hover/item:opacity-80 transition-opacity">↗</span>
                      </span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/prajyot-porje"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between py-1 no-underline border-b border-white/[0.03]"
                    >
                      <span className="text-[8px] text-white/35 group-hover/item:text-white transition-colors duration-150">
                        LINKEDIN
                      </span>
                      <span className="text-[9px] text-white/60 group-hover/item:text-white transition-colors duration-150 flex items-center gap-1">
                        linkedin.com/in/prajyot-porje
                        <span className="text-[8px] opacity-25 group-hover/item:opacity-80 transition-opacity">↗</span>
                      </span>
                    </a>

                    {/* LeetCode */}
                    <a
                      href="https://leetcode.com/u/prajyot-porje/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between py-1 no-underline border-b border-white/[0.03]"
                    >
                      <span className="text-[8px] text-white/35 group-hover/item:text-white transition-colors duration-150">
                        LEETCODE
                      </span>
                      <span className="text-[9px] text-white/60 group-hover/item:text-white transition-colors duration-150 flex items-center gap-1">
                        leetcode.com/u/prajyot-porje
                        <span className="text-[8px] opacity-25 group-hover/item:opacity-80 transition-opacity">↗</span>
                      </span>
                    </a>

                    {/* Blog */}
                    <a
                      href="/blog"
                      className="group/item flex items-center justify-between py-1 no-underline border-b border-white/[0.03]"
                    >
                      <span className="text-[8px] text-white/35 group-hover/item:text-white transition-colors duration-150">
                        BLOG
                      </span>
                      <span className="text-[9px] text-white/60 group-hover/item:text-white transition-colors duration-150 flex items-center gap-1">
                        prajyot-porje/blog
                        <span className="text-[8px] opacity-25 group-hover/item:opacity-80 transition-opacity">↗</span>
                      </span>
                    </a>

                    {/* Resume */}
                    <a
                      href="/Full_Stack_Developer_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between py-1 no-underline"
                    >
                      <span className="text-[8px] text-white/35 group-hover/item:text-white transition-colors duration-150">
                        RESUME
                      </span>
                      <span className="text-[9px] text-white/60 group-hover/item:text-white transition-colors duration-150 flex items-center gap-1">
                        Full_Stack_Developer_Resume.pdf
                        <span className="text-[8px] opacity-25 group-hover/item:opacity-80 transition-opacity">↗</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* ── BOTTOM-RIGHT: Scroll indicator ───────────────── */}
        <motion.div
          ref={scrollIndicatorRef}
          initial={{ opacity: 0, y: 10 }}
          animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.3,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          aria-hidden="true"
          className={[
            "absolute bottom-[var(--sp-8)] right-[var(--sp-8)]",
            "max-md:hidden pointer-events-none z-10",
          ].join(" ")}
        >
          {/* Inner wrapper that transitions opacity on scroll */}
          <div
            className="flex flex-col items-center gap-[var(--sp-3)] transition-opacity duration-400 ease-[var(--ease-gentle)]"
            style={{ opacity: hasScrolled ? 0 : 1 }}
          >
            {/* Vertical track */}
            <div className="relative w-0.5 h-12 bg-[var(--color-surface-4)] rounded-[1px] overflow-hidden">
              {/* Animated accent fill */}
              <div
                ref={scrollLineRef}
                className="absolute inset-0 bg-[var(--color-accent)] rounded-[1px] origin-top will-change-transform"
              />
            </div>

            {/* Label — horizontal, below the line */}
            <span
              className={[
                "font-[family-name:var(--font-mono)]",
                "text-[length:var(--text-xs)] text-[var(--color-ink-3)]",
                "tracking-[var(--ls-caps)] uppercase",
              ].join(" ")}
            >
              Scroll
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE-ONLY HERO LAYOUT ───────────────────────── */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-[100dvh] px-6 pt-24 pb-32 z-10 relative text-center">
        {/* Mobile Top Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <span
            className="font-bold text-[22px] text-[var(--color-ink-1)] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-sans)",
              lineHeight: 1,
            }}
          >
            Prajyot Porje
          </span>
          <a
            href="/blog"
            className={[
              "flex items-center justify-center rounded-[var(--radius-pill)]",
              "px-4 py-1.5 bg-[var(--color-dark-1)] hover:bg-[#151413] transition-colors duration-200",
              "shadow-[0_0_0_0.5px_rgba(255,255,255,0.10),0_4px_12px_rgba(0,0,0,0.15)]",
              "text-white/80 hover:text-white font-medium text-[12px] font-[family-name:var(--font-sans)] no-underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]",
            ].join(" ")}
          >
            View Blog
          </a>
        </div>

        {/* Mobile Circular Portrait Card with Switching Images */}
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-56 h-56 rounded-full overflow-hidden border border-[var(--color-surface-3)] shadow-[var(--shadow-2)] mb-6 shrink-0"
        >
          {/* Base Image */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: activeMobileImg === 0 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/profile/hero.png?v=3"
              alt="Prajyot Porje Portrait 1"
              fill
              priority
              unoptimized
              className="object-cover object-[center_top]"
            />
          </motion.div>
          {/* Alternate Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeMobileImg === 1 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/profile/new.png?v=3"
              alt="Prajyot Porje Portrait 2"
              fill
              priority
              unoptimized
              className="object-cover object-[center_top]"
            />
          </motion.div>
        </motion.div>

        {/* Text Block */}
        <div className="flex flex-col items-center text-center max-w-full">
          {/* Active Sprint Chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-[var(--sp-2)] bg-[rgba(13,13,13,0.04)] border border-[var(--color-surface-3)] rounded-[var(--radius-pill)] px-[var(--sp-3)] py-[var(--sp-1)] mb-4 w-fit"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-ink-1)] opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-ink-1)]" />
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[var(--ls-caps)] uppercase font-semibold text-[var(--color-ink-2)]">
              ACTIVE SPRINT {"//"} AVAILABLE
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-sans)] uppercase font-semibold text-[2.5rem] leading-[1.05] tracking-tight mb-4 text-[var(--color-ink-1)]">
            <TextEffect
              as="span"
              per="char"
              delay={0.5}
              trigger={!isIntroActive}
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03 },
                  },
                },
                item: {
                  hidden: { opacity: 0, rotateX: 90, y: 10 },
                  visible: {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    transition: { duration: 0.2 },
                  },
                },
              }}
              className="font-[family-name:var(--font-sans)] uppercase font-semibold text-[var(--color-ink-1)]"
            >
              Built to
            </TextEffect>{" "}
            <TextEffect
              as="span"
              per="char"
              delay={0.7}
              trigger={!isIntroActive}
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03 },
                  },
                },
                item: {
                  hidden: { opacity: 0, rotateX: 90, y: 10 },
                  visible: {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    transition: { duration: 0.2 },
                  },
                },
              }}
              className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal"
            >
              Ship.
            </TextEffect>
          </h1>

          {/* Description */}
          <TextEffect
            as="p"
            per="word"
            delay={0.9}
            trigger={!isIntroActive}
            className="font-[family-name:var(--font-sans)] font-normal text-wrap-pretty text-[14px] text-[var(--color-ink-2)] leading-[1.5] mb-6 max-w-[32ch]"
          >
            Product Engineer. I design robust architectures and ship
            high-performance software.
          </TextEffect>

          {/* CTA Button */}
          {/* biome-ignore lint/a11y/useValidAnchor: anchor is used for smooth scroll to work section */}
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
            transition={{
              delay: 1.1,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("work");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={[
              "bg-[var(--color-ink-1)] text-[var(--color-ground)] px-5 py-2.5 rounded-[100px] text-[13px] font-medium w-fit block relative overflow-hidden shadow-[var(--shadow-1)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]",
            ].join(" ")}
          >
            See the work ↓
          </motion.a>
        </div>
      </div>
    </section>
  );
}
