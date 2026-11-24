import { ContactSubmissionPayload } from '@d-nine/contracts';
import { contactRepository } from './contact.repository.js';
import { emailService } from '../../lib/email/email.service.js';
import { createContactNotificationText, createContactNotificationHtml } from './contact.email.js';
import { env } from '../../config/env.js';
import { logger } from '../../middleware/request-logger.js';

export class ContactService {
  async processSubmission(payload: ContactSubmissionPayload) {
    // 1. Persist the submission
    const submission = await contactRepository.createSubmission(payload);

    let notificationSent = false;

    // Persist first so a temporary SMTP failure can never lose the enquiry.
    if (env.CONTACT_NOTIFICATION_EMAIL) {
      try {
        const subject = payload.locale === 'ar' ? 'طلب تواصل جديد — D-NINE' : 'New D-NINE contact request';

        notificationSent = (await emailService.sendEmail({
          to: env.CONTACT_NOTIFICATION_EMAIL,
          subject,
          text: createContactNotificationText(payload),
          html: createContactNotificationHtml(payload),
          replyTo: payload.email,
          referenceId: submission.id,
        })) === 'SENT';
      } catch (error) {
        logger.error({ error, submissionId: submission.id }, 'Failed to send contact notification email');
      }
    }

    return { submission, notificationSent };
  }
}

export const contactService = new ContactService();
