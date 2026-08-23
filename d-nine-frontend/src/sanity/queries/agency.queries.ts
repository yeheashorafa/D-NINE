import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    heroHeadline,
    heroSubtitle,
    "featuredProjects": featuredProjects[]-> {
      _id,
      "id": _id,
      "slug": slug.current,
      "primaryCategorySlug": primaryCategory->slug.current,
      "image": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
      "category": primaryCategory->title,
      title,
      clientName,
      year,
      summary,
      colorVariant
    },
    "featuredServices": featuredServices[]-> {
      _id,
      "id": _id,
      "slug": slug.current,
      "categorySlug": category->slug.current,
      iconName,
      "image": coalesce(image.asset->url, "/media/services/" + slug.current + ".jpg"),
      title,
      shortDescription
    },
    "featuredPosts": featuredPosts[]-> {
      _id,
      "id": _id,
      "slug": slug.current,
      "categorySlug": category->slug.current,
      "image": coalesce(coverImage.asset->url, "/media/blog/" + slug.current + ".jpg"),
      "category": category->title,
      title,
      excerpt,
      publishedAt
    },
    processTimeline
  }
`;

export const processTimelineQuery = groq`
  *[_type == "homePage"][0].processTimeline[] {
    "step": stepNumber,
    title,
    description
  }
`;
