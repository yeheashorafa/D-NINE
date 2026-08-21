import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { requestLogger } from './middleware/request-logger.js';
import { corsMiddleware } from './middleware/cors.js';
import { globalRateLimiter } from './middleware/rate-limit.js';
import { notFoundHandler } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';
import { apiRoutes } from './routes/index.js';

const app = express();

app.disable('x-powered-by');

// Trust proxy if we are behind a reverse proxy
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security Middlewares
app.use(helmet());
app.use(corsMiddleware);

// Rate limiting
app.use(globalRateLimiter);

// Parsers with size limits
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Logging & Request ID
app.use(requestIdMiddleware);
app.use(requestLogger);

// API Routes
app.use('/api/v1', apiRoutes);

// Fallbacks
app.use(notFoundHandler);
app.use(errorHandler);

export default app;