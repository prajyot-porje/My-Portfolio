"use client";

import clsx from "clsx";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type React from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  range?: number; // Distance in pixels to trigger magnetic pull
  strength?: number; // Strength of the pull (0 to 1)
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  (
    {
      children,
      className,
      range = 60,
      strength = 0.35,
      asLink = false,
      href,
      target,
      rel,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLElement>(null);
    const [hovered, setHovered] = useState(false);

    // Expose the inner buttonRef to parent ref
    useImperativeHandle(ref, () => buttonRef.current!);

    // Position offsets
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for hardware-accelerated movement
    const springConfig = { damping: 15, stiffness: 180, mass: 0.4 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setHovered(true);
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        handleMouseLeaveInternal();
      }

      if (onMouseMove) {
        onMouseMove(e);
      }
    };

    const handleMouseLeaveInternal = () => {
      setHovered(false);
      x.set(0);
      y.set(0);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      handleMouseLeaveInternal();
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    const buttonClass = clsx(
      "relative inline-flex items-center justify-center select-none",
      "transition-shadow duration-[var(--dur-fast)] ease-[var(--ease-gentle)]",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink-1)]",
      className,
    );

    const innerContent = (
      <motion.span
        className="flex items-center gap-[var(--sp-2)] w-full h-full justify-center pointer-events-none"
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.span>
    );

    const Component = asLink ? motion.a : motion.button;

    return (
      <Component
        ref={buttonRef as any}
        onMouseMove={handleMouseMove as any}
        onMouseLeave={handleMouseLeave as any}
        style={{
          x: springX,
          y: springY,
        }}
        whileTap={{ scale: 0.96 }} // Repel/recoil on click
        className={buttonClass}
        {...(asLink ? { href, target, rel } : {})}
        {...(props as any)}
      >
        {innerContent}
      </Component>
    );
  },
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
