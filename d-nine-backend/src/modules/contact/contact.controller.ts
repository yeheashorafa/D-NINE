import { Request, Response, NextFunction } from 'express';
import { sendFailure, sendSuccess } from '../../lib/api-response.js';
import { getMessage } from '../../lib/messages.js';
import { ContactSubmissionPayload } from '@d-nine/contracts';
import { contactService } from './contact.service.js';

export class ContactController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: ContactSubmissionPayload = req.body;
      const locale = payload.locale || 'ar';

      // Honeypot check
      if (payload.website) {
        return sendFailure(req, res, 400, 'HONEYPOT_REJECTED', getMessage('HONEYPOT_REJECTED', locale));
      }

      const submission = await contactService.processSubmission(payload);

      return sendSuccess(req, res, 201, 'CONTACT_SUBMITTED', getMessage('CONTACT_SUBMITTED', locale), {
        submissionId: submission.id,
        status: submission.status,
        createdAt: submission.createdAt.toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
