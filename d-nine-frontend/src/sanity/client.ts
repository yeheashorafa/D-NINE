import 'server-only';
import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl, readToken, contentSource } from './env';
import { draftMode } from 'next/headers';

// Throw if configuration is malformed and we're in sanity mode
if (contentSource === 'sanity') {
  if (!projectId || projectId === 'placeholder-id') throw new Error('Missing projectId');
  if (!dataset) throw new Error('Missing dataset');
  if (!apiVersion) throw new Error('Missing apiVersion');
  if (!studioUrl) throw new Error('Missing studioUrl');
}

// Published client: perspective "published", stega false
export const client = createClient({
  projectId: projectId as string,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  stega: false,
});

// Draft client: perspective "previewDrafts", token required, stega true
export const previewClient = createClient({
  projectId: projectId as string,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: studioUrl as string,
  },
});

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  stega = true, // default to enabling stega in draft mode unless explicitly false
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

  // Handle draft requirements
  if (isDraftMode && !readToken) {
    throw new Error('Draft mode is enabled but SANITY_API_READ_TOKEN is missing');
  }

  // Handle static fallback requirements
  if (contentSource !== 'sanity') {
    if (isDraftMode) {
      throw new Error('Cannot use draft mode when CONTENT_SOURCE is not sanity');
    }
    return null as any; // static fallback is allowed only when CONTENT_SOURCE=static
  }

  const selectedClient = isDraftMode ? previewClient : client;
  const revalidate = isDraftMode ? 0 : 60; // Published fallback revalidate approximately 60 seconds

  return selectedClient.fetch<T>(query, params, {
    stega: isDraftMode ? stega : false, // Stega only active in draft mode
    next: {
      tags,
      revalidate,
    },
  });
}

