import { groq } from 'next-sanity';

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt desc, _id asc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    iconName,
    "image": coalesce(image.asset->url, "/media/services/" + slug.current + ".jpg"),
    title,
    shortDescription,
    fullDescription,
    benefits,
    deliverables,
    processSteps,
    faqs,
    featured
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    iconName,
    "image": coalesce(image.asset->url, "/media/services/" + slug.current + ".jpg"),
    title,
    shortDescription,
    fullDescription,
    benefits,
    deliverables,
    processSteps,
    faqs,
    featured,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)][].slug.current
`;

export const serviceOfferingsQuery = groq`
  *[_type == "serviceOffering" && ($categorySlug == "all" || !defined($categorySlug) || category->slug.current == $categorySlug || parentService->slug.current == $categorySlug)]
  | order(order asc, _createdAt desc, _id asc) [$offset...$end] {
    _id,
    "id": _id,
    "slug": slug.current,
    "parentServiceSlug": parentService->slug.current,
    "categorySlug": category->slug.current,
    title,
    description,
    "image": coalesce(image.asset->url, "/media/services/" + parentService->slug.current + ".jpg"),
    featured
  }
`;

export const countServiceOfferingsQuery = groq`
  count(*[_type == "serviceOffering" && ($categorySlug == "all" || !defined($categorySlug) || category->slug.current == $categorySlug || parentService->slug.current == $categorySlug)])
`;

export const allServiceOfferingsQuery = groq`
  *[_type == "serviceOffering"] | order(order asc, _createdAt desc, _id asc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "parentServiceSlug": parentService->slug.current,
    "categorySlug": category->slug.current,
    title,
    description,
    "image": coalesce(image.asset->url, "/media/services/" + parentService->slug.current + ".jpg"),
    featured
  }
`;
