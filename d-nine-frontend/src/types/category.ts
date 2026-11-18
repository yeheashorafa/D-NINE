import { LocalizedText } from './localized';

export interface ContentCategory {
  id: string;
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  icon?: string;
  targetLink?: string;
  portfolioGroup?: 'events' | 'identity-design' | 'media-production' | 'content-marketing';
  order: number;
  active: boolean;
}
