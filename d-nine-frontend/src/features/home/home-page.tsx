import React from 'react';
import { HeroSlider } from './components/hero-slider';
import { CreativeSnapshotSection } from './components/creative-snapshot-section';
import { FeaturedWorkSection } from './components/featured-work-section';
import { CoreServicesSection } from './components/core-services-section';
import { ProcessSection } from './components/process-section';
import { PartnersSection } from './components/partners-section';
import { TestimonialsSection } from './components/testimonials-section';
import { FaqsSection } from './components/faqs-section';
import { BookACallSection } from './components/book-a-call-section';
import { getFeaturedProjects } from '@/services/content/projects.service';
import { getServices } from '@/services/content/services.service';
import { getCategories } from '@/services/content/categories.service';
import { getHomePage } from '@/sanity/services/page.service';
import { getTestimonials } from '@/services/content/testimonials.service';

export async function HomePage() {
  const [featuredProjects, services, categories, homeData, allTestimonials] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getCategories(),
    getHomePage(),
    getTestimonials(),
  ]);

  // If homeData exists, filter featured projects and services based on selected slugs
  const displayProjects = homeData?.featuredProjects?.length
    ? featuredProjects.filter(p => homeData.featuredProjects?.includes(p.slug))
    : featuredProjects;
    
  const displayServices = homeData?.featuredServices?.length
    ? services.filter(s => homeData.featuredServices?.includes(s.slug))
    : services;

  // Slides with 4 localized fields or fallback
  const validSlides = (homeData?.heroSlides || []).map(slide => ({
    ...slide,
    image: slide.image || '',
  }));

  // Selected active partners list
  const partnersList = homeData?.partnersList || [];

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Slider (Localized 4 artwork fields with safe fallbacks) */}
      <HeroSlider data={{ slides: validSlides }} />

      {/* 2. Canonical 8 Specialties & Showreel (Consumes the same contentCategory) */}
      <CreativeSnapshotSection
        data={homeData?.creativeSnapshot}
        categories={categories}
      />

      {/* 3. Featured Work Showcase */}
      <FeaturedWorkSection projects={displayProjects} categories={categories} />

      {/* 4. Core Services Overview */}
      <CoreServicesSection services={displayServices} />

      {/* 5. Agency Process */}
      <ProcessSection data={homeData?.processTimeline} />

      {/* 6. Partners Section (Replaces public Team) */}
      <PartnersSection partners={partnersList} />

      {/* 7. Testimonials */}
      <TestimonialsSection data={{
        ...homeData?.testimonialsSection,
        enabled: homeData?.testimonialsSection?.enabled !== false,
        selectedTestimonials: homeData?.testimonialsSection?.selectedTestimonials?.length
          ? homeData.testimonialsSection.selectedTestimonials
          : allTestimonials,
      }} />

      {/* 8. FAQs */}
      <FaqsSection data={homeData?.faqs} />

      {/* 9. Consultation Banner */}
      <BookACallSection data={homeData?.bookACall} />
    </main>
  );
}
