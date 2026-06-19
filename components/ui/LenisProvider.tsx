"use client";

import { ReactLenis } from "lenis/react";
import { lenisOptions } from "@/lib/lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
