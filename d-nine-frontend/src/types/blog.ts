import { LocalizedText, SeoMetadata } from './localized';
import type { PortableTextBlock } from '@portabletext/types';

export interface BlogContentSection {
  heading: LocalizedText;
  body: LocalizedText;
}

export interface BlogPost {
  id: string;
  slug: string;
  categorySlug: string;
  relatedServiceSlugs: string[];
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  publishedAt: string;
  readTimeMinutes: number;
  author: {
    name: LocalizedText;
    role: LocalizedText;
    image?: string;
    bio?: LocalizedText;
    active?: boolean;
  };
  body: {
    ar: PortableTextBlock[];
    en: PortableTextBlock[];
  };
  featured: boolean;
  tags: {
    ar: string[];
    en: string[];
  };
  seo?: SeoMetadata;
}
