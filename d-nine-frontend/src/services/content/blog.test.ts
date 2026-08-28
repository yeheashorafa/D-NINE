import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllBlogPosts } from './blog.service';
import { BLOG_POSTS_DATA } from '@/features/blog/data/blog-posts.data';
import { sanityFetch } from '@/sanity/client';

vi.mock('@/sanity/client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

const mockEnv = { contentSource: 'sanity' };

vi.mock('@/sanity/env', () => ({
  get contentSource() { return mockEnv.contentSource; },
  assertSanityConfig: vi.fn(),
}));

describe('getAllBlogPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return static data when contentSource is static', async () => {
    mockEnv.contentSource = 'static';
    
    const posts = await getAllBlogPosts();
    
    expect(posts).toEqual(BLOG_POSTS_DATA);
    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it('should fetch from Sanity and map data when contentSource is sanity', async () => {
    mockEnv.contentSource = 'sanity';
    
    const mockSanityData = [
      {
        _id: '1',
        slug: 'test',
        categorySlug: 'test',
        title: { ar: 'Test', en: 'Test' },
        excerpt: { ar: 'Test', en: 'Test' },
        seo: { metaTitle: { ar: 'Test', en: 'Test' } },
        tags: { ar: ['Test'], en: ['Test'] }
      }
    ];
    
    mockSanityFetch.mockResolvedValueOnce(mockSanityData);
    
    const posts = await getAllBlogPosts();
    
    expect(sanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['blog'],
    });
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe('test');
  });

  it('should throw an error and not fallback to static data if sanityFetch fails in sanity mode', async () => {
    mockEnv.contentSource = 'sanity';
    
    mockSanityFetch.mockRejectedValueOnce(new Error('Sanity fetch failed'));
    
    await expect(getAllBlogPosts()).rejects.toThrow('Sanity fetch failed');
  });
});
