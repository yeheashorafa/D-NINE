import { groq } from 'next-sanity';

export const categoriesQuery = groq`
  *[_type == "contentCategory" && active == true] | order(order asc, _createdAt desc, _id asc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    description,
    order,
    active
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "contentCategory" && slug.current == $slug && active == true][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    description,
    order,
    active
  }
`;
