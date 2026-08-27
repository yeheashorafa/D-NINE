import { LocalizedText } from './localized';

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
  };
  body: {
    ar: any[];
    en: any[];
  };
  featured: boolean;
  tags: {
    ar: string[];
    en: string[];
  };
}
