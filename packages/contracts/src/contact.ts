import { z } from 'zod';
import { localeSchema } from './locale.js';
import { serviceSlugSchema } from './service-slug.js';

export const contactSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(254, 'Email must be at most 254 characters'),
  phone: z.string().trim().max(30, 'Phone must be at most 30 characters').optional().or(z.literal('')),
  serviceSlug: serviceSlugSchema,
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000, 'Message must be at most 3000 characters'),
  locale: localeSchema,
  sourcePage: z.string().max(500).optional().or(z.literal('')),
  website: z.string().max(100).optional().or(z.literal('')) // honeypot
});

export type ContactSubmissionPayload = z.infer<typeof contactSubmissionSchema>;

export interface ContactSubmissionResponseData {
  submissionId: string;
  status: string;
  createdAt: string;
}
