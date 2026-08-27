import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl, readToken, contentSource } from './env';
import { draftMode } from 'next/headers';

export const client = createClient({
  projectId: projectId || 'placeholder-id',
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken || undefined,
  perspective: 'published',
  stega: {
    studioUrl: studioUrl || 'http://localhost:3333',
  },
});

export const previewClient = createClient({
  projectId: projectId || 'placeholder-id',
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'previewDrafts',
  stega: {
    studioUrl: studioUrl || 'http://localhost:3333',
  },
});

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  stega = true,
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
    // draftMode() throws when called outside a Request boundary (e.g. static generation without cookies)
  }

  if (contentSource !== 'sanity' && !isDraftMode) {
    return null as any;
  }

  const selectedClient = isDraftMode ? previewClient : client;

  return selectedClient.fetch<T>(query, params, {
    stega,
    next: {
      tags,
      revalidate: isDraftMode ? 0 : 3600,
    },
  });
}
