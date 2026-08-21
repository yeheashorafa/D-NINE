import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request.js';
import { contactSubmissionSchema } from '@d-nine/contracts';
import { contactController } from './contact.controller.js';
import { formRateLimiter } from '../../middleware/rate-limit.js';

export const contactRoutes = Router();

contactRoutes.post(
  '/contact',
  formRateLimiter,
  validateRequest(contactSubmissionSchema),
  contactController.submit
);
