import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendFailure } from '../lib/api-response.js';
import { getMessage } from '../lib/messages.js';
import { logger } from './request-logger.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const locale = (req.headers['accept-language']?.startsWith('en') ? 'en' : 'ar') as 'en' | 'ar';

  if (err instanceof ZodError) {
    const errors = err.issues.map((e: any) => ({
      field: e.path.join('.'),
      code: 'INVALID_FIELD',
      message: e.message
    }));
    return sendFailure(req, res, 422, 'VALIDATION_ERROR', getMessage('VALIDATION_ERROR', locale), errors);
  }

  // SyntaxError from body-parser
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    return sendFailure(req, res, 400, 'INVALID_JSON', getMessage('INVALID_JSON', locale));
  }

  // Prisma known errors could be caught here (e.g. unique constraint)
  if (err?.code === 'P2002') {
    // Unique constraint failed
    return sendFailure(req, res, 409, 'CONFLICT', 'Resource already exists.');
  }

  // Log unknown errors
  logger.error({ err, reqId: (req as any).id }, 'Unhandled error');

  return sendFailure(req, res, 500, 'INTERNAL_ERROR', getMessage('INTERNAL_ERROR', locale));
}
