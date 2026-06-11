"use client";
import { useEffect, useRef } from "react";

export function useGSAP(
  /* biome-ignore lint/suspicious/noConfusingVoidType: void is standard for effect callback return types */
  callback: () => void | (() => void),
  deps: unknown[] = [],
) {
  const ctx = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    /* biome-ignore lint/suspicious/noConfusingVoidType: void is standard for effect cleanup types */
    let cleanup: (() => void) | void;

    import("gsap").then(({ gsap }) => {
      ctx.current = gsap.context(() => {
        cleanup = callback();
      });
    });

    return () => {
      ctx.current?.revert();
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // biome-ignore lint/correctness/useExhaustiveDependencies: dynamic dependencies are intentional for custom hooks
  }, deps);
}
