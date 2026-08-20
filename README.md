# D-NINE Creative Agency & Media Production — Frontend Architecture

D-NINE is a Next.js 16 (React 19) frontend application built for a premier Creative, Brand Identity, and Media Production Agency operating across the GCC region (Riyadh & Dubai).

## Tech Stack
* **Framework**: Next.js 16 (App Router) + React 19
* **Internationalization**: `next-intl` (Arabic RTL & English LTR)
* **Styling**: Tailwind CSS v4 + Vanilla CSS Design System Tokens
* **Motion & Animation**: `motion/react` (Framer Motion v13)
* **Typography**: IBM Plex Sans (Arabic & Latin) loaded via `next/font/local`
* **Form & Validation**: `react-hook-form` + `zod`

## Architecture & Folder Structure

```text
src/
  app/                    # Thin Next.js App Router route files
    [locale]/             # i18n dynamic route segment (/ar, /en)
      layout.tsx          # Root locale layout (RTL/LTR & fonts)
      page.tsx            # Home route
      about/              # About route
      services/           # Services listing & [slug] detail routes
      work/               # Portfolio listing & [slug] detail routes
      blog/               # Blog listing & [slug] detail routes
      contact/            # Contact route
      privacy/            # Privacy Policy
      terms/              # Terms of Service
  features/               # Feature-based domain modules
    home/                 # Home page composition & sections (HeroSlider, CreativeSnapshot)
    taxonomy/             # Canonical category data & utilities
    services/             # Services page, detail, grid & filtering
    work/                 # Portfolio page, detail, grid, cards & relation utilities
    blog/                 # Blog page, detail, grid, search & relation utilities
    about/                # About page
    contact/              # Contact page, form & schema
    legal/                # Privacy and Terms pages
  components/             # Reusable UI, layout, media, motion & provider components
  services/               # Content access service layer (Sanity/CMS ready)
  config/                 # Typed site configuration & internal pending markers
  hooks/                  # Custom hooks (useProgressiveGrid, useIntersectionLoader)
  messages/               # i18n translation messages (ar.json, en.json)
  styles/                 # Design tokens & global CSS
  types/                  # Shared TypeScript domain interfaces
  assets/                 # Local fonts (IBM Plex Sans)
```

## Key Scripts

```bash
# Start development server
npm run dev

# Run strict type checking
npm run typecheck

# Run strict ESLint verification
npm run lint:strict

# Build production bundle for SSG
npm run build

# Start production server
npm run start
```

## Features & Highlights

1. **Approved Hero Slider**: Visual design, curtain transition, autoplay, and control dock frozen and preserved.
2. **Theme-Aware Logo System**: Uses `d-nine-logo-light.png` and `d-nine-logo-dark.png` with pure CSS theme variants to prevent hydration flicker.
3. **Compact Bento Snapshot**: Creative introduction section replacing oversized showreel presentation with an accessible video modal.
4. **IBM Plex Sans System**: Sole project font family supporting 300, 400, 500, 600, 700 weights for Arabic (`/ar`) and English (`/en`).
5. **Canonical Category Taxonomy**: 7 unified categories (`graphic-design`, `brand-identity`, `short-video-reels`, `video-production`, `social-content`, `social-management`, `integrated-marketing`).
6. **Pexels-Style Progressive Loading**: Custom intersection observer grid loader (`useProgressiveGrid`, `useIntersectionLoader`, `ProgressiveGridLoader`) appending batches smoothly on scroll.
7. **Pure Relation Logic**: Category-matched relation utilities for Services, Projects, and Blog Posts.
8. **Accessibility & Reduced Motion**: Full keyboard focus handling, focus traps in modals, ARIA live announcements, and `prefers-reduced-motion` fallbacks across all animations.
