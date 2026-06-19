"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import type React from "react";

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "top" | "bottom";
}

export default function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "left",
}: ClipRevealProps) {
  // Define initial and animated clip paths based on direction
  const clipPaths = {
    left: {
      initial: "inset(0 100% 0 0)",
      animate: "inset(0 0% 0 0)",
    },
    right: {
      initial: "inset(0 0 0 100%)",
      animate: "inset(0 0% 0 0)",
    },
    top: {
      initial: "inset(0 0 100% 0)",
      animate: "inset(0 0% 0 0)",
    },
    bottom: {
      initial: "inset(100% 0 0 0)",
      animate: "inset(0 0% 0 0)",
    },
  };

  return (
    <motion.div
      initial={{ clipPath: clipPaths[direction].initial }}
      whileInView={{ clipPath: clipPaths[direction].animate }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // --ease-cinematic
      }}
      className={clsx("will-change-[clip-path]", className)}
    >
      {children}
    </motion.div>
  );
}
