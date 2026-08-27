import { LocalizedText } from './localized';
import { ProjectMedia } from './media';

export interface ProjectMetric {
  label: LocalizedText;
  value: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  primaryCategorySlug: string;
  categorySlugs: string[];
  serviceSlug?: string;
  image: string;
  coverImage?: string;
  coverAlt?: LocalizedText;
  thumbnail?: string;
  poster?: string;
  category: LocalizedText;
  title: LocalizedText;
  clientName: LocalizedText;
  year: string;
  summary: LocalizedText;
  challenge: LocalizedText;
  strategy: LocalizedText;
  solution: LocalizedText;
  deliverables: {
    ar: string[];
    en: string[];
  };
  metrics: ProjectMetric[];
  media?: ProjectMedia[];
  credits?: LocalizedText;
  featured: boolean;
  colorVariant: string;
  seo?: any;
}
