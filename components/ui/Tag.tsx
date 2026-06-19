"use client";

import clsx from "clsx";
import type React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={clsx(
        "font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] bg-[var(--color-surface-2)] border border-[var(--color-surface-4)] text-[var(--color-ink-3)] px-[10px] py-[4px] rounded-[100px] select-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
