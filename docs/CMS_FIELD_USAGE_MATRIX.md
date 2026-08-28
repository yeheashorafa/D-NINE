# CMS Field Usage Matrix

| Schema / Field | Status | Frontend Consumer | Notes |
|---|---|---|---|
| **aboutPage** | | | |
| heroBadge, heroTitle, heroSubtitle | Active | \`src/features/about/about-page.tsx\` | Hero section |
| agencyStory, mission, vision | Active | \`src/features/about/about-page.tsx\` | Core text blocks |
| values | Active | \`src/features/about/components/values-section.tsx\` | Mapped to values grid |
| seo | Active | \`src/app/[locale]/about/page.tsx\` | Mapped via \`constructMetadata\` |
| **author** | | | |
| name, role, image, bio, active | Active | \`src/features/blog/blog-detail-page.tsx\` | Displayed on blog detail |
| **blogPage** | | | |
| heroBadge, heroTitle, heroSubtitle | Active | \`src/features/blog/blog-page.tsx\` | Hero section |
| searchPlaceholder | Active | \`src/features/blog/components/blog-search.tsx\` | Search input |
| seo | Active | \`src/app/[locale]/blog/page.tsx\` | Mapped via \`constructMetadata\` |
| **blogPost** | | | |
| title, excerpt, body | Active | \`src/features/blog/blog-detail-page.tsx\` | Core content |
| category | Active | \`src/features/blog/blog-detail-page.tsx\` | Category label |
| author | Active | \`src/features/blog/blog-detail-page.tsx\` | Author section |
| relatedServices | Active | \`src/features/blog/blog-detail-page.tsx\` | Related services list |
| coverImage | Active | \`src/features/blog/blog-detail-page.tsx\` | Hero image |
| publishedAt, readTimeMinutes | Active | \`src/features/blog/blog-detail-page.tsx\` | Metadata |
| featured, tags | Active | \`src/features/blog/blog-page.tsx\` | Filtering/badges |
| seo | Active | \`src/app/[locale]/blog/[slug]/page.tsx\` | Mapped via \`constructMetadata\` |
| **contactPage** | | | |
| heroBadge, heroTitle, heroSubtitle | Active | \`src/features/contact/contact-page.tsx\` | Hero section |
| description | Active | \`src/features/contact/contact-page.tsx\` | Introduction text |
| contactMethods | Active | \`src/features/contact/components/contact-methods.tsx\`| Contact list |
| offices | Active | \`src/features/contact/components/offices-section.tsx\`| Office locations |
| seo | Active | \`src/app/[locale]/contact/page.tsx\` | Mapped via \`constructMetadata\` |
| **contentCategory** | | | |
| title, slug | Active | Multiple | Used for filtering Projects/Blog |
| **homePage** | | | |
| heroSlides | Active | `src/features/home/components/hero.tsx` | Hero carousel |
| creativeSnapshot | Active | `src/features/home/components/creative-snapshot.tsx`| Intro text/video |
| featuredProjects | Active | `src/features/home/components/work-section.tsx` | Featured portfolio |
| featuredServices | Active | `src/features/home/components/services-section.tsx` | Service highlights |
| processTimeline | Active | `src/features/home/components/process-section.tsx` | Step-by-step process |
| testimonials | Pending UI | `src/features/home/components/testimonials-section.tsx`| Query mapped, waiting for component |
| faqs | Pending UI | `src/features/home/components/faq-section.tsx` | Query mapped, waiting for component |
| latestNews | Pending UI | `src/features/home/components/blog-section.tsx` | Query mapped, waiting for component |
| bookACall | Active | `src/features/home/components/book-a-call-section.tsx`| CTA section |
| seo | Active | `src/app/[locale]/page.tsx` | Mapped via `constructMetadata` |
| **project** | | | |
| deliverables | Active | \`src/features/work/work-detail-page.tsx\` | List |
| clientName, credits | Active | \`src/features/work/work-detail-page.tsx\` | Subheader / Footer |
| metrics | Active | \`src/features/work/work-detail-page.tsx\` | Metric grid |
| coverImage, image, media | Active | \`src/features/work/work-detail-page.tsx\` | Media gallery |
| seo | Active | \`src/app/[locale]/work/[slug]/page.tsx\` | Mapped via \`constructMetadata\` |
| **service** | | | |
| title, shortDescription, content | Active | \`src/features/services/service-detail-page.tsx\`| Detail page |
| icon, badge | Active | \`src/features/services/service-detail-page.tsx\`| Header |
| seo | Active | \`src/app/[locale]/services/[slug]/page.tsx\`| Mapped via \`constructMetadata\` |
| **serviceOffering** | | | |
| title, description, parentService | Active | \`src/features/services/service-detail-page.tsx\`| Rendered in service lists |
| **servicesPage** | | | |
| heroBadge, heroTitle, heroSubtitle | Active | \`src/features/services/services-page.tsx\` | Hero section |
| filterLabels | Active | \`src/features/services/services-page.tsx\` | UI Translations |
| seo | Active | \`src/app/[locale]/services/page.tsx\` | Mapped via \`constructMetadata\` |
| **workPage** | | | |
| heroBadge, heroTitle, heroSubtitle | Active | \`src/features/work/work-page.tsx\` | Hero section |
| allCategoriesLabel | Active | \`src/features/work/work-page.tsx\` | Filter UI |
| seo | Active | \`src/app/[locale]/work/page.tsx\` | Mapped via \`constructMetadata\` |
| **privacyPage / termsPage** | | | |
| title, body | Active | \`src/features/legal/legal-page.tsx\` | Document view |
| lastUpdated | Active | \`src/features/legal/legal-page.tsx\` | Date |
| seo | Active | \`src/app/[locale]/(legal)/.../page.tsx\` | Mapped via \`constructMetadata\` |
| **siteSettings** | | | |
| companyName, email, defaultSeo | Active | Layouts / Global | Used globally |
