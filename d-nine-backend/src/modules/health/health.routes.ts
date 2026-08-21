import { Router } from 'express';
import { sendSuccess, sendFailure } from '../../lib/api-response.js';
import { getMessage } from '../../lib/messages.js';
import { healthService } from './health.service.js';
import { env } from '../../config/env.js';

export const healthRoutes = Router();

healthRoutes.get('/health', (req, res) => {
  const locale = (req.headers['accept-language']?.startsWith('en') ? 'en' : 'ar') as 'en' | 'ar';
  
  return sendSuccess(req, res, 200, 'HEALTH_OK', getMessage('HEALTH_OK', locale), {
    status: 'ok',
    service: 'd-nine-backend',
    environment: env.NODE_ENV,
  });
});

healthRoutes.get('/ready', async (req, res) => {
  const locale = (req.headers['accept-language']?.startsWith('en') ? 'en' : 'ar') as 'en' | 'ar';
  
  const isReady = await healthService.checkReadiness();
  
  if (isReady) {
    return sendSuccess(req, res, 200, 'READINESS_OK', getMessage('READINESS_OK', locale), {
      status: 'ready'
    });
  } else {
    return sendFailure(req, res, 503, 'DATABASE_UNAVAILABLE', getMessage('DATABASE_UNAVAILABLE', locale));
  }
});