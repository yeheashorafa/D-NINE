import { z } from 'zod';

export const SERVICE_SLUGS = [
  'graphic-design',
  'brand-identity',
  'short-video-reels',
  'video-production',
  'social-content',
  'social-management',
  'integrated-marketing',
] as const;

export type ServiceSlug = typeof SERVICE_SLUGS[number];

export const serviceSlugSchema = z.enum(SERVICE_SLUGS);
