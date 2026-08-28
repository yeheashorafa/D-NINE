/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SanityLocalizedString {
  ar?: string;
  en?: string;
}

export interface SanityCategoryDoc {
  _id: string;
  id?: string;
  slug: string;
  title: SanityLocalizedString;
  description?: SanityLocalizedString;
  order?: number;
  active?: boolean;
}

export interface SanityServiceDeliverable {
  title: SanityLocalizedString;
  description: SanityLocalizedString;
}

export interface SanityServiceProcessStep {
  stepNumber: string;
  title: SanityLocalizedString;
  description: SanityLocalizedString;
}

export interface SanityServiceFaq {
  question: SanityLocalizedString;
  answer: SanityLocalizedString;
}

export interface SanityServiceDoc {
  _id: string;
  id?: string;
  slug: string;
  categorySlug: string;
  iconName?: string;
  image?: string;
  title: SanityLocalizedString;
  shortDescription: SanityLocalizedString;
  fullDescription: SanityLocalizedString;
  benefits?: { ar?: string[]; en?: string[] };
  deliverables?: SanityServiceDeliverable[];
  processSteps?: SanityServiceProcessStep[];
  faqs?: SanityServiceFaq[];
  featured?: boolean;
  seo?: SanitySeo;
}

export interface SanityServiceOfferingDoc {
  _id: string;
  id?: string;
  slug: string;
  parentServiceSlug: string;
  categorySlug: string;
  title: SanityLocalizedString;
  description: SanityLocalizedString;
  image?: string;
  featured?: boolean;
}

export interface SanityProjectMetric {
  label: SanityLocalizedString;
  value: string;
}

export interface SanityProjectMedia {
  type: 'image' | 'video';
  src?: string;
  poster?: string;
  alt?: SanityLocalizedString;
  caption?: SanityLocalizedString;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3';
}

export interface SanityProjectDoc {
  _id: string;
  id?: string;
  slug: string;
  primaryCategorySlug: string;
  categorySlugs?: string[];
  serviceSlug?: string;
  image?: string;
  coverImage?: string;
  thumbnail?: string;
  category?: SanityLocalizedString;
  title: SanityLocalizedString;
  clientName: SanityLocalizedString;
  year?: string;
  summary: SanityLocalizedString;
  challenge?: SanityLocalizedString;
  strategy?: SanityLocalizedString;
  solution?: SanityLocalizedString;
  deliverables?: { ar?: string[]; en?: string[] };
  metrics?: SanityProjectMetric[];
  media?: SanityProjectMedia[];
  credits?: SanityLocalizedString;
  featured?: boolean;
  colorVariant?: string;
  seo?: SanitySeo;
}

export interface SanityBlogSection {
  heading: SanityLocalizedString;
  body: SanityLocalizedString;
}

export interface SanityBlogPostDoc {
  _id: string;
  id?: string;
  slug: string;
  categorySlug: string;
  relatedServiceSlugs?: string[];
  image?: string;
  category?: SanityLocalizedString;
  title: SanityLocalizedString;
  excerpt: SanityLocalizedString;
  publishedAt?: string;
  readTimeMinutes?: number;
  author?: {
    name?: SanityLocalizedString;
    role?: SanityLocalizedString;
    image?: string;
    bio?: SanityLocalizedString;
    active?: boolean;
  };
  sections?: SanityBlogSection[];
  body?: {
    ar?: any[];
    en?: any[];
  };
  featured?: boolean;
  tags?: { ar?: string[]; en?: string[] };
  seo?: SanitySeo;
}

export interface SanityTimelineItemDoc {
  step?: string;
  stepNumber?: string;
  title: SanityLocalizedString;
  description: SanityLocalizedString;
}


export interface SanitySeo {
  metaTitle?: SanityLocalizedString;
  metaDescription?: SanityLocalizedString;
  keywords?: SanityLocalizedString;
}

export interface SanityHomePageDoc {
  _id: string;
  id?: string;
  heroSlides?: any[];
  creativeSnapshot?: any;
  featuredProjects?: any[];
  featuredServices?: any[];
  processTimeline?: any[];
  testimonials?: any[];
  faqs?: any[];
  bookACall?: any;
  latestNews?: any[];
  seo?: SanitySeo;
}

export interface SanityAboutPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  agencyStory?: any;
  mission?: any;
  vision?: any;
  values?: any[];
  media?: string[];
  cta?: any;
  seo?: SanitySeo;
}

export interface SanityServicesPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  filterLabels?: {
    all?: SanityLocalizedString;
    primary?: SanityLocalizedString;
    offerings?: SanityLocalizedString;
  };
  seo?: SanitySeo;
}

export interface SanityWorkPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  allCategoriesLabel?: SanityLocalizedString;
  seo?: SanitySeo;
}

export interface SanityBlogPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  searchPlaceholder?: SanityLocalizedString;
  featuredPosts?: any[];
  seo?: SanitySeo;
}

export interface SanityContactPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  description?: any;
  contactMethods?: any[];
  offices?: any[];
  seo?: SanitySeo;
}

export interface SanityPrivacyPageDoc {
  _id: string;
  id?: string;
  title?: SanityLocalizedString;
  lastUpdated?: string;
  body?: any;
  seo?: SanitySeo;
}

export interface SanityTermsPageDoc {
  _id: string;
  id?: string;
  title?: SanityLocalizedString;
  lastUpdated?: string;
  body?: any;
  seo?: SanitySeo;
}

export interface SanitySiteSettingsDoc {
  _id: string;
  id?: string;
  companyName?: SanityLocalizedString;
  email?: string;
  defaultSeo?: SanitySeo;
  defaultOgImage?: string;
}
