import cors from 'cors';
import { env } from '../config/env.js';
import { sendFailure } from '../lib/api-response.js';
import { getMessage } from '../lib/messages.js';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (env.FRONTEND_ORIGINS.indexOf(origin) === -1) {
      return callback(new Error('ORIGIN_NOT_ALLOWED'), false);
    }
    return callback(null, true);
  },
  credentials: true,
});
