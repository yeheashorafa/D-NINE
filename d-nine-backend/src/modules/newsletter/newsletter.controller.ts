import { Request, Response, NextFunction } from 'express';
import { sendFailure, sendSuccess } from '../../lib/api-response.js';
import { getMessage } from '../../lib/messages.js';
import { NewsletterSubscriptionPayload } from '@d-nine/contracts';
import { newsletterService } from './newsletter.service.js';

export class NewsletterController {
  async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: NewsletterSubscriptionPayload = req.body;
      const locale = payload.locale || 'ar';

      if (payload.website) {
        return sendFailure(req, res, 400, 'HONEYPOT_REJECTED', getMessage('HONEYPOT_REJECTED', locale));
      }

      const { isNew } = await newsletterService.processSubscription(payload);

      if (isNew) {
        return sendSuccess(req, res, 201, 'NEWSLETTER_SUBSCRIBED', getMessage('NEWSLETTER_SUBSCRIBED', locale), {});
      } else {
        return sendSuccess(req, res, 200, 'NEWSLETTER_ALREADY_SUBSCRIBED', getMessage('NEWSLETTER_ALREADY_SUBSCRIBED', locale), {});
      }
    } catch (error) {
      next(error);
    }
  }
}

export const newsletterController = new NewsletterController();
