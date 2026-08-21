import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request.js';
import { bookCallRequestSchema } from '@d-nine/contracts';
import { bookCallController } from './book-call.controller.js';
import { formRateLimiter } from '../../middleware/rate-limit.js';

export const bookCallRoutes = Router();

bookCallRoutes.post(
  '/book-call',
  formRateLimiter,
  validateRequest(bookCallRequestSchema),
  bookCallController.submit
);
