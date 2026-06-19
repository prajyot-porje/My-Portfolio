"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import ElevatedImage from "../depth/ElevatedImage";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";

export default function DevStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const header = headerRef.current;
        const cards = cardsRef.current;
        if (!header || !cards) return;

        // Entrance animation on viewport enter
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        const cardItems = cards.querySelectorAll(".studio-card");
        gsap.fromTo(
          cardItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: cards,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      },
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="studio"
      className="w-full bg-[var(--color-dark-1)] text-[var(--color-light-on-dark)] py-[var(--section-xl)] px-[var(--sp-8)] md:px-[var(--sp-16)] relative overflow-hidden"
    >
      {/* Background design accents */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />

      <div className="max-w-[1280px] mx-auto w-full">
        {/* Section Header */}
        <div ref={headerRef} className="mb-[var(--sp-12)] max-w-2xl">
          <SectionLabel
            label="02 / DEV STUDIO"
            className="text-white/40 mb-[var(--sp-3)] block"
          />
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] text-white tracking-[var(--ls-display)] leading-[var(--lh-display)] mb-[var(--sp-4)]">
            Dev Studio.
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-white/70 leading-[var(--lh-body)]">
            I founded Dev Studio to ship production-grade products for US
            clients. I manage client relations, architectural decisions, and
            product speed under real business constraints.
          </p>
        </div>

        {/* 12-Column Grid of Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-[var(--sp-4)] w-full"
        >
          {/* Card 1: Kiyomi (Headless Commerce Storefront) - 7 cols */}
          <div className="studio-card col-span-12 md:col-span-7 flex flex-col justify-between bg-[var(--color-dark-2)] border border-white/5 rounded-[var(--radius-lg)] p-[var(--sp-6)] min-h-[460px] relative overflow-hidden group">
            {/* Top row */}
            <div className="flex justify-between items-start w-full relative z-10">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[#94ff0b] uppercase block mb-1">
                  E-COMMERCE
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-white tracking-[var(--ls-title)]">
                  Kiyomi
                </h3>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] bg-white/10 text-white px-[10px] py-[6px] rounded-[100px] uppercase font-semibold">
                ACTIVE PORTFOLIO
              </span>
            </div>

            {/* Description & Impact */}
            <div className="mt-[var(--sp-4)] relative z-10">
              <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-white/75 leading-[var(--lh-body)] mb-[var(--sp-4)]">
                A premium, minimalist headless skincare store built to scale.
                Integrates Shopify Checkout, customizable cart components, and
                hyper-optimized static generation.
              </p>
              <div className="flex flex-col gap-1.5 border-l border-white/15 pl-[var(--sp-4)] mb-[var(--sp-4)]">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-white/50 uppercase">
                  Impact
                </span>
                <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-white/90 leading-[var(--lh-label)]">
                  Implemented headless checkout flow that reduced drop-offs and
                  increased checkout performance by 25%.
                </span>
              </div>
            </div>

            {/* Mockup Image container */}
            <div className="h-[180px] w-full mt-[var(--sp-4)] relative overflow-hidden rounded-[var(--radius-md)]">
              <ElevatedImage
                src="/images/projects/Kiyomi.png"
                alt="Kiyomi Storefront mockup"
                width={700}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags footer */}
            <div className="flex justify-between items-end mt-[var(--sp-4)] relative z-10">
              <div className="flex flex-wrap gap-[var(--sp-2)]">
                {["Next.js", "Shopify API", "Tailwind CSS", "Vercel"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] bg-white/5 border border-white/10 text-white/60 px-[10px] py-[4px] rounded-[100px]"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Agency Operations / Focus - 5 cols */}
          <div className="studio-card col-span-12 md:col-span-5 flex flex-col justify-between bg-[var(--color-dark-2)] border border-white/5 rounded-[var(--radius-lg)] p-[var(--sp-6)] min-h-[460px]">
            <div>
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[#94ff0b] uppercase block mb-1">
                STUDIO VALUE
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-white tracking-[var(--ls-title)] mb-[var(--sp-4)]">
                How We Deliver.
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-white/75 leading-[var(--lh-body)]">
                Dev Studio is built on a direct engineering model. We skip
                account managers and fluff. We build robust systems that are
                fast to load and simple to maintain.
              </p>
            </div>

            {/* Key metrics list */}
            <div className="flex flex-col gap-[var(--sp-3)] my-[var(--sp-4)]">
              {[
                { label: "Active US Clients", val: "4" },
                { label: "Production Sites Live", val: "10+" },
                { label: "On-time Delivery Rate", val: "100%" },
                { label: "Pune, IN to Global", val: "Remote" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between border-b border-white/5 pb-2"
                >
                  <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-white/60">
                    {metric.label}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-[#94ff0b] font-bold">
                    {metric.val}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <MagneticButton
                asLink
                href="mailto:prajyotporje@gmail.com"
                className="bg-white text-[var(--color-dark-1)] px-[18px] py-[10px] rounded-[100px] text-[length:var(--text-sm)] font-medium hover:bg-white/90 w-full text-center"
              >
                Inquire for Work
              </MagneticButton>
            </div>
          </div>

          {/* Card 3: Agency Ethos - 5 cols */}
          <div className="studio-card col-span-12 md:col-span-5 flex flex-col justify-between bg-[var(--color-dark-2)] border border-white/5 rounded-[var(--radius-lg)] p-[var(--sp-6)] min-h-[460px]">
            <div>
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[#94ff0b] uppercase block mb-1">
                ENGINEERING STANDARDS
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-white tracking-[var(--ls-title)] mb-[var(--sp-4)]">
                The Product Mindset.
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-white/75 leading-[var(--lh-body)]">
                A personal conviction to stand behind our software. We monitor
                production performance, optimize resource loads, and ensure
                accessibility. Our sites achieve 95+ lighthouse scores.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-[var(--radius-md)] p-[var(--sp-4)] mt-[var(--sp-2)]">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[#94ff0b] block mb-1">
                SYSTEM REPORT
              </span>
              <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-white/60 italic">
                &ldquo;Every line of code is written with semantic execution. We
                swap defaults, calibrate colors, and build animations that have
                static fallback layouts.&rdquo;
              </p>
            </div>

            <div className="mt-[var(--sp-4)]">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-white/40">
                DEV STUDIO CO - 2025
              </span>
            </div>
          </div>

          {/* Card 4: Namrl (Technical Infrastructure Site) - 7 cols */}
          <div className="studio-card col-span-12 md:col-span-7 flex flex-col justify-between bg-[var(--color-dark-2)] border border-white/5 rounded-[var(--radius-lg)] p-[var(--sp-6)] min-h-[460px] relative overflow-hidden group">
            {/* Top row */}
            <div className="flex justify-between items-start w-full relative z-10">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[#94ff0b] uppercase block mb-1">
                  BRAND INFRASTRUCTURE
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-white tracking-[var(--ls-title)]">
                  Namrl
                </h3>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] bg-white/10 text-white px-[10px] py-[6px] rounded-[100px] uppercase font-semibold">
                COMPLETED
              </span>
            </div>

            {/* Description & Impact */}
            <div className="mt-[var(--sp-4)] relative z-10">
              <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-white/75 leading-[var(--lh-body)] mb-[var(--sp-4)]">
                A high-fidelity landing and brand engine designed for a
                technical system provider. Focuses on premium, interactive
                layouts, fine-grained details, and high-framerate motion curves.
              </p>
              <div className="flex flex-col gap-1.5 border-l border-white/15 pl-[var(--sp-4)] mb-[var(--sp-4)]">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-white/50 uppercase">
                  Details
                </span>
                <span className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-white/90 leading-[var(--lh-label)]">
                  Built complex SVG layout systems and GSAP animation triggers.
                  Optimizations resulted in a sub-1.2s Largest Contentful Paint
                  (LCP) score.
                </span>
              </div>
            </div>

            {/* Mockup Image container */}
            <div className="h-[180px] w-full mt-[var(--sp-4)] relative overflow-hidden rounded-[var(--radius-md)]">
              <ElevatedImage
                src="/images/projects/Namrl.png"
                alt="Namrl Interface mockup"
                width={700}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags footer */}
            <div className="flex justify-between items-end mt-[var(--sp-4)] relative z-10">
              <div className="flex flex-wrap gap-[var(--sp-2)]">
                {["Next.js", "GSAP ScrollTrigger", "SVG Path", "SEO"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] bg-white/5 border border-white/10 text-white/60 px-[10px] py-[4px] rounded-[100px]"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
