"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

interface ElevatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export default function ElevatedImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  priority = false,
}: ElevatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          image,
          { scale: 1.0 },
          {
            scale: 1.08,
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "outer-shell overflow-hidden w-full h-full p-2.5",
        "transition-transform duration-[var(--dur-normal)] ease-[var(--ease-gentle)]",
        className,
      )}
    >
      <div className="inner-container overflow-hidden w-full h-full relative bg-[var(--color-surface-2)]">
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={clsx(
            "w-full h-full object-cover will-change-transform",
            imageClassName,
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
