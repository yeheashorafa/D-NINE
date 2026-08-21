import { BookCallRequestPayload } from '@d-nine/contracts';
import { bookCallRepository } from './book-call.repository.js';
import { emailService } from '../../lib/email/email.service.js';
import { createBookCallNotificationText, createBookCallNotificationHtml } from './book-call.email.js';
import { env } from '../../config/env.js';
import { logger } from '../../middleware/request-logger.js';

export class BookCallService {
  async processRequest(payload: BookCallRequestPayload) {
    const booking = await bookCallRepository.createRequest(payload);

    if (env.CONTACT_NOTIFICATION_EMAIL) {
      try {
        const subject = payload.locale === 'ar' ? 'طلب حجز مكالمة جديد — D-NINE' : 'New D-NINE book-a-call request';

        await emailService.sendEmail({
          to: env.CONTACT_NOTIFICATION_EMAIL,
          subject,
          text: createBookCallNotificationText(payload),
          html: createBookCallNotificationHtml(payload),
          referenceId: booking.id,
        });
      } catch (error) {
        logger.error({ error, bookingId: booking.id }, 'Failed to send book-call notification email');
      }
    }

    return booking;
  }
}

export const bookCallService = new BookCallService();
