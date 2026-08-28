import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookACallSection } from './book-a-call-section';
import { vi, describe, it, expect } from 'vitest';

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'FallbackTitle',
      subtitle: 'FallbackSubtitle',
      cta: 'Schedule Now',
    };
    return translations[key] || key;
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock('@/components/motion/reveal-section', () => ({
  RevealSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('BookACallSection', () => {
  it('renders with sanity data provided', () => {
    const data = {
      title: { en: 'Custom CMS Title' },
      subtitle: { en: 'Custom CMS Subtitle' },
      buttonText: { en: 'Custom CMS Button' },
      buttonLink: 'https://example.com',
    };

    render(<BookACallSection data={data} />);

    expect(screen.getByText('Custom CMS Title')).toBeInTheDocument();
    expect(screen.getByText('Custom CMS Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Custom CMS Button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders with fallback translations when no sanity data is provided', () => {
    render(<BookACallSection data={undefined} />);

    expect(screen.getByText('FallbackTitle')).toBeInTheDocument();
    expect(screen.getByText('FallbackSubtitle')).toBeInTheDocument();
    expect(screen.getByText('Schedule Now')).toBeInTheDocument();
  });
});
