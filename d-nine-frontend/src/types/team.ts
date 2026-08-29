import type { SanityLocalizedString } from '../sanity/types';
import type { SanityLocalizedPortableText } from '../sanity/types';

export interface TeamMemberItem {
  id: string;
  name: SanityLocalizedString;
  role: SanityLocalizedString;
  bio?: SanityLocalizedPortableText;
  image?: string;
  socialLinks?: { platform: string; url: string }[];
  featured?: boolean;
}
