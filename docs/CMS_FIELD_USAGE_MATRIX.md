# CMS Field Usage Matrix

This document tracks which CMS schema fields are actively consumed by the frontend and which ones are currently not in use.

## Legend
- ✅ Used
- ❌ Not Used
- ⚠️ Partially Used / To Be Implemented

## Documents

### `homePage` (Singleton)
- `seo` ✅ Used in `generateMetadata`
- `hero` ✅ Used in `HomeHero`
- `creativeSnapshot` ✅ Used in `CreativeSnapshot`
- `featuredProjects` ✅ Used in `FeaturedWork`
- `featuredServices` ✅ Used in `FeaturedServices`
- `featuredPosts` ✅ Used in `FeaturedBlog`

### `aboutPage` (Singleton)
- `seo` ✅ Used in `generateMetadata`
- `hero` ✅ Used in `AboutHero`
- `story` ✅ Used in `OurStory`
- `mission` ✅ Used in `MissionVision`
- `vision` ✅ Used in `MissionVision`
- `values` ✅ Used in `OurValues`

### `servicesPage` (Singleton)
- `seo` ✅ Used in `generateMetadata`
- `hero` ✅ Used in `ServicesPage`

### `workPage` (Singleton)
- `seo` ✅ Used in `generateMetadata`
- `hero` ✅ Used in `WorkPage`

### `blogPage` (Singleton)
- `seo` ✅ Used in `generateMetadata`
- `hero` ✅ Used in `BlogPage`

### `contactPage` (Singleton)
- `seo` ✅ Used in `generateMetadata`
- `hero` ✅ Used in `ContactPage`
- `contactInfo` ✅ Used in `ContactPage`

### `privacyPage` / `termsPage` (Singleton)
- `title` ✅ Used in Page
- `lastUpdated` ✅ Used in Page
- `body` ✅ Used in Page

### `project` (Document)
- `title` ✅ Used in `WorkDetailPage`
- `slug` ✅ Used in Routing
- `category` ✅ Used in `WorkDetailPage`
- `image` ✅ Used in Cards / Gallery
- `coverImage` ✅ Used in `WorkDetailPage`
- `summary` ✅ Used in `WorkDetailPage`
- `challenge` ✅ Used in `WorkDetailPage`
- `strategy` ✅ Used in `WorkDetailPage`
- `solution` ✅ Used in `WorkDetailPage`
- `deliverables` ✅ Used in `WorkDetailPage`
- `metrics` ✅ Used in `WorkDetailPage`
- `media` ✅ Used in `ProjectGallery`
- `featured` ✅ Used in Featured lists
- `colorVariant` ✅ Used for styling

### `service` (Document)
- `title` ✅ Used in `ServiceDetailPage`
- `slug` ✅ Used in Routing
- `shortDescription` ✅ Used in Cards
- `icon` ✅ Used in Cards
- `image` ✅ Used in `ServiceDetailPage`
- `content` ✅ Used in `ServiceDetailPage`
- `features` ✅ Used in `ServiceDetailPage`
- `benefits` ✅ Used in `ServiceDetailPage`
- `offerings` ✅ Used in `ServiceDetailPage`
- `featured` ✅ Used in Featured lists
- `colorVariant` ✅ Used for styling

### `blogPost` (Document)
- `title` ✅ Used in `BlogDetailPage`
- `slug` ✅ Used in Routing
- `excerpt` ✅ Used in Cards
- `category` ✅ Used in `BlogDetailPage`
- `author` (Name, Role, Image) ✅ Used in `BlogDetailPage`
- `publishedAt` ✅ Used in `BlogDetailPage`
- `readTimeMinutes` ✅ Used in `BlogDetailPage`
- `coverImage` ✅ Used in `BlogDetailPage`
- `body` ✅ Used in `BlogDetailPage` (PortableText)
- `tags` ✅ Used in `BlogDetailPage`
- `featured` ✅ Used in Featured lists
- `colorVariant` ✅ Used for styling

### `author` (Document)
- `name` ✅ Used in `blogPost`
- `role` ✅ Used in `blogPost`
- `image` ✅ Used in `blogPost`
- `bio` ❌ Not Used
- `active` ❌ Not Used

### `siteSettings` (Singleton)
- `companyName` ✅ Used in `Layout`
- `logo` ❌ Not Used (Frontend uses local SVGs)
- `defaultSiteUrl` ✅ Used in SEO
- `seo` ✅ Used in `Layout` fallback
- `navigation` ✅ Used in Header
- `footer` ✅ Used in Footer
- `social` ✅ Used in Footer
