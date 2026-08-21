import { Request, Response, NextFunction } from 'express';
import { sendFailure, sendSuccess } from '../../lib/api-response.js';
import { getMessage } from '../../lib/messages.js';
import { BookCallRequestPayload } from '@d-nine/contracts';
import { bookCallService } from './book-call.service.js';

export class BookCallController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: BookCallRequestPayload = req.body;
      const locale = payload.locale || 'ar';

      if (payload.website) {
        return sendFailure(req, res, 400, 'HONEYPOT_REJECTED', getMessage('HONEYPOT_REJECTED', locale));
      }

      const booking = await bookCallService.processRequest(payload);

      return sendSuccess(req, res, 201, 'BOOK_CALL_SUBMITTED', getMessage('BOOK_CALL_SUBMITTED', locale), {
        bookingId: booking.id,
        status: booking.status,
        createdAt: booking.createdAt.toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const bookCallController = new BookCallController();
