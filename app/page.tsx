"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";

export default function Home() {
  const [introSeen, setIntroSeen] = useState(false);

  return (
    <main className="min-h-screen relative w-full bg-[var(--color-ground)]">
      <Cursor />
      <Intro onComplete={() => setIntroSeen(true)} />
      <Navbar />
      <Hero isIntroActive={!introSeen} />

      {/* TEMP: Test section for navbar active state */}
      <section
        id="work"
        className="h-screen flex items-center justify-center bg-[var(--color-ground)]"
      >
        <span
          className="text-[var(--color-ink-3)] text-[length:var(--text-lg)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Work
        </span>
      </section>
    </main>
  );
}
