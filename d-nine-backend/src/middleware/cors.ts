import cors from 'cors';
import { env } from '../config/env.js';

export function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
}

export function createCorsMiddleware(origins = env.FRONTEND_ORIGINS) {
  const allowedOrigins = new Set(
    origins.map(normalizeOrigin).filter((origin): origin is string => Boolean(origin)),
  );

  return cors({
    origin: (origin, callback) => {
      // Allow server-to-server, health checks, mobile clients, and curl requests.
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalizeOrigin(origin);
      if (!normalizedOrigin || !allowedOrigins.has(normalizedOrigin)) {
        return callback(new Error('ORIGIN_NOT_ALLOWED'), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Accept-Language', 'Content-Type', 'X-Request-ID'],
    optionsSuccessStatus: 204,
  });
}

export const corsMiddleware = createCorsMiddleware();
