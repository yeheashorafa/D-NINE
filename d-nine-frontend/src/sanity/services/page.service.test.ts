import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getHomePage, getAboutPage } from './page.service';
import { sanityFetch } from '../client';

vi.mock('../client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

vi.mock('../env', () => ({
  contentSource: 'sanity',
}));

describe('Singleton Page Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getHomePage should fetch home page data and map it', async () => {
    const mockData = {
      _id: 'home',
      heroSlides: [{ title: { ar: 'Test', en: 'Test' } }],
      teamPreview: { enabled: true, selectedTeamMembers: [{ _id: 'm1', active: true, order: 1 }] },
      testimonials: { enabled: true, selectedTestimonials: [{ _id: 't1', active: true, order: 1 }] }
    };
    mockSanityFetch.mockResolvedValueOnce(mockData);

    const result = await getHomePage();
    
    expect(sanityFetch).toHaveBeenCalledWith(expect.objectContaining({
      query: expect.any(String),
      tags: ['home-page', 'homePage'],
    }));

    expect(result?.teamSection?.selectedTeamMembers).toHaveLength(1);
    expect(result?.testimonialsSection?.selectedTestimonials).toHaveLength(1);
  });

  it('getAboutPage should fetch about page data and map it', async () => {
    const mockData = {
      _id: 'about',
      heroTitle: { ar: 'Test', en: 'Test' },
      team: { enabled: true, selectedTeamMembers: [{ _id: 'm1', active: true, order: 1 }] },
      testimonials: { enabled: true, selectedTestimonials: [{ _id: 't1', active: true, order: 1 }] }
    };
    mockSanityFetch.mockResolvedValueOnce(mockData);

    const result = await getAboutPage({ stega: false });
    
    expect(sanityFetch).toHaveBeenCalledWith(expect.objectContaining({
      query: expect.any(String),
      tags: ['about-page', 'aboutPage'],
      stega: false,
    }));
    expect(result?.teamSection?.selectedTeamMembers).toHaveLength(1);
    expect(result?.testimonialsSection?.selectedTestimonials).toHaveLength(1);
  });

  it('should throw an error for missing or malformed document in sanity mode', async () => {
    mockSanityFetch.mockResolvedValueOnce(null);

    await expect(getHomePage()).rejects.toThrow('Home page document is missing or malformed in Sanity.');
  });
});
