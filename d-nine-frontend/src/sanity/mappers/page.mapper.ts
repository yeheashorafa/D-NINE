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

import { mapTestimonialsSection, mapTeamSection } from './section.mapper';

export function mapHomePage(doc: SanityHomePageDoc | null) {
  if (!doc) return null;
  return {
    ...doc,
    testimonials: mapTestimonialsSection(doc.testimonials),
    teamPreview: mapTeamSection(doc.teamPreview),
  };
}

export function mapAboutPage(doc: SanityAboutPageDoc | null) {
  if (!doc) return null;
  return {
    ...doc,
    team: mapTeamSection(doc.team),
    testimonials: mapTestimonialsSection(doc.testimonials),
  };
}

export function mapServicesPage(doc: SanityServicesPageDoc | null) {
  if (!doc) return null;
  return {
    ...doc,
    testimonials: mapTestimonialsSection(doc.testimonials),
  };
}

export function mapWorkPage(doc: SanityWorkPageDoc | null) {
  if (!doc) return null;
  return doc;
}

export function mapBlogPage(doc: SanityBlogPageDoc | null) {
  if (!doc) return null;
  return doc;
}

export function mapContactPage(doc: SanityContactPageDoc | null) {
  if (!doc) return null;
  return doc;
}

export function mapPrivacyPage(doc: SanityPrivacyPageDoc | null) {
  if (!doc) return null;
  return doc;
}

export function mapTermsPage(doc: SanityTermsPageDoc | null) {
  if (!doc) return null;
  return doc;
}

export function mapSiteSettings(doc: SanitySiteSettingsDoc | null) {
  if (!doc) return null;
  return doc;
}
