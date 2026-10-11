import { LocalizedText } from './localized';

export interface PartnerItem {
  id: string;
  name: LocalizedText;
  logo: string;
  logoAlt?: LocalizedText;
  url?: string;
  order?: number;
  active?: boolean;
}
