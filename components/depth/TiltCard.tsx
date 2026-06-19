"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type React from "react";
import { useRef } from "react";
import DepthCard from "./DepthCard";

interface TiltCardProps extends React.ComponentProps<typeof DepthCard> {
  maxRotation?: number;
}

export default function TiltCard({
  children,
  maxRotation = 8, // Sleek, restrained angle to prevent extreme skew
  className,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  // Motion values for cursor position relative to card boundaries
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs to animate the rotation offsets
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [maxRotation, -maxRotation]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-maxRotation, maxRotation]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        <DepthCard
          ref={cardRef as any}
          onMouseMove={handleMouseMove as any}
          className={className}
          {...props}
        >
          {children}
        </DepthCard>
      </motion.div>
    </motion.div>
  );
}
