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
  };
  sections?: SanityBlogSection[];
  body?: {
    ar?: any[];
    en?: any[];
  };
  featured?: boolean;
  tags?: { ar?: string[]; en?: string[] };
}

export interface SanityTimelineItemDoc {
  step?: string;
  stepNumber?: string;
  title: SanityLocalizedString;
  description: SanityLocalizedString;
}
