// Objects
import { localizedString } from './objects/localized-string.js';
import { localizedText } from './objects/localized-text.js';
import { localizedPortableText } from './objects/localized-portable-text.js';
import { localizedStringArray } from './objects/localized-string-array.js';
import { seo } from './objects/seo.js';
import { projectMedia } from './objects/project-media.js';
import { serviceDeliverable } from './objects/service-deliverable.js';
import { serviceProcessStep } from './objects/service-process-step.js';
import { serviceFaq } from './objects/service-faq.js';
import { projectMetric } from './objects/project-metric.js';
import { socialLink } from './objects/social-link.js';
import { cta } from './objects/cta.js';

// Documents
import { contentCategory } from './documents/content-category.js';
import { service } from './documents/service.js';
import { serviceOffering } from './documents/service-offering.js';
import { project } from './documents/project.js';
import { blogPost } from './documents/blog-post.js';
import { author } from './documents/author.js';
import { homePage } from './documents/home-page.js';
import { siteSettings } from './documents/site-settings.js';

export const schemaTypes = [
  // Object Types
  localizedString,
  localizedText,
  localizedPortableText,
  localizedStringArray,
  seo,
  projectMedia,
  serviceDeliverable,
  serviceProcessStep,
  serviceFaq,
  projectMetric,
  socialLink,
  cta,

  // Document Types
  contentCategory,
  service,
  serviceOffering,
  project,
  blogPost,
  author,
  homePage,
  siteSettings,
];
