import { Agentation } from "agentation";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/ui/LenisProvider";
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
    "Product Engineer building production software from idea to shipped.",
  icons: {
    icon: "/images/icon.png",
  },
  openGraph: {
    title: "Prajyot Porje — Product Engineer",
    description:
      "Product Engineer building production software from idea to shipped.",
    url: "https://prajyot.dev",
    siteName: "Prajyot Porje",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajyot Porje — Product Engineer",
    description:
      "Product Engineer building production software from idea to shipped.",
  },
  metadataBase: new URL("https://prajyot.dev"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
        <head>
          {/* JS-detect & Preloader protection: prevents flashing page content before JS loads */}
          <script
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JS detect inline script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  document.documentElement.classList.add('js');
                  try {
                    var seen = sessionStorage.getItem('intro-seen') === 'true';
                    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    if (!seen && !prefersReducedMotion) {
                      document.documentElement.classList.add('intro-pending');
                    }
                  } catch (e) {}
                })()
              `,
            }}
          />
        </head>
        <body>
          <LenisProvider>{children}</LenisProvider>
          {/* impeccable-live-start */}
          {process.env.NODE_ENV === "development" && (
            <script src="http://localhost:8400/live.js" async />
          )}
          {/* impeccable-live-end */}
        </body>
      </html>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
