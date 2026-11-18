import { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/services/content/services.service';
import { getAllProjectSlugs } from '@/services/content/projects.service';
import { getAllBlogSlugs } from '@/services/content/blog.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dnine.agency';
  const locales = ['ar', 'en'];

  const staticPages = ['', '/about', '/services', '/work', '/blog', '/contact', '/privacy', '/terms'];

  const serviceSlugs = await getAllServiceSlugs();
  const projectSlugs = await getAllProjectSlugs();
  const blogSlugs = await getAllBlogSlugs();

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    });

    serviceSlugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    projectSlugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    blogSlugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return entries;
}