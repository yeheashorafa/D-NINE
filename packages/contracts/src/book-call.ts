import { z } from 'zod';
import { localeSchema } from './locale';
import { serviceSlugSchema } from './service-slug';

export const bookCallRequestSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(254, 'Email must be at most 254 characters'),
  phone: z.string().trim().max(30, 'Phone must be at most 30 characters').optional().or(z.literal('')),
  companyName: z.string().trim().max(100, 'Company name must be at most 100 characters').optional().or(z.literal('')),
  serviceSlug: serviceSlugSchema,
  preferredDate: z.string().trim().min(1, 'Date is required').max(50, 'Invalid date'),
  preferredTime: z.string().trim().min(1, 'Time is required').max(50, 'Invalid time'),
  timezone: z.string().trim().min(1, 'Timezone is required').max(100, 'Invalid timezone'),
  notes: z.string().trim().max(3000, 'Notes must be at most 3000 characters').optional().or(z.literal('')),
  locale: localeSchema,
  sourcePage: z.string().max(500).optional().or(z.literal('')),
  website: z.string().max(100).optional().or(z.literal('')) // honeypot
});

export type BookCallRequestPayload = z.infer<typeof bookCallRequestSchema>;

export interface BookCallResponseData {
  bookingId: string;
  status: string;
  createdAt: string;
}
