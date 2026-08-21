import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError, ZodTypeAny } from 'zod';
import { sendFailure } from '../lib/api-response.js';
import { getMessage } from '../lib/messages.js';

export const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error && error.name === 'ZodError') {
        const locale = (req.headers['accept-language']?.startsWith('en') ? 'en' : 'ar') as 'en' | 'ar';
        const issues = error.issues || error.errors || [];
        const errors = issues.map((e: any) => ({
          field: e.path.join('.'),
          code: 'INVALID_FIELD',
          message: e.message
        }));
        return sendFailure(req, res, 422, 'VALIDATION_ERROR', getMessage('VALIDATION_ERROR', locale), errors);
      }
      next(error);
    }
  };
};
