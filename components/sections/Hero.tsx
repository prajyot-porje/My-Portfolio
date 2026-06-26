"use client";

import { animate, onScroll } from "animejs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const mobileImages = ["/images/profile/hero.png", "/images/profile/new.png"];

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
  const progressFillRef = useRef<HTMLDivElement>(null);

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

  // Mobile circular images auto-rotation
  const [mobileImgIndex, setMobileImgIndex] = useState(0);

  useEffect(() => {
    if (isIntroActive) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setMobileImgIndex((prev) => (prev + 1) % mobileImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isIntroActive]);

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
        className="absolute inset-0 z-0 hidden md:block"
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
        className="absolute inset-0 z-[1] pointer-events-none hero-veil will-change-transform hidden md:block"
      />

      {/* ── LAYER 3: Content ───────────────────────────────────── */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-[2] will-change-transform"
      >
        {/* ─────────────────────────────────────────────────────────────── */}
        {/* ── MOBILE HERO (md:hidden) — App-native profile layout ─────── */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isIntroActive ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden absolute inset-0 flex flex-col items-center justify-center px-6 pt-14 pb-28 gap-0"
        >
          {/* ── Profile image zone ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isIntroActive ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center mb-7"
          >
            {/* Outer slow-rotating ring */}
            <motion.div
              aria-hidden="true"
              className="absolute w-[228px] h-[228px] rounded-full"
              style={{ border: "1px solid rgba(13,13,13,0.12)" }}
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner counter-rotating dashed ring */}
            <motion.div
              aria-hidden="true"
              className="absolute w-[208px] h-[208px] rounded-full"
              style={{ border: "1px dashed rgba(13,13,13,0.14)" }}
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
            />
            {/* Floating avatar circle */}
            <motion.div
              className="w-[184px] h-[184px] rounded-full overflow-hidden bg-[var(--color-surface-2)] relative"
              style={{
                boxShadow:
                  "0 0 0 3px var(--color-ink-1), 0 24px 56px rgba(13,13,13,0.13)",
              }}
              animate={prefersReducedMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileImgIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={mobileImages[mobileImgIndex]}
                    alt="Prajyot Porje"
                    fill
                    priority
                    className="object-cover object-[center_top]"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Available badge floating below avatar */}
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.85 }}
              animate={isIntroActive ? {} : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-[6px] bg-[var(--color-dark-1)] rounded-full shadow-lg"
              style={{ padding: "5px 12px" }}
            >
              <span className="relative flex h-[5px] w-[5px]" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-status-green)] opacity-75" />
                <span className="relative inline-flex rounded-full h-[5px] w-[5px] bg-[var(--color-status-green)]" />
              </span>
              <span
                className="text-[var(--color-status-green)] font-semibold uppercase tracking-[0.14em]"
                style={{ fontFamily: "var(--font-mono)", fontSize: "9px" }}
              >
                Available
              </span>
            </motion.div>
          </motion.div>

          {/* ── Name ─── */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.25rem] leading-none font-semibold tracking-[-0.025em] text-[var(--color-ink-1)] text-center mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Prajyot Porje
          </motion.h1>

          {/* ── Role label ─── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--color-ink-3)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Product Engineer
          </motion.p>

          {/* ── Metrics strip ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-stretch border border-[var(--color-surface-3)] rounded-2xl overflow-hidden mb-6 w-full max-w-[308px]"
          >
            {([
              { value: "3+", label: "US Clients" },
              { value: "5+", label: "Products" },
              { value: "2yr", label: "Studio" },
            ] as { value: string; label: string }[]).map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex-1 py-3 text-center${
                  i < 2 ? " border-r border-[var(--color-surface-3)]" : ""
                }`}
              >
                <span
                  className="block leading-none mb-1 font-semibold"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1.2rem",
                    color: "var(--color-ink-1)",
                  }}
                >
                  {value}
                </span>
                <span
                  className="block uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    color: "var(--color-ink-3)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── CTA ─── */}
          <motion.a
            href="#work"
            initial={{ opacity: 0, y: 10 }}
            animate={isIntroActive ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 bg-[var(--color-ink-1)] text-[var(--color-ground)] w-full max-w-[308px] rounded-full font-medium active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              padding: "15px 24px",
              transition: "transform 0.15s ease",
            }}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See the Work
            <span style={{ color: "var(--color-accent)" }}>↓</span>
          </motion.a>
        </motion.div>
        {/* ── BOTTOM-LEFT: Hero copy (desktop only) ───────────────────── */}
        <div className="hidden md:block absolute left-[var(--sp-8)] top-1/2 -translate-y-1/2 max-w-[480px]">
          {/* Location + time chip */}
          <motion.div
            ref={chipRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
          {/* CARD 1 — Active Build */}
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

              {/* Card content — developer dashboard aesthetic */}
              <div className="relative z-[1] px-5 py-4 h-full flex flex-col justify-between">
                {/* Top row: system label + status */}
                <div className="flex justify-between items-center">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.15em] uppercase text-white/40">
                    SYSTEM {"//"} BUILD_LOG
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/80" />
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.1em] uppercase font-semibold text-white/70">
                      Active
                    </span>
                  </div>
                </div>

                {/* Project details */}
                <div>
                  <h4 className="font-[family-name:var(--font-sans)] font-semibold tracking-tight text-[1.2rem] text-white">
                    <TextEffect
                      per="char"
                      variants={blurSlideVariants}
                      trigger={focusTrigger}
                    >
                      {focusItems[focusIndex].name.toLowerCase()}
                    </TextEffect>
                  </h4>
                  <p className="font-[family-name:var(--font-mono)] text-[9px] text-white/35 mt-1">
                    v2.0.4 · main · commit::7f3a9d2
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div
                    className="w-full h-[2px] rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      ref={progressFillRef}
                      className="h-full rounded-full"
                      style={{
                        width: focusTrigger ? "100%" : "0%",
                        transition: focusTrigger
                          ? "width 4600ms linear"
                          : "none",
                        backgroundColor: "rgba(255,255,255,0.5)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2 — Research Focus */}
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
            {/* Inner Content Container */}
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

              {/* Content — R&D Focus layout */}
              <div className="relative z-[1] px-5 py-4 h-full flex flex-col justify-between">
                {/* Top row: Label */}
                <div className="flex justify-between items-center">
                  <span className="block font-[family-name:var(--font-mono)] text-[9px] tracking-[0.15em] uppercase text-white/40">
                    REGISTRY {"//"} METRICS
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.1em] uppercase font-semibold text-white/70">
                      Optimal
                    </span>
                  </div>
                </div>

                {/* Focus keyword */}
                <div>
                  <h4 className="font-[family-name:var(--font-sans)] font-semibold tracking-tight text-[1.1rem] text-white">
                    context-graph-server
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-white/50">
                      12ms latency
                    </span>
                    <span className="text-white/20 text-[9px]">•</span>
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-white/50">
                      99.4% cache hit
                    </span>
                  </div>
                </div>

                {/* Port details */}
                <div className="font-[family-name:var(--font-mono)] text-[8px] text-white/35 uppercase tracking-wider">
                  PORT 8080 {"//"} SECURE CONNECT
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
              "group relative block w-[340px] h-[144px] p-[8px] select-none text-left outer-shell",
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

              {/* Content — Redesigned Gateway layout */}
              <div className="relative z-[1] px-5 py-4 h-full flex flex-col justify-between">
                {/* Top row: Label */}
                <div className="flex justify-between items-center">
                  <span className="block font-[family-name:var(--font-mono)] text-[9px] tracking-[0.15em] uppercase text-white/40">
                    GATEWAY {"//"} CONNECT
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.1em] uppercase font-semibold text-white/70">
                      Ready
                    </span>
                  </div>
                </div>

                {/* Email Address details */}
                <button
                  onClick={handleCard3Click}
                  type="button"
                  className="group/mail text-left w-full outline-none cursor-pointer"
                >
                  <span className="font-[family-name:var(--font-sans)] font-semibold tracking-tight text-[1.05rem] text-white group-hover/mail:text-white/80 transition-colors block">
                    porjeprajyot@gmail.com
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[8px] text-white/35 mt-1 block uppercase tracking-wider">
                    {card3Copied
                      ? "Copied to clipboard!"
                      : "Click to copy address"}
                  </span>
                </button>

                {/* Horizontal row of text links */}
                <div className="flex gap-4 items-center">
                  <a
                    href="https://github.com/prajyot-porje"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-mono)] text-[9px] text-white/50 hover:text-white tracking-wider uppercase transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prajyot-porje/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-mono)] text-[9px] text-white/50 hover:text-white tracking-wider uppercase transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://leetcode.com/u/prajyot-porje/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-mono)] text-[9px] text-white/50 hover:text-white tracking-wider uppercase transition-colors"
                  >
                    LeetCode
                  </a>
                  <a
                    href="/Full_Stack_Developer_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-mono)] text-[9px] text-white/50 hover:text-white tracking-wider uppercase transition-colors"
                  >
                    Resume
                  </a>
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
    </section>
  );
}
