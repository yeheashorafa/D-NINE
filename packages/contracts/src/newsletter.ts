import { z } from 'zod';
import { localeSchema } from './locale';

export const newsletterSubscriptionSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address').max(254, 'Email must be at most 254 characters'),
  locale: localeSchema,
  sourcePage: z.string().max(500).optional().or(z.literal('')),
  website: z.string().max(100).optional().or(z.literal('')) // honeypot
});

export type NewsletterSubscriptionPayload = z.infer<typeof newsletterSubscriptionSchema>;
