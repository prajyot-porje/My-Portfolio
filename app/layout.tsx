import { Agentation } from "agentation";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";


// ── Self-hosted fonts ─────────────────────────────────────────────
// Place your .woff2 files in /public/fonts/ before running
const Krovex = localFont({
  src: [
    {
      path: "../public/Fonts/krovex-font/krovex.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/krovex-font/krovex.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/krovex-font/krovex.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const Grift = localFont({
  src: [
    {
      path: "../public/Fonts/grift-geometric-typeface/grift-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/grift-geometric-typeface/grift-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/grift-geometric-typeface/grift-semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// ── Metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Prajyot Porje — Product Engineer",
  description:
    "Full-stack engineer, founder of Dev Studio. Building production software from idea to shipped.",
  openGraph: {
    title: "Prajyot Porje — Product Engineer",
    description: "Full-stack engineer and founder of Dev Studio.",
    url: "https://prajyot.dev",
    siteName: "Prajyot Porje",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajyot Porje — Product Engineer",
    description: "Full-stack engineer and founder of Dev Studio.",
  },
  metadataBase: new URL("https://prajyot.dev"),
};

// ── Root Layout ───────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html
        lang="en"
        className={`${Krovex.variable} ${Grift.variable} ${GeistMono.variable}`}
        style={
          { "--font-mono": "var(--font-geist-mono)" } as React.CSSProperties
        }
        suppressHydrationWarning
      >
        <body>
          {/* JS-detect: enables .hero-entrance hidden state only when JS runs */}
          <Script id="js-detect" strategy="beforeInteractive">
            {`document.documentElement.classList.add('js')`}
          </Script>
          {/*
          Lenis smooth scroll goes here once you install @studio-freight/react-lenis.
          Wrap children in <ReactLenis root> with lenisOptions from lib/lenis.ts
        */}
          {children}
        </body>
      </html>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
