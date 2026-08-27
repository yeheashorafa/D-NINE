import { describe, it, expect } from 'vitest';
import { mapSanityBlogPost } from './blog.mapper';
import { SanityBlogPostDoc } from '../types';

describe('mapSanityBlogPost', () => {
  it('should correctly map localized portable text (body) to ar/en outputs', () => {
    const mockDoc: SanityBlogPostDoc = {
      _id: 'test-id',
      slug: 'test-slug',
      categorySlug: 'test-category',
      title: { ar: 'عنوان', en: 'Title' },
      excerpt: { ar: 'مقتطف', en: 'Excerpt' },
      body: {
        ar: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'نص عربي' }] }],
        en: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'English text' }] }],
      },
      publishedAt: '2026-08-27T00:00:00Z',
    };

    const result = mapSanityBlogPost(mockDoc);

    expect(result.body.ar).toEqual([
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'نص عربي' }] },
    ]);
    expect(result.body.en).toEqual([
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'English text' }] },
    ]);
  });
});
