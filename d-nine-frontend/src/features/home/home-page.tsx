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
import { getHomePage } from '@/sanity/services/page.service';

export async function HomePage() {
  const [featuredProjects, services, categories, homeData] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getCategories(),
    getHomePage(),
  ]);

  // If homeData exists, filter featured projects and services based on selected slugs
  const displayProjects = homeData?.featuredProjects?.length
    ? featuredProjects.filter(p => homeData.featuredProjects?.includes(p.slug))
    : featuredProjects;
    
  const displayServices = homeData?.featuredServices?.length
    ? services.filter(s => homeData.featuredServices?.includes(s.slug))
    : services;

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Slider (Approved visual design frozen) */}
      <HeroSlider data={{ slides: homeData?.heroSlides || [] }} />

      {/* 2. Creative Snapshot Section (Compact asymmetric Bento replacing oversized showreel) */}
      <CreativeSnapshotSection data={homeData?.creativeSnapshot} />

      {/* 3. Featured Work Showcase */}
      <FeaturedWorkSection projects={displayProjects} categories={categories} />

      {/* 4. Core Services Overview */}
      <CoreServicesSection services={displayServices} />

      {/* 5. Agency Process */}
      <ProcessSection data={homeData?.processTimeline} />

      {/* 6. Consultation Banner */}
      <BookACallSection data={homeData?.bookACall} />
    </main>
  );
}
