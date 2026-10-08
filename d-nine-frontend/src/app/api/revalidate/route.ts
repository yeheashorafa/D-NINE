import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { z } from 'zod';
import { revalidateSecret } from '@/sanity/env';

/**
 * Maximum allowed payload size for webhook requests in bytes (64 KB).
 * Enforced both on declared Content-Length and during streaming body accumulation.
 */
const MAX_PAYLOAD_BYTES = 64 * 1024;

/**
 * Strict whitelist of supported document types.
 *
 * NOTE FOR OPERATORS:
 * The Sanity GROQ webhook filter/projection MUST be configured to only send
 * supported document types. Unmapped or unknown types are rejected with 422.
 */
const ALLOWED_DOCUMENT_TYPES: Record<string, readonly string[]> = Object.freeze({
  contentCategory: ['categories'],
  service: ['services'],
  serviceOffering: ['service-offerings', 'services'],
  project: ['projects'],
  testimonial: ['testimonials'],
  teamMember: ['team-members'],
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
});

const BASE_ROUTES: Record<string, readonly string[]> = Object.freeze({
  homePage: ['/ar', '/en'],
  aboutPage: ['/ar/about', '/en/about'],
  servicesPage: ['/ar/services', '/en/services'],
  workPage: ['/ar/work', '/en/work'],
  blogPage: ['/ar/blog', '/en/blog'],
  contactPage: ['/ar/contact', '/en/contact'],
  privacyPage: ['/ar/privacy', '/en/privacy'],
  termsPage: ['/ar/terms', '/en/terms'],
  siteSettings: [
    '/ar',
    '/en',
    '/ar/about',
    '/en/about',
    '/ar/services',
    '/en/services',
    '/ar/work',
    '/en/work',
    '/ar/blog',
    '/en/blog',
    '/ar/contact',
    '/en/contact',
  ],
  service: ['/ar/services', '/en/services'],
  project: ['/ar/work', '/en/work', '/ar', '/en'],
  testimonial: [
    '/ar',
    '/en',
    '/ar/about',
    '/en/about',
    '/ar/services',
    '/en/services',
    '/ar/work',
    '/en/work',
  ],
  teamMember: ['/ar', '/en', '/ar/about', '/en/about'],
  blogPost: ['/ar/blog', '/en/blog', '/ar', '/en'],
});

// Strict slug format allowing letters, digits, and hyphens (Unicode-aware)
const SLUG_REGEX = /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u;

// Dangerous object prototype property names to explicitly reject
const FORBIDDEN_PROPERTY_NAMES = new Set(['__proto__', 'constructor', 'prototype']);

const webhookPayloadSchema = z
  .object({
    _type: z
      .string()
      .min(1)
      .max(64)
      .refine(
        (val) =>
          !FORBIDDEN_PROPERTY_NAMES.has(val) &&
          Object.prototype.hasOwnProperty.call(ALLOWED_DOCUMENT_TYPES, val),
        { message: 'Invalid document type' }
      ),
    slug: z
      .object({
        current: z.string().max(128).regex(SLUG_REGEX).optional(),
      })
      .optional()
      .nullable(),
  })
  .strict();

class PayloadTooLargeError extends Error {
  constructor() {
    super('Payload Too Large');
    this.name = 'PayloadTooLargeError';
  }
}

/**
 * Safely reads the Request body stream with an accumulated byte counter up to maxBytes.
 * Cancels/aborts reader as soon as accumulated bytes exceed limit, throwing PayloadTooLargeError.
 */
async function readBoundedBody(req: NextRequest, maxBytes: number): Promise<Uint8Array> {
  if (!req.body) {
    return new Uint8Array(0);
  }

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
          try {
            await reader.cancel();
          } catch {
            // Ignore cancel errors
          }
          throw new PayloadTooLargeError();
        }
        chunks.push(value);
      }
    }
  } catch (err) {
    if (err instanceof PayloadTooLargeError) {
      throw err;
    }
    try {
      await reader.cancel();
    } catch {
      // Ignore cancel errors
    }
    throw err;
  }

  const combined = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return combined;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce content-type header
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return new NextResponse('Unsupported Media Type', {
        status: 415,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }

    // 2. Reject immediately if declared content-length exceeds MAX_PAYLOAD_BYTES
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return new NextResponse('Payload Too Large', {
        status: 413,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }

    // 3. Read stream with bounded byte counter (stops immediately if actual bytes exceed 64 KB)
    let rawBodyBytes: Uint8Array;
    try {
      rawBodyBytes = await readBoundedBody(req, MAX_PAYLOAD_BYTES);
    } catch (err) {
      if (err instanceof PayloadTooLargeError) {
        return new NextResponse('Payload Too Large', {
          status: 413,
          headers: { 'Cache-Control': 'no-store, max-age=0' },
        });
      }
      return new NextResponse('Bad Request', {
        status: 400,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }

    // 4. Ensure server revalidate secret is configured
    if (!revalidateSecret) {
      return new NextResponse('Internal Configuration Error', {
        status: 500,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }

    // 5. Reconstruct request with the bounded body to safely pass to parseBody
    const bodyString = new TextDecoder().decode(rawBodyBytes);
    const reconstructedReq = new NextRequest(req.url, {
      method: req.method,
      headers: req.headers,
      body: bodyString,
    });

    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(reconstructedReq, revalidateSecret, false);

    if (!isValidSignature) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }

    // 6. Strict schema validation (rejects unknown _type, prototype poisonings, unexpected keys)
    const parsed = webhookPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return new NextResponse('Invalid payload', {
        status: 422,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }

    const docType = parsed.data._type;
    const tagsToRevalidate = ALLOWED_DOCUMENT_TYPES[docType];

    // 7. Revalidate allowed tags
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, 'max');
    }

    const pathsToRevalidate: string[] = [];
    if (Object.prototype.hasOwnProperty.call(BASE_ROUTES, docType)) {
      pathsToRevalidate.push(...BASE_ROUTES[docType]);
    }

    // Revalidate specific slug tag and paths if present and valid
    const slug = parsed.data.slug?.current;
    if (slug) {
      if (docType === 'service') {
        revalidateTag(`service:${slug}`, 'max');
        pathsToRevalidate.push(`/ar/services/${slug}`, `/en/services/${slug}`);
      }
      if (docType === 'project') {
        revalidateTag(`project:${slug}`, 'max');
        pathsToRevalidate.push(`/ar/work/${slug}`, `/en/work/${slug}`);
      }
      if (docType === 'testimonial') {
        revalidateTag(`testimonial:${slug}`, 'max');
      }
      if (docType === 'blogPost') {
        revalidateTag(`blog:${slug}`, 'max');
        pathsToRevalidate.push(`/ar/blog/${slug}`, `/en/blog/${slug}`);
      }
    }

    // Deduplicate and revalidate paths
    const uniquePaths = [...new Set(pathsToRevalidate)];
    for (const p of uniquePaths) {
      revalidatePath(p, 'page');
    }

    return NextResponse.json(
      {
        revalidated: true,
        documentType: docType,
        tags: tagsToRevalidate,
        paths: uniquePaths,
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      }
    );
  } catch {
    return new NextResponse('Internal server error', {
      status: 500,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
