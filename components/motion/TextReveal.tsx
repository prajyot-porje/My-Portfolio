"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  mode?: "words" | "chars";
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
  mode = "words",
}: TextRevealProps) {
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  if (mode === "words") {
    const words = text.split(" ");
    return (
      <span className={clsx("inline-block", className)}>
        {words.map((word, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: words array is static
            key={i}
            className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em] vertical-align-middle"
          >
            <motion.span
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once, margin: "-10% 0px -10% 0px" }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.03,
                ease: [0.16, 1, 0.3, 1], // --ease-cinematic
              }}
              className="inline-block will-change-transform"
            >
              {word === "" ? "\u00A0" : word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // Chars mode
  const chars = Array.from(text);
  return (
    <span className={clsx("inline-block", className)}>
      {chars.map((char, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: characters array is static
          key={i}
          className="inline-block overflow-hidden vertical-align-middle"
        >
          <motion.span
            initial={{ y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.015,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
