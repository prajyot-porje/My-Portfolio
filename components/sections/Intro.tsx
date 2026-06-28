"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TextEffect } from "../ui/text-effect";

interface IntroProps {
  onComplete: () => void;
}

const flipVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  },
  item: {
    hidden: { opacity: 0, rotateX: 90, y: 10 },
    visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.2 } },
  },
};

export default function Intro({ onComplete }: IntroProps) {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [step, setStep] = useState<number>(0); // 0 = line 1, 1 = line 2, 2 = line 3, 3 = fade out container

  // ── Determine whether to show the intro ────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("intro-seen") === "true";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || prefersReducedMotion) {
      setShouldShow(false);
      document.documentElement.classList.remove("intro-pending");
      onComplete();
    } else {
      setShouldShow(true);
    }
  }, [onComplete]);

  // ── Step progression sequence ──────────────────────────────────────
  useEffect(() => {
    if (shouldShow !== true) return;

    // Timing matching the original GSAP timeline
    const timers = [
      setTimeout(() => setStep(1), 2600), // Move to Line 2 after 2.6s
      setTimeout(() => setStep(2), 5200), // Move to Line 3 after 5.2s
      setTimeout(() => setStep(3), 8600), // Fade out container after 8.6s
      setTimeout(() => {
        sessionStorage.setItem("intro-seen", "true");
        onComplete();
      }, 9200), // Finish intro at 9.2s
    ];

    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [shouldShow, onComplete]);

  // Remove intro-pending class when container starts to fade out (step 3)
  useEffect(() => {
    if (step === 3) {
      document.documentElement.classList.remove("intro-pending");
    }
  }, [step]);

  if (shouldShow === null || shouldShow === false) return null;

  // Animation variants for lines
  const lineVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      y: -12,
      transition: {
        duration: 0.4,
        ease: [0.7, 0, 0.84, 0] as [number, number, number, number],
      },
    },
  };

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
          }}
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
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="line1"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
                  fontWeight: 500,
                  color: "var(--color-light-on-dark)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  willChange: "opacity, transform",
                }}
              >
                <TextEffect per="char" delay={0.1} variants={flipVariants}>
                  Ideas are cheap.
                </TextEffect>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="line2"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
                  fontWeight: 500,
                  color: "var(--color-light-on-dark)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  willChange: "opacity, transform",
                }}
              >
                <TextEffect per="char" delay={0.1} variants={flipVariants}>
                  Execution is rare.
                </TextEffect>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="line3"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--sp-4)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
                    fontWeight: 500,
                    color: "var(--color-light-on-dark)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    willChange: "opacity, transform",
                  }}
                >
                  <TextEffect per="char" delay={0.1} variants={flipVariants}>
                    Here's mine.
                  </TextEffect>
                </div>

                {/* Accent line flashes after line 3 appears */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: 1,
                    scaleX: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.2,
                      ease: [0.16, 1, 0.3, 1] as [
                        number,
                        number,
                        number,
                        number,
                      ],
                    },
                  }}
                  style={{
                    width: 40,
                    height: 2,
                    backgroundColor: "var(--color-accent)",
                    borderRadius: 1,
                    transformOrigin: "center",
                    willChange: "opacity, transform",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
