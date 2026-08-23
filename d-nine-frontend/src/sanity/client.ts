import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl, readToken, contentSource } from './env';

export const client = createClient({
  projectId: projectId || 'placeholder-id',
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken || undefined,
  perspective: 'published',
  stega: false,
});

export const previewClient = createClient({
  projectId: projectId || 'placeholder-id',
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'previewDrafts',
  stega: {
    studioUrl,
  },
});

export async function sanityFetch<T>({
  query,
  params = {},
  isDraftMode = false,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  isDraftMode?: boolean;
  tags?: string[];
}): Promise<T> {
  if (contentSource !== 'sanity' && !isDraftMode) {
    throw new Error('sanityFetch called while CONTENT_SOURCE is not set to sanity.');
  }

  const selectedClient = isDraftMode ? previewClient : client;

  return selectedClient.fetch<T>(query, params, {
    next: {
      tags,
      revalidate: isDraftMode ? 0 : 3600,
    },
  });
}
