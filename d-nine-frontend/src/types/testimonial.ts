import type { SanityLocalizedString } from '../sanity/types';

export interface TestimonialItem {
  id: string;
  personName: SanityLocalizedString;
  role: SanityLocalizedString;
  company: SanityLocalizedString;
  quote: SanityLocalizedString;
  image?: string;
  imageAlt?: SanityLocalizedString;
  rating?: number;
  featured?: boolean;
}
