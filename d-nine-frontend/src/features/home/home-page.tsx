import React from 'react';
import { HeroSlider } from './components/hero-slider';
import { CreativeSnapshotSection } from './components/creative-snapshot-section';
import { FeaturedWorkSection } from './components/featured-work-section';
import { CoreServicesSection } from './components/core-services-section';
import { ProcessSection } from './components/process-section';
import { BookACallSection } from './components/book-a-call-section';
import { getFeaturedProjects } from '@/services/content/projects.service';
import { getServices } from '@/services/content/services.service';
import { getCategories } from '@/services/content/categories.service';

export async function HomePage() {
  const [featuredProjects, services, categories] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getCategories(),
  ]);

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Slider (Approved visual design frozen) */}
      <HeroSlider />

      {/* 2. Creative Snapshot Section (Compact asymmetric Bento replacing oversized showreel) */}
      <CreativeSnapshotSection />

      {/* 3. Featured Work Showcase */}
      <FeaturedWorkSection projects={featuredProjects} categories={categories} />

      {/* 4. Core Services Overview */}
      <CoreServicesSection services={services} />

      {/* 5. Agency Process */}
      <ProcessSection />

      {/* 6. Consultation Banner */}
      <BookACallSection />
    </main>
  );
}
