import { BlogPost } from '@/types/blog';
import { BLOG_POSTS_DATA } from '@/features/blog/data/blog-posts.data';
import { ContentPage, ContentQueryParams } from './content-page.types';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import {
  allBlogPostsQuery,
  blogPostBySlugQuery,
  allBlogSlugsQuery,
  featuredBlogPostsQuery,
  paginatedBlogPostsQuery,
  countBlogPostsQuery,
} from '@/sanity/queries/blog.queries';
import { mapSanityBlogPost } from '@/sanity/mappers/blog.mapper';
import { SanityBlogPostDoc } from '@/sanity/types';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityBlogPostDoc[]>({
      query: allBlogPostsQuery,
      tags: ['blog'],
    });
    return (data || []).map(mapSanityBlogPost);
  }

  return BLOG_POSTS_DATA;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<string[]>({
      query: allBlogSlugsQuery,
      tags: ['blog'],
      stega: false,
    });
    return data || [];
  }

  return BLOG_POSTS_DATA.map((p) => p.slug);
}

export async function getBlogPosts(
  params: ContentQueryParams = {}
): Promise<ContentPage<BlogPost>> {
  const { categorySlug, searchQuery, limit = 6, cursor } = params;

  if (contentSource === 'sanity') {
    assertSanityConfig();
    const offset = cursor ? parseInt(cursor, 10) : 0;
    const end = offset + limit;

    const [itemsData, total] = await Promise.all([
      sanityFetch<SanityBlogPostDoc[]>({
        query: paginatedBlogPostsQuery,
        params: {
          categorySlug: categorySlug || 'all',
          offset,
          end,
        },
        tags: ['blog'],
      }),
      sanityFetch<number>({
        query: countBlogPostsQuery,
        params: {
          categorySlug: categorySlug || 'all',
        },
        tags: ['blog'],
      }),
    ]);

    let items = (itemsData || []).map(mapSanityBlogPost);

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((post) => {
        const matchTitle =
          post.title.ar.toLowerCase().includes(q) || post.title.en.toLowerCase().includes(q);
        const matchExcerpt =
          post.excerpt.ar.toLowerCase().includes(q) || post.excerpt.en.toLowerCase().includes(q);
        return matchTitle || matchExcerpt;
      });
    }

    const hasMore = offset + limit < total;

    return {
      items,
      nextCursor: hasMore ? (offset + limit).toString() : null,
      hasMore,
      total,
    };
  }

  let items = BLOG_POSTS_DATA;

  if (categorySlug && categorySlug !== 'all') {
    items = items.filter((post) => post.categorySlug === categorySlug);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter((post) => {
      const matchTitle =
        post.title.ar.toLowerCase().includes(q) || post.title.en.toLowerCase().includes(q);
      const matchExcerpt =
        post.excerpt.ar.toLowerCase().includes(q) || post.excerpt.en.toLowerCase().includes(q);
      const matchTag =
        post.tags.ar.some((t) => t.toLowerCase().includes(q)) ||
        post.tags.en.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchExcerpt || matchTag;
    });
  }

  const offset = cursor ? parseInt(cursor, 10) : 0;
  const sliced = items.slice(offset, offset + limit);
  const nextOffset = offset + limit;
  const hasMore = nextOffset < items.length;

  return {
    items: sliced,
    nextCursor: hasMore ? nextOffset.toString() : null,
    hasMore,
    total: items.length,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityBlogPostDoc | null>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ['blog', `blog:${slug}`],
    });
    return data ? mapSanityBlogPost(data) : null;
  }

  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  return post || null;
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityBlogPostDoc[]>({
      query: featuredBlogPostsQuery,
      tags: ['blog'],
    });
    return (data || []).map(mapSanityBlogPost);
  }

  return BLOG_POSTS_DATA.filter((p) => p.featured);
}
