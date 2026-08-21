import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request.js';
import { newsletterSubscriptionSchema } from '@d-nine/contracts';
import { newsletterController } from './newsletter.controller.js';
import { formRateLimiter } from '../../middleware/rate-limit.js';

export const newsletterRoutes = Router();

newsletterRoutes.post(
  '/newsletter',
  formRateLimiter,
  validateRequest(newsletterSubscriptionSchema),
  newsletterController.subscribe
);
