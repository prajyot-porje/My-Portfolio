"use client";

import { useEffect, useRef, useState } from "react";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  // null = not yet determined, false = show, true = skip
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  // ── Determine whether to show the intro ────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("intro-seen") === "true";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || prefersReducedMotion) {
      setShouldShow(false);
      onComplete();
    } else {
      setShouldShow(true);
    }
  }, [onComplete]);

  // ── GSAP animation sequence ─────────────────────────────────────────
  useEffect(() => {
    if (shouldShow !== true) return;

    let ctx: { revert: () => void } | undefined;

    import("gsap").then(({ gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // ── Initial state: all lines invisible, positioned below ──
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
          opacity: 0,
          y: 24,
        });
        gsap.set(accentRef.current, { opacity: 0, scaleX: 0 });

        // ── LINE 1: "Ideas are cheap." ─────────────────────────────
        // in: 700ms ease-cinematic
        tl.to(line1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "cubic-bezier(0.16,1,0.3,1)",
        });
        // hold: 1400ms
        tl.to(line1Ref.current, { duration: 1.4 });
        // out: 500ms ease-sharp
        tl.to(line1Ref.current, {
          opacity: 0,
          y: -16,
          duration: 0.5,
          ease: "cubic-bezier(0.7,0,0.84,0)",
        });

        // ── LINE 2: "Execution is rare." ───────────────────────────
        tl.to(line2Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "cubic-bezier(0.16,1,0.3,1)",
        });
        tl.to(line2Ref.current, { duration: 1.4 });
        tl.to(line2Ref.current, {
          opacity: 0,
          y: -16,
          duration: 0.5,
          ease: "cubic-bezier(0.7,0,0.84,0)",
        });

        // ── LINE 3: "Here's mine." ─────────────────────────────────
        tl.to(line3Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "cubic-bezier(0.16,1,0.3,1)",
        });

        // Accent line flashes after line 3 appears
        tl.to(
          accentRef.current,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.2,
            ease: "cubic-bezier(0.16,1,0.3,1)",
          },
          "+=0.1",
        );

        // hold: 2200ms (line 3 + accent)
        tl.to(line3Ref.current, { duration: 2.2 });

        // out: line 3 + accent fade together
        tl.to([line3Ref.current, accentRef.current], {
          opacity: 0,
          y: -16,
          duration: 0.5,
          ease: "cubic-bezier(0.7,0,0.84,0)",
        });

        // ── Overlay fade out ───────────────────────────────────────
        // pause 200ms then full overlay fades
        tl.to(containerRef.current, { duration: 0.2 });
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "cubic-bezier(0.16,1,0.3,1)",
          onComplete: () => {
            sessionStorage.setItem("intro-seen", "true");
            onComplete();
          },
        });
      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, [shouldShow, onComplete]);

  // Don't render until we know whether to show
  if (shouldShow === null || shouldShow === false) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-dark-1)",
        overflow: "hidden",
      }}
    >
      {/* Line 1 */}
      <div
        ref={line1Ref}
        style={{
          position: "absolute",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 700,
          color: "var(--color-light-on-dark)",
          letterSpacing: "var(--ls-heading)",
          lineHeight: "var(--lh-heading)",
          textAlign: "center",
          maxWidth: 700,
          willChange: "opacity, transform",
        }}
      >
        Ideas are cheap.
      </div>

      {/* Line 2 */}
      <div
        ref={line2Ref}
        style={{
          position: "absolute",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 700,
          color: "var(--color-light-on-dark)",
          letterSpacing: "var(--ls-heading)",
          lineHeight: "var(--lh-heading)",
          textAlign: "center",
          maxWidth: 700,
          willChange: "opacity, transform",
        }}
      >
        Execution is rare.
      </div>

      {/* Line 3 + accent mark */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--sp-4)",
        }}
      >
        <div
          ref={line3Ref}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--color-light-on-dark)",
            letterSpacing: "var(--ls-heading)",
            lineHeight: "var(--lh-heading)",
            textAlign: "center",
            maxWidth: 700,
            willChange: "opacity, transform",
          }}
        >
          Here&apos;s mine.
        </div>

        {/* Accent underline — 2px × 40px lime, appears with line 3 */}
        <div
          ref={accentRef}
          style={{
            width: 40,
            height: 2,
            backgroundColor: "var(--color-accent)",
            borderRadius: 1,
            transformOrigin: "center",
            willChange: "opacity, transform",
          }}
        />
      </div>
    </div>
  );
}
