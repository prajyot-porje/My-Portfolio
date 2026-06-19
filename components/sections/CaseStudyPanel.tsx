"use client";

import clsx from "clsx";
import type { CaseStudy } from "@/lib/data/case-studies";
import DepthCard from "../depth/DepthCard";
import ElevatedImage from "../depth/ElevatedImage";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import Tag from "../ui/Tag";

interface CaseStudyPanelProps {
  project: CaseStudy;
  imageSrc: string;
  className?: string;
}

export default function CaseStudyPanel({
  project,
  imageSrc,
  className,
}: CaseStudyPanelProps) {
  return (
    <div
      className={clsx(
        "w-screen h-screen flex-shrink-0 flex items-center justify-center px-[var(--sp-8)] md:px-[var(--sp-16)] py-[var(--sp-12)] bg-[var(--color-ground)]",
        className,
      )}
    >
      <DepthCard
        level={2}
        className="w-full max-w-[1280px] h-full max-h-[720px] bg-[var(--color-surface-1)] rounded-[var(--radius-lg)] p-[var(--sp-8)] md:p-[var(--sp-12)] flex flex-col md:grid md:grid-cols-[45%_55%] gap-[var(--sp-8)] overflow-y-auto md:overflow-hidden relative z-10"
      >
        {/* Left Column - Content */}
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Header: Label + Title */}
            <div className="flex justify-between items-center mb-[var(--sp-4)]">
              <SectionLabel label={`${project.index} / Project`} />
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--color-ink-3)] font-medium">
                {project.year}
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] md:text-[length:var(--text-3xl)] text-[var(--color-ink-1)] tracking-[var(--ls-display)] leading-[var(--lh-display)] mb-[var(--sp-2)]">
              {project.title}
            </h3>

            <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-base)] text-[var(--color-ink-2)] italic leading-[var(--lh-body)] mb-[var(--sp-6)] border-l-2 border-[var(--color-accent)] pl-[var(--sp-4)]">
              {project.tagline}
            </p>

            {/* Technical Case Details */}
            <div className="flex flex-col gap-[var(--sp-4)] mb-[var(--sp-6)]">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[var(--color-ink-3)] uppercase block mb-1">
                  THE CHALLENGE
                </span>
                <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-[var(--color-ink-2)] leading-[var(--lh-body)]">
                  {project.problem}
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[var(--color-ink-3)] uppercase block mb-1">
                  THE DECISION
                </span>
                <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-[var(--color-ink-2)] leading-[var(--lh-body)]">
                  {project.decision}
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--ls-caps)] text-[var(--color-ink-3)] uppercase block mb-1">
                  THE OUTCOME
                </span>
                <p className="font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] text-[var(--color-ink-2)] leading-[var(--lh-body)]">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Footer of Card: Tags + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--sp-4)] mt-[var(--sp-4)]">
            <div className="flex flex-wrap gap-[var(--sp-2)]">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            {project.liveUrl && (
              <MagneticButton
                asLink
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-ink-1)] text-[var(--color-ground)] px-[18px] py-[10px] rounded-[100px] text-[length:var(--text-sm)] font-medium hover:bg-[#1a1a1a]"
              >
                Launch App
                <span className="text-[var(--color-accent)] font-bold ml-1">
                  ↗
                </span>
              </MagneticButton>
            )}
          </div>
        </div>

        {/* Right Column - Mockup Showcase */}
        <div className="h-[240px] md:h-full w-full relative flex items-center justify-center">
          <ElevatedImage
            src={imageSrc}
            alt={`${project.title} Interface Mockup`}
            width={720}
            height={480}
            className="w-full h-full"
            imageClassName="rounded-[var(--radius-md)]"
          />
        </div>
      </DepthCard>
    </div>
  );
}
