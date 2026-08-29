import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamSection } from './team-section';
import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  home: {
    team: {
      badge: "Team",
      title: "Our Team"
    }
  },
  common: {
    carousel: {
      prev: "Previous slide",
      next: "Next slide",
      pagination: "Go to slide"
    }
  }
};

const renderWithIntl = (ui: React.ReactElement, locale = 'en') => {
  return render(
    <NextIntlClientProvider locale={locale} messages={mockMessages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('TeamSection', () => {
  const mockMembers = [
    {
      id: '1',
      name: { en: 'Alice', ar: 'أليس' },
      role: { en: 'Developer', ar: 'مطور' },
      featured: true
    },
    {
      id: '2',
      name: { en: 'Bob', ar: 'بوب' },
      role: { en: 'Designer', ar: 'مصمم' },
      featured: false
    }
  ] as unknown as import('@/types/team').TeamMemberItem[];

  it('renders nothing if disabled', () => {
    const { container } = renderWithIntl(<TeamSection data={{ enabled: false }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing if no members provided', () => {
    const { container } = renderWithIntl(<TeamSection data={{ enabled: true, selectedTeamMembers: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a carousel when multiple members provided', () => {
    renderWithIntl(<TeamSection data={{ enabled: true, selectedTeamMembers: mockMembers }} />);
    // Check if Swiper mock is rendered
    expect(screen.getByTestId('swiper-mock')).toBeInTheDocument();
    // Check if SwiperSlide mocks are rendered
    const slides = screen.getAllByTestId('swiper-slide-mock');
    expect(slides).toHaveLength(2);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('respects manual CMS ordering', () => {
    renderWithIntl(<TeamSection data={{ enabled: true, selectedTeamMembers: mockMembers }} />);
    const slides = screen.getAllByTestId('swiper-slide-mock');
    expect(slides[0]).toHaveTextContent('Alice');
    expect(slides[1]).toHaveTextContent('Bob');
  });

  it('respects maxItems', () => {
    renderWithIntl(<TeamSection data={{ enabled: true, selectedTeamMembers: mockMembers, maxItems: 1 }} />);
    const slides = screen.getAllByTestId('swiper-slide-mock');
    expect(slides).toHaveLength(1);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('renders correctly in Arabic (RTL)', () => {
    renderWithIntl(<TeamSection data={{ enabled: true, selectedTeamMembers: mockMembers }} />, 'ar');
    expect(screen.getByText('أليس')).toBeInTheDocument();
    expect(screen.getByText('بوب')).toBeInTheDocument();
    // Swiper dir should be rtl
    expect(screen.getByTestId('swiper-mock')).toHaveAttribute('dir', 'rtl');
  });
});
