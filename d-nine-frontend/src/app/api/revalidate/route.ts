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

const ALLOWED_DOCUMENT_TYPES: Record<string, string[]> = {
  contentCategory: ['categories'],
  service: ['services'],
  serviceOffering: ['service-offerings', 'services'],
  project: ['projects'],
  blogPost: ['blog'],
  author: ['blog'],
  homePage: ['home-page', 'agency', 'projects', 'services', 'blog'],
  siteSettings: ['site-settings'],
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
      revalidateTag(tag, { expire: 0 });
    }

    // Revalidate specific slug tag if present
    const slug = parsed.data.slug?.current;
    if (slug) {
      if (docType === 'service') revalidateTag(`service:${slug}`, { expire: 0 });
      if (docType === 'project') revalidateTag(`project:${slug}`, { expire: 0 });
      if (docType === 'blogPost') revalidateTag(`blog:${slug}`, { expire: 0 });
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
