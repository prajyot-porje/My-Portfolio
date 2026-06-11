"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [hoverState, setHoverState] = useState<
    "none" | "interactive" | "photo"
  >("none");
  const [isTouch, setIsTouch] = useState(true);
  const [onDark, setOnDark] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringFollowRef = useRef<HTMLDivElement>(null);

  // Check if touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window,
      );
    };
    checkTouch();
  }, []);

  // Track hover states using event delegation
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isPhoto = target.closest('[data-cursor="photo"]');
      if (isPhoto) {
        setHoverState("photo");
        return;
      }

      const isInteractive = target.closest(
        'a, button, [role="button"], input, select, textarea',
      );
      if (isInteractive) {
        // If the interactive element or any ancestor has data-cursor-no-ring, suppress the hover circle
        if (isInteractive.closest('[data-cursor-no-ring="true"]')) {
          setHoverState("none");
          return;
        }
        setHoverState("interactive");
        return;
      }

      setHoverState("none");
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget) {
        setHoverState("none");
        return;
      }

      const isPhoto = relatedTarget.closest('[data-cursor="photo"]');
      if (isPhoto) {
        setHoverState("photo");
        return;
      }

      const isInteractive = relatedTarget.closest(
        'a, button, [role="button"], input, select, textarea',
      );
      if (isInteractive) {
        if (isInteractive.closest('[data-cursor-no-ring="true"]')) {
          setHoverState("none");
          return;
        }
        setHoverState("interactive");
        return;
      }

      setHoverState("none");
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouch]);

  // Robust dark surface detection under the cursor (checks ancestors + computed styles + big text + cards)
  useEffect(() => {
    if (isTouch) return;
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!el) return;

      let isDark = false;
      let curr: HTMLElement | null = el;

      // Climb DOM tree to detect dark background or large dark text under cursor
      while (curr && curr !== document.body) {
        // 1. Explicit classes/attributes or tag names
        if (
          curr.classList.contains("hero-headline") ||
          curr.tagName === "H1" ||
          curr.closest("nav") ||
          curr.getAttribute("data-surface") === "dark" ||
          curr.getAttribute("data-cursor") === "photo" ||
          curr.classList.contains("hero-entrance")
        ) {
          isDark = true;
          break;
        }

        // 2. Computed background color brightness check
        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            // Perceived brightness formula
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness < 120) {
              isDark = true;
              break;
            }
          }
        }

        // 3. Computed text color check for large headers (so black text on light bg gets a border)
        const color = style.color;
        if (color && (curr.tagName === "H1" || curr.classList.contains("hero-headline"))) {
          const rgb = color.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness < 50) {
              isDark = true;
              break;
            }
          }
        }

        curr = curr.parentElement;
      }

      setOnDark(isDark);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch]);

  // Handle GSAP mouse following
  useEffect(() => {
    if (isTouch) return;
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const ring = ringFollowRef.current;
    if (!cursor || !ring) return;

    let quickCursorX: ((v: number) => void) | null = null;
    let quickCursorY: ((v: number) => void) | null = null;
    let quickRingX: ((v: number) => void) | null = null;
    let quickRingY: ((v: number) => void) | null = null;

    import("gsap").then(({ gsap }) => {
      gsap.set([cursor, ring], { x: -100, y: -100 });

      quickCursorX = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2" });
      quickCursorY = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2" });
      quickRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2" });
      quickRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2" });
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (quickCursorX && quickCursorY && quickRingX && quickRingY) {
        quickCursorX(e.clientX);
        quickCursorY(e.clientY);
        quickRingX(e.clientX);
        quickRingY(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouch]);

  // Apply CSS cursor:none to body when not touch
  useEffect(() => {
    if (isTouch) return;
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      const el = document.getElementById("custom-cursor-style");
      if (el) el.remove();
    };
  }, [isTouch]);

  if (isTouch) return null;

  // Outer border color for the cursor based on whether it is hovering over a dark region
  const edgeStroke = onDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.08)";

  return (
    <>
      {/* Ring Follower — expands on hover states (unless data-cursor-no-ring is active) */}
      <div
        ref={ringFollowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <div
          className="flex items-center justify-center transition-[width,height,border-color,background-color,opacity] duration-[var(--dur-fast)] ease-[var(--ease-gentle)]"
          style={{
            width:
              hoverState === "photo"
                ? 72
                : hoverState === "interactive"
                  ? 48
                  : 0,
            height:
              hoverState === "photo"
                ? 72
                : hoverState === "interactive"
                  ? 48
                  : 0,
            borderRadius: "50%",
            borderColor:
              hoverState !== "none"
                ? "rgba(255,255,255,0.15)"
                : "transparent",
            borderWidth: hoverState !== "none" ? "1.5px" : "0px",
            borderStyle: "solid",
            backgroundColor:
              hoverState === "photo"
                ? "rgba(13,13,13,0.08)"
                : "transparent",
            opacity: hoverState !== "none" ? 1 : 0,
            transform: "translate(-50%, -50%)",
          }}
        >
          {hoverState === "photo" && (
            <span
              className="text-[10px] text-[var(--color-ink-2)] select-none font-medium tracking-[0.08em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              VIEW
            </span>
          )}
        </div>
      </div>

      {/* Custom cursor — Sleek 3D aerodynamic arrow (matching reference image) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          marginLeft: "-1px",
          marginTop: "-1px",
        }}
      >
        <div
          className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-gentle)]"
          style={{
            transform: `scale(${
              hoverState === "interactive"
                ? 0.85
                : hoverState === "photo"
                  ? 0.9
                  : 1
            })`,
            transformOrigin: "2px 2px",
          }}
        >
          {/*
            Sleek paper-airplane style navigation arrow with curved wing edges
            and a deep curved notch at the bottom back (matching reference image).
            Features a detailed 3D obsidian gradient, rim lights, and specula.
          */}
          <svg
            width="22"
            height="26"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cBody" x1="4" y1="0" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#4c4c4c"/>
                <stop offset="0.12" stopColor="#303030"/>
                <stop offset="0.35" stopColor="#1a1a1a"/>
                <stop offset="0.7" stopColor="#0c0c0c"/>
                <stop offset="1" stopColor="#020202"/>
              </linearGradient>
              <linearGradient id="cGloss" x1="2" y1="0" x2="16" y2="18" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.55"/>
                <stop offset="0.25" stopColor="#ffffff" stopOpacity="0.22"/>
                <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.05"/>
                <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="cRim" x1="2" y1="1" x2="20" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#909090"/>
                <stop offset="0.25" stopColor="#505050"/>
                <stop offset="0.6" stopColor="#252525"/>
                <stop offset="1" stopColor="#080808"/>
              </linearGradient>
              <filter id="cShadow" x="-40%" y="-25%" width="200%" height="170%">
                <feDropShadow dx="1.2" dy="2.8" stdDeviation="2" floodColor="#000" floodOpacity="0.55"/>
              </filter>
            </defs>
            <g filter="url(#cShadow)">
              {/* Outer rim/edge path with organic curves and wing rounding */}
              <path
                d="M 2.5,2.5 C 2.5,2.5 11.5,6.5 21.5,11 C 22.5,11.5 22.5,12 21.8,12.5 C 13,11.5 11.5,13 12.5,21.8 C 12,22.5 11.5,22.5 11,21.5 C 6.5,11.5 2.5,2.5 2.5,2.5 Z"
                fill="url(#cRim)"
                stroke={edgeStroke}
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              {/* Inner body fill (slightly inset for 3D bevel look) */}
              <path
                d="M 3.5,3.8 C 3.5,3.8 11.2,7.3 19.8,11.2 C 20.2,11.4 20.2,11.6 19.8,11.8 C 12.4,11.2 11.2,12.4 11.8,19.8 C 11.6,20.2 11.4,20.2 11.2,19.8 C 7.3,11.2 3.8,3.8 3.5,3.8 Z"
                fill="url(#cBody)"
              />
              {/* Gloss overlay */}
              <path
                d="M 3.5,3.8 C 3.5,3.8 11.2,7.3 19.8,11.2 C 20.2,11.4 20.2,11.6 19.8,11.8 C 12.4,11.2 11.2,12.4 11.8,19.8 C 11.6,20.2 11.4,20.2 11.2,19.8 C 7.3,11.2 3.8,3.8 3.5,3.8 Z"
                fill="url(#cGloss)"
              />
              {/* Specular highlights along top-left bevel */}
              <path
                d="M 4,5.2 L 9.8,8.2"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.65"
                strokeLinecap="round"
              />
              <path
                d="M 4,5.2 L 5.2,9.8"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.65"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
