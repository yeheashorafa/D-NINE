import { revalidateTag } from 'next/cache';
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
  aboutPage: ['about', 'about-page'],
  servicesPage: ['services-page'],
  workPage: ['work-page'],
  blogPage: ['blog-page'],
  contactPage: ['contact-page', 'contact'],
  privacyPage: ['privacy-page', 'privacy'],
  termsPage: ['terms-page', 'terms'],
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
      // @ts-expect-error - Next.js types might incorrectly expect 2 arguments
      revalidateTag(tag);
    }

    // Revalidate specific slug tag if present
    const slug = parsed.data.slug?.current;
    if (slug) {
      // @ts-expect-error - Next.js types might incorrectly expect 2 arguments
      if (docType === 'service') revalidateTag(`service:${slug}`);
      // @ts-expect-error
      if (docType === 'project') revalidateTag(`project:${slug}`);
      // @ts-expect-error
      if (docType === 'blogPost') revalidateTag(`blog:${slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      documentType: docType,
      tags: tagsToRevalidate,
      now: Date.now(),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { message: (err as Error).message || 'Error revalidating tags' },
      { status: 500 }
    );
  }
}
