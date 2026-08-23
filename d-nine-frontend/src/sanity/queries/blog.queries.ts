import { groq } from 'next-sanity';

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc, _createdAt desc, _id asc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "relatedServiceSlugs": coalesce(relatedServices[]->slug.current, []),
    "image": coalesce(coverImage.asset->url, "/media/blog/" + slug.current + ".jpg"),
    "category": category->title,
    title,
    excerpt,
    publishedAt,
    readTimeMinutes,
    "author": {
      "name": author->name,
      "role": author->role
    },
    body,
    featured,
    tags
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "relatedServiceSlugs": coalesce(relatedServices[]->slug.current, []),
    "image": coalesce(coverImage.asset->url, "/media/blog/" + slug.current + ".jpg"),
    "category": category->title,
    title,
    excerpt,
    publishedAt,
    readTimeMinutes,
    "author": {
      "name": author->name,
      "role": author->role
    },
    body,
    featured,
    tags
  }
`;

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...4] {
    _id,
    "id": _id,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "relatedServiceSlugs": coalesce(relatedServices[]->slug.current, []),
    "image": coalesce(coverImage.asset->url, "/media/blog/" + slug.current + ".jpg"),
    "category": category->title,
    title,
    excerpt,
    publishedAt,
    readTimeMinutes,
    "author": {
      "name": author->name,
      "role": author->role
    },
    featured,
    tags
  }
`;

export const paginatedBlogPostsQuery = groq`
  *[_type == "blogPost" && ($categorySlug == "all" || !defined($categorySlug) || category->slug.current == $categorySlug)]
  | order(publishedAt desc, _createdAt desc, _id asc) [$offset...$end] {
    _id,
    "id": _id,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "relatedServiceSlugs": coalesce(relatedServices[]->slug.current, []),
    "image": coalesce(coverImage.asset->url, "/media/blog/" + slug.current + ".jpg"),
    "category": category->title,
    title,
    excerpt,
    publishedAt,
    readTimeMinutes,
    "author": {
      "name": author->name,
      "role": author->role
    },
    featured,
    tags
  }
`;

export const countBlogPostsQuery = groq`
  count(*[_type == "blogPost" && ($categorySlug == "all" || !defined($categorySlug) || category->slug.current == $categorySlug)])
`;
