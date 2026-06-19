"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--color-accent)] z-[200] origin-left will-change-transform pointer-events-none"
      style={{
        transform: `scaleX(${progress})`,
      }}
    />
  );
}
