import { LocalizedText } from './localized';

export interface ContentCategory {
  id: string;
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  icon?: string;
  targetLink?: string;
  order: number;
  active: boolean;
}
