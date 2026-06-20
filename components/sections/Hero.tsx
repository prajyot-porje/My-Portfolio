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

const blurSlideVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.01 } },
    exit: { transition: { staggerChildren: 0.01, staggerDirection: 1 } },
  },
  item: {
    hidden: { opacity: 0, filter: "blur(10px) brightness(0%)" },
    visible: {
      opacity: 1,
      filter: "blur(0px) brightness(100%)",
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -12,
      filter: "blur(10px) brightness(0%)",
      transition: { duration: 0.4 },
    },
  },
};

const focusItems = [
  {
    label: "ACTIVE PROJECT",
    name: "ContextGraph",
    desc: "Multi-tenant MCP context engine — Next.js, TypeScript",
  },
  {
    label: "ACTIVE PROJECT",
    name: "DevFlow",
    desc: "AI code generation platform — Next.js, TypeScript",
  },
];

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

  // Time state
  const [currentTime, setCurrentTime] = useState("");

  // Right card refs
  const card1Ref = useRef<HTMLAnchorElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // Social/Email Popover state
  const [emailPopoverOpen, setEmailPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText("prajyotporje@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Scroll indicator refs
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [imgError, setImgError] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);

  // biome-ignore lint/suspicious/noExplicitAny: GSAP animation instance is loaded dynamically
  const scrollLineAnim = useRef<any>(null);
  const cursorCoordinates = useRef({ x: 0, y: 0 });
  const blobPhase = useRef(0);

  // ── Track local time ────────────────────────────────────────────────
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Track scroll state ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Email Popover event listeners ──────────────────────────────────
  useEffect(() => {
    if (!emailPopoverOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEmailPopoverOpen(false);
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        emailButtonRef.current &&
        !emailButtonRef.current.contains(e.target as Node)
      ) {
        setEmailPopoverOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [emailPopoverOpen]);

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

  // ── Active Project Card rotation (TextEffect with Exit) ───────────
  const [focusIndex, setFocusIndex] = useState(0);
  const [focusTrigger, setFocusTrigger] = useState(true);

  useEffect(() => {
    if (isIntroActive) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setFocusTrigger(false);
      setTimeout(() => {
        setFocusIndex((i) => (i + 1) % focusItems.length);
        setFocusTrigger(true);
      }, 400); // matches the text-effect exit transition duration
    }, 5000);
    return () => clearInterval(id);
  }, [isIntroActive]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero"
      className="relative w-full h-[100svh] overflow-hidden bg-[var(--color-ground)]"
    >
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
        <div className="absolute left-[var(--sp-8)] bottom-[var(--sp-16)] max-w-[480px] max-md:bottom-[var(--sp-10)]">
          {/* Location + time chip */}
          <motion.div
            ref={chipRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-[var(--sp-2)] bg-[rgba(13,13,13,0.06)] rounded-[var(--radius-pill)] px-[var(--sp-3)] py-[var(--sp-1)] mb-[var(--sp-5)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-status-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-status-green)]" />
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--color-ink-2)] tracking-[var(--ls-caps)] uppercase font-semibold">
              Pune, IN {currentTime && `· ${currentTime} IST`}
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
            Product Engineer & founder of Dev Studio. I design robust
            architectures and ship high-performance software.
          </TextEffect>

          {/* CTA — Magnetic pill button with arrow interaction */}
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
        </div>

        {/* ── BOTTOM-RIGHT (FLOATING CARDS): right-side hero content ───────────────── */}
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
          {/* CARD 1 — Active Project */}
          <motion.a
            href="#work"
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
              "group relative block w-[340px] h-[120px] p-[8px] select-none cursor-pointer text-left no-underline outer-shell",
              "transition-transform duration-200 ease-[var(--ease-cinematic)]",
              "hover:-translate-y-0.5",
              "motion-reduce:transform-none motion-reduce:transition-none",
            ].join(" ")}
          >
            {/* Inner Content Container */}
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
              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              {/* Diagonal grain pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.022]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    135deg,
                    transparent,
                    transparent 1px,
                    rgba(255,255,255,0.14) 1px,
                    rgba(255,255,255,0.14) 2px
                  )`,
                  backgroundSize: "5px 5px",
                }}
              />

              {/* Top Flare Highlight Overlay */}
              <div
                className="absolute top-0 left-[36px] right-[36px] h-[1px] pointer-events-none rounded-[0_0_4px_4px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(212, 212, 216, 0.65) 30%, rgba(212, 212, 216, 0.65) 70%, transparent 100%)",
                }}
              />

              {/* Card content — compact layout with tighter padding to prevent layout breaking */}
              <div className="relative z-[1] px-[var(--sp-5)] py-[var(--sp-3)] h-full flex flex-col justify-between">
                {/* Top row: label + status */}
                <div className="flex justify-between items-center">
                  <span
                    className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.12em] uppercase"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Active Project
                  </span>
                  <div className="flex items-center gap-[4px]">
                    <div
                      className="w-[4px] h-[4px] rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
                    />
                    <span
                      className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] uppercase font-medium"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      In Progress
                    </span>
                  </div>
                </div>

                {/* Project name + description */}
                <div>
                  <div
                    className="font-[family-name:var(--font-sans)] font-semibold tracking-[0.01em] min-h-[1.5rem]"
                    style={{
                      fontSize: "1.05rem",
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.2,
                    }}
                  >
                    <TextEffect
                      per="char"
                      variants={blurSlideVariants}
                      trigger={focusTrigger}
                    >
                      {focusItems[focusIndex].name}
                    </TextEffect>
                  </div>
                  <div
                    className="font-[family-name:var(--font-sans)] font-normal mt-[2px] min-h-[2.5rem]"
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.35)",
                      lineHeight: 1.3,
                    }}
                  >
                    <TextEffect
                      per="word"
                      variants={blurSlideVariants}
                      trigger={focusTrigger}
                    >
                      {focusItems[focusIndex].desc}
                    </TextEffect>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full h-[2px] rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    ref={progressFillRef}
                    className="h-full rounded-full"
                    style={{
                      width: focusTrigger ? "100%" : "0%",
                      transition: focusTrigger ? "width 4600ms linear" : "none",
                      backgroundColor: "rgba(255,255,255,0.28)",
                    }}
                  />
                </div>
              </div>

              {/* Hover arrow indicator */}
              <span
                className="absolute right-[var(--sp-4)] top-[var(--sp-4)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "13px",
                  lineHeight: 1,
                }}
              >
                ↗
              </span>
            </div>
          </motion.a>

          {/* CARD 2 — Current Focus */}
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
              "group relative block w-[340px] h-[120px] p-[8px] select-none cursor-pointer text-left no-underline outer-shell",
              "transition-transform duration-200 ease-[var(--ease-cinematic)]",
              "hover:-translate-y-0.5",
              "motion-reduce:transform-none motion-reduce:transition-none",
            ].join(" ")}
          >
            {/* Inner Content Container */}
            <div className="relative w-full h-full overflow-hidden inner-container">
              {/* Silver-grey textured bg */}
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
              {/* Noise texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              {/* Diagonal grain */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.022]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    135deg,
                    transparent,
                    transparent 1px,
                    rgba(255,255,255,0.14) 1px,
                    rgba(255,255,255,0.14) 2px
                  )`,
                  backgroundSize: "5px 5px",
                }}
              />

              {/* Top Flare Highlight Overlay */}
              <div
                className="absolute top-0 left-[36px] right-[36px] h-[1px] pointer-events-none rounded-[0_0_4px_4px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(212, 212, 216, 0.65) 30%, rgba(212, 212, 216, 0.65) 70%, transparent 100%)",
                }}
              />

              {/* Content — compact layout with tighter padding to prevent layout breaking */}
              <div className="relative z-[1] px-[var(--sp-5)] py-[var(--sp-3)] h-full flex flex-col justify-between">
                {/* Label */}
                <span
                  className="block font-[family-name:var(--font-mono)] text-[9px] tracking-[0.12em] uppercase"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  Current Focus
                </span>

                {/* Focus keyword */}
                <div>
                  <div
                    className="font-[family-name:var(--font-sans)] font-semibold tracking-[0.01em]"
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.2,
                    }}
                  >
                    MCP Protocol &amp; Agentic Workflows
                  </div>
                  <span
                    className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.04em] mt-[2px] block"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    Building toward autonomous dev tooling
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 3 — Connect */}
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
              "group relative block w-[340px] h-[120px] p-[8px] select-none cursor-pointer text-left no-underline outer-shell",
              "transition-transform duration-200 ease-[var(--ease-cinematic)]",
              "hover:-translate-y-0.5",
              "motion-reduce:transform-none motion-reduce:transition-none",
            ].join(" ")}
          >
            {/* Inner Content Container */}
            <div className="relative w-full h-full overflow-hidden inner-container">
              {/* Silver-grey textured bg */}
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
              {/* Noise texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              {/* Diagonal grain */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.022]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    135deg,
                    transparent,
                    transparent 1px,
                    rgba(255,255,255,0.14) 1px,
                    rgba(255,255,255,0.14) 2px
                  )`,
                  backgroundSize: "5px 5px",
                }}
              />

              {/* Top Flare Highlight Overlay */}
              <div
                className="absolute top-0 left-[36px] right-[36px] h-[1px] pointer-events-none rounded-[0_0_4px_4px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(212, 212, 216, 0.65) 30%, rgba(212, 212, 216, 0.65) 70%, transparent 100%)",
                }}
              />

              {/* Content — compact layout with tighter padding to prevent layout breaking */}
              <div className="relative z-[1] px-[var(--sp-5)] py-[var(--sp-3)] h-full flex flex-col justify-between">
                {/* Label */}
                <span
                  className="block font-[family-name:var(--font-mono)] text-[9px] tracking-[0.12em] uppercase"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  Connect
                </span>

                {/* Icon Buttons row */}
                <div className="flex items-center gap-[var(--sp-3)]">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/prajyotporje/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] transition-[background-color,color] duration-200 ease-[var(--ease-gentle)] cursor-pointer"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.40)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.10)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    }}
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>LinkedIn Profile</title>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/prajyotporje"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] transition-[background-color,color] duration-200 ease-[var(--ease-gentle)] cursor-pointer"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.40)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.10)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    }}
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>GitHub Profile</title>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>

                  {/* LeetCode */}
                  <a
                    href="https://leetcode.com/u/prajyotporje/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode Profile"
                    className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] transition-[background-color,color] duration-200 ease-[var(--ease-gentle)] cursor-pointer"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.40)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.10)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    }}
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <title>LeetCode Profile</title>
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414L3.898 9.039a1.375 1.375 0 0 0-.414.962c0 .351.14.686.388.945l7.973 7.973a1.375 1.375 0 0 0 1.907.013l7.973-7.973a1.378 1.378 0 0 0 .388-.945 1.375 1.375 0 0 0-.414-.962L14.444.414A1.374 1.374 0 0 0 13.483 0zm0 1.954l6.096 6.096c.07.07.115.163.125.264H11.53c-.365 0-.714.145-.973.404L8.153 11.121a1.377 1.377 0 0 0 0 1.946l2.404 2.404c.259.259.608.404.973.404h8.174a1.374 1.374 0 0 0-.125.264l-6.096 6.096c-.18.18-.475.18-.655 0L4.855 14.262c-.18-.18-.18-.475 0-.655l2.404-2.404c.09-.09.213-.141.341-.141h4.095c.128 0 .251.051.341.141l1.5 1.5c.18.18.475.18.655 0l1.5-1.5c.18-.18.18-.475 0-.655l-1.5-1.5c-.09-.09-.213-.141-.341-.141H7.838a1.374 1.374 0 0 0-.973.404l-2.404 2.404a1.375 1.375 0 0 0 0 1.946l7.973 7.973c.18.18.475.18.655 0l6.096-6.096c.07-.07.115-.163.125-.264H11.034c-.365 0-.714-.145-.973-.404L7.657 11.121a1.377 1.377 0 0 1 0-1.946l2.404-2.404a1.375 1.375 0 0 1 .973-.404h8.174c-.01-.1-.055-.194-.125-.264L13.483 1.954z" />
                    </svg>
                  </a>

                  {/* Email with Popover */}
                  <div className="relative">
                    <button
                      ref={emailButtonRef}
                      onClick={() => setEmailPopoverOpen(!emailPopoverOpen)}
                      aria-label="Contact Email"
                      aria-expanded={emailPopoverOpen}
                      type="button"
                      className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] transition-[background-color,color] duration-200 ease-[var(--ease-gentle)] cursor-pointer outline-none"
                      style={{
                        backgroundColor: emailPopoverOpen
                          ? "rgba(255,255,255,0.10)"
                          : "rgba(255,255,255,0.04)",
                        color: emailPopoverOpen
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(255,255,255,0.40)",
                        border: `1px solid ${emailPopoverOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                      }}
                      onMouseEnter={(e) => {
                        if (!emailPopoverOpen) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.10)";
                          e.currentTarget.style.color =
                            "rgba(255,255,255,0.85)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!emailPopoverOpen) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.04)";
                          e.currentTarget.style.color =
                            "rgba(255,255,255,0.40)";
                        }
                      }}
                    >
                      <svg
                        className="w-[18px] h-[18px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <title>Email</title>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </button>

                    {/* Email popover */}
                    <div
                      ref={popoverRef}
                      className={[
                        "absolute bottom-full right-0 mb-3 z-[100] w-[240px]",
                        "rounded-[var(--radius-lg)] p-[var(--sp-3)]",
                        "transition-[opacity,transform] duration-75 ease-[var(--ease-cinematic)] origin-bottom-right",
                        emailPopoverOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none",
                      ].join(" ")}
                      style={{
                        backgroundColor: "#151413",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                      }}
                    >
                      {/* Address */}
                      <div
                        className="font-[family-name:var(--font-mono)] text-[10px] select-all px-[var(--sp-3)] py-[6px] rounded-[var(--radius-md)] mb-[var(--sp-2)] truncate text-center"
                        style={{
                          color: "rgba(255,255,255,0.90)",
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        prajyotporje@gmail.com
                      </div>

                      {/* Actions */}
                      <div className="flex gap-[6px]">
                        {/* Copy button */}
                        <button
                          onClick={handleCopy}
                          type="button"
                          className="flex-1 flex items-center justify-center gap-[6px] py-[6px] px-[var(--sp-2)] rounded-[var(--radius-md)] text-[10px] font-medium transition-colors cursor-pointer"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.06)",
                            color: copied
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.8)",
                            border: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {copied ? (
                            <>
                              <svg
                                className="w-3.5 h-3.5"
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
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <title>Copy Icon</title>
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                  ry="2"
                                />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        {/* Open in Gmail */}
                        <a
                          href="https://mail.google.com/mail/?view=cm&to=prajyotporje@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-[4px] py-[6px] px-[var(--sp-2)] rounded-[var(--radius-md)] text-[10px] font-semibold no-underline text-center cursor-pointer"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.90)",
                            color: "#0e0d0b",
                          }}
                        >
                          <span>Open Gmail</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── BOTTOM-RIGHT: Scroll indicator ───────────────── */}
        <motion.div
          ref={scrollIndicatorRef as any}
          initial={{ opacity: 0, y: 10 }}
          animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
    </section>
  );
}
