import { sanityFetch } from '../client';
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

export async function getHomePage() {
  return await sanityFetch<any>({
    query: homePageQuery,
    tags: ['home-page'],
  });
}

export async function getAboutPage() {
  return await sanityFetch<any>({
    query: aboutPageQuery,
    tags: ['about-page'],
  });
}

export async function getServicesPage() {
  return await sanityFetch<any>({
    query: servicesPageQuery,
    tags: ['services-page'],
  });
}

export async function getWorkPage() {
  return await sanityFetch<any>({
    query: workPageQuery,
    tags: ['work-page'],
  });
}

export async function getBlogPage() {
  return await sanityFetch<any>({
    query: blogPageQuery,
    tags: ['blog-page'],
  });
}

export async function getContactPage() {
  return await sanityFetch<any>({
    query: contactPageQuery,
    tags: ['contact-page'],
  });
}

export async function getPrivacyPage() {
  return await sanityFetch<any>({
    query: privacyPageQuery,
    tags: ['privacy-page'],
  });
}

export async function getTermsPage() {
  return await sanityFetch<any>({
    query: termsPageQuery,
    tags: ['terms-page'],
  });
}

export async function getSiteSettings() {
  return await sanityFetch<any>({
    query: siteSettingsQuery,
    tags: ['site-settings'],
  });
}
