// Lenis config — used in LenisProvider (see layout.tsx)
export const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  orientation: "vertical" as const,
  smoothWheel: true,
};
