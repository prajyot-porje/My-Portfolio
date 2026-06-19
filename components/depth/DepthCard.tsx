"use client";

import clsx from "clsx";
import type React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface DepthCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  level?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "article" | "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
}

const DepthCard = forwardRef<HTMLElement, DepthCardProps>(
  (
    { children, level = 1, as = "div", className, onMouseMove, ...props },
    ref,
  ) => {
    const cardRef = useRef<HTMLElement>(null);

    // Expose the inner cardRef to parent ref
    useImperativeHandle(ref, () => cardRef.current!);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);

      if (onMouseMove) {
        onMouseMove(e);
      }
    };

    const Component = as;

    return (
      <Component
        ref={cardRef as any}
        onMouseMove={handleMouseMove as any}
        className={clsx(
          "depth-card",
          level > 0 && `depth-card--${level}`,
          "border border-[var(--color-surface-3)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]",
          className,
        )}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  },
);

DepthCard.displayName = "DepthCard";

export default DepthCard;
