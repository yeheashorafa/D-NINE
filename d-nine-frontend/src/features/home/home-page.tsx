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
import { getPartners } from '@/services/content/partners.service';

export async function HomePage() {
  const [featuredProjects, services, categories, homeData, allTestimonials, allPartners] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getCategories(),
    getHomePage(),
    getTestimonials(),
    getPartners(),
  ]);

  // Order featured projects strictly according to client's curated selection order
  const displayProjects = homeData?.featuredProjects?.length
    ? homeData.featuredProjects
        .map(slug => featuredProjects.find(p => p.slug === slug))
        .filter((p): p is typeof featuredProjects[number] => Boolean(p))
    : featuredProjects.slice(0, 6);
    
  // Order featured services strictly according to client's curated selection order
  const displayServices = homeData?.featuredServices?.length
    ? homeData.featuredServices
        .map(slug => services.find(s => s.slug === slug))
        .filter((s): s is typeof services[number] => Boolean(s))
    : services.slice(0, 6);

  // Slides with 4 localized fields or fallback
  const validSlides = (homeData?.heroSlides || []).map(slide => ({
    ...slide,
    image: slide.image || '',
  }));

  // Automatic partners list directly from CMS partner documents (single source of truth: allPartners from getPartners())
  const partnersList = allPartners;

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
      <FeaturedWorkSection
        projects={displayProjects}
        categories={categories}
        data={homeData?.featuredWorkHeader}
      />

      {/* 4. Core Services Overview */}
      <CoreServicesSection
        services={displayServices}
        data={homeData?.coreServicesHeader}
      />

      {/* 5. Agency Process */}
      <ProcessSection
        data={homeData?.processTimeline}
        header={homeData?.processHeader}
      />

      {/* 6. Partners Section (Replaces public Team) */}
      <PartnersSection
        partners={partnersList}
        header={homeData?.partnersHeader}
      />

      {/* 7. Testimonials */}
      <TestimonialsSection data={{
        ...homeData?.testimonialsSection,
        enabled: homeData?.testimonialsSection?.enabled !== false,
        selectedTestimonials: homeData?.testimonialsSection?.selectedTestimonials?.length
          ? homeData.testimonialsSection.selectedTestimonials
          : allTestimonials,
      }} />

      {/* 8. FAQs */}
      <FaqsSection
        data={homeData?.faqs}
        header={homeData?.faqsHeader}
      />

      {/* 9. Consultation Banner */}
      <BookACallSection data={homeData?.bookACall} />
    </main>
  );
}
