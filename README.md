# D-NINE Creative Agency & Media Production Platform

D-NINE is a bilingual digital platform for a creative agency specializing in brand identity, graphic design, video production, editing, Reels and Shorts, social media content, account management, and integrated marketing campaigns across the GCC region.

The project is organized as a monorepo containing three independently deployable applications:

* A public customer-facing website.
* A separate backend API.
* A Sanity Studio content management system.

This architecture keeps presentation, business operations, and content management clearly separated while allowing them to share consistent TypeScript contracts and domain models.

## Project Status

* **Frontend:** Completed and approved.
* **Backend API:** Planned for the next implementation phase.
* **Sanity Studio:** Planned for the next implementation phase.
* **Shared Contracts:** To be introduced during backend integration.
* **Production Content:** Final contact information, verified metrics, client media, and licensed assets must be provided before launch.

## Repository Structure

```text
d-nine/
├── d-nine-frontend/       # Next.js public website
├── d-nine-backend/        # Node.js and Express API
├── d-nine-studio/         # Sanity Studio CMS
├── packages/
│   └── contracts/         # Shared TypeScript and Zod contracts
├── package.json           # Monorepo workspace configuration
├── package-lock.json
├── .gitignore
└── README.md
```

Each application has its own source code, configuration, environment variables, build process, and deployment target.

The repository uses a single Git history and a single root `package-lock.json`.

## Platform Architecture

### Frontend

`d-nine-frontend` is the public-facing website responsible for:

* Rendering Arabic and English pages.
* Supporting RTL and LTR layouts.
* Supporting Light and Dark themes.
* Displaying services, projects, case studies, and blog content.
* Providing portfolio category filtering and progressive content loading.
* Playing project videos, Reels, Shorts, and showreel media.
* Collecting contact and consultation requests.
* Generating localized SEO metadata, canonical URLs, sitemap, and robots rules.
* Providing responsive, accessible, and motion-enhanced user experiences.

The frontend does not own business data and should not contain private credentials.

### Backend API

`d-nine-backend` is a separate Node.js, Express, and TypeScript application responsible for transactional and operational functionality.

Its planned responsibilities include:

* Contact form submissions.
* Book-a-call requests.
* Newsletter subscriptions.
* Server-side Zod validation.
* Database persistence.
* Email notifications.
* Spam and abuse protection.
* Rate limiting.
* CORS allowlisting.
* Security headers.
* Centralized error handling.
* Structured application logging.
* Health checks.
* Sanity webhook processing when required.

Planned initial endpoints:

```http
GET  /api/v1/health
POST /api/v1/contact
POST /api/v1/book-call
POST /api/v1/newsletter
```

The backend will not contain frontend components or presentation logic.

### Sanity Studio

`d-nine-studio` is the editorial content management application.

It will allow authorized D-NINE editors to manage:

* Content categories.
* Primary services.
* Service offerings.
* Projects and case studies.
* Project galleries.
* Images and video references.
* Blog posts.
* Authors.
* Frequently asked questions.
* Work methodology.
* Homepage featured content.
* Site settings.
* Contact information.
* Social media links.
* Localized SEO fields.
* Arabic and English content.

Sanity Studio replaces the current static demonstration data without requiring a redesign of the approved frontend.

Sanity’s built-in asset pipeline will manage images. Mux can be introduced later if managed video streaming, transcoding, thumbnails, and adaptive playback are required.

### Shared Contracts

`packages/contracts` contains framework-independent contracts shared between the frontend and backend.

It may include:

* API request and response types.
* Zod validation schemas.
* Contact form payloads.
* Category identifiers.
* Content slugs.
* Pagination contracts.
* Localized content types.
* Shared error response formats.

It must not contain React components, database queries, Express middleware, or Sanity-specific presentation logic.

## Technology Stack

### Frontend

* Next.js 16 App Router
* React 19
* TypeScript
* Tailwind CSS v4
* `next-intl`
* `next-themes`
* Motion
* GSAP and ScrollTrigger
* Swiper
* React Hook Form
* Zod
* Lucide React
* IBM Plex Sans
* RTL and LTR support
* Light and Dark themes

### Backend

* Node.js
* Express
* TypeScript
* Zod
* REST API
* Structured logging
* Rate limiting and security middleware
* Database integration to be configured
* Email provider integration to be configured

### Content Management

* Sanity Studio
* Sanity Content Lake
* GROQ
* Sanity image asset pipeline
* Optional Mux integration for production video

## Content Domains

The platform uses seven canonical categories shared across services, projects, and blog content:

1. `graphic-design`
2. `brand-identity`
3. `short-video-reels`
4. `video-production`
5. `social-content`
6. `social-management`
7. `integrated-marketing`

Category slugs are locale-independent. Arabic and English content is stored in localized fields while routes continue using the same stable slugs.

This allows:

* Projects to appear under their related services.
* Blog posts to be associated with relevant categories.
* Service detail pages to display category-matched work.
* Content filtering to remain consistent across the platform.
* Backend and CMS relationships to remain predictable.

## Workspace Commands

Install all workspace dependencies from the repository root:

```bash
npm install
```

Run each application independently:

```bash
npm run dev:frontend
npm run dev:backend
npm run dev:studio
```

Build each application:

```bash
npm run build:frontend
npm run build:backend
npm run build:studio
```

Run project verification:

```bash
npm run typecheck
npm run lint
npm run build
```

The final root scripts will be added as each workspace becomes available.

## Environment Variables

Each application maintains its own environment template:

```text
d-nine-frontend/.env.example
d-nine-backend/.env.example
d-nine-studio/.env.example
```

Actual environment files must never be committed:

```text
d-nine-frontend/.env.local
d-nine-backend/.env
d-nine-studio/.env
```

Public frontend variables must use the `NEXT_PUBLIC_` prefix only when they are intentionally safe to expose in the browser.

Backend tokens, database credentials, email credentials, Sanity write tokens, and webhook secrets must remain server-only.

## Development Principles

* Keep route files thin.
* Keep feature-specific logic inside its feature.
* Keep reusable UI components independent from business domains.
* Keep API logic inside backend services and controllers.
* Keep editable public content inside Sanity.
* Keep transactional data inside the backend database.
* Keep shared contracts framework-independent.
* Validate external input on both client and server.
* Do not expose private tokens in frontend code.
* Do not simulate successful production submissions.
* Mark incomplete integrations clearly.
* Preserve stable category and route slugs.
* Maintain matching Arabic and English content structures.
* Respect reduced-motion and accessibility preferences.
* Preserve the approved frontend design during backend integration.

## Deployment Model

Although the applications exist in one Git repository, they are deployed independently:

* `d-nine-frontend` → Next.js hosting.
* `d-nine-backend` → Node.js server hosting.
* `d-nine-studio` → Sanity Studio hosting.
* Database → Managed database service.
* Images → Sanity asset pipeline.
* Videos → Sanity files or Mux when required.

A change inside one workspace does not require redeploying every application unless shared contracts or cross-application behavior have changed.

## Backend Integration Strategy

The approved frontend should be integrated incrementally:

1. Freeze and tag the approved frontend version.
2. Create the Sanity project and schemas.
3. Migrate static content into Sanity.
4. Replace static content services with Sanity-backed queries.
5. Preserve existing frontend types, slugs, routes, and visual components.
6. Create the Express API.
7. Connect contact, book-a-call, and newsletter forms.
8. Add database and email integrations.
9. Add draft preview and content revalidation.
10. Complete staging and production verification.

## Production Readiness Requirements

Before production launch, verify:

* Official company phone number.
* Official company email.
* Official office locations.
* Social media URLs.
* Licensed slider artwork.
* Real project images and videos.
* Verified client names and logos.
* Verified metrics and statistics.
* Privacy and legal content.
* Form delivery and database storage.
* Spam protection.
* Sanity editor permissions.
* Environment variables.
* Domain and SSL configuration.
* Arabic and English content.
* Light and Dark theme behavior.
* Mobile, tablet, and desktop responsiveness.
* SEO metadata and social sharing images.

## License and Content

Application source code is proprietary to D-NINE unless stated otherwise.

Third-party fonts, stock media, icons, videos, and libraries retain their respective licenses. All production media must be reviewed and approved before public launch.
