import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getHomePage, getAboutPage } from './page.service';
import { sanityFetch } from '../client';

vi.mock('../client', () => ({
  sanityFetch: vi.fn(),
}));

describe('Singleton Page Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getHomePage should fetch home page data and map it', async () => {
    const mockData = {
      _id: 'home',
      heroSlides: [{ title: { ar: 'Test', en: 'Test' } }],
    };
    (sanityFetch as any).mockResolvedValueOnce(mockData);

    const result = await getHomePage();
    
    expect(sanityFetch).toHaveBeenCalledWith(expect.objectContaining({
      query: expect.any(String),
      tags: ['home-page'],
    }));
    expect(result).toEqual(mockData);
  });

  it('getAboutPage should fetch about page data and map it', async () => {
    const mockData = {
      _id: 'about',
      heroTitle: { ar: 'Test', en: 'Test' },
    };
    (sanityFetch as any).mockResolvedValueOnce(mockData);

    const result = await getAboutPage({ stega: false });
    
    expect(sanityFetch).toHaveBeenCalledWith(expect.objectContaining({
      query: expect.any(String),
      tags: ['about-page'],
      stega: false,
    }));
    expect(result).toEqual(mockData);
  });
});
