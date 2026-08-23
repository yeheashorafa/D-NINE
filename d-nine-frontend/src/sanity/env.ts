export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'development';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';

export const readToken = process.env.SANITY_API_READ_TOKEN || '';

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET || '';

export const contentSource = process.env.CONTENT_SOURCE || 'static';

export function assertSanityConfig() {
  if (contentSource === 'sanity' && !projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables while CONTENT_SOURCE=sanity. Please configure Sanity project credentials or set CONTENT_SOURCE=static.'
    );
  }
}
