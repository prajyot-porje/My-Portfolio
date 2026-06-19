---
name: Prajyot Porje Portfolio
description: Personal portfolio of Prajyot Porje, Product Engineer & Founder of Dev Studio.
colors:
  ground: "#f4f2ed"
  surface-1: "#ffffff"
  surface-2: "#fafaf8"
  surface-3: "#eceae4"
  surface-4: "#e0ddd6"
  ink-1: "#0d0d0d"
  ink-2: "#555250"
  ink-3: "#9b9891"
  ink-4: "#c5c2bb"
  accent: "#94ff0b"
  accent-hover: "#7fd600"
  dark-1: "#0a0a0a"
  dark-2: "#111111"
  dark-3: "#1a1a1a"
  dark-4: "#2a2a2a"
  light-on-dark: "#f4f2ed"
typography:
  display:
    fontFamily: "Krovex, serif"
    fontSize: "var(--text-4xl)"
    lineHeight: "var(--lh-display)"
    letterSpacing: "var(--ls-display)"
  body:
    fontFamily: "Grift, sans-serif"
    fontSize: "var(--text-base)"
    lineHeight: "var(--lh-body)"
    letterSpacing: "var(--ls-body)"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "var(--text-sm)"
    lineHeight: "var(--lh-label)"
    letterSpacing: "var(--ls-caps)"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  pill: "9999px"
spacing:
  sp-1: "4px"
  sp-2: "8px"
  sp-3: "12px"
  sp-4: "16px"
  sp-5: "20px"
  sp-6: "24px"
  sp-7: "28px"
  sp-8: "32px"
  sp-10: "40px"
  sp-12: "48px"
  sp-16: "64px"
  sp-20: "80px"
  sp-24: "96px"
  sp-32: "128px"
  sp-40: "160px"
  sp-48: "192px"
  sp-64: "256px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
---

# Design System: Prajyot Porje Portfolio

## 1. Overview

**Creative North Star: "The Product Engineer's Workshop"**

A personal portfolio built with extreme typographic contrast, a raw but highly-refined structural grid, and consistent lighting cues that simulate depth. The design communicates technical expertise and delivery. It rejects decorative clutter, opting instead for solid grids, precise mathematical spacing, and physical material behaviors.

**Key Characteristics:**
- High-contrast, custom-tailored font pairing (serif display & geometric sans body).
- Warm, neutral canvas background contrasting with crisp card surfaces.
- A single magnetic accent color utilized sparingly to direct visual focus.
- Consistent top-overhead light source casting realistic CSS drop shadows.

## 2. Colors

The color palette features muted, warm neutrals anchored by a highly-saturated, lime-accent color that functions as a single focal point.

### Primary
- **Volt Accent** (`#94ff0b`): Used ONCE per scrollable viewport, never on large surfaces. Its purpose is to act as a magnetic pull for the primary call to action or active status indication.
- **Volt Accent Hover** (`#7fd600`): Darker, more saturated state of the accent used exclusively for interactive hovers.

### Neutral
- **Warm Ground** (`#f4f2ed`): The page background. A warm off-white that enables pure-white components to float visibly above it, establishing the foundational depth.
- **Surface Card** (`#ffffff`): Card background at rest. Provides contrast against the warm ground.
- **Surface Alt** (`#fafaf8`): Used for subtle section alternation.
- **Surface Border** (`#eceae4`): Subtle borders and hair-thin structural lines.
- **Surface Divider** (`#e0ddd6`): Strong division lines.
- **Ink Primary** (`#0d0d0d`): Main headers and body copy. Excellent contrast.
- **Ink Secondary** (`#555250`): Supporting copy and metadata.
- **Ink Muted** (`#9b9891`): Captions, timestamps, and details.
- **Ink Placeholder** (`#c5c2bb`): Placeholder text.

### Dark Surfaces
- **Dark Ground** (`#0a0a0a`): Intro section background and dark card container surfaces.
- **Dark Hover** (`#111111`): Dark surface hover state.
- **Dark Border** (`#1a1a1a`): Borders on dark panels.
- **Dark Divider** (`#2a2a2a`): Divider lines on dark panels.

### Named Rules
**The Accent Spark Rule.** The accent color (`#94ff0b`) appears on at most ONE element per scrollable viewport. Its rarity is the point. Overuse turns guidance into noise.
**The Ground Contrast Rule.** Pure white (`#ffffff`) surfaces must never sit directly against another white surface. The warm ground (`#f4f2ed`) must always act as the negative space separating card components.

## 3. Typography

**Display Font:** Krovex (serif display)
**Body Font:** Grift (geometric sans-serif)
**Label/Mono Font:** Geist Mono (monospace)

The pairing creates tension between the traditional, sharp serifs of Krovex and the modern, heavy geometric characters of Grift, reflecting the intersection of engineering depth and brand craftsmanship.

### Hierarchy
- **Display** (bold, `clamp(3.157rem, 6vw, 7.478rem)`, `1.05` line-height): Used for the main name display and hero landmarks. Letter spacing must be set to exactly `-0.04em` (no tighter).
- **Headline** (bold, `2.369rem` to `4.209rem`, `1.15` line-height): Section header titles. Letter spacing set to `-0.025em`.
- **Title** (medium, `1.333rem` to `1.777rem`, `1.25` line-height): Component and case study headers. Letter spacing set to `-0.015em`.
- **Body** (regular, `1rem`, `1.65` line-height): Descriptive text and explanations. Max line length capped at exactly `65-75ch` (no text wraps wider than 75 characters).
- **Label** (regular, `0.75rem`, `1.35` line-height): All caps label tags, section numbers, and technical stack details. Letter spacing tracks out to `0.08em`.

### Named Rules
**The Strict Font Separation Rule.** Krovex is reserved exclusively for headings at text-lg or larger. It must never be used for body text. Grift is reserved for body text and small labels. It must never be used for display titles.

## 4. Elevation

The elevation system relies on a consistent overhead light source located top-center, approximately 1000px above the screen. All shadow Y-offsets are positive, simulating gravity and depth.

### Shadow Vocabulary
- **shadow-0**: No shadow. Used for flat text, tags, and section labels.
- **shadow-1**: `0 1px 2px rgba(13,13,13,0.06), 0 4px 12px rgba(13,13,13,0.04)`. Used for cards at rest and proof metrics.
- **shadow-2**: `0 2px 4px rgba(13,13,13,0.07), 0 12px 32px rgba(13,13,13,0.07), 0 24px 64px rgba(13,13,13,0.04)`. Used for cards on hover (lift state), navbars on scroll, and case study containers.
- **shadow-3**: `0 4px 8px rgba(13,13,13,0.08), 0 24px 48px rgba(13,13,13,0.1), 0 48px 96px rgba(13,13,13,0.06)`. Used for screenshots, hero illustrations, and signature dev studio cards.
- **shadow-4**: `0 8px 16px rgba(13,13,13,0.08), 0 48px 96px rgba(13,13,13,0.12), 0 96px 160px rgba(13,13,13,0.08)`. Used for peak showcases and large overlay headers.

### Named Rules
**The Atmospheric Shadow Rule.** Every shadow must contain both an intimate component (close, dark, small blur) and an atmospheric component (far, diffuse, wide blur) to look realistic.

## 5. Components

### Buttons
- **Shape**: Rounded Pill (`9999px` border-radius) or small rounding (`6px` border-radius) for secondary actions.
- **Primary**: Background color `var(--color-accent)` with text color `var(--color-ink-1)`. Vertical padding `12px`, horizontal padding `24px`.
- **Hover / Focus**: Transitions the background to `var(--color-accent-hover)` and scales the element slightly using `--ease-spring` behavior. Outline appears on focus-visible.

### Cards / Containers
- **Corner Style**: Medium rounding (`12px` border-radius).
- **Background**: `var(--color-surface-1)`.
- **Shadow Strategy**: Starts at `shadow-1` at rest, transitioning smoothly to `shadow-2` on hover.
- **Border**: 1px solid `var(--color-surface-3)`. No shadows combined with borders unless defined in the double-shell layout.

### Chips / Tags
- **Style**: Monospace font (`Geist Mono`), uppercase letters with tracked-out spacing, light grey background (`var(--color-surface-2)`) with thin border (`var(--color-surface-3)`).

### Navigation
- **Style**: Sticky top bar, translucent backing using blur (`backdrop-filter: blur(12px)`) combined with a solid bottom divider. Includes magnetic buttons.

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 4px grid for all margins, paddings, and layout gaps.
- **Do** ensure all text elements pass WCAG AA contrast against their backgrounds.
- **Do** specify prefers-reduced-motion overrides for every transition and animation.
- **Do** pair Krovex only with Grift or Geist Mono.

### Don't:
- **Don't** use glassmorphism or frosted glass cards as a general design container.
- **Don't** use gradient borders anywhere in the project.
- **Don't** include spotlight cursor glow effects on cards that disrupt raw visual depth.
- **Don't** render particle or canvas backgrounds that compete with the content grid.
- **Don't** build skill percentage bars, progress indicators, or logo-heavy accordions.
- **Don't** add typing or rotating text animations in the hero header.
- **Don't** use a preloader or loading screen that blocks immediate interaction.
- **Don't** use purple or teal gradients on white backgrounds.
- **Don't** use transition: all in CSS; animate specific properties (transform, opacity) to prevent layout-triggering lag.
- **Don't** use default CSS easings; always use custom cubic-beziers (`--ease-cinematic`, etc.).
