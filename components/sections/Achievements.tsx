"use client";

import DepthCard from "../depth/DepthCard";
import SectionLabel from "../ui/SectionLabel";
import Tag from "../ui/Tag";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="bg-[var(--color-ground)] px-[var(--sp-8)] py-[var(--sp-24)] border-t border-[var(--color-surface-3)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)]"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 max-w-[620px]">
          <SectionLabel label="06 / CREDENTIALS" />
          <h2 className="text-[2.5rem] max-md:text-[1.8rem] font-[family-name:var(--font-sans)] leading-tight text-[var(--color-ink-1)] tracking-tight mt-4">
            Open source contributions and{" "}
            <span className="font-[family-name:var(--font-display)] italic text-[var(--color-accent)] font-normal">
              algorithmic proof.
            </span>
          </h2>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Open Source Block */}
          <DepthCard
            level={1}
            className="flex flex-col bg-white p-6 h-full justify-between shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider">
                  JupyterLab Core
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-2)] uppercase tracking-wider font-semibold">
                  PR #18157 Merged
                </span>
              </div>

              <h3 className="text-[1.3rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-4">
                Resolving File Editor Arguments Crash
              </h3>

              <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed mb-6">
                Investigated and resolved a runtime crash in JupyterLab's file
                editor component package. Fixed the
                `fileeditor:change-font-size` handler to safely check and
                default undefined argument structures during argumentless label
                calls.
              </p>

              {/* Mock code block demonstrating PR */}
              <div className="bg-[var(--color-surface-2)] border border-[var(--color-surface-3)] rounded-lg p-4 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink-2)] overflow-x-auto mb-6">
                <div className="text-[rgba(239,68,68,1)]">
                  - const size = args['size'] as number;
                </div>
                <div className="text-[rgba(34,197,94,1)]">
                  + const size = (args ? args['size'] : undefined) as number;
                </div>
                <div className="text-[rgba(34,197,94,1)]">
                  + if (!size) return;
                </div>
                <div className="text-gray-400 mt-2">
                  {"// fixed crash on argumentless labels"}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                <Tag className="text-[9px] px-2 py-0.5">JupyterLab</Tag>
                <Tag className="text-[9px] px-2 py-0.5">TypeScript</Tag>
                <Tag className="text-[9px] px-2 py-0.5">Open Source</Tag>
                <Tag className="text-[9px] px-2 py-0.5">Node.js</Tag>
              </div>
            </div>
          </DepthCard>

          {/* Algorithmic Credentials & Competitions */}
          <div className="flex flex-col gap-6 h-full justify-between">
            {/* LeetCode Card */}
            <DepthCard
              level={1}
              className="flex flex-col bg-white p-6 shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider">
                  LeetCode
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-2)] uppercase tracking-wider font-semibold">
                  Problem Solving
                </span>
              </div>

              <h3 className="text-[1.3rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-2">
                Computational baseline
              </h3>

              <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed mb-6">
                Actively training in computer science foundations and data
                structures. Solved 417 LeetCode problems (including 32 Hard) and
                150+ GeeksforGeeks problems.
              </p>

              <div className="flex gap-8 pt-4 border-t border-[var(--color-surface-3)]">
                <div className="flex flex-col">
                  <span className="text-[1.8rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
                    417+
                  </span>
                  <span className="text-[8px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
                    Problems Solved
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[1.8rem] font-[family-name:var(--font-sans)] font-bold text-[var(--color-ink-1)] leading-none">
                    32
                  </span>
                  <span className="text-[8px] font-[family-name:var(--font-mono)] text-[var(--color-ink-3)] uppercase tracking-wider mt-1">
                    Hard Solved
                  </span>
                </div>
              </div>
            </DepthCard>

            {/* Hackathons & State Competitions */}
            <DepthCard
              level={1}
              className="flex flex-col bg-white p-6 shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-[transform,box-shadow] duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-3)] uppercase tracking-wider">
                  Awards
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-ink-2)] uppercase tracking-wider font-semibold">
                  Competitions
                </span>
              </div>

              <h3 className="text-[1.3rem] font-[family-name:var(--font-sans)] font-semibold text-[var(--color-ink-1)] mb-2">
                Hackathon finals
              </h3>

              <p className="text-[12px] text-[var(--color-ink-2)] leading-relaxed">
                Qualified as a finalist in both the ADCET 2024 and DYPDPU 1.0
                2025 hackathons. Qualified for the Avishkar State-Level
                Innovation Competition, defending technical project architecture
                before state judges.
              </p>
            </DepthCard>
          </div>
        </div>
      </div>
    </section>
  );
}
