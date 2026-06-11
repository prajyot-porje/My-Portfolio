# AGENTS.md — Prajyot Porje Portfolio V2

This file tells any AI agent working on this project exactly what is being built,
what quality bar it must hit, and how it must think and act while building it.
Read this before touching a single file.

---

## What This Is

A personal portfolio for Prajyot Porje — a 3rd-year B.E. student in AI/ML who is
simultaneously the sole founder of Dev Studio, a web development agency with active
paying US clients.

This is not a student project. This is not a template. This is a professional product
that will be seen by recruiters, engineers, CTOs, and founders at top Indian and
global tech companies. It must perform accordingly.

---

## The Identity

**"The Product Engineer"**

Every section, every component, every line of copy must reinforce this one idea:

> Prajyot doesn't wait for permission to build real things. He already has.

If a design decision, component, animation, or piece of copy does not serve this
identity — it does not belong in this project.

---

## Quality Bar

The reference level for this project is: **Linear.app, Stripe.com, Vercel.com**.

Not in terms of copying their design. In terms of the level of craft, intentionality,
and precision they apply to every element. If a senior designer from any of those
companies looked at this portfolio and saw something sloppy, that is a failure.

When you are unsure if something is good enough, ask: **Would a senior engineer at
Linear ship this without changes?** If the answer is no — fix it before outputting.

You are not generating boilerplate. You are engineering a product.

---

## Tech Stack

```
Framework:       Next.js 14 (App Router, TypeScript, Tailwind CSS v4)
Animation:       GSAP + ScrollTrigger (scroll-driven, text reveals, pinning)
                 Framer Motion (component interactions, page transitions)
Smooth scroll:   Lenis via @studio-freight/react-lenis
Utilities:       clsx, tailwind-merge, class-variance-authority
Observers:       react-intersection-observer
Text splitting:  splitting (free fallback for GSAP SplitText)
Linting:         Biome (@biomejs/biome)
Deployment:      Vercel
```

---

## Design System Reference

All design decisions — colors, typography, spacing, shadows, motion — are defined in
`DESIGN.md`. Read it before building any component.

Key non-negotiables from the design system:

- Page background is `#F4F2ED` (warm off-white), NOT `#FFFFFF`
- Cards are `#FFFFFF` — the contrast between ground and card creates the depth illusion
- Accent `#94ff0b` appears on at most ONE element per scrollable viewport
- Fonts: Krovex (headings, text-lg+), Grift (body, text-md and below), Geist Mono (code/labels)
- No CSS easing keywords (`ease`, `ease-in`, `ease-out`, `ease-in-out`) — use named custom curves
- Every spacing value is a multiple of 4px
- Every animation must have a `prefers-reduced-motion` override
- `transition: all` is banned from this codebase

---

## How to Build Components

### Before writing any component

1. Read the relevant section spec in `DESIGN.md`
2. Identify which shadow level the component lives at (shadow-0 through shadow-4)
3. Identify which easing curve the component's interactions use
4. Identify which font and size the text content uses

### Component structure rules

- Every component is written in TypeScript with explicit prop types
- Tailwind utilities only — no inline `style={{}}` for design values (use CSS variables)
- CSS custom properties for all design tokens, not hardcoded values
- Motion components use Framer Motion for hover/tap, GSAP for scroll-driven behaviour
- Never import GSAP at the top level — use dynamic import or `useGSAP` hook to prevent SSR issues
- Every interactive element has a `focus-visible` state

### Animation implementation

```
Scroll-driven parallax      → GSAP ScrollTrigger
Text character/line reveals → splitting.js + GSAP timeline
Section entrance animations → GSAP ScrollTrigger + fromTo
Card hover tilts            → Framer Motion useMotionValue + useTransform
Button micro-interactions   → Framer Motion whileHover + whileTap
Page route transitions      → Framer Motion AnimatePresence
Smooth scroll               → Lenis (wrap root layout)
```

GSAP must be initialised inside a `useEffect` or `useGSAP` hook.
ScrollTrigger must call `ScrollTrigger.refresh()` after Lenis initialises.

---

## File Architecture

```
app/
  layout.tsx          ← Root layout: fonts, Lenis provider, Analytics
  page.tsx            ← Single page: all sections composed in order
  globals.css         ← ALL CSS custom properties defined here
  api/og/route.tsx    ← OG image generation

components/
  sections/
    Hero.tsx
    CaseStudyTrack.tsx
    CaseStudyPanel.tsx
    DevStudio.tsx
    Principles.tsx
    Contact.tsx
  motion/
    TextReveal.tsx     ← splitting.js line-by-line reveal
    ParallaxLayer.tsx  ← GSAP ScrollTrigger parallax wrapper
    ClipReveal.tsx     ← clip-path reveal on viewport enter
  depth/
    DepthCard.tsx      ← White card, accepts level prop (1-4), mouse lighting
    TiltCard.tsx       ← DepthCard + perspective tilt on hover
    ElevatedImage.tsx  ← next/image with shadow + scroll zoom
  ui/
    MagneticButton.tsx ← Cursor-attracted button, spring repel on click
    Navbar.tsx
    SectionLabel.tsx   ← Mono caps label: "01 / WORK"
    Tag.tsx            ← Tech stack pill

lib/
  gsap.ts             ← GSAP + ScrollTrigger registration
  lenis.ts            ← Lenis config
  mouse-tracker.ts    ← Mouse position → CSS custom properties

hooks/
  useGSAP.ts
  useMousePosition.ts
  useScrollProgress.ts

lib/data/
  case-studies.ts     ← Case study content (typed, not MDX)
  principles.ts       ← Engineering principles content
```

---

## Content Structure

### Case Studies (exactly 3, in this order)

**01 — DevFlow**
Story angle: "I built an AI product with paying users, from concept to deployed SaaS."
Proves: product engineering, AI integration, shipping real things

**02 — ContextGraph**
Story angle: "I designed a multi-tenant context architecture when no existing pattern solved it."
Proves: systems thinking, architectural decisions, engineering depth

**03 — cResults / Dev Studio**
Story angle: "I shipped for a US client under real business constraints, then turned it into an agency."
Proves: entrepreneurial engineering, delivery under pressure, business thinking

### Engineering Principles (exactly 5)
Each principle must be:
- Specific enough that someone could disagree with it
- Written from experience, not aspiration
- One sentence statement (Krovex) + 2-3 sentences elaboration (Grift)

### Proof Strip (Hero section)
4 metrics. All real, all verifiable. No invented numbers.
Examples: active US clients, live production sites, years running the studio.

---

## Build Sequence

Follow this order. Do not jump ahead.

```
1. globals.css         ← Define ALL CSS custom properties before any component
2. Layout + Lenis      ← Fonts loaded, smooth scroll working
3. Design system       ← DepthCard, TiltCard, TextReveal, ParallaxLayer, ClipReveal
4. Hero section        ← Static layout first, then GSAP entrance sequence
5. Case study track    ← Horizontal pin + scroll, then panel content
6. Dev Studio section
7. Principles section
8. Contact section
9. Navbar
10. Performance pass   ← Images, bundle size, Core Web Vitals
11. Reduced motion pass
12. Mobile pass
```

---

## Performance Requirements

These are not targets. They are the minimum bar.

| Metric | Required |
|---|---|
| Lighthouse Performance | 95+ |
| LCP | < 2.0s |
| CLS | 0.0 |
| Total JS bundle (gzip) | < 200KB |
| Every image | `next/image` with explicit width + height |
| Fonts | Self-hosted via `next/font/local`, subset to Latin |
| Animations | `transform` + `opacity` only — no layout-triggering properties |

---

## What Not to Build

Do not add these under any circumstances, regardless of how they are requested later:

```
✗ Glassmorphism or frosted glass cards
✗ Gradient borders
✗ Spotlight / cursor glow effect
✗ Particle or canvas backgrounds
✗ Skill percentage bars
✗ A preloader or loading screen
✗ A contact form (email address is the CTA)
✗ Three.js or React Three Fiber for the main page experience
✗ Purple or teal gradient on white background
✗ Typing / rotating text animation in the hero
✗ Social proof statistics that cannot be verified
✗ "Download CV" as the primary hero CTA
✗ A Skills & Technologies accordion with logo icons
✗ Any section copied from Prajyot's old portfolio at portfolio-prajyot.vercel.app
```

---

## Tone of Voice (for any copy tasks)

- Direct. Specific. No filler.
- Facts, not adjectives. "Shipped for a US client" not "passionate about delivering value."
- First person, present tense where possible.
- If a sentence could appear on any developer's portfolio — rewrite it.
- Technical precision: say "multi-tenant MCP context engine" not "AI tool."

---

## Definition of Done

A section is done when:
- [ ] It matches the visual spec in DESIGN.md
- [ ] All design tokens come from CSS custom properties (no hardcoded values)
- [ ] Animations have a `prefers-reduced-motion` override
- [ ] All text passes WCAG AA contrast (4.5:1 minimum)
- [ ] It is fully usable without JavaScript
- [ ] It renders correctly on 375px (iPhone SE) and 1440px (desktop)
- [ ] There are no `console.error` or TypeScript errors
- [ ] Lighthouse Performance on that route is 90+

The entire portfolio is done when all sections pass the above AND
a person unfamiliar with Prajyot reads it and understands within 10 seconds:
**"This person has already built and shipped real products."**