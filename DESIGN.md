# DESIGN

## Visual Authority & Thesis
The MI6 Tactical Dossier Portfolio uses a deep void canvas with recessed panels and a highly controlled amber accent. It functions as a fixed-viewport, single-page floating desktop environment simulating a classified physical dossier, ensuring cinematic military HUD aesthetics without compromising recruiter legibility.

## Core Palette (Provisional)
- **Primary Surfaces:**
  - Canvas: `#080C14`
  - Panel: `#0D1520`
  - Panel Deep: `#05080F`
  - Panel Raised: `#0F1E2E`
- **Accent:** Amber (`#FFB000`) used for active states and critical actions.
- **Text:** 
  - Primary: `#C8D8E8`
  - Secondary: `#8AAABB`
  - Muted: `#3A5060`
- **Status Indicators:** Online (`#2ECC71`), Warning (`#F39C12`), Alert (`#CC4444`), Info (`#4488CC`)

## Typography System
- **Typeface A (JetBrains Mono):** Used for navigation labels, headers, structural UI elements, classification stamps, bracket decorations, and terminal text scramble effects.
- **Typeface B (Inter):** Used for readable body content inside padded containers (mission descriptions, course details, intelligence briefings).

## Layout & Topology
- **Viewport:** 1920x1080px reference frame (minimum 1024px width floor). Page-level scrolling is prohibited; internal panel scrolling only.
- **Zones:**
  - Top Navigation Bar (52px height)
  - Page Content Area (dynamic grid area, height: `calc(100vh - 80px)`)
  - Bottom Status Strip (28px height)

## Controls & Interaction
- **Tab Navigation:** Simulated physical dossier tabs. Active tabs feature a bottom amber border, pulsing dot, and amber glow. Clicking a tab triggers Framer Motion variants (fading and sliding out the current panel while sliding in the next).
- **Physical Feedback:** Interactions are reinforced by audio hooks (`playHover`, `playDeploy`) and a custom trailing cursor (default system cursor hidden). Bracket corner decorations frame core panels.

## Delivery & Constraints
- React 18+, Tailwind CSS v4, Framer Motion for structural logic and styling. No page-level routing; internal tab state dictates navigation. Responsive adaptation halts below 1024px to preserve structural integrity.
