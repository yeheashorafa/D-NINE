import React from 'react';
import { HeroSlider } from './components/hero-slider';
import { CreativeSnapshotSection } from './components/creative-snapshot-section';
import { FeaturedWorkSection } from './components/featured-work-section';
import { CoreServicesSection } from './components/core-services-section';
import { ProcessSection } from './components/process-section';
import { TestimonialsSection } from './components/testimonials-section';
import { TeamSection } from './components/team-section';
import { FaqsSection } from './components/faqs-section';
import { LatestNewsSection } from './components/latest-news-section';
import { BookACallSection } from './components/book-a-call-section';
import { getFeaturedProjects } from '@/services/content/projects.service';
import { getServices } from '@/services/content/services.service';
import { getCategories } from '@/services/content/categories.service';
import { getHomePage } from '@/sanity/services/page.service';
import { getTeamMembers } from '@/services/content/team.service';
import { getTestimonials } from '@/services/content/testimonials.service';

export async function HomePage() {
  const [featuredProjects, services, categories, homeData, allTeamMembers, allTestimonials] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getCategories(),
    getHomePage(),
    getTeamMembers(),
    getTestimonials(),
  ]);

  // If homeData exists, filter featured projects and services based on selected slugs
  const displayProjects = homeData?.featuredProjects?.length
    ? featuredProjects.filter(p => homeData.featuredProjects?.includes(p.slug))
    : featuredProjects;
    
  const displayServices = homeData?.featuredServices?.length
    ? services.filter(s => homeData.featuredServices?.includes(s.slug))
    : services;

  // Ensure slides have required fields and type match
  const validSlides = (homeData?.heroSlides || []).map(slide => ({
    ...slide,
    image: slide.image || '',
  }));

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Slider (Approved visual design frozen) */}
      <HeroSlider data={{ slides: validSlides }} />

      {/* 2. Creative Snapshot Section (Compact asymmetric Bento replacing oversized showreel) */}
      <CreativeSnapshotSection data={homeData?.creativeSnapshot} />

      {/* 3. Featured Work Showcase */}
      <FeaturedWorkSection projects={displayProjects} categories={categories} />

      {/* 4. Core Services Overview */}
      <CoreServicesSection services={displayServices} />

      {/* 5. Agency Process */}
      <ProcessSection data={homeData?.processTimeline} />

      {/* 5.5 Team Preview */}
      <TeamSection data={{
        ...homeData?.teamSection,
        enabled: homeData?.teamSection?.enabled !== false,
        selectedTeamMembers: homeData?.teamSection?.selectedTeamMembers?.length
          ? homeData.teamSection.selectedTeamMembers
          : allTeamMembers,
        ctaLabel: homeData?.teamSection?.ctaLabel || { en: 'Meet the Team', ar: 'تعرف على الفريق' },
        ctaPath: homeData?.teamSection?.ctaPath || '/about',
      }} />

      {/* 6. Testimonials */}
      <TestimonialsSection data={{
        ...homeData?.testimonialsSection,
        enabled: homeData?.testimonialsSection?.enabled !== false,
        selectedTestimonials: homeData?.testimonialsSection?.selectedTestimonials?.length
          ? homeData.testimonialsSection.selectedTestimonials
          : allTestimonials,
      }} />

      {/* 7. FAQs */}
      <FaqsSection data={homeData?.faqs} />

      {/* 8. Latest News */}
      <LatestNewsSection data={homeData?.latestNews} />

      {/* 9. Consultation Banner */}
      <BookACallSection data={homeData?.bookACall} />
    </main>
  );
}
