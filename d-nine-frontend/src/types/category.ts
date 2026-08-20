import { LocalizedText } from './localized';

export interface ContentCategory {
  id: string;
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  order: number;
  active: boolean;
}
