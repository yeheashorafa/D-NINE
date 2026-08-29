import type { SanityLocalizedString } from '../sanity/types';

export interface TestimonialItem {
  id: string;
  personName: SanityLocalizedString;
  role: SanityLocalizedString;
  company: SanityLocalizedString;
  quote: SanityLocalizedString;
  image?: string;
  rating?: number;
  featured?: boolean;
}
