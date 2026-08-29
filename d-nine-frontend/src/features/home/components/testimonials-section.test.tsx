import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestimonialsSection } from './testimonials-section';
import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  home: {
    testimonials: {
      badge: "Testimonials",
      title: "What Clients Say"
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

describe('TestimonialsSection', () => {
  const mockTestimonials = [
    {
      id: '1',
      personName: { en: 'John Doe', ar: 'جون دو' },
      quote: { en: 'Great service!', ar: 'خدمة رائعة!' },
      rating: 5,
      featured: true
    },
    {
      id: '2',
      personName: { en: 'Jane Smith', ar: 'جين سميث' },
      quote: { en: 'Amazing work!', ar: 'عمل مذهل!' },
      rating: 4,
      featured: false
    }
  ] as unknown as import('@/types/testimonial').TestimonialItem[];

  it('renders nothing if disabled', () => {
    const { container } = renderWithIntl(<TestimonialsSection data={{ enabled: false }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing if no testimonials provided', () => {
    const { container } = renderWithIntl(<TestimonialsSection data={{ enabled: true, selectedTestimonials: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a carousel when multiple testimonials provided', () => {
    renderWithIntl(<TestimonialsSection data={{ enabled: true, selectedTestimonials: mockTestimonials }} />);
    // Check if Swiper mock is rendered
    expect(screen.getByTestId('swiper-mock')).toBeInTheDocument();
    // Check if SwiperSlide mocks are rendered
    const slides = screen.getAllByTestId('swiper-slide-mock');
    expect(slides).toHaveLength(2);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('respects manual CMS ordering', () => {
    renderWithIntl(<TestimonialsSection data={{ enabled: true, selectedTestimonials: mockTestimonials }} />);
    const slides = screen.getAllByTestId('swiper-slide-mock');
    expect(slides[0]).toHaveTextContent('John Doe');
    expect(slides[1]).toHaveTextContent('Jane Smith');
  });

  it('respects maxItems', () => {
    renderWithIntl(<TestimonialsSection data={{ enabled: true, selectedTestimonials: mockTestimonials, maxItems: 1 }} />);
    const slides = screen.getAllByTestId('swiper-slide-mock');
    expect(slides).toHaveLength(1);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('renders correctly in Arabic (RTL)', () => {
    renderWithIntl(<TestimonialsSection data={{ enabled: true, selectedTestimonials: mockTestimonials }} />, 'ar');
    expect(screen.getByText('جون دو')).toBeInTheDocument();
    expect(screen.getByText('جين سميث')).toBeInTheDocument();
    // Swiper dir should be rtl
    expect(screen.getByTestId('swiper-mock')).toHaveAttribute('dir', 'rtl');
  });
});
