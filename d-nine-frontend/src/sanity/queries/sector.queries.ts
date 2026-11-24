import { groq } from 'next-sanity';

const sectorFields = groq`
  _id,
  "id": _id,
  "slug": slug.current,
  title,
  introduction,
  "image": image.asset->url,
  serviceGroups[]{
    title,
    items[]{slug, title, description, iconName}
  },
  packages[]{title, description},
  "relatedCategorySlugs": relatedCategories[]->slug.current,
  active,
  order,
  seo
`;

export const sectorsQuery = groq`*[_type == "sectorPage" && active != false] | order(order asc, _createdAt asc) { ${sectorFields} }`;
export const sectorBySlugQuery = groq`*[_type == "sectorPage" && slug.current == $slug && active != false][0] { ${sectorFields} }`;
