import { revalidateTag, revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { z } from 'zod';
import { revalidateSecret } from '@/sanity/env';

const webhookPayloadSchema = z.object({
  _type: z.string(),
  slug: z
    .object({
      current: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export const ALLOWED_DOCUMENT_TYPES: Record<string, string[]> = {
  contentCategory: ['categories'],
  service: ['services'],
  serviceOffering: ['service-offerings', 'services'],
  project: ['projects'],
  blogPost: ['blog'],
  author: ['blog'],
  homePage: ['home-page', 'homePage', 'agency', 'projects', 'services', 'blog'],
  aboutPage: ['about', 'about-page', 'aboutPage'],
  servicesPage: ['services-page', 'servicesPage'],
  workPage: ['work-page', 'workPage'],
  blogPage: ['blog-page', 'blogPage'],
  contactPage: ['contact-page', 'contactPage'],
  privacyPage: ['privacy-page', 'privacyPage'],
  termsPage: ['terms-page', 'termsPage'],
  siteSettings: ['site-settings', 'siteSettings'],
};

export async function POST(req: NextRequest) {
  try {
    if (!revalidateSecret) {
      return NextResponse.json(
        { message: 'SANITY_REVALIDATE_SECRET is not configured' },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, revalidateSecret);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const parsed = webhookPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid payload structure', errors: parsed.error.format() },
        { status: 422 }
      );
    }

    const docType = parsed.data._type;
    const tagsToRevalidate = ALLOWED_DOCUMENT_TYPES[docType];

    if (!tagsToRevalidate || tagsToRevalidate.length === 0) {
      return NextResponse.json({
        revalidated: false,
        message: `Ignored unmapped document type: ${docType}`,
      });
    }

    // Revalidate allowed tags
    for (const tag of tagsToRevalidate) {
      // @ts-expect-error
      revalidateTag(tag);
    }

    const pathsToRevalidate: string[] = [];

    // Base routes to revalidate
    const baseRoutes: Record<string, string[]> = {
      homePage: ['/ar', '/en'],
      aboutPage: ['/ar/about', '/en/about'],
      servicesPage: ['/ar/services', '/en/services'],
      workPage: ['/ar/work', '/en/work'],
      blogPage: ['/ar/blog', '/en/blog'],
      contactPage: ['/ar/contact', '/en/contact'],
      privacyPage: ['/ar/privacy', '/en/privacy'],
      termsPage: ['/ar/terms', '/en/terms'],
      siteSettings: ['/ar', '/en', '/ar/about', '/en/about', '/ar/services', '/en/services', '/ar/work', '/en/work', '/ar/blog', '/en/blog', '/ar/contact', '/en/contact'],
      service: ['/ar/services', '/en/services'],
      project: ['/ar/work', '/en/work', '/ar', '/en'],
      blogPost: ['/ar/blog', '/en/blog', '/ar', '/en'],
    };

    if (baseRoutes[docType]) {
      pathsToRevalidate.push(...baseRoutes[docType]);
    }

    // Revalidate specific slug tag and paths if present
    const slug = parsed.data.slug?.current;
    if (slug) {
      if (docType === 'service') {
        // @ts-expect-error
        revalidateTag(`service:${slug}`);
        pathsToRevalidate.push(`/ar/services/${slug}`, `/en/services/${slug}`);
      }
      if (docType === 'project') {
        // @ts-expect-error
        revalidateTag(`project:${slug}`);
        pathsToRevalidate.push(`/ar/work/${slug}`, `/en/work/${slug}`);
      }
      if (docType === 'blogPost') {
        // @ts-expect-error
        revalidateTag(`blog:${slug}`);
        pathsToRevalidate.push(`/ar/blog/${slug}`, `/en/blog/${slug}`);
      }
    }

    // Deduplicate and revalidate paths
    const uniquePaths = [...new Set(pathsToRevalidate)];
    for (const p of uniquePaths) {
      revalidatePath(p, 'page');
    }

    return NextResponse.json({
      revalidated: true,
      documentType: docType,
      tags: tagsToRevalidate,
      paths: uniquePaths,
      now: Date.now(),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { message: (err as Error).message || 'Error revalidating tags' },
      { status: 500 }
    );
  }
}
