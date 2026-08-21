import { Router } from 'express';
import { healthRoutes } from '../modules/health/health.routes.js';
import { contactRoutes } from '../modules/contact/contact.routes.js';
import { bookCallRoutes } from '../modules/book-call/book-call.routes.js';
import { newsletterRoutes } from '../modules/newsletter/newsletter.routes.js';

export const apiRoutes = Router();

apiRoutes.use('/', healthRoutes);
apiRoutes.use('/', contactRoutes);
apiRoutes.use('/', bookCallRoutes);
apiRoutes.use('/', newsletterRoutes);