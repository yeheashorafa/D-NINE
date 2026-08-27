import { groq } from 'next-sanity';

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc, _id asc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "primaryCategorySlug": primaryCategory->slug.current,
    "categorySlugs": [primaryCategory->slug.current] + coalesce(categories[]->slug.current, []),
    "serviceSlug": primaryCategory->slug.current,
    "image": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "coverImage": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "thumbnail": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "category": primaryCategory->title,
    title,
    clientName,
    year,
    summary,
    challenge,
    strategy,
    solution,
    deliverables,
    metrics,
    "media": media[] {
      _key,
      type,
      "src": select(
        type == "image" => coalesce(imageAsset.asset->url, "/media/work/" + ^.slug.current + ".jpg"),
        type == "video" => coalesce(videoUrl, "/media/video/showreel.mp4")
      ),
      "poster": coalesce(poster.asset->url, "/media/video/showreel-poster.jpg"),
      alt,
      caption,
      aspectRatio
    },
    credits,
    featured,
    colorVariant
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    "primaryCategorySlug": primaryCategory->slug.current,
    "categorySlugs": [primaryCategory->slug.current] + coalesce(categories[]->slug.current, []),
    "serviceSlug": primaryCategory->slug.current,
    "image": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "coverImage": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "thumbnail": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "category": primaryCategory->title,
    title,
    clientName,
    year,
    summary,
    challenge,
    strategy,
    solution,
    deliverables,
    metrics,
    "media": media[] {
      _key,
      type,
      "src": select(
        type == "image" => coalesce(imageAsset.asset->url, "/media/work/" + ^.slug.current + ".jpg"),
        type == "video" => coalesce(videoUrl, "/media/video/showreel.mp4")
      ),
      "poster": coalesce(poster.asset->url, "/media/video/showreel-poster.jpg"),
      alt,
      caption,
      aspectRatio
    },
    credits,
    featured,
    colorVariant,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, _createdAt desc, _id asc) [0...6] {
    _id,
    "id": _id,
    "slug": slug.current,
    "primaryCategorySlug": primaryCategory->slug.current,
    "categorySlugs": [primaryCategory->slug.current] + coalesce(categories[]->slug.current, []),
    "serviceSlug": primaryCategory->slug.current,
    "image": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "coverImage": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "thumbnail": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "category": primaryCategory->title,
    title,
    clientName,
    year,
    summary,
    challenge,
    strategy,
    solution,
    deliverables,
    metrics,
    featured,
    colorVariant
  }
`;

export const paginatedProjectsQuery = groq`
  *[_type == "project" && ($categorySlug == "all" || !defined($categorySlug) || primaryCategory->slug.current == $categorySlug || $categorySlug in categories[]->slug.current)]
  | order(order asc, _createdAt desc, _id asc) [$offset...$end] {
    _id,
    "id": _id,
    "slug": slug.current,
    "primaryCategorySlug": primaryCategory->slug.current,
    "categorySlugs": [primaryCategory->slug.current] + coalesce(categories[]->slug.current, []),
    "serviceSlug": primaryCategory->slug.current,
    "image": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "coverImage": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "thumbnail": coalesce(coverImage.asset->url, "/media/work/" + slug.current + ".jpg"),
    "category": primaryCategory->title,
    title,
    clientName,
    year,
    summary,
    challenge,
    strategy,
    solution,
    deliverables,
    metrics,
    "media": media[] {
      _key,
      type,
      "src": select(
        type == "image" => coalesce(imageAsset.asset->url, "/media/work/" + ^.slug.current + ".jpg"),
        type == "video" => coalesce(videoUrl, "/media/video/showreel.mp4")
      ),
      "poster": coalesce(poster.asset->url, "/media/video/showreel-poster.jpg"),
      alt,
      caption,
      aspectRatio
    },
    credits,
    featured,
    colorVariant
  }
`;

export const countProjectsQuery = groq`
  count(*[_type == "project" && ($categorySlug == "all" || !defined($categorySlug) || primaryCategory->slug.current == $categorySlug || $categorySlug in categories[]->slug.current)])
`;
