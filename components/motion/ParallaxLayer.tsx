"use client";

import clsx from "clsx";
import type React from "react";
import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // E.g., 0.1 means 10% scroll speed shift
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.08,
  className,
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Standard parallax is disabled on mobile or when reduced motion is preferred
    if (prefersReducedMotion || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        // Move the layer vertically relative to viewport scroll progress
        gsap.fromTo(
          container,
          { y: 0 },
          {
            y: () => -window.innerHeight * speed,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
    );
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={clsx("will-change-transform", className)}
    >
      {children}
    </div>
  );
}
