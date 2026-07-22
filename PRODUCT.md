# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Technical recruiters, hiring managers, and developers reviewing the portfolio to assess the operative's frontend development capability, technical skills, and projects.

## Product Purpose
A highly immersive, cinematic, tactical MI6-themed interactive portfolio dossier that showcases the developer's skill set, academic background, and projects in a memorable, premium HUD interface.

## Positioning
A high-fidelity military HUD desktop environment that stands out from conventional portfolios by blending atmospheric UI styling (glassmorphism, custom cursor, CRT/scramble effects, audio feedback) with clear, structured technical legibility.

## Operating Context
Hiring managers and recruiters viewing the site on desktop viewports (minimum 1024px, target 1920x1080) to quickly scanning credentials, technical armory, and projects.

## Capabilities and Constraints
- Fixed-height desktop viewport layout zone. Page-level scrolling prohibited.
- Single-page, tab-driven navigation state (Dossier tab strip).
- Tailwind CSS v4, Framer Motion, and Lucide React.
- Fixed typography hierarchy (JetBrains Mono for structural UI/headers, Inter for body copy).
- Physical dossier features: Bracket corner decorations, classification stamps, and inline redaction blocks.
- Advanced interactions: Custom trailing cursor, audio hooks, CRT glitch/filter transitions, 3D parallax tilt, and terminal text scramble.

## Brand Commitments
- Callsign: `PHANTOM-DEV`
- Operative Name: `HAARDIK AGGARWAL` (partially redacted/hidden in UI)
- Clearance Level: `SENIOR OPERATIVE`
- Employment Status: `AVAILABLE`
- Station: `REMOTE / FIELD`
- OS/Env: `Arch Linux / Hyprland WM`

## Evidence on Hand
- Featured Op: `VIDSHARE` (MI6-VS-001) - Full-Stack video platform featuring automated 1080p downscaling and async media handling using MongoDB, Node.js, Express, FastAPI, and Cloudinary.
- Academic Directives: Bachelor of Computer Applications (BCA) undergraduate programme (2023 - 2026), current Year 3. Contains modules: CS-307 (Info Sec), CS-312 (Software Testing), MK-210 (Digital Marketing), CS-490 (Capstone Backend Project).

## Product Principles
- **Atmosphere does not compromise legibility**: Cinematic military styling lives in the environment layer; content is kept clear and readable inside padded containers.
- **Physical-Tactile Feedback**: Every interaction (hover, click, transition) is reinforced via visual and auditory effects to make the interface feel physical.
- **Strict Visual Hierarchy**: Color accents (amber) are used sparingly for active states or critical actions, ensuring clear focus.

## Accessibility & Inclusion
- Desktop layout adapts down to a minimum of 1024px; below this, displays an amber monospace "terminal incompatibility" message.
