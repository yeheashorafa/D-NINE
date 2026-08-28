import { z } from 'zod';

const envSchema = z.object({
  CONTENT_SOURCE: z.enum(['static', 'sanity']).default('static'),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2025-01-01'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('development'),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.string().optional(),
  SANITY_API_READ_TOKEN: z.string().optional(),
  SANITY_REVALIDATE_SECRET: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const envVars = envSchema.parse({
  CONTENT_SOURCE: process.env.CONTENT_SOURCE,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});

if (envVars.CONTENT_SOURCE === 'sanity' || envVars.NODE_ENV === 'production') {
  if (!envVars.NEXT_PUBLIC_SANITY_STUDIO_URL) {
    throw new Error('NEXT_PUBLIC_SANITY_STUDIO_URL must be set when CONTENT_SOURCE=sanity or NODE_ENV=production');
  }
}

if (envVars.NODE_ENV === 'production' && !process.env.CONTENT_SOURCE) {
  throw new Error('CONTENT_SOURCE must be explicitly set to "sanity" or "static" in production environment.');
}

export const apiVersion = envVars.NEXT_PUBLIC_SANITY_API_VERSION;
export const dataset = envVars.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = envVars.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const studioUrl = envVars.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';
export const readToken = envVars.SANITY_API_READ_TOKEN || '';
export const revalidateSecret = envVars.SANITY_REVALIDATE_SECRET || '';
export const contentSource = envVars.CONTENT_SOURCE;

export function assertSanityConfig() {
  if (contentSource === 'sanity') {
    if (!projectId) {
      throw new Error(
        'Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables while CONTENT_SOURCE=sanity. Please configure Sanity project credentials or set CONTENT_SOURCE=static.'
      );
    }
    // Also enforce read token in production if possible, but let's stick to the prompt.
  }
}
