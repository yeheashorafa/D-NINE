import { z } from 'zod';

export const LOCALES = ['ar', 'en'] as const;
export type Locale = typeof LOCALES[number];

export const localeSchema = z.enum(LOCALES);
