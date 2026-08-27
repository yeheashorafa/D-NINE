import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl, readToken, contentSource } from './env';
import { draftMode } from 'next/headers';

// Published client: perspective "published", stega false
export const client = createClient({
  projectId: projectId || 'placeholder-id',
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  stega: false,
});

// Draft client: perspective "previewDrafts", token required, stega true
export const previewClient = createClient({
  projectId: projectId || 'placeholder-id',
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken, // Token is REQUIRED for previewDrafts
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: studioUrl || 'http://localhost:3333',
  },
});

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  stega = true, // By default, let's enable stega if draft mode is active, but we can override
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  stega?: boolean;
}): Promise<T> {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch (error) {
    // draftMode() throws when called outside a Request boundary
  }

  // Fallback to null only if static and NOT draft mode
  // The user requirement: "Published fallback re-enabled..." - but we should throw if source is sanity.
  if (contentSource !== 'sanity' && !isDraftMode) {
    return null as any;
  }

  const selectedClient = isDraftMode ? previewClient : client;

  // Next caching behavior: no cache in draft mode
  const revalidate = isDraftMode ? 0 : false;

  return selectedClient.fetch<T>(query, params, {
    stega: isDraftMode ? stega : false, // Stega only active in draft mode
    next: {
      tags,
      revalidate, // Next.js standard cache revalidation time (false = cache indefinitely until tag revalidated)
    },
  });
}
