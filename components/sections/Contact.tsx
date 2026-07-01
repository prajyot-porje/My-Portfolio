"use client";

import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] text-white px-[var(--sp-8)] py-[var(--sp-24)] max-md:px-[var(--sp-6)] max-md:py-[var(--sp-16)] relative overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col items-stretch relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Connect Statement */}
          <div className="flex flex-col gap-6 text-left">
            <SectionLabel label="06 / CONNECT" className="text-white/40" />
            <h2 className="text-[2.8rem] max-md:text-[2rem] font-[family-name:var(--font-sans)] font-semibold leading-[1.1] text-white tracking-tight">
              <span className="uppercase">Let&apos;s build something </span>
              <span className="font-[family-name:var(--font-display)] italic text-white font-normal">
                permanent.
              </span>
            </h2>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[45ch]">
              I am open to engineering roles, consulting engagements, and
              technical collaborations. Let&apos;s talk about systems, products,
              and codebase architecture.
            </p>
          </div>

          {/* Right Column: Premium Channels Directory */}
          <div className="flex flex-col w-full max-w-[440px] md:ml-auto">
            <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.18em] uppercase text-white/40 mb-6 block">
              {"CHANNELS // GATEWAY"}
            </span>
            <div className="flex flex-col">
              {[
                {
                  name: "Gmail",
                  href: "mailto:porjeprajyot@gmail.com",
                  index: "01",
                },
                {
                  name: "GitHub",
                  href: "https://github.com/prajyot-porje",
                  index: "02",
                  external: true,
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/prajyot-porje",
                  index: "03",
                  external: true,
                },
                {
                  name: "LeetCode",
                  href: "https://leetcode.com/u/prajyot-porje/",
                  index: "04",
                  external: true,
                },
                { name: "Blog", href: "/blog", index: "05" },
                {
                  name: "Resume",
                  href: "/Full_Stack_Developer_Resume.pdf",
                  index: "06",
                  external: true,
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-4 border-b border-white/10 text-white/70 hover:text-white no-underline transition-all duration-300 ease-[var(--ease-cinematic)] active:translate-x-1"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/30 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {link.index}
                    </span>
                    <span className="font-[family-name:var(--font-sans)] text-lg md:text-xl font-bold tracking-tight uppercase">
                      {link.name}
                    </span>
                  </div>
                  <span className="font-mono text-sm transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
