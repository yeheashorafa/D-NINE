import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getServices } from './services.service';
import { PRIMARY_SERVICES } from '@/features/services/data/services.data';
import { sanityFetch } from '@/sanity/client';

vi.mock('@/sanity/client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

const mockEnv = { contentSource: 'sanity' };

vi.mock('@/sanity/env', () => ({
  get contentSource() { return mockEnv.contentSource; },
  assertSanityConfig: vi.fn(),
}));

describe('getServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return static data when contentSource is static', async () => {
    mockEnv.contentSource = 'static';
    
    const services = await getServices();
    
    expect(services).toEqual(PRIMARY_SERVICES);
    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it('should fetch from Sanity and map data when contentSource is sanity', async () => {
    mockEnv.contentSource = 'sanity';
    
    const mockSanityData = [
      {
        _id: '1',
        slug: 'test',
        categorySlug: 'test',
        title: { ar: 'Test', en: 'Test' },
        shortDescription: { ar: 'Test', en: 'Test' },
        fullDescription: { ar: 'Test', en: 'Test' },
        seo: { metaTitle: { ar: 'Test', en: 'Test' } }
      }
    ];
    
    mockSanityFetch.mockResolvedValueOnce(mockSanityData);
    
    const services = await getServices();
    
    expect(sanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['services'],
    });
    expect(services).toHaveLength(1);
    expect(services[0].slug).toBe('test');
  });

  it('should throw an error and not fallback to static data if sanityFetch fails in sanity mode', async () => {
    mockEnv.contentSource = 'sanity';
    
    mockSanityFetch.mockRejectedValueOnce(new Error('Sanity fetch failed'));
    
    await expect(getServices()).rejects.toThrow('Sanity fetch failed');
  });
});
