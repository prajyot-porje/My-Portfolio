# DESIGN.md — Prajyot Porje Portfolio V2

> The single source of truth for all visual decisions.
> One rule governs everything: does this decision serve the identity — **The Product Engineer**?

---

## 1. Color System

```css
:root {
  /* Surfaces */
  --color-ground:    #F4F2ED;   /* page background — warm off-white, NOT paper white */
  --color-surface-1: #FFFFFF;   /* cards at rest */
  --color-surface-2: #FAFAF8;   /* subtle section alternation */
  --color-surface-3: #ECEAE4;   /* borders, hairlines */
  --color-surface-4: #E0DDD6;   /* strong dividers */

  /* Ink */
  --color-ink-1: #0D0D0D;   /* headings, primary body */
  --color-ink-2: #555250;   /* supporting text */
  --color-ink-3: #9B9891;   /* captions, timestamps, metadata */
  --color-ink-4: #C5C2BB;   /* disabled, placeholder */

  /* Accent — used ONCE per scrollable viewport, never on large surfaces */
  --color-accent:        #94ff0b;
  --color-accent-hover:  #7fd600;
  --color-accent-subtle: rgba(148, 255, 11, 0.08);
  --color-accent-muted:  rgba(148, 255, 11, 0.15);
}
```

**Why warm ground?**
Pure white (#FFF) kills depth — elements can't float above it visibly. #F4F2ED lets pure-white cards appear lifted. This is the foundation of the entire 3D illusion.

**Accent rule:** #94ff0b appears on at most ONE element per viewport. Never as a large background fill. Used sparingly, it becomes magnetic. Used everywhere, it becomes noise.

---

## 2. Typography

### Chosen Pairing

| Role | Font | Size range |
|---|---|---|
| Display / Headings | **Krovex** | text-lg and above |
| Body / Labels / Captions | **Grift** | text-base and below |
| Code / System labels | **Geist Mono** | Any monospace moment |

### Scale — Perfect Fourth (ratio 1.333)

```css
:root {
  --text-xs:   0.563rem;   /*  9px */
  --text-sm:   0.75rem;    /* 12px */
  --text-base: 1rem;       /* 16px */
  --text-md:   1.333rem;   /* 21px */
  --text-lg:   1.777rem;   /* 28px */
  --text-xl:   2.369rem;   /* 38px */
  --text-2xl:  3.157rem;   /* 51px */
  --text-3xl:  4.209rem;   /* 67px */
  --text-4xl:  5.610rem;   /* 90px */
  --text-5xl:  7.478rem;   /* 120px — hero display, desktop only */
}
```

### Rhythm

```css
:root {
  /* Line heights */
  --lh-display: 1.05;   /* 4xl, 5xl */
  --lh-heading: 1.15;   /* 2xl, 3xl */
  --lh-title:   1.25;   /* lg, xl */
  --lh-body:    1.65;   /* base, md */
  --lh-label:   1.35;   /* sm, xs */

  /* Letter spacing */
  --ls-display: -0.04em;
  --ls-heading: -0.025em;
  --ls-title:   -0.015em;
  --ls-body:     0em;
  --ls-caps:     0.08em;   /* ALL CAPS labels always track out */
}
```

### Rules
- Krovex is **only** for text-lg and above. Never for body copy.
- Grift is **only** for text-md and below. Never for display.
- Geist Mono for: code snippets, section counters (`01 / WORK`), tech stack tags.
- All-caps labels always use Grift + `--ls-caps`.

---

## 3. Spacing

Base unit: **4px**. Every spacing value is a multiple of 4. No exceptions.

```css
:root {
  --sp-1:  4px;   --sp-2:  8px;   --sp-3:  12px;  --sp-4:  16px;
  --sp-5:  20px;  --sp-6:  24px;  --sp-8:  32px;  --sp-10: 40px;
  --sp-12: 48px;  --sp-16: 64px;  --sp-20: 80px;  --sp-24: 96px;
  --sp-32: 128px; --sp-40: 160px; --sp-48: 192px; --sp-64: 256px;

  /* Section vertical rhythm */
  --section-sm: var(--sp-20);    /* 80px  */
  --section-md: var(--sp-32);    /* 128px */
  --section-lg: var(--sp-48);    /* 192px */
  --section-xl: var(--sp-64);    /* 256px — hero, landmark moments */
}
```

Grid: 12-column, max-width 1440px, 24px gutters desktop / 16px mobile.
Grid breaks are intentional: hero text (full bleed), case study images (edge-to-edge), pull quotes (narrow center column).

---

## 4. Depth & Shadow System

Light source: single overhead, top-center, ~1000px above surface. All shadow Y-offsets are positive. All light is consistent.

Every shadow has two components: **intimate** (close, darker, small blur) + **atmospheric** (far, diffuse, large blur).

```css
:root {
  --shadow-0: none;

  --shadow-1:
    0 1px  2px  rgba(13,13,13, 0.06),
    0 4px  12px rgba(13,13,13, 0.04);

  --shadow-2:
    0 2px  4px  rgba(13,13,13, 0.07),
    0 12px 32px rgba(13,13,13, 0.07),
    0 24px 64px rgba(13,13,13, 0.04);

  --shadow-3:
    0 4px  8px  rgba(13,13,13, 0.08),
    0 24px 48px rgba(13,13,13, 0.10),
    0 48px 96px rgba(13,13,13, 0.06);

  --shadow-4:
    0 8px  16px  rgba(13,13,13, 0.08),
    0 48px 96px  rgba(13,13,13, 0.12),
    0 96px 160px rgba(13,13,13, 0.08);
}
```

### Layer Assignment

| Element | Shadow |
|---|---|
| Body text, tags, section labels | shadow-0 |
| Cards at rest, proof metrics | shadow-1 |
| Card on hover (lift state) | shadow-2 |
| Navbar on scroll, contact card | shadow-2 |
| Case study containers | shadow-2 |
| Case study screenshots | shadow-3 |
| Hero element, Dev Studio feature card | shadow-3 |
| Hero name display / peak showcase | shadow-4 |

### Mouse Lighting Effect
Cards at shadow-1 through shadow-3 get a radial gradient overlay that follows the cursor, simulating a moving light source. Creates specular highlight that reinforces physical depth.

```css
.depth-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255,255,255, 0.18) 0%,
    rgba(255,255,255, 0.06) 30%,
    transparent 60%
  );
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms var(--ease-gentle);
}
.depth-card:hover::before { opacity: 1; }
```

JS updates `--mouse-x` and `--mouse-y` on `mousemove`.

---

## 5. Motion

```css
:root {
  /* Easing — CSS keyword easings are never used */
  --ease-cinematic: cubic-bezier(0.16, 1.00, 0.30, 1.00);  /* entrances, reveals */
  --ease-gentle:    cubic-bezier(0.00, 0.55, 0.45, 1.00);  /* hover, state changes */
  --ease-sharp:     cubic-bezier(0.70, 0.00, 0.84, 0.00);  /* exits */
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1.00);  /* magnetic buttons */

  /* Durations */
  --dur-instant:    50ms;
  --dur-fast:       120ms;
  --dur-normal:     250ms;
  --dur-deliberate: 400ms;
  --dur-cinematic:  800ms;
  --dur-epic:      1400ms;
}
```

### Rules
- Entering elements → `--ease-cinematic` (fast start, soft landing)
- Exiting elements → `--ease-sharp` (accelerate away, decisive)
- Hover states → `--ease-gentle` at `--dur-fast`
- Never animate `width`, `height`, `top`, `left`, `padding` — always `transform` + `opacity`
- GSAP ScrollTrigger scrub value: `1.5` (weighted, not mechanical)
- Text reveals: GSAP SplitText, line stagger 80ms, word stagger 30ms
- `prefers-reduced-motion` override is mandatory on every animation

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Pseudo-3D Technique Stack

No WebGL for the main experience. Depth achieved through:

| Technique | Implementation | Effect |
|---|---|---|
| Parallax layers | GSAP ScrollTrigger, 3 speeds | Background 0.12×, mid 0.45×, fore 1.0× |
| Image scale reveal | Scale 0.88→1.0 + clip-path inset 8%→0 on scroll | Physical "emerging" feel |
| Section z-transitions | Outgoing scales to 0.96 + fades; incoming scales from 0.96→1.0 | Camera pushing forward |
| Card perspective tilt | CSS `transform-style: preserve-3d`, JS maps mouse to rotateX/Y | Max ±6° — never more |
| Mouse specular light | Radial gradient follows cursor on cards | Reinforces physical surface |
| Background blur | `filter: blur(0.5px)` on far background elements | Simulates depth of field |
| Stacked image compositing | 3 images at z-offsets, different scroll speeds | Real depth in 2D stack |
| Text clip reveal | `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)` | Text "printed" onto page |

---

## 7. Section Visual Specs

### 7.1 Hero
- Background layer (0.12× speed): large display numeral or ambient form
- Midground layer (0.45× speed): profile photo, slight 2-3° tilt, shadow-3
- Foreground (1.0×): thesis statement + proof strip + CTA
- Name in Krovex at text-5xl is the largest element on screen — nothing competes
- Proof strip: shadow-1, white background, 4 metrics, Geist Mono labels
- Single CTA in accent color, shadow-2, bottom of hero

### 7.2 Case Study Track
- Section pins on scroll (GSAP ScrollTrigger, `pin: true`)
- 3 panels horizontal, total width 300vw, scroll converts to horizontal movement
- Each panel: counter in Geist Mono top-left, Krovex headline 2xl, Grift body, screenshot in shadow-3
- Screenshot: scale 0.88→1.0 as panel centres (zoom in reveal)
- Progress: 3 dots bottom-center, active dot fills with accent color
- `scrub: 1.5` for weighted horizontal movement

### 7.3 Dev Studio
- Full-bleed section, white background (#FFF) for contrast against page ground
- Studio name in Krovex, 2xl
- Client cards in shadow-1, hover to shadow-2
- Stacked parallax images at 0.3×, 0.6×, 1.0× speeds
- All copy: facts only — client names, URLs, deliverables. Zero adjectives.

### 7.4 Engineering Principles
- Cards in shadow-1, hover to shadow-2
- Principle headline: Krovex text-lg
- Elaboration: Grift text-base, color ink-2
- Stagger reveal on scroll: translateY 32px→0, opacity 0→1, 150ms between cards
- Counter: Geist Mono, text-sm, ink-3 (`01`, `02`, `03`...)

### 7.5 Contact
- Single white card, shadow-2, generous padding (sp-12 or sp-16)
- Headline: Krovex text-3xl
- Body: Grift text-md, ink-2
- Email as primary CTA button in accent color
- Social links in Geist Mono, text-sm, ink-3

---

## 8. Design Anti-Patterns (Banned)

```
✗ Glassmorphism
✗ Gradient borders
✗ Spotlight cursor effect
✗ Particle backgrounds
✗ Skill percentage / progress bars
✗ Preloader / loading screen
✗ Purple or teal gradient on white background
✗ `transition: all 0.3s ease` anywhere in the codebase
✗ Negative Y shadow offset (light from below)
✗ Single repeated box-shadow value on all cards
✗ More than 1 accent-colored element visible at once
✗ Poppins, Inter, Space Grotesk, Roboto as primary fonts
✗ Stock illustrations or Lottie animations as decoration
✗ Typing effect / rotating text in hero
✗ Scroll hijacking that breaks native scroll behaviour
```