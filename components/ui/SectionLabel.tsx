"use client";

import clsx from "clsx";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span
      className={clsx(
        "font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] uppercase text-[var(--color-ink-3)] select-none",
        className,
      )}
    >
      {label}
    </span>
  );
}
