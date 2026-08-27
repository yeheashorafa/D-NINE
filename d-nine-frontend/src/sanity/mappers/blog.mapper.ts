import { BlogPost } from '@/types/blog';
import { SanityBlogPostDoc } from '../types';

export function mapSanityBlogPost(doc: SanityBlogPostDoc): BlogPost {
  return {
    id: doc._id || doc.id || `post-${doc.slug}`,
    slug: doc.slug,
    categorySlug: doc.categorySlug,
    relatedServiceSlugs: doc.relatedServiceSlugs || [],
    image: doc.image || `/media/blog/${doc.slug}.jpg`,
    category: {
      ar: doc.category?.ar || '',
      en: doc.category?.en || '',
    },
    title: {
      ar: doc.title?.ar || '',
      en: doc.title?.en || '',
    },
    excerpt: {
      ar: doc.excerpt?.ar || '',
      en: doc.excerpt?.en || '',
    },
    publishedAt: doc.publishedAt ? doc.publishedAt.split('T')[0] : '',
    readTimeMinutes: doc.readTimeMinutes || 5,
    author: {
      name: {
        ar: doc.author?.name?.ar || 'فريق دي ناين',
        en: doc.author?.name?.en || 'D-NINE Team',
      },
      role: {
        ar: doc.author?.role?.ar || 'قسم الإنتاج',
        en: doc.author?.role?.en || 'Production Dept.',
      },
      image: doc.author?.image,
    },
    body: {
      ar: doc.body?.ar || [],
      en: doc.body?.en || [],
    },
    featured: doc.featured ?? false,
    tags: {
      ar: doc.tags?.ar || [],
      en: doc.tags?.en || [],
    },
  };
}
