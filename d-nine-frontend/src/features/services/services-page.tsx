import React from 'react';
import { TestimonialsSection } from '../home/components/testimonials-section';

import { getServicesPage } from '@/sanity/services/page.service';
import { getSectors } from '@/sanity/services/sector.service';
import { SectorServicesTabs } from '@/features/sectors/sector-services-tabs';
import { getTestimonials } from '@/services/content/testimonials.service';

export async function ServicesPage() {
  const [sectors, pageData, testimonials] = await Promise.all([
    getSectors(),
    getServicesPage(),
    getTestimonials(),
  ]);

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two main sectors with editable groups and offerings. */}
        <SectorServicesTabs
          sectors={sectors}
          compact
          header={{
            badge: pageData?.heroBadge,
            title: pageData?.heroTitle,
            subtitle: pageData?.heroSubtitle,
          }}
        />

        {/* Testimonials Section */}
        <TestimonialsSection data={{ ...pageData?.testimonialsSection, selectedTestimonials: testimonials }} />
      </div>
    </main>
  );
}
