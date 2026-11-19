import { z } from 'zod';
import { canonicalCategoryKeySchema } from './categories.js';

export const SERVICE_SLUGS = [
  'graphic-design',
  'brand-identity',
  'short-video-reels',
  'video-production',
  'social-content',
  'social-management',
  'integrated-marketing',
] as const;

/**
 * Keep accepting the legacy service slugs while the public CMS taxonomy uses
 * canonical category keys. Both forms are persisted as strings by the API.
 */
export const serviceSlugSchema = z.union([
  z.enum(SERVICE_SLUGS),
  canonicalCategoryKeySchema,
]);

export type ServiceSlug = z.infer<typeof serviceSlugSchema>;
