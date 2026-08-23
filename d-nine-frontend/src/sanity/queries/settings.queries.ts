import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    companyName,
    legalName,
    email,
    phone,
    locations,
    socialLinks,
    defaultSeo
  }
`;
