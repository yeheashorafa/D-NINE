import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProcessSection } from './process-section';
import { vi, describe, it, expect } from 'vitest';

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'Our Process',
      subtitle: 'How we work',
      fallbackTitle: 'Default Process Title',
      fallbackSubtitle: 'Default Process Subtitle',
    };
    return translations[key] || key;
  },
}));

vi.mock('@/components/motion/reveal-section', () => ({
  RevealSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('ProcessSection', () => {
  it('renders with sanity data provided', () => {
    const data = [
      {
        step: '01',
        title: { en: 'Discovery' },
        description: { en: 'We discover things.' }
      },
      {
        step: '02',
        title: { en: 'Design' },
        description: { en: 'We design things.' }
      }
    ];

    render(<ProcessSection data={data} />);

    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('We discover things.')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();

    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('We design things.')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders with fallback steps when no sanity data is provided', () => {
    render(<ProcessSection data={undefined} />);

    // Since we fallback to the default steps array in the component which uses t()
    // It should render some default process steps.
    expect(screen.getByText('Our Process')).toBeInTheDocument();
  });
});
