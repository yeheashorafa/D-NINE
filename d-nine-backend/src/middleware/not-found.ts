import { Request, Response } from 'express';
import { sendFailure } from '../lib/api-response.js';
import { getMessage } from '../lib/messages.js';

export function notFoundHandler(req: Request, res: Response) {
  const locale = (req.headers['accept-language']?.startsWith('en') ? 'en' : 'ar') as 'en' | 'ar';
  return sendFailure(req, res, 404, 'NOT_FOUND', getMessage('NOT_FOUND', locale));
}
