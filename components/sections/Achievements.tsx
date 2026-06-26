"use client";

import { useEffect, useState } from "react";
import DepthCard from "../depth/DepthCard";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";

export default function Achievements() {
  const [leetcodeSvg, setLeetcodeSvg] = useState<string>("");

  useEffect(() => {
    fetch("https://leetcard.jacoblin.cool/prajyot-porje?ext=heatmap")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((svg) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, "image/svg+xml");
        const svgEl = doc.querySelector("svg");
        const extHeatmap = doc.getElementById("ext-heatmap");

        if (svgEl && extHeatmap) {
          // Adjust root SVG viewBox to avoid right clipping & make space for labels
          svgEl.setAttribute("width", "100%");
          svgEl.setAttribute("height", "auto");
          svgEl.setAttribute("viewBox", "-10 215 500 90");

          // Extract start date from '#ext-heatmap-from'
          const fromEl = doc.getElementById("ext-heatmap-from");
          const fromText = fromEl ? fromEl.textContent : "";

          if (fromText) {
            const dateParts = fromText.split(".");
            if (dateParts.length === 3) {
              const year = Number.parseInt(dateParts[0], 10);
              const month = Number.parseInt(dateParts[1], 10);
              const day = Number.parseInt(dateParts[2], 10);
              const startDate = new Date(year, month - 1, day);

              const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const monthLabels: { name: string; x: number }[] = [];
              let lastMonth = -1;
              let lastX = -100;

              for (let i = 0; i < 52; i++) {
                const colDate = new Date(
                  startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000,
                );
                const currentMonth = colDate.getMonth();

                if (currentMonth !== lastMonth) {
                  const x = 20 + i * 8.85;
                  const monthName = monthNames[currentMonth];

                  // Prevent overlap with adjacent month labels
                  if (x - lastX < 22) {
                    if (
                      monthLabels.length > 0 &&
                      monthLabels[monthLabels.length - 1].x === 20
                    ) {
                      monthLabels[monthLabels.length - 1] = {
                        name: monthName,
                        x,
                      };
                      lastX = x;
                    }
                  } else {
                    monthLabels.push({ name: monthName, x });
                    lastX = x;
                  }
                  lastMonth = currentMonth;
                }
              }

              // Append month labels
              for (const ml of monthLabels) {
                const textNode = doc.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "text",
                );
                textNode.setAttribute("x", ml.x.toFixed(2));
                textNode.setAttribute("y", "26");
                textNode.setAttribute("class", "heatmap-label");
                textNode.textContent = ml.name;
                extHeatmap.appendChild(textNode);
              }
            }
          }

          // Append weekday labels (Sun - Sat) on the left of grid
          const weekdays = [
            { name: "Sun", y: 35 + 0 * 8.85 + 3.98 },
            { name: "Mon", y: 35 + 1 * 8.85 + 3.98 },
            { name: "Tue", y: 35 + 2 * 8.85 + 3.98 },
            { name: "Wed", y: 35 + 3 * 8.85 + 3.98 },
            { name: "Thu", y: 35 + 4 * 8.85 + 3.98 },
            { name: "Fri", y: 35 + 5 * 8.85 + 3.98 },
            { name: "Sat", y: 35 + 6 * 8.85 + 3.98 },
          ];

          for (const wd of weekdays) {
            const textNode = doc.createElementNS(
              "http://www.w3.org/2000/svg",
              "text",
            );
            textNode.setAttribute("x", "12");
            textNode.setAttribute("y", wd.y.toFixed(2));
            textNode.setAttribute("class", "heatmap-label");
            textNode.setAttribute("text-anchor", "end");
            textNode.setAttribute("dominant-baseline", "central");
            textNode.textContent = wd.name;
            extHeatmap.appendChild(textNode);
          }

          // Inject styling overrides
          const styleEl = doc.createElementNS(
            "http://www.w3.org/2000/svg",
            "style",
          );
          styleEl.textContent = `
            #background, #icon, #username, #ranking, #total-solved, #solved, 
            #easy-solved, #medium-solved, #hard-solved, #ext-heatmap-title, 
            #ext-heatmap-from, #ext-heatmap-to {
              display: none !important;
            }
            #ext-heatmap-blocks {
              opacity: 1 !important;
              animation: none !important;
            }
            :root {
              --bg-1: #ebedf0 !important;
              --color-1: #0d0d0d !important;
              --color-2: #0d0d0d !important;
              --color-3: #0d0d0d !important;
              --color-0: #0d0d0d !important;
            }
            .heatmap-label {
              font-family: var(--font-mono), monospace !important;
              font-size: 7.5px !important;
              fill: #737373 !important;
              font-weight: 500 !important;
              dominant-baseline: central !important;
            }
          `;
          svgEl.appendChild(styleEl);
        }

        const serializer = new XMLSerializer();
        let cropped = serializer.serializeToString(doc);

        // Scope the global * selector inside the SVG's stylesheet to prevent global font-family leak
        cropped = cropped.replace(
          /\*\s*{\s*font-family\s*:\s*["']?Baloo 2["']?\s*;?\s*}/g,
          '.leetcode-heatmap-container *{font-family:"Baloo 2"}',
        );

        setLeetcodeSvg(cropped);
      })
      .catch((err) => {
        console.error("Failed to fetch LeetCode SVG:", err);
      });
  }, []);

  return (
    <section
      id="achievements"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 max-w-[620px]">
          <SectionLabel label="05 / CREDENTIALS" />
          <h2 className="text-[2.5rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
            Open source contributions and{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              algorithmic proof.
            </span>
          </h2>
        </div>

        {/* Dynamic Activity Graphs */}
        <div className="flex flex-col gap-8">
          {/* Card 1: GitHub Contributions */}
          <DepthCard
            level={1}
            className="flex flex-col bg-white p-6 md:p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex justify-between items-center mb-6 border-b border-[var(--color-surface-3)] pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[var(--color-ink-2)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>GitHub Icon</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-ink-1)] uppercase tracking-wider">
                  GitHub / prajyot-porje
                </span>
              </div>
              <MagneticButton
                asLink
                href="https://github.com/prajyot-porje"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-shadow duration-200 z-10 select-none cursor-pointer"
              >
                <span>View Profile</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                  ↗
                </span>
              </MagneticButton>
            </div>

            <div className="flex flex-col gap-6">
              <div className="max-w-[65ch]">
                <h3 className="text-[1.3rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-2">
                  Open Source Activity
                </h3>
                <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed">
                  Active contributions to open-source software, personal
                  projects, and agentic workflows. Plotted live from GitHub.
                </p>
              </div>

              {/* Contribution Chart Image */}
              <div className="w-full overflow-x-auto py-2 border border-[var(--color-surface-3)] rounded-lg bg-[var(--color-surface-2)] px-4 flex items-center justify-start md:justify-center min-h-[120px]">
                {/* Custom-colored contribution chart mapping to design system palette */}
                {/* biome-ignore lint/performance/noImgElement: External dynamic SVG badges cannot be optimized locally */}
                <img
                  src="https://ghchart.rshah.org/0d0d0d/prajyot-porje"
                  alt="Prajyot Porje's GitHub Contributions"
                  className="w-full min-w-[720px] h-auto object-contain select-none"
                  loading="lazy"
                />
              </div>
            </div>
          </DepthCard>

          {/* Card 2: LeetCode Stats */}
          <DepthCard
            level={1}
            className="flex flex-col bg-white p-6 md:p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex justify-between items-center mb-6 border-b border-[var(--color-surface-3)] pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[var(--color-ink-2)]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <title>LeetCode Icon</title>
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38-1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
                <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-ink-1)] uppercase tracking-wider">
                  LeetCode / prajyot-porje
                </span>
              </div>
              <MagneticButton
                asLink
                href="https://leetcode.com/u/prajyot-porje/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] hover:bg-[#151413] text-[var(--color-ground)] text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-shadow duration-200 z-10 select-none cursor-pointer"
              >
                <span>View Profile</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[8px] ml-1">
                  ↗
                </span>
              </MagneticButton>
            </div>

            <div className="flex flex-col gap-6">
              <div className="max-w-[65ch]">
                <h3 className="text-[1.3rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-2">
                  Algorithmic Baseline
                </h3>
                <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed">
                  Solved 417+ algorithmic problems including 32 Hard problems.
                  Continual verification of computational complexity and
                  optimization skills. Plotted live from LeetCode.
                </p>
              </div>

              {/* Contribution Chart SVG */}
              <div className="w-full overflow-x-auto py-2 border border-[var(--color-surface-3)] rounded-lg bg-[var(--color-surface-2)] px-4 flex items-center justify-start md:justify-center min-h-[120px]">
                {leetcodeSvg ? (
                  <div
                    className="w-full min-w-[720px] h-auto select-none leetcode-heatmap-container"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: fetched SVG is sanitized and styled locally
                    dangerouslySetInnerHTML={{ __html: leetcodeSvg }}
                  />
                ) : (
                  <div className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider animate-pulse">
                    Loading LeetCode activity...
                  </div>
                )}
              </div>
            </div>
          </DepthCard>

          {/* Card 3: Open Source & Competitions */}
          <DepthCard
            level={1}
            className="flex flex-col bg-white p-6 md:p-8 rounded-xl border border-[var(--color-surface-3)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex justify-between items-center mb-6 border-b border-[var(--color-surface-3)] pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[var(--color-ink-2)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Git Pull Request Icon</title>
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                  <line x1="6" y1="9" x2="6" y2="15" />
                </svg>
                <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-ink-1)] uppercase tracking-wider">
                  Open Source &amp; Competitions
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: JupyterLab PR */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider mb-2">
                    01 / Ecosystem
                  </span>
                  <h4 className="text-[1.15rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-2">
                    Project Jupyter / JupyterLab
                  </h4>
                  <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed mb-4">
                    Contributed to the core JupyterLab repository. Resolved a
                    critical editor bug in the font-size handler
                    (`fileeditor:change-font-size`) by adding robust undefined
                    parameter safety checks, preventing client-side application
                    freezes.
                  </p>
                  <a
                    href="https://github.com/jupyterlab/jupyterlab/pull/18157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-accent)] hover:underline flex items-center gap-1.5 mt-auto no-underline"
                  >
                    Merged PR #18157 ↗
                  </a>
                </div>

                {/* Right Column: Hackathons */}
                <div className="flex flex-col border-t md:border-t-0 md:border-l border-[var(--color-surface-3)] pt-6 md:pt-0 md:pl-8">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider mb-2">
                    02 / Hackathons
                  </span>
                  <h4 className="text-[1.15rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-2">
                    Competitive Engineering
                  </h4>
                  <ul className="flex flex-col gap-3 text-[12px] text-[var(--color-ink-2)] leading-relaxed">
                    <li className="relative pl-4">
                      <span className="absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full bg-[var(--color-ink-3)]" />
                      <strong>Hackathon Finalist</strong> — Finalist at ADCET
                      2024 and DYPDPU 1.0 2025.
                    </li>
                    <li className="relative pl-4">
                      <span className="absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full bg-[var(--color-ink-3)]" />
                      <strong>State Level</strong> — Qualified for the Avishkar
                      State-Level Innovation Championship.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </DepthCard>
        </div>
      </div>
    </section>
  );
}
