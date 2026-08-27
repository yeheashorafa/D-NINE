import { describe, it, expect, vi, beforeEach } from 'vitest';
vi.mock('server-only', () => ({}));
import { sanityFetch } from './client';
import { createClient } from 'next-sanity';

vi.mock('next/headers', () => ({
  draftMode: vi.fn().mockResolvedValue({ isEnabled: false }),
}));

vi.mock('./env', () => ({
  contentSource: 'sanity',
  readToken: 'mock-token',
  projectId: 'test',
  dataset: 'test',
  apiVersion: '2023-01-01',
  studioUrl: 'http://localhost:3333'
}));

const mockFetch = vi.fn().mockResolvedValue('mock-data');

vi.mock('next-sanity', () => {
  return {
    createClient: vi.fn(() => ({
      fetch: (...args: any[]) => mockFetch(...args),
    })),
  };
});

describe('sanityFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use published client by default with stega false', async () => {
    await sanityFetch({ query: '*[]' });
    
    expect(mockFetch).toHaveBeenCalledWith(
      '*[]',
      {},
      {
        next: { tags: [], revalidate: 60 },
        stega: false,
      }
    );
  });

  it('should use preview client when draft mode is enabled with stega true', async () => {
    const { draftMode } = await import('next/headers');
    (draftMode as any).mockResolvedValueOnce({ isEnabled: true });
    
    await sanityFetch({ query: '*[]' });
    
    expect(mockFetch).toHaveBeenCalledWith(
      '*[]',
      {},
      {
        next: { tags: [], revalidate: 0 },
        stega: true,
      }
    );
  });

  it('should allow stega-free metadata fetch even in draft mode', async () => {
    const { draftMode } = await import('next/headers');
    (draftMode as any).mockResolvedValueOnce({ isEnabled: true });
    
    await sanityFetch({ query: '*[]', stega: false });
    
    expect(mockFetch).toHaveBeenCalledWith(
      '*[]',
      {},
      {
        next: { tags: [], revalidate: 0 },
        stega: false,
      }
    );
  });

  it('should throw error when draft mode is enabled but token is missing', async () => {
    const { draftMode } = await import('next/headers');
    (draftMode as any).mockResolvedValue({ isEnabled: true });
    
    vi.mocked(await import('./env')).readToken = '';
    
    await expect(sanityFetch({ query: '*[]' })).rejects.toThrow('Draft mode is enabled but SANITY_API_READ_TOKEN is missing');
  });
});

