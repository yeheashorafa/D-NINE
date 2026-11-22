import React from 'react';
import { HeroSlider } from './components/hero-slider';
import { CreativeSnapshotSection } from './components/creative-snapshot-section';
import { FeaturedWorkSection } from './components/featured-work-section';
import { ProcessSection } from './components/process-section';
import { PartnersSection } from './components/partners-section';
import { TestimonialsSection } from './components/testimonials-section';
import { FaqsSection } from './components/faqs-section';
import { BookACallSection } from './components/book-a-call-section';
import { getFeaturedProjects, getProjectsBySlugs } from '@/services/content/projects.service';
import { getHomePage } from '@/sanity/services/page.service';
import { getTestimonials } from '@/services/content/testimonials.service';
import { getPartners } from '@/services/content/partners.service';
import { getSectors } from '@/sanity/services/sector.service';
import { WhyDnineSection } from './components/why-dnine-section';
import { SectorServicesTabs } from '@/features/sectors/sector-services-tabs';

export async function HomePage() {
  const [featuredProjects, homeData, allTestimonials, allPartners, sectors] = await Promise.all([
    getFeaturedProjects(),
    getHomePage(),
    getTestimonials(),
    getPartners(),
    getSectors(),
  ]);

  // Order featured projects strictly according to client's curated selection order
  const displayProjects = homeData?.featuredProjects?.length
    ? await getProjectsBySlugs(homeData.featuredProjects)
    : featuredProjects.slice(0, 6);
    
  // Slides with 4 localized fields or fallback
  const validSlides = (homeData?.heroSlides || []).map(slide => ({
    ...slide,
    image: slide.image || '',
  }));

  // Automatic partners list directly from CMS partner documents (single source of truth: allPartners from getPartners())
  const partnersList = allPartners;

  return (
    <main className="home-page w-full overflow-hidden">
      {/* 1. Hero Slider (Localized 4 artwork fields with safe fallbacks) */}
      <HeroSlider data={{ slides: validSlides }} />

      {/* 2. Canonical 8 Specialties & Showreel (Consumes the same contentCategory) */}
      <CreativeSnapshotSection
        data={homeData?.creativeSnapshot}
        sectors={sectors}
      />

      {/* 3. Why D-NINE */}
      <WhyDnineSection items={homeData?.whyUs} />

      {/* 4. Featured Work Showcase */}
      <FeaturedWorkSection
        projects={displayProjects}
        data={homeData?.featuredWorkHeader}
      />

      {/* 5. Two CMS-managed sectors and their service groups. */}
      <SectorServicesTabs sectors={sectors} header={homeData?.coreServicesHeader} />

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
