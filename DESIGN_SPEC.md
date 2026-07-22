# UI_SPECIFICATION.md
## Tactical MI6 Operative Dossier — Master UI/UX Prompt Specification
### Version 1.0 · Classification: EYES ONLY · For use with: v0, Galileo/Stitch, Figma AI, Cursor AI

---

> **HOW TO USE THIS FILE**
> 1. Fill in every `[INSERT_*]` placeholder in **Section 6** with your personal data.
> 2. Paste this entire document as the system/user prompt into your target AI UI generator.
> 3. Instruct the generator: *"Build exactly what is specified in this document. Do not deviate from the palette, layout, or component specifications. Treat every directive as a hard constraint, not a suggestion."*

---

## SECTION 1 — SYSTEM ROLE & ENVIRONMENT ARCHITECTURE

### 1.1 AI Role Definition

```
You are a Principal UI/UX Architect and Senior Front-End Engineer with deep expertise
in cinematic interface design, tactical/military HUD aesthetics, and recruiter-optimised
portfolio information architecture. Your output must feel like a real, functional OS
environment — not a themed template. Every design decision must serve two simultaneous
masters: (1) maximum cinematic atmosphere and (2) maximum resume legibility. These are
not in conflict. Atmosphere lives in the environment layer. Data lives in clean, padded
content containers. Never let the environment bleed into the content layer.
```

### 1.2 Technology Stack (Hard Requirements)

```
Framework:        React 18+ with TypeScript
Styling:          Tailwind CSS v4 (utility-first; no inline styles except for dynamic values)
Animation:        Framer Motion (AnimatePresence + motion.* components throughout)
Font Loading:     Google Fonts or local @font-face — JetBrains Mono + Inter
Icons:            lucide-react (no other icon library)
Build Tool:       Vite
State Management: React useState / useReducer only (no Redux, no Zustand)
Routing:          Internal tab state (no React Router — single-page, tab-driven navigation)
```

### 1.3 Viewport & Layout Architecture

```
TARGET VIEWPORT:  1920 × 1080px (fixed reference frame)
LAYOUT MODEL:     Modular floating-window desktop environment
SCROLLING:        PROHIBITED at the page level. Each "page" is a fixed-height viewport.
                  Individual content panels may have internal overflow-y: auto with
                  hidden scrollbars (visible only on hover).
RESPONSIVE FLOOR: Minimum supported width = 1024px. Below this, show a "terminal
                  incompatibility" message in amber monospace.
```

**Fixed Layout Zones — all four pages share this shell:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TOP NAVIGATION BAR                                          height: 52px│
│  [ MI6 · DOSSIER ● ]  [01 OVERVIEW] [02 ARMORY] [03 OPS] [04 DIRECTIVES]│
│  ───────────────────────────────────────────────────── [ ● SECURE AES-256]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  PAGE CONTENT AREA                          height: calc(100vh - 80px)   │
│  (each page renders its own grid layout within this zone)                 │
│                                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│  BOTTOM STATUS STRIP                                         height: 28px│
│  TIMESTAMP: 2024.11.14 / 03:47Z  ──────────  CHANNEL: ENCRYPTED  02/04  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Navigation System (Tabbed Dossier Architecture)

The navigation system is NOT a standard navbar. It is a **classified dossier tab strip** rendered as physical manila folder tabs viewed from above.

**Tab State Logic:**

```typescript
// Tab data structure — do not alter field names
const DOSSIER_TABS = [
  { id: 0, code: "01", label: "OPERATIVE OVERVIEW",    shortLabel: "OVERVIEW"   },
  { id: 1, code: "02", label: "TECHNICAL ARMORY",      shortLabel: "ARMORY"     },
  { id: 2, code: "03", label: "CLASSIFIED OPERATIONS", shortLabel: "OPS"        },
  { id: 3, code: "04", label: "ACADEMIC DIRECTIVES",   shortLabel: "DIRECTIVES" },
] as const;
```

**Tab Visual Rules:**

- **Inactive tab:** Background `#0D1520`, text `#C8D8E8` at 60% opacity, no bottom border accent.
- **Active tab:** Background `rgba(255,176,0,0.10)`, text `#FFB000` at 100% opacity, bottom border `2px solid #FFB000`, subtle amber glow `box-shadow: inset 0 -2px 12px rgba(255,176,0,0.15)`.
- **Hover state:** Background `rgba(255,176,0,0.05)`, transition `all 0.18s ease`.
- **Tab prefix:** Each tab label is preceded by its code in dimmed monospace: `[01]` styled at 50% opacity.
- **Active indicator dot:** Left of the brand logo, a 6px circle in `#FFB000` with a pulsing glow animation (`box-shadow` cycling `0 0 6px` → `0 0 14px`).

**Page Transition Behaviour:**
When a tab is clicked, the outgoing page fades and slides out (translateX ±28px, opacity 0), and the incoming page slides in from the opposite direction. See Section 4 for full Framer Motion specs.

---

## SECTION 2 — VISUAL IDENTITY & THEMATIC CONTRAST

### 2.1 Core Colour Palette (Hard-Coded — Do Not Substitute)

```css
/* ── PRIMARY SURFACES ─────────────────────────────────────────────── */
--color-canvas:        #080C14;   /* Page background. The void. */
--color-panel:         #0D1520;   /* Floating content windows / cards */
--color-panel-deep:    #05080F;   /* Recessed panels, status strips */
--color-panel-raised:  #0F1E2E;   /* Elevated sub-panels within cards */

/* ── THE SINGLE ACCENT ────────────────────────────────────────────── */
--color-amber:         #FFB000;   /* The ONLY accent colour. Use sparingly. */
--color-amber-glow:    rgba(255, 176, 0, 0.35);
--color-amber-dim:     rgba(255, 176, 0, 0.10);
--color-amber-ghost:   rgba(255, 176, 0, 0.07);

/* ── TEXT HIERARCHY ───────────────────────────────────────────────── */
--color-text-primary:  #C8D8E8;   /* All readable body content */
--color-text-secondary:#8AAABB;   /* Secondary labels, captions */
--color-text-muted:    #3A5060;   /* Structural labels, field keys */
--color-text-ghost:    rgba(255, 176, 0, 0.07); /* Background ambient text */

/* ── STRUCTURAL BORDERS ───────────────────────────────────────────── */
--color-border-subtle: #0C1A26;   /* Hairline dividers inside panels */
--color-border-mid:    #152030;   /* Panel outlines, grid separators */
--color-border-amber:  rgba(255, 176, 0, 0.30); /* Glowing amber borders */

/* ── STATUS COLOURS (use ONLY for status indicators, nowhere else) ── */
--color-status-online:  #2ECC71;  /* Active / deployed / complete */
--color-status-warning: #F39C12;  /* Pending / in-progress */
--color-status-alert:   #CC4444;  /* Restricted / classified */
--color-status-info:    #4488CC;  /* SCI / informational clearance */
```

### 2.2 Typography System

**Rule:** Two typefaces only. Zero exceptions.

```
TYPEFACE A — JetBrains Mono
  Usage:      All navigation labels, panel headers, field keys/labels, status
              indicators, classification stamps, bracket decorations, tab codes,
              serial numbers, timestamps, CTAs/buttons.
  Weights:    300 (ghost text), 400 (labels), 500 (standard mono), 600 (panel
              headers), 700 (page titles, featured operation names).
  Key Sizes:
    - Ghost ambient text:    0.55rem, weight 300, opacity 0.07
    - Status bar / captions: 0.50rem, weight 400, letter-spacing 0.10em
    - Field keys/labels:     0.50rem, weight 400, letter-spacing 0.14em, UPPERCASE
    - Nav tab codes [01]:    0.52rem, weight 400, opacity 0.60
    - Nav tab labels:        0.60rem, weight 500-600, letter-spacing 0.12em
    - Panel section headers: 0.65rem, weight 600, letter-spacing 0.18em, amber
    - Skill / item names:    0.82rem, weight 600, letter-spacing 0.04em
    - Page section titles:   2.00rem, weight 700, letter-spacing 0.04em
    - Featured op name:      3.50rem, weight 700, letter-spacing 0.03em
                             text-shadow: 0 0 40px rgba(255,176,0,0.15)

TYPEFACE B — Inter
  Usage:      ALL body copy inside content panels. Mission descriptions,
              course descriptions, intel briefings, skill detail subtexts.
              NEVER use Inter for labels, headers, or navigation elements.
  Weights:    300 (fine print), 400 (body), 500 (semi-emphasis), 600 (strong)
  Key Sizes:
    - Body paragraphs:       0.875rem, weight 400, line-height 1.75
    - Detail subtexts:       0.75rem,  weight 400, line-height 1.60, secondary colour
    - Strong body emphasis:  0.875rem, weight 600
```

### 2.3 The "Physical Dossier" Fusion Layer

These elements are mandatory and must appear on all four pages. They constitute the thematic skin of the environment.

**Bracket Corner Decoration `[ ]`**

Every primary content panel must have corner bracket decorations rendered as four absolutely-positioned `<span>` elements. These are NOT CSS borders — they are L-shaped line segments occupying the four corners of each panel.

```typescript
// MANDATORY component — implement exactly as specified
function BracketCorners({
  size = 10,        // px — width and height of the L-shape
  thickness = 1.5,  // px — border-width
  color = '#FFB000' // defaults to amber for primary panels
}: BracketCornersProps) {
  // Four spans, each positioned at a corner (top:0/left:0, top:0/right:0, etc.)
  // Each span has only TWO sides of its border set (the two sides forming the L)
  // All other border sides are width: 0
  // pointerEvents: 'none' on all spans
}
```

**Classification Stamps**
- Position: Always in the top-right corner of the full-page content area, rotated `-15deg`.
- Text: `TOP SECRET` or `EYES ONLY` or `CLASSIFIED`.
- Style: JetBrains Mono, 0.7rem, letter-spacing 0.4em, red border `1px solid #CC4444`, padding `0.2rem 0.6rem`, opacity 0.12. Acts as texture, not signage.

**Redaction Blocks**
- Purpose: Negative space + thematic atmosphere. Place where breathing room is needed.
- Render as: `<span>` or `<div>` with `background: #152030`, fixed width, height matching the line-height of surrounding text (~0.8em). Used inline to "redact" names, classified values, and decoration.
- Minimum of 4 redaction blocks must appear across the full portfolio.

**Paperclip Anchor**
- On the featured project dossier card (Page 3), render a minimal SVG paperclip in the top-right corner of the card, `#C8D8E8` at 8% opacity. This is purely decorative atmosphere.

**Manila Tab Metaphor**
- The navigation tabs should have a subtle `border-top-left-radius: 3px; border-top-right-radius: 3px` to suggest physical folder tabs.
- Active tab gets a `1px solid rgba(255,176,0,0.4)` full border (except bottom edge).

### 2.4 Environmental Atmosphere Layer

This layer sits at `z-index: 0`, `pointer-events: none`, `position: fixed`, covering the full viewport. It must NEVER obstruct content (content is at `z-index: 10+`).

**Sub-layer A — Tactical Grid:**
```css
background-image:
  linear-gradient(rgba(255,176,0,0.022) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,176,0,0.022) 1px, transparent 1px);
background-size: 80px 80px;
```

**Sub-layer B — Scan Lines:**
```css
background-image: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(255,255,255,0.008) 2px,
  rgba(255,255,255,0.009) 3px
);
```

**Sub-layer C — Vignette:**
```css
background: radial-gradient(
  ellipse 80% 80% at 50% 50%,
  transparent 60%,
  rgba(0,0,0,0.55) 100%
);
```

**Sub-layer D — Ghost Text Strings (15–20 items):**
All at `opacity: 0.07`, `pointer-events: none`, `user-select: none`, JetBrains Mono `0.58rem`.
Scatter these across the viewport at varied absolute positions (do not cluster):

```
"COORDINATES: 51.5074° N, 0.1278° W"
"SERIAL: MI6-OP-2024-0847"
"AUTH-CODE: ██████-████-8A2F"
"SIGNAL STRENGTH: ████████░░ 83%"
"ENCRYPTION: AES-256-CBC"
">>> SECURE CHANNEL ESTABLISHED"
"TIMESTAMP: 2024.11.14 / 03:47:22Z"
"UPLINK: GCHQ-RELAY-7 / ONLINE"
"CLEARANCE: ULTRA-BLACK"
"▌▌▌ ▌▌▌▌▌▌ ▌▌▌▌▌ ▌▌ BARCODE"
"FILE REF: DOC/PERS/2024/1847"
"STATUS: ACTIVE / FIELD DEPLOYMENT"
"▲ PRIORITY CHANNEL ACTIVE ▲"
"CRYPTO-HASH: 3f9a2b1d8c74e560"
"NET-ID: PHANTOM-NODE-04"
```

**Sub-layer E — Margin Watermarks:**
Two vertical text strings, one on far left edge, one on far right edge, rotated 90deg/-90deg:
```
"TS/SCI · ULTRA-BLACK · EYES ONLY · TOP SECRET"
"CLASSIFIED · NO FORN · ORCON · SCI"
```
Both at `opacity: 0.055`, `letter-spacing: 0.35em`, JetBrains Mono `0.55rem`.

---

## SECTION 3 — NOISE REDUCTION & VISUAL HIERARCHY DIRECTIVES

### 3.1 The Prime Directive

```
THE RECRUITER TEST: A non-technical recruiter scanning this portfolio for 8 seconds
must be able to identify: (1) the operative's role, (2) their primary tech stack,
and (3) at least one project — without the ambient environment causing visual fatigue.

If ANY atmospheric element is readable at a glance, its opacity is too high.
If ANY content panel feels crowded, its padding is too small.
This is a hard rule. Enforce it on every component.
```

### 3.2 Opacity Contract

```
Rule: Atmospheric / ambient elements are texture. Content is signal.
      Texture and signal must never compete.

TIER 0 — INVISIBLE TEXTURE    opacity: 0.03–0.07   (grid lines, scan lines, ghost text)
TIER 1 — SUBTLE STRUCTURE     opacity: 0.10–0.20   (panel borders, dividers, muted labels)
TIER 2 — SECONDARY CONTENT    opacity: 0.40–0.65   (inactive tabs, field keys, captions)
TIER 3 — PRIMARY CONTENT      opacity: 0.85–1.00   (body text, active labels, headings)
TIER 4 — ACCENT / FOCUS       opacity: 1.00        (amber highlights, active states, CTAs)

VIOLATION: Any atmospheric element rendered above TIER 0 opacity is a specification
           violation and must be corrected immediately.
```

### 3.3 Spacing & Padding Contract

```
Panel interior padding (primary panels):    1.5rem all sides minimum
Panel interior padding (compact panels):    1.0rem all sides minimum
Gap between top-level grid columns:         1.5rem minimum
Gap between stacked panels:                 1.25rem minimum
Gap between list items inside panels:       0.875rem minimum
Inline label-to-value spacing:              0.75rem minimum
Section header bottom margin:               1.0rem minimum (before content begins)
```

### 3.4 Anti-Pattern Prohibition List

The following patterns are **explicitly forbidden**. If the AI produces any of these, it is in violation of this specification:

```
✗  Progress bars / percentage meters for skill levels
   (e.g., "React ████████░░ 80%" — these are meaningless and cluttered)

✗  Skill ratings expressed as stars, dots, or numbered scores

✗  Gradient hero sections with large decorative background images

✗  Card grid layouts with equal-sized rounded cards on a grey background
   (generic SaaS template pattern — forbidden)

✗  Any blue (#0066FF range) used as a primary accent
   (the ONLY accent is Tactical Amber #FFB000)

✗  Sans-serif fonts used for navigation labels, panel headers, or CTAs

✗  Monospace fonts used for body paragraph text

✗  Font sizes below 0.48rem for any visible (non-ghost) content

✗  Line heights below 1.4 for any multi-line body text

✗  More than two typefaces in the entire application

✗  Box shadows with large blur radii on content panels
   (a subtle 1px border defines the panel; do NOT add drop shadows)

✗  Rounded corners above 3px on any element (sharp geometry only)

✗  Horizontal scrolling

✗  Tooltips that require hover to reveal important resume data
```

### 3.5 Visual Hierarchy Rules (Enforced by Size, Not Decoration)

```
RULE 1 — SIZE IS HIERARCHY
  The most important data on each page must be the physically largest text.
  Page 3: "VIDSHARE" (3.5rem) must dwarf everything else on that page.
  Page 2: Module category titles (e.g. "FRONTEND SYSTEMS") at 0.7rem weight 700
          must be visually dominant over their contents.

RULE 2 — AMBER IS SCARCITY
  Amber (#FFB000) must appear on fewer than 20% of elements on any given page.
  It marks: active tabs, the single most important header per panel, amber-tier
  classification badges, and primary CTA buttons. Nothing else.
  The moment amber appears everywhere, it appears nowhere.

RULE 3 — REDACT TO REST
  Every page must include at least two large Redaction Blocks — solid dark
  rectangles (#152030, height 28–48px, width 80–200px) that give the eye a
  place to rest and reinforce the dossier metaphor.

RULE 4 — MONO LABELS FRAME, SANS-SERIF FILLS
  Monospace labels and keys create the structural frame ("OPERATIVE DESIGNATION:").
  Sans-serif body text (Inter) fills in the human-readable content.
  These two layers must always be visually distinct in both typeface AND size.
```

---

## SECTION 4 — FRAMER MOTION & ANIMATION SPECIFICATIONS

### 4.1 Dependency Declaration

```typescript
// Required imports — include in every component file that uses animation
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
```

### 4.2 Page Transition System

All page transitions are managed by `AnimatePresence` wrapping the active page component. The `key` prop must equal the current page ID.

**Exit animation (outgoing page):**
```typescript
const pageExit = {
  opacity: 0,
  x: exitDirection === 'right' ? -28 : 28,  // direction depends on nav order
  transition: {
    duration: 0.22,
    ease: [0.4, 0, 1, 1],  // ease-in
  }
}
```

**Entry animation (incoming page):**
```typescript
const pageVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 28 : -28,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],  // spring-like ease-out
    }
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -28 : 28,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    }
  })
}
```

**AnimatePresence wrapper:**
```tsx
<AnimatePresence mode="wait" custom={navigationDirection}>
  <motion.div
    key={currentPage}
    custom={navigationDirection}
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ width: '100%', height: '100%' }}
  >
    {renderActivePage(currentPage)}
  </motion.div>
</AnimatePresence>
```

### 4.3 Panel Mount Animations (Staggered Children)

Each content panel staggers its children into view on page entry. The panel itself fades in, then its internal rows/items cascade in with a 40ms delay between each.

```typescript
const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.04,
      delayChildren: 0.1,
    }
  }
}

const panelItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' }
  }
}
```

### 4.4 Terminal Text Scramble / Decrypt Animation

Applied to: Page title headings on mount. The text appears to decrypt from noise characters into readable text.

```typescript
// Implement as a custom hook: useTextScramble(finalText: string, duration: number)
// Behaviour:
//   - On mount, rapidly cycle through random characters from the set:
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|"
//   - Each character resolves to its final value one by one, left to right
//   - Total duration: 800ms for short strings (<12 chars), 1200ms for longer
//   - Only uppercase — monospace font — amber color during scramble phase
//   - Resolved characters snap to --color-text-primary
//   - This effect fires once on component mount, then never again (no loop)

const useTextScramble = (text: string, duration: number = 800) => {
  const [displayText, setDisplayText] = useState('')
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$[]<>|'

  useEffect(() => {
    let frame = 0
    const totalFrames = Math.floor(duration / 16) // ~60fps
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            const resolveAtFrame = Math.floor((i / text.length) * totalFrames)
            if (frame >= resolveAtFrame) return char
            return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (frame >= totalFrames) clearInterval(interval)
      frame++
    }, 16)
    return () => clearInterval(interval)
  }, [text, duration])

  return displayText
}
```

### 4.5 Hover Micro-interactions

**Primary content panels (on hover):**
```typescript
const panelHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.008,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }
}
// Note: scale: 1.008 — barely perceptible. NOT scale: 1.05 (too aggressive).
```

**Bracket corners on panel hover:**
```typescript
// Animate bracket corner color from --color-border-mid to --color-amber
// on parent panel hover. Transition: 0.2s ease.
// Achieved via CSS custom property transition on the corner span elements.
```

**Navigation tab active indicator:**
```typescript
// The amber bottom border slides in from left on activation:
const tabUnderlineVariants = {
  inactive: { scaleX: 0, originX: 0 },
  active: {
    scaleX: 1,
    transition: { type: 'spring', stiffness: 500, damping: 35 }
  }
}
// Render as a <motion.div> positioned absolutely at bottom of tab, h: 2px, bg: amber
```

**Ambient pulse — active indicator dot (brand logo area):**
```css
@keyframes pulse-amber {
  0%, 100% { box-shadow: 0 0 6px #FFB000, 0 0 12px rgba(255,176,0,0.4); opacity: 1; }
  50%       { box-shadow: 0 0 3px #FFB000, 0 0 6px rgba(255,176,0,0.2);  opacity: 0.5; }
}
/* Duration: 2.4s ease-in-out infinite */
```

**CTA Button (`ACCESS SECURE SERVER`):**
```typescript
const ctaHoverVariants = {
  rest: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  hover: {
    boxShadow: '0 0 24px rgba(255,176,0,0.30), 0 0 48px rgba(255,176,0,0.12)',
    backgroundColor: 'rgba(255,176,0,0.10)',
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}
```

### 4.6 Classification Stamp Animation (Page 3 Only)

The `TOP SECRET` stamp on the featured operations panel "stamps" onto the page with a brief scale+opacity animation, simulating a physical rubber stamp:

```typescript
const stampVariants = {
  initial: { scale: 1.4, opacity: 0, rotate: -15 },
  animate: {
    scale: 1,
    opacity: 0.12,
    rotate: -15,
    transition: {
      delay: 0.6,  // after page content has settled in
      type: 'spring',
      stiffness: 600,
      damping: 20,
    }
  }
}
```

---

## SECTION 5 — GRANULAR PAGE-BY-PAGE WIREFRAME SPECIFICATIONS

### 5.1 PAGE 1 — OPERATIVE OVERVIEW

**Purpose:** First impression. Must communicate operative identity, role, clearance level, and career objective within 5 seconds of viewing.

**Grid Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  FILE REF: MI6/PERS/OV-01/2024  ────────  CLASSIFICATION: TOP SECRET │
├─────────────────────────┬────────────────────────────────────┤
│                         │                                    │
│  PANEL A: ID CARD       │  PANEL B: INTELLIGENCE BRIEF       │
│  440px wide             │  flex: 1                           │
│                         │                                    │
│                         ├────────────────────────────────────┤
│                         │  PANEL C: SECURITY AUTHORISATIONS │
│                         │                                    │
├─────────────────────────┴────────────────────────────────────┤
│  PANEL D: DEPLOYMENT STATUS STRIP (full width)               │
└──────────────────────────────────────────────────────────────┘
```

**Panel A — Operative ID Card (Left, amber bracket corners):**

```
┌ OPERATIVE PROFILE CARD ──────────────────────── ● ● ●  ┐

  ┌──────────┐   OPERATIVE DESIGNATION
  │  PHOTO   │   ████████████████████ ← Redaction block
  │          │
  │ REDACTED │   CALLSIGN
  └──────────┘   PHANTOM-DEV        ← Amber, 1.0rem, weight 700
                                       text-shadow amber glow
                 ROLE
                 Full-Stack Developer ← Inter, 0.875rem

  ─────────────────────────────────────────────────────────
  CLEARANCE LEVEL          │  STATUS
  SENIOR OPERATIVE ← amber │  ● AVAILABLE ← amber
  ─────────────────────────┼──────────────────────────────
  ACTIVATED                │  STATION
  [INSERT_ACTIVATION_DATE] │  REMOTE / FIELD
└────────────────────────────────────────────────────────────┘
```

Content rules:
- Photo placeholder: `80×96px`, `background: #05080F`, `border: 1px solid #152030`, contains "PHOTO / ─── / REDACTED" in ghost monospace.
- CALLSIGN value: largest text in this panel at ~1.0rem. Amber with `text-shadow: 0 0 18px rgba(255,176,0,0.4)`.
- Four data fields rendered in a `2×2` grid, each with a left accent border (`2px solid amber` for active status fields, `2px solid #152030` for standard fields).
- Field key: JetBrains Mono 0.48rem, `#3A5060`, uppercase, letter-spacing 0.12em.
- Field value: JetBrains Mono 0.68rem, weight 600.

**Panel B — Intelligence Brief (Top Right):**

```
┌ INTELLIGENCE BRIEF ─────────────────── EYES ONLY ┐

  [INSERT_CAREER_OBJECTIVE_PARAGRAPH_1]
  
  [INSERT_CAREER_OBJECTIVE_PARAGRAPH_2]

  [React] [Node.js] [FastAPI] [MongoDB] [Full-Stack]
  ← Amber skill tags: 1px border, amber-dim background,
    JetBrains Mono 0.58rem, padding 0.2rem 0.55rem

└──────────────────────────────────────────────────┘
```

Content rules:
- Both paragraphs: Inter 0.875rem, line-height 1.75, `--color-text-primary`.
- Skill tags: appear via stagger animation on panel mount (each tag fades+slides in 40ms apart).
- Section header `INTELLIGENCE BRIEF`: amber, JetBrains Mono 0.62rem weight 600, followed by a `flex: 1` horizontal hairline divider, then `EYES ONLY` in dimmed monospace.

**Panel C — Security Authorisations (Bottom Right):**

```
┌ SECURITY AUTHORISATIONS ──────────────────────── ┐

  ┌─ ULTRA ─┐  ┌─ EYES ONLY ─┐  ┌─ SCI ─┐  ┌─ CLASSIFIED ─┐
  │ amber   │  │ red         │  │ blue  │  │ muted        │
  └─────────┘  └────────────┘  └───────┘  └──────────────┘
  ← Each badge: 1px solid [colour], background [colour]10,
    BracketCorners at size=5, JetBrains Mono 0.58rem weight 600,
    letter-spacing 0.15em, padding 0.28rem 0.75rem

└──────────────────────────────────────────────────┘
```

**Panel D — Deployment Status Strip (Full Width):**

A thin `background: #05080F`, `border: 1px solid #152030`, `height: 52px` strip containing 4 data points separated by `1px` vertical dividers:

```
SPECIALISATION: Full-Stack Development  │  PRIMARY STACK: [INSERT_STACK]  │  ENVIRONMENT: [INSERT_OS]  │  AVAILABILITY: IMMEDIATE DEPLOYMENT
```

Each item: label in JetBrains Mono 0.48rem `#3A5060`, value in JetBrains Mono 0.62rem `#C8D8E8`.

---

### 5.2 PAGE 2 — TECHNICAL ARMORY

**Purpose:** Communicate the technical stack in a scannable, authoritative format. No skill meters. No percentages. Clean categorical loadout lists.

**Grid Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  LOADOUT REF: MI6/TECH/TA-02/2024  ────────  MODULE COUNT: 04 ACTIVE │
│                                                               │
│  TECHNICAL ARMORY  ← 2.0rem, weight 700, text-scramble on mount      │
├──────────────────────┬───────────────────────────────────────┤
│  MOD-FE              │  MOD-BE                               │
│  FRONTEND SYSTEMS    │  BACKEND SYSTEMS                      │
│                      │                                       │
│  [Skill list]        │  [Skill list]                         │
├──────────────────────┼───────────────────────────────────────┤
│  MOD-DB              │  MOD-ENV                              │
│  DATABASE SYSTEMS    │  OPERATING ENVIRONMENT                │
│                      │                                       │
│  [Skill list]        │  [Skill list]                         │
├──────────────────────┴───────────────────────────────────────┤
│  [REDACTION BLOCK 140px]  ADDITIONAL CAPABILITIES REDACTED…  │
└──────────────────────────────────────────────────────────────┘
```

**Skill Module Panel Template:**

Each of the 4 modules follows this internal structure:

```
┌─ [MOD-FE] · FRONTEND SYSTEMS ─────── [CLEARANCE BADGE] ─┐

  › React
    Component Architecture · Hooks · State Management
    
  › TypeScript
    Static Typing · Interface Design · Generics
    
  › HTML / CSS
    Semantic Markup · Flexbox · Grid Layout
    
  › Tailwind CSS
    Utility-First · Responsive Design Systems

└──────────────────────────────────────────────────────────┘
```

Content rules:
- Module code `[MOD-FE]`: JetBrains Mono 0.5rem, dimmed, letter-spacing 0.12em.
- Module title `FRONTEND SYSTEMS`: JetBrains Mono 0.7rem, weight 700, `#C8D8E8`, letter-spacing 0.14em.
- Clearance badge: colour matches module criticality — see colours below.
- `›` bullet: amber, JetBrains Mono 0.55rem, acts as a list marker.
- Skill name: JetBrains Mono 0.8rem, weight 600, `#C8D8E8`.
- Skill detail: Inter 0.72rem, `#8AAABB`, line-height 1.4.
- NO progress bars, NO percentage fills, NO star ratings.

**Module Clearance Badge Colours:**
```
Frontend Systems  → CLEARANCE: SCI        → color: #4488CC
Backend Systems   → CLEARANCE: ULTRA      → color: #FFB000 (amber badge)
Database Systems  → CLEARANCE: CLASSIFIED → color: #8AAABB (muted)
OS Environment    → CLEARANCE: EYES ONLY  → color: #CC4444 (alert red)
```

**Module Data (Fill with your own stack if different):**

```
[MODULE: FRONTEND]
  - [INSERT_FRONTEND_SKILL_1]: [INSERT_DETAIL_1]
  - [INSERT_FRONTEND_SKILL_2]: [INSERT_DETAIL_2]
  - [INSERT_FRONTEND_SKILL_3]: [INSERT_DETAIL_3]
  - [INSERT_FRONTEND_SKILL_4]: [INSERT_DETAIL_4]

[MODULE: BACKEND]
  - [INSERT_BACKEND_SKILL_1]: [INSERT_DETAIL_1]
  - [INSERT_BACKEND_SKILL_2]: [INSERT_DETAIL_2]
  - [INSERT_BACKEND_SKILL_3]: [INSERT_DETAIL_3]
  - [INSERT_BACKEND_SKILL_4]: [INSERT_DETAIL_4]

[MODULE: DATABASE]
  - [INSERT_DB_SKILL_1]: [INSERT_DETAIL_1]
  - [INSERT_DB_SKILL_2]: [INSERT_DETAIL_2]
  - [INSERT_DB_SKILL_3]: [INSERT_DETAIL_3]
  - [INSERT_DB_SKILL_4]: [INSERT_DETAIL_4]

[MODULE: ENVIRONMENT]
  - [INSERT_OS_SKILL_1]: [INSERT_DETAIL_1]
  - [INSERT_OS_SKILL_2]: [INSERT_DETAIL_2]
  - [INSERT_OS_SKILL_3]: [INSERT_DETAIL_3]
  - [INSERT_OS_SKILL_4]: [INSERT_DETAIL_4]
```

---

### 5.3 PAGE 3 — CLASSIFIED OPERATIONS

**Purpose:** Showcase projects. The VIDSHARE project must visually dominate. Recruiters must understand the project, its complexity, and its tech stack within 10 seconds.

**Grid Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  OPS FILE: MI6/OPS/CO-03/2024  ──────────  CLEARANCE: ULTRA  │
│  CLASSIFIED OPERATIONS  ← 2.0rem, text-scramble               │
├────────────────────────────────────────────┬─────────────────┤
│                                            │                 │
│  FEATURED OPERATION: VIDSHARE PANEL        │  MISSION FILE   │
│  (spans ~75% of content width)             │  DATA PANEL     │
│                                            │  (25%)          │
│                                            │                 │
├────────────────────────────────────────────┴─────────────────┤
│  SECONDARY OPS GRID (2 columns, redacted stubs)               │
└──────────────────────────────────────────────────────────────┘
```

**Featured Operation Panel — CRITICAL LAYOUT ELEMENT:**

This is the most important component in the entire portfolio. Build it exactly as follows.

```
┌─ FEATURED OPERATION — AMBER BRACKET CORNERS, AMBER BORDER ──────────────┐
│                                                                            │
│  ● DEPLOYED  │  OPERATION TYPE: FULL-STACK PLATFORM  │  PRIORITY: HIGH   │
│  (green)         (dimmed mono 0.52rem)                                     │
│                                                                            │
│  OPERATION:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  [INSERT_FEATURED_PROJECT_NAME]                                     │  │
│  │  ← THIS TEXT: 3.5rem, JetBrains Mono, weight 700, #C8D8E8           │  │
│  │    text-shadow: 0 0 40px rgba(255,176,0,0.12)                       │  │
│  │    Text-scramble animation on mount                                 │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  MISSION OBJECTIVE                                                         │
│  ← amber, JetBrains Mono 0.58rem, letter-spacing 0.15em                  │
│                                                                            │
│  [INSERT_PROJECT_DESCRIPTION_PARAGRAPH_1]                                 │
│  ← Inter 0.9rem, #C8D8E8, line-height 1.75, max-width 580px              │
│                                                                            │
│  [INSERT_PROJECT_DESCRIPTION_PARAGRAPH_2]                                 │
│  ← Inter 0.875rem, #8AAABB, line-height 1.70, max-width 520px            │
│                                                                            │
│  [INSERT_STACK_TAG_1] [INSERT_STACK_TAG_2] [INSERT_STACK_TAG_3]           │
│  ← Amber tags: 1px border, amber-dim bg, JetBrains Mono 0.58rem          │
│                                                                            │
│  [ ⬛ ACCESS SECURE SERVER ]                                               │
│  ← CTA button: amber border+text, JetBrains Mono 0.65rem, letter-spacing  │
│    0.18em. BracketCorners inside the button. Framer Motion hover glow.     │
│    href: [INSERT_LIVE_URL]                                                  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Mission File Data Panel (Right sidebar of featured panel):**

```
┌ MISSION FILE ─────────── ┐
  OP-ID:    [INSERT_OP_ID]
  CATEGORY: PLATFORM
  STATUS:   ACTIVE
  STACK:    [INSERT_SHORT_STACK]
  DEPLOY:   ████████ ← Redaction block
  ACCESS:   AUTHORIZED ← amber
└───────────────────────── ┘
[REDACTION BLOCK 52px tall]
[REDACTION BLOCK 32px tall]
```

**Secondary Operations (2-column grid, redacted stubs):**

These represent additional projects in a deliberately obscured format. Use them for secondary/older projects or placeholders.

```
┌─ [INSERT_OP_CODE_2] ─────────────────┐  ┌─ [INSERT_OP_CODE_3] ────────────────┐
│  OPERATION: [INSERT_PROJECT_NAME_2]  │  │  OPERATION: ███████████             │
│  ← 1.1rem, weight 700                │  │  ← 1.1rem, weight 700               │
│                                      │  │                                     │
│  [INSERT_SHORT_DESCRIPTION_2]        │  │  Details redacted pending security  │
│  ← Inter 0.78rem, #8AAABB            │  │  review.                            │
│                                      │  │                                     │
│  [TAG_1] [TAG_2] [TAG_3]             │  │  ████████████████████ ← Redact      │
└──────────────────────────────────────┘  └─────────────────────────────────────┘
```

---

### 5.4 PAGE 4 — ACADEMIC DIRECTIVES

**Purpose:** Present education credentials and course history in a formal, scannable record format. Minimum clutter. Maximum authority.

**Grid Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  ACADEMIC FILE: MI6/ACAD/AD-04/2024  ──  CREDENTIAL DOSSIER  │
│  ACADEMIC DIRECTIVES  ← 2.0rem, text-scramble                 │
├──────────────────────┬───────────────────────────────────────┤
│  PANEL A (380px)     │  PANEL B                              │
│  PRIMARY CREDENTIAL  │  COURSE MODULES (stacked list)        │
│                      │                                       │
│  + TIMELINE PANEL    │                                       │
└──────────────────────┴───────────────────────────────────────┘
```

**Panel A — Primary Credential (Left, amber bracket corners):**

```
┌ PRIMARY CREDENTIAL ──────────────────── ● ON TRACK ┐

  QUALIFICATION
  [INSERT_DEGREE_NAME]
  ← Inter 1.4rem, weight 600, #C8D8E8

  [INSERT_DEGREE_HONOUR]
  ← JetBrains Mono 0.62rem, amber

  ─────────────────────────────────────────────────────
  INSTITUTION       │ ████████████ ← Redaction block
  PROGRAMME LENGTH  │ [INSERT_DURATION]
  YEAR ACTIVATED    │ [INSERT_START_YEAR]
  EXPECTED COMPLETE │ [INSERT_END_YEAR]
  CURRENT STANDING  │ [INSERT_CURRENT_YEAR]

└────────────────────────────────────────────────────┘
```

Content rules:
- Each data row: label `JetBrains Mono 0.52rem #3A5060`, value `JetBrains Mono 0.68rem #C8D8E8`.
- Rows separated by a `1px solid #0C1A26` hairline.
- `● ON TRACK` in green `#2ECC71`.

**Timeline Panel (Below Panel A, Deep Background):**

Vertical dot-and-line timeline. Each node is an 8px circle + a 1px vertical connector line.

```
  ●  [INSERT_START_YEAR]  Programme activation
  │
  ●  [INSERT_YEAR_2]      Core modules complete
  │
  ◉  [INSERT_YEAR_3]      ← ACTIVE NODE: amber fill + glow
  │                       Advanced systems & specialisations
  │
  ○  [INSERT_YEAR_4]      Elective modules & research
  │
  ○  [INSERT_END_YEAR]    Expected graduation
```

Active node: amber `background: #FFB000`, `box-shadow: 0 0 8px #FFB000`. Inactive past nodes: `#152030`. Future nodes: `#152030` with dashed connector.

**Panel B — Course Modules (Right, stacked list):**

```
┌ TACTICAL COURSE MODULES ────────────── 6 MODULES ─┐

  CS-401  │  Information Security                      COMPLETED ← green
           Cryptographic systems, network security,
           threat modelling, penetration testing.

  CS-312  │  Software Testing                          COMPLETED ← green
           Unit, integration, system testing. TDD/BDD
           practices and CI/CD quality gates.

  MK-210  │  Digital Marketing                         COMPLETED ← green
           Digital strategy, SEO, analytics, and
           growth engineering for technology products.

  CS-480  │  Advanced Algorithms                       ACTIVE ← amber
           [INSERT_COURSE_DESCRIPTION_4]

  CS-452  │  Distributed Systems                       ACTIVE ← amber
           [INSERT_COURSE_DESCRIPTION_5]

  CS-490  │  Final Year Project                        PENDING ← muted
           Capstone research and implementation.

└───────────────────────────────────────────────────┘
[REDACTION BLOCK — full width] ADDITIONAL RECORDS REDACTED PER PRIVACY DIRECTIVE 2024-08
```

Content rules:
- Each module row: `borderLeft: 3px solid [statusColour]` — left accent border using the status colour.
- Course code: JetBrains Mono 0.5rem, `#3A5060`.
- Vertical divider between code and name: `1px solid #152030`, height 12px.
- Course name: JetBrains Mono 0.8rem, weight 600, `#C8D8E8`.
- Status badge: JetBrains Mono 0.5rem, right-aligned, status colour.
- Description: Inter 0.78rem, `#8AAABB`, line-height 1.6, margin-top 0.35rem.
- Gap between modules: 0.75rem.

---

## SECTION 6 — EDITABLE DATA PLACEHOLDERS

> **INSTRUCTIONS:** Replace every `[INSERT_*]` token below with your personal data.
> Once filled in, these values propagate to their referenced positions in Section 5.
> Do not alter the surrounding structure — only replace the token values.

---

### 6.1 Operative Identity (Page 1)

```markdown
<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  OPERATIVE IDENTITY — Fill in your details below                   -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

[INSERT_CALLSIGN]           = PHANTOM-DEV
  ^ Your chosen handle or portfolio alias. Monospace, amber, large.

[INSERT_FULL_NAME]          = [YOUR FULL NAME — this is REDACTED on screen]
  ^ Not displayed directly; referenced in metadata/page title only.

[INSERT_ROLE]               = Full-Stack Developer
  ^ Your job title. Inter, 0.875rem, weight 600.

[INSERT_CLEARANCE_LEVEL]    = SENIOR OPERATIVE
  ^ Your seniority. Could be: JUNIOR OPERATIVE / MID-LEVEL / SENIOR / LEAD

[INSERT_STATUS]             = ● AVAILABLE
  ^ Employment status. Options: ● AVAILABLE / ● OPEN TO ROLES / ██ EMPLOYED

[INSERT_ACTIVATION_DATE]    = 2022-09-01
  ^ When you started in the field (first job / graduation / portfolio launch).

[INSERT_STATION]            = REMOTE / FIELD
  ^ Location/work preference.

[INSERT_CAREER_OBJECTIVE_PARAGRAPH_1] =
  Operative specialising in high-performance web architecture. Proficient in
  full-stack development, cloud infrastructure, and mission-critical system
  design. Demonstrated capability across modern JavaScript ecosystems and
  Linux-native tooling.

[INSERT_CAREER_OBJECTIVE_PARAGRAPH_2] =
  Currently seeking new operational assignments. Prior deployments include
  scalable video platforms with asynchronous cloud processing pipelines.
  Operates under Arch Linux with Hyprland WM in all field environments.

[INSERT_STACK]              = React · Node.js · FastAPI · MongoDB
  ^ Short stack summary for the status strip.

[INSERT_OS]                 = Arch Linux / Hyprland WM
  ^ Operating environment summary.
```

---

### 6.2 Technical Armory (Page 2)

```markdown
<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  TECHNICAL ARMORY — Skill modules                                  -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

[MODULE: FRONTEND SYSTEMS]
  [INSERT_FRONTEND_SKILL_1]  = React
  [INSERT_DETAIL_1]          = Component Architecture · Hooks · State Management
  [INSERT_FRONTEND_SKILL_2]  = TypeScript
  [INSERT_DETAIL_2]          = Static Typing · Interface Design · Generics
  [INSERT_FRONTEND_SKILL_3]  = HTML / CSS
  [INSERT_DETAIL_3]          = Semantic Markup · Flexbox · CSS Grid
  [INSERT_FRONTEND_SKILL_4]  = Tailwind CSS
  [INSERT_DETAIL_4]          = Utility-First · Responsive Design Systems

[MODULE: BACKEND SYSTEMS]
  [INSERT_BACKEND_SKILL_1]   = Node.js
  [INSERT_DETAIL_1]          = Event Loop · Async I/O · npm Ecosystem
  [INSERT_BACKEND_SKILL_2]   = Express
  [INSERT_DETAIL_2]          = REST APIs · Middleware · Routing
  [INSERT_BACKEND_SKILL_3]   = FastAPI
  [INSERT_DETAIL_3]          = Python · Async Handlers · Pydantic Schemas
  [INSERT_BACKEND_SKILL_4]   = REST / JSON
  [INSERT_DETAIL_4]          = API Design · Auth Patterns · Rate Limiting

[MODULE: DATABASE SYSTEMS]
  [INSERT_DB_SKILL_1]        = MongoDB
  [INSERT_DETAIL_1]          = Document Store · Aggregation Pipeline
  [INSERT_DB_SKILL_2]        = Mongoose
  [INSERT_DETAIL_2]          = ODM · Schema Validation · Population
  [INSERT_DB_SKILL_3]        = Cloud Storage
  [INSERT_DETAIL_3]          = Object Store · CDN Distribution
  [INSERT_DB_SKILL_4]        = Query Design
  [INSERT_DETAIL_4]          = Indexing Strategy · Performance Optimisation

[MODULE: OPERATING ENVIRONMENT]
  [INSERT_OS_SKILL_1]        = Arch Linux
  [INSERT_DETAIL_1]          = Rolling Release · Custom Kernel Configuration
  [INSERT_OS_SKILL_2]        = Hyprland WM
  [INSERT_DETAIL_2]          = Wayland Compositor · Tiling · Scripting
  [INSERT_OS_SKILL_3]        = Git / GitHub
  [INSERT_DETAIL_3]          = Version Control · CI/CD Pipeline Management
  [INSERT_OS_SKILL_4]        = Docker
  [INSERT_DETAIL_4]          = Containerisation · Compose · Volume Management
```

---

### 6.3 Classified Operations — Featured Project (Page 3)

```markdown
<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  FEATURED OPERATION — The largest, most prominent project           -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

[INSERT_FEATURED_PROJECT_NAME]       = VIDSHARE
  ^ ALL CAPS. This is the 3.5rem headline — the biggest text on the page.
  ^ Keep it short: 1–2 words maximum for visual impact.

[INSERT_OP_ID]                       = MI6-VS-001
  ^ Fictional operation ID for the mission file sidebar.

[INSERT_PROJECT_DESCRIPTION_PARAGRAPH_1] =
  Full-Stack Video Platform engineered for high-throughput media ingestion.
  Built to handle background video downscaling via automated processing
  pipelines and asynchronous cloud operations — ensuring zero-latency user
  experience during heavy upload loads.

[INSERT_PROJECT_DESCRIPTION_PARAGRAPH_2] =
  Architecture routes uploads through a non-blocking job queue; cloud
  storage integration distributes processed assets to edge nodes. Metadata
  served via REST endpoints with real-time progress tracking exposed to
  the client layer.

[INSERT_STACK_TAG_1]                 = React
[INSERT_STACK_TAG_2]                 = Node.js
[INSERT_STACK_TAG_3]                 = Express
[INSERT_STACK_TAG_4]                 = MongoDB
[INSERT_STACK_TAG_5]                 = Cloud Storage
[INSERT_STACK_TAG_6]                 = Async Queue
[INSERT_STACK_TAG_7]                 = REST API

[INSERT_LIVE_URL]                    = https://[your-live-deployment-url]
  ^ The href for the "ACCESS SECURE SERVER" CTA button.

[INSERT_SHORT_STACK]                 = MERN
  ^ Displayed in the mission file sidebar (keep to 1–4 chars).

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  SECONDARY OPERATIONS — Additional projects (can be redacted)       -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

[INSERT_OP_CODE_2]                   = OP-002
[INSERT_PROJECT_NAME_2]              = [YOUR SECOND PROJECT NAME]
[INSERT_SHORT_DESCRIPTION_2]         = [1–2 sentence project description]
[INSERT_TAG_A_2]                     = [TECH TAG 1]
[INSERT_TAG_B_2]                     = [TECH TAG 2]
[INSERT_TAG_C_2]                     = [TECH TAG 3]

[INSERT_OP_CODE_3]                   = OP-003
  ^ Leave Project 3 redacted OR fill in a third project.
  ^ Redacted format: "OPERATION: ███████████" with redaction block below.
```

---

### 6.4 Academic Directives (Page 4)

```markdown
<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  ACADEMIC DIRECTIVES — Education credentials                        -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

[INSERT_DEGREE_NAME]                 = B.Sc. Computer Science
[INSERT_DEGREE_HONOUR]               = Honours Degree Programme
[INSERT_INSTITUTION]                 = [YOUR UNIVERSITY NAME — displayed REDACTED on screen]
[INSERT_DURATION]                    = 4 YEARS
[INSERT_START_YEAR]                  = 2022
[INSERT_END_YEAR]                    = 2026
[INSERT_CURRENT_YEAR]                = YEAR 3 / 4

[TIMELINE NODE 1]  year = 2022,  event = "Programme activation",           status = past
[TIMELINE NODE 2]  year = 2023,  event = "Core modules complete",           status = past
[TIMELINE NODE 3]  year = 2024,  event = "Advanced systems",                status = ACTIVE
[TIMELINE NODE 4]  year = 2025,  event = "Elective modules & research",     status = future
[TIMELINE NODE 5]  year = 2026,  event = "Expected graduation",             status = future

[COURSE MODULE 1]
  code        = CS-401
  name        = Information Security
  description = Cryptographic systems, network security, threat modelling,
                and penetration testing methodologies.
  status      = COMPLETED

[COURSE MODULE 2]
  code        = CS-312
  name        = Software Testing
  description = Unit, integration, and system testing strategies. TDD/BDD
                practices and CI/CD quality gates.
  status      = COMPLETED

[COURSE MODULE 3]
  code        = MK-210
  name        = Digital Marketing
  description = Digital strategy, SEO, analytics, and growth engineering
                frameworks for technology products.
  status      = COMPLETED

[COURSE MODULE 4]
  code        = CS-480
  name        = Advanced Algorithms
  description = [INSERT_COURSE_DESCRIPTION_4]
  status      = ACTIVE

[COURSE MODULE 5]
  code        = CS-452
  name        = Distributed Systems
  description = [INSERT_COURSE_DESCRIPTION_5]
  status      = ACTIVE

[COURSE MODULE 6]
  code        = CS-490
  name        = Final Year Project
  description = Capstone research and implementation project. Full details
                classified under institutional academic clearance.
  status      = PENDING
```

---

## APPENDIX A — COMPONENT CHECKLIST

Before considering the build complete, verify every item in this list is implemented:

```
GLOBAL SHELL
  ☐ Fixed nav bar (52px) with 4 dossier tabs + brand logo + SECURE status
  ☐ Fixed status strip (28px) with timestamp and page counter
  ☐ Full-viewport ghost background layer (grid + scanlines + vignette + ghost text + watermarks)
  ☐ Amber brand pulse animation (infinite, 2.4s)
  ☐ Page transitions: AnimatePresence, slide-in from correct direction
  ☐ Responsive floor: incompatibility message below 1024px

PAGE 1 — OPERATIVE OVERVIEW
  ☐ File ref header row with horizontal divider
  ☐ Panel A: ID card with photo placeholder, callsign amber glow, 2×2 data fields
  ☐ Panel B: Intel brief with body text + skill tags (stagger animation)
  ☐ Panel C: Security badges (amber, red, blue, muted variants)
  ☐ Panel D: Full-width status strip with 4 data points
  ☐ At least 1 redaction block

PAGE 2 — TECHNICAL ARMORY
  ☐ Page title with text-scramble animation
  ☐ 2×2 skill module grid
  ☐ Each module: code badge, title, clearance badge, ›-bulleted list
  ☐ No progress bars, no percentages, no star ratings
  ☐ Bottom redaction block row
  ☐ Page 02/04 counter

PAGE 3 — CLASSIFIED OPERATIONS
  ☐ Featured operation panel (amber bracket corners, amber border)
  ☐ VIDSHARE title at 3.5rem with scramble animation
  ☐ Status badge (green DEPLOYED), op type, priority
  ☐ Two body paragraphs (Inter)
  ☐ Tech stack tags (amber, stagger animation)
  ☐ "ACCESS SECURE SERVER" CTA with Framer Motion hover glow
  ☐ Mission file sidebar with redaction blocks
  ☐ Classification stamp (opacity 0.12, rotate -15deg, stamp animation on mount)
  ☐ Paperclip SVG (decorative, 8% opacity)
  ☐ 2 secondary op stubs below
  ☐ At least 2 redaction blocks

PAGE 4 — ACADEMIC DIRECTIVES
  ☐ Primary credential panel (degree name, honours, data table)
  ☐ Dot-and-line timeline (5 nodes, active node amber glow)
  ☐ Course modules list (6 items, status left-border accent, COMPLETED/ACTIVE/PENDING)
  ☐ Full-width redaction block footer
  ☐ At least 1 redaction block in panel A (institution name redacted)

ANIMATIONS
  ☐ Text scramble: page titles on all 4 pages
  ☐ Stagger: panel children on page entry
  ☐ Spring hover: panel scale 1.008
  ☐ Bracket corner amber transition on hover
  ☐ Tab underline slide-in with spring physics
  ☐ Classification stamp bounce-in on Page 3
  ☐ Amber pulse dot in nav brand
  ☐ CTA button glow on hover
```

---

## APPENDIX B — STRICT VIOLATION FLAGS

If the AI output contains ANY of the following, it has violated this specification and must be regenerated:

```
🚫  Any colour other than #FFB000 used as a decorative accent
🚫  Skill meters, progress bars, or percentage indicators
🚫  Sans-serif typeface used for any navigation, panel header, or label
🚫  Rounded corners exceeding 3px
🚫  Cards arranged in a symmetrical equal-width column grid on a grey/neutral background
🚫  Any atmospheric text element readable at normal viewing distance
🚫  Body text below 0.75rem in any content panel
🚫  Line height below 1.4 on any multi-line body copy
🚫  More than two typefaces (JetBrains Mono + Inter only)
🚫  Horizontal page-level scrolling
🚫  Blue (#0044FF–#0099FF range) as a primary CTA or accent colour
🚫  Drop shadows on content panels (hairline borders define panels, not shadows)
🚫  The operative's real name displayed anywhere on screen unredacted
🚫  Generic hero section with gradient background image
🚫  Lorem ipsum or generic placeholder text left in final output
```

Here is the complete, fully integrated master `.md` file. I have directly embedded the 3D Parallax, CRT Glitch, Custom Cursor, and Auditory Layer as hard-coded parameters in **Section 4**.

I also went ahead and pre-filled **Section 6** with your specific data (VidShare, Arch Linux, Hyprland, BCA degree, Node.js v24.7.0, etc.) so you don't even have to type it out. You can just copy this entire block and paste it straight into v0.

---

```markdown
# UI_SPECIFICATION.md
## Tactical MI6 Operative Dossier — Master UI/UX Prompt Specification
### Version 3.0 (Ultimate Kinetic Update) · Classification: EYES ONLY

---

> **HOW TO USE THIS FILE**
> 1. Copy this entire document as the system/user prompt into your target AI UI generator (v0 by Vercel is highly recommended for this version).
> 2. Instruct the generator: *"Build exactly what is specified in this document. Do not deviate from the palette, layout, motion physics, audio directives, or component specifications. Treat every directive as a hard constraint, not a suggestion."*

---

## SECTION 1 — SYSTEM ROLE & ENVIRONMENT ARCHITECTURE

### 1.1 AI Role Definition


```

You are a Principal UI/UX Architect and Senior Front-End Engineer with deep expertise
in cinematic interface design, tactical/military HUD aesthetics, and recruiter-optimised
portfolio information architecture. Your output must feel like a real, functional OS
environment — not a themed template. Atmosphere lives in the environment layer.
Data lives in clean, padded content containers. Never let the environment bleed into the content.

```

### 1.2 Technology Stack (Hard Requirements)


```

Framework:        React 18+ with TypeScript
Styling:          Tailwind CSS v4 (utility-first; no inline styles except for dynamic values)
Animation/Motion: Framer Motion (AnimatePresence, useMouse, useTransform, useSpring)
Audio:            HTML5 Audio / custom useAudio hooks for sensory feedback
Font Loading:     Google Fonts or local @font-face — JetBrains Mono + Inter
Icons:            lucide-react (no other icon library)
Build Tool:       Vite
State Management: React useState / useRef / useEffect only
Routing:          Internal tab state (no React Router — single-page, tab-driven navigation)

```

### 1.3 Viewport & Layout Architecture


```

TARGET VIEWPORT:  1920 × 1080px (fixed reference frame)
LAYOUT MODEL:     Modular floating-window desktop environment
SCROLLING:        PROHIBITED at the page level. Each "page" is a fixed-height viewport.

```

**Fixed Layout Zones — all four pages share this shell:**


```

┌─────────────────────────────────────────────────────────────────────────┐
│  TOP NAVIGATION BAR                                          height: 52px│
│  [ MI6 · DOSSIER ● ]  [01 OVERVIEW] [02 ARMORY] [03 OPS] [04 DIRECTIVES]│
│  ───────────────────────────────────────────────────── [ ● SECURE AES-256]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  PAGE CONTENT AREA                                height: calc(100vh - 80px) │
│  (each page renders its own grid layout within this zone)                 │
│                                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│  BOTTOM STATUS STRIP                                         height: 28px│
│  TIMESTAMP: 2026.07.22 / 13:15Z  ──────────  CHANNEL: ENCRYPTED  02/04  │
└─────────────────────────────────────────────────────────────────────────┘

```

### 1.4 Navigation System (Tabbed Dossier Architecture)

**Tab Visual Rules:**
- **Inactive tab:** Background `#0D1520`, text `#C8D8E8` at 60% opacity.
- **Active tab:** Background `rgba(255,176,0,0.10)`, text `#FFB000` at 100% opacity, bottom border `2px solid #FFB000`, amber glow `box-shadow: inset 0 -2px 12px rgba(255,176,0,0.15)`.
- **Hover state:** Background `rgba(255,176,0,0.05)`, transition `all 0.18s ease`.

---

## SECTION 2 — VISUAL IDENTITY & THEMATIC CONTRAST

### 2.1 Core Colour Palette (Hard-Coded — Do Not Substitute)

```css
--color-canvas:        #080C14;   /* Page background. The void. */
--color-panel:         #0D1520;   /* Floating content windows / cards */
--color-panel-deep:    #05080F;   /* Recessed panels, status strips */
--color-amber:         #FFB000;   /* The ONLY accent colour. Use sparingly. */
--color-text-primary:  #C8D8E8;   /* All readable body content */
--color-text-secondary:#8AAABB;   /* Secondary labels, captions */
--color-border-mid:    #152030;   /* Panel outlines, grid separators */
--color-status-online: #2ECC71;   /* Active / deployed / complete */
--color-status-warning:#F39C12;   /* Pending / in-progress */
--color-status-alert:  #CC4444;   /* Restricted / classified */

```

### 2.2 Typography System

**TYPEFACE A — JetBrains Mono:** All navigation labels, panel headers, field keys/labels.
**TYPEFACE B — Inter:** ALL body copy inside content panels.

### 2.3 The "Physical Dossier" Fusion Layer

* **Bracket Corner Decoration `[ ]`:** Four absolute `<span>` elements positioned at panel corners forming an L-shape (border-width: 1.5px, pointer-events: none).
* **Classification Stamps:** Top-right corner, rotated `-15deg`, red border `1px solid #CC4444`, padding `0.2rem 0.6rem`, opacity 0.12.
* **Redaction Blocks:** `#152030` solid blocks to simulate censored data.

### 2.4 Environmental Atmosphere Layer (Z-index 0)

Must remain strictly `opacity: <0.10`, `pointer-events: none`.

* **Tactical Grid:** `linear-gradient(rgba(255,176,0,0.022) 1px, transparent 1px)`
* **Scan Lines:** `repeating-linear-gradient` at 2px intervals.
* **Ghost Text Strings:** "COORDINATES: 51.5074° N, 0.1278° W", "ENCRYPTION: AES-256-CBC" scattered absolutely across viewport at 7% opacity.

---

## SECTION 3 — NOISE REDUCTION & VISUAL HIERARCHY DIRECTIVES

```
THE RECRUITER TEST: A non-technical recruiter scanning this portfolio for 8 seconds
must be able to identify: (1) the operative's role, (2) their primary tech stack,
and (3) at least one project — without the ambient environment causing visual fatigue.

```

**Anti-Pattern Prohibition List (DO NOT DO THESE):**
✗ Progress bars / percentage meters for skill levels.
✗ Gradient hero sections or rounded modern SaaS cards.
✗ Sans-serif fonts used for terminal headers.
✗ Any blue (#0066FF range) used as a primary accent.

---

## SECTION 4 — KINETIC MOTION, PHYSICS & AUDIO (CRITICAL DIRECTIVES)

The AI MUST implement the following 4 kinetic features to achieve the "WOW" factor.

### 4.1 Global Cursor Override & Tactical Trailing Cursor

Disable default cursor: `body { cursor: none; }`
Implement a custom cursor using Framer Motion that tracks mouse coordinates:

```tsx
// Outer ring (trails with spring physics):
const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });
// Inner dot (snaps instantly to coordinates).
// Render as fixed position, z-index: 9999, pointer-events: none.
// Inner dot: 4px amber circle. Outer ring: 24px amber border, opacity 0.4.

```

### 4.2 Auditory Layer (Sensory Feedback Hooks)

Scaffold a `useAudio` hook with placeholder HTML5 Audio objects (e.g., `new Audio('data:audio/mp3;base64,...')` or generic paths).

* **playHover():** A subtle digital tick. Fire `onMouseEnter` for tabs and CTA buttons.
* **playDeploy():** A mechanical thunk. Fire `onClick` when switching dossier tabs.
* **playScramble():** High-frequency data processing static. Fire on page mount for 800ms.

### 4.3 3D Parallax Tilt (Holographic Panels)

Primary content panels must react to the cursor to create depth.

```tsx
// Use useMouse() and useTransform() on the primary <motion.div> panels.
const rotateX = useTransform(mouseY, [0, windowHeight], [2, -2]); 
const rotateY = useTransform(mouseX, [0, windowWidth], [-2, 2]);
// Apply style={{ rotateX, rotateY, perspective: 1000 }} to the panel.
// Rotation must be subtle (max 2 degrees) to keep text legible.

```

### 4.4 CRT Glitch / Chromatic Aberration (Page Transitions)

AnimatePresence transitions must feel like a secure feed recalibrating, not a soft corporate fade.

```typescript
const pageGlitchVariants = {
  initial: { opacity: 0, filter: 'blur(4px) hue-rotate(90deg)', x: -20 },
  animate: { 
    opacity: 1, 
    filter: 'blur(0px) hue-rotate(0deg)', 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(4px) sepia(100%)', 
    x: 20, 
    transition: { duration: 0.2 } 
  }
}

```

### 4.5 Terminal Text Scramble Animation

Applied to massive headers (e.g., "VIDSHARE") on mount. Rapidly cycle characters (`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$[]<>|`) for 800ms before snapping to the actual text string. Sync this with `playScramble()`.

---

## SECTION 5 — GRANULAR PAGE-BY-PAGE WIREFRAME SPECIFICATIONS

### 5.1 PAGE 1 — OPERATIVE OVERVIEW

* **Panel A:** ID Card (Photo redacted, callsign, 2x2 data grid). **[APPLY 3D PARALLAX TILT]**
* **Panel B:** Intelligence Brief (Body text, amber skill tags).
* **Panel C:** Security Authorisations (Badges: ULTRA, EYES ONLY, SCI).
* **Panel D:** Deployment Status Strip (Full width bottom).

### 5.2 PAGE 2 — TECHNICAL ARMORY

* **Grid:** 2x2 skill module loadouts (Frontend, Backend, Database, Env).
* **Module Template:** Code badge, title, clearance badge, ›-bulleted list. (Trigger `playHover()` audio when mouse enters a module).

### 5.3 PAGE 3 — CLASSIFIED OPERATIONS

* **Featured Operation Panel:** Spans 75% width. Contains massive project text (scrambles on mount). Green DEPLOYED badge. **[APPLY 3D PARALLAX TILT]**
* **CTA Button:** `[ ⬛ ACCESS SECURE SERVER ]`. Pulsing amber glow.
* **Mission File Sidebar:** 25% width. Contains redaction blocks and op metadata.

### 5.4 PAGE 4 — ACADEMIC DIRECTIVES

* **Panel A:** Primary Credential (Degree name).
* **Timeline:** Vertical dot-and-line, active node glows amber.
* **Panel B:** Course Modules stacked list with status left-borders.

---

## SECTION 6 — EDITABLE DATA PAYLOAD (INJECT DIRECTLY INTO UI)

**OPERATIVE IDENTITY (Page 1)**

* CALLSIGN: PHANTOM-DEV
* FULL NAME: HAARDIK AGGARWAL (Display as `H██████ A███████` in UI)
* ROLE: Full-Stack Developer
* CLEARANCE: SENIOR OPERATIVE
* STATUS: ● AVAILABLE
* ACTIVATION DATE: 2025-10
* STATION: REMOTE / FIELD
* BRIEFING P1: Operative specialising in high-performance web architecture. Proficient in full-stack development, cloud infrastructure, and mission-critical system design. Demonstrated capability across modern JavaScript ecosystems and Linux-native tooling.
* BRIEFING P2: Currently seeking new operational assignments. Prior deployments include scalable video platforms with asynchronous cloud processing pipelines. Operates under Arch Linux with Hyprland WM in all field environments.
* STACK SUMMARY: React · Node.js · Express · MongoDB · FastAPI
* OS SUMMARY: Arch Linux / Hyprland WM

**TECHNICAL ARMORY (Page 2)**

* [MOD-FE] FRONTEND SYSTEMS: React (Component Architecture, Hooks), TypeScript (Static Typing), HTML/CSS (Semantic Markup), Tailwind CSS (Utility-First).
* [MOD-BE] BACKEND SYSTEMS: Node.js (v24.7.0, Event Loop, native `with` keyword JSON imports), Express (REST APIs), FastAPI (Python, Async Handlers, Pydantic).
* [MOD-DB] DATABASE SYSTEMS: MongoDB (Document Store), Mongoose (ODM), Cloudinary (Cloud Object Storage, Async Media).
* [MOD-ENV] OPERATING ENVIRONMENT: Arch Linux (Rolling Release, pacman/yay), Hyprland WM (Wayland Compositor), Git (Version Control).

**CLASSIFIED OPERATIONS (Page 3)**

* FEATURED OP: VIDSHARE
* OP ID: MI6-VS-001
* DESC 1: Full-Stack Video Platform engineered for high-throughput media ingestion. Built to handle background video downscaling to 1080p via automated processing pipelines and asynchronous cloud operations.
* DESC 2: Architecture routes uploads securely; cloud integration distributes processed assets. Metadata served via REST endpoints with real-time progress tracking exposed to the client layer.
* TAGS: React, Node.js, Express, MongoDB, FastAPI, Cloudinary
* LIVE URL: href="#" (Access Secure Server)
* SHORT STACK: MERN
* SECONDARY: OP-002 (Redacted Pending Review), OP-003 (Redacted).

**ACADEMIC DIRECTIVES (Page 4)**

* DEGREE NAME: Bachelor of Computer Applications (BCA)
* HONOUR: Undergraduate Programme
* INSTITUTION: [REDACTED INSTITUTION]
* DURATION: 3 YEARS
* START: 2023 | END: 2026 | CURRENT: YEAR 3 (ON TRACK)
* MODULES:
* CS-307: Information Security (Cryptographic systems, network security) - COMPLETED
* CS-312: Software Testing (System testing strategies, CI/CD quality gates) - COMPLETED
* MK-210: Digital Marketing (Digital strategy, SEM, PPC integration) - COMPLETED
* CS-490: Capstone Backend Project (Research and implementation) - ACTIVE



---

## APPENDIX A — COMPONENT CHECKLIST (CRITICAL REVIEW)

Before considering the build complete, the AI must verify:
☐ Custom Trailing Cursor is active (default cursor hidden).
☐ Audio hooks (`playHover`, `playDeploy`, `playScramble`) are integrated.
☐ Page transitions use the CRT Glitch / filter variants.
☐ 3D Parallax Tilt (`rotateX`/`rotateY`) is applied to Page 1 ID Card and Page 3 VidShare Panel.
☐ Terminal Text Scramble runs on mount for headers.

---

*End of UI_SPECIFICATION.md — Classification: EYES ONLY — v3.0 — 2026*

```

```
---

*End of UI_SPECIFICATION.md — Classification: EYES ONLY — v1.0 — 2024*
