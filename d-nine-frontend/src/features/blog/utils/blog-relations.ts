import { BlogPost } from '@/types/blog';

export function getRelatedBlogPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  return allPosts
    .filter((post) => {
      if (post.id === currentPost.id || post.slug === currentPost.slug) {
        return false;
      }
      return post.categorySlug === currentPost.categorySlug;
    })
    .slice(0, limit);
}
