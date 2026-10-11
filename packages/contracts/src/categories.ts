import { z } from 'zod';

export const CANONICAL_CATEGORY_KEYS = [
  'motion-graphics',
  'video-editing',
  'social-media-design',
  'print-design',
  'brand-identity',
  'artificial-intelligence',
  'exhibitions',
  'festivals',
] as const;

export type CanonicalCategoryKey = typeof CANONICAL_CATEGORY_KEYS[number];

export const canonicalCategoryKeySchema = z.enum(CANONICAL_CATEGORY_KEYS);
