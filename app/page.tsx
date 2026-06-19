"use client";

import { useState } from "react";
import CaseStudyTrack from "@/components/sections/CaseStudyTrack";
import Contact from "@/components/sections/Contact";
import DevStudio from "@/components/sections/DevStudio";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Principles from "@/components/sections/Principles";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const [introSeen, setIntroSeen] = useState(false);

  return (
    <main className="min-h-screen relative w-full bg-[var(--color-ground)]">
      <Intro onComplete={() => setIntroSeen(true)} />
      <Navbar />
      <Hero isIntroActive={!introSeen} />
      <CaseStudyTrack />
      <DevStudio />
      <Principles />
      <Contact />
    </main>
  );
}
