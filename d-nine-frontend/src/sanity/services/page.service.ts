import { sanityFetch } from '../client';
import { contentSource } from '../env';
import {
  homePageQuery,
  aboutPageQuery,
  servicesPageQuery,
  workPageQuery,
  blogPageQuery,
  contactPageQuery,
  privacyPageQuery,
  termsPageQuery,
} from '../queries/page.queries';
import { siteSettingsQuery } from '../queries/settings.queries';
import type { 
  SanityHomePageDoc, 
  SanityAboutPageDoc, 
  SanityServicesPageDoc, 
  SanityWorkPageDoc, 
  SanityBlogPageDoc, 
  SanityContactPageDoc, 
  SanityPrivacyPageDoc, 
  SanityTermsPageDoc,
  SanitySiteSettingsDoc
} from '../types';

function enforceSanityDoc<T>(data: T | null, name: string): T {
  if (contentSource === 'sanity' && !data) {
    throw new Error(`${name} document is missing or malformed in Sanity.`);
  }
  return data as T;
}

export async function getHomePage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityHomePageDoc | null>({
    query: homePageQuery,
    tags: ['home-page', 'homePage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Home page');
}

export async function getAboutPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityAboutPageDoc | null>({
    query: aboutPageQuery,
    tags: ['about-page', 'aboutPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'About page');
}

export async function getServicesPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityServicesPageDoc | null>({
    query: servicesPageQuery,
    tags: ['services-page', 'servicesPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Services page');
}

export async function getWorkPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityWorkPageDoc | null>({
    query: workPageQuery,
    tags: ['work-page', 'workPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Work page');
}

export async function getBlogPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityBlogPageDoc | null>({
    query: blogPageQuery,
    tags: ['blog-page', 'blogPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Blog page');
}

export async function getContactPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityContactPageDoc | null>({
    query: contactPageQuery,
    tags: ['contact-page', 'contactPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Contact page');
}

export async function getPrivacyPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityPrivacyPageDoc | null>({
    query: privacyPageQuery,
    tags: ['privacy-page', 'privacyPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Privacy page');
}

export async function getTermsPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityTermsPageDoc | null>({
    query: termsPageQuery,
    tags: ['terms-page', 'termsPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Terms page');
}

export async function getSiteSettings(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanitySiteSettingsDoc | null>({
    query: siteSettingsQuery,
    tags: ['site-settings', 'siteSettings'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Site Settings');
}