import { groq } from 'next-sanity';

export const sectorPageBySlugQuery = groq`
  *[_type == "sectorPage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    intro,
    "image": image.asset->url,
    "imageAlt": image.alt,
    services,
    packages[]{title, description},
    "relatedCategorySlugs": relatedCategories[]->slug.current,
    contactTitle,
    seo { metaTitle, metaDescription, keywords }
  }
`;
