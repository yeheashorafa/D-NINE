import { NewsletterSubscriptionPayload } from '@d-nine/contracts';
import { newsletterRepository } from './newsletter.repository.js';
import { emailService } from '../../lib/email/email.service.js';
import { createNewsletterNotificationText, createNewsletterNotificationHtml } from './newsletter.email.js';
import { env } from '../../config/env.js';
import { logger } from '../../middleware/request-logger.js';

export class NewsletterService {
  async processSubscription(payload: NewsletterSubscriptionPayload) {
    const existing = await newsletterRepository.findByEmail(payload.email);
    if (existing) {
      return { subscription: existing, isNew: false };
    }

    const subscription = await newsletterRepository.createSubscription(payload);

    if (env.CONTACT_NOTIFICATION_EMAIL) {
      try {
        const subject = payload.locale === 'ar' ? 'اشتراك جديد في نشرة D-NINE' : 'New D-NINE newsletter subscription';

        await emailService.sendEmail({
          to: env.CONTACT_NOTIFICATION_EMAIL,
          subject,
          text: createNewsletterNotificationText(payload),
          html: createNewsletterNotificationHtml(payload),
          referenceId: subscription.id,
        });
      } catch (error) {
        logger.error({ error, subscriptionId: subscription.id }, 'Failed to send newsletter notification email');
      }
    }

    return { subscription, isNew: true };
  }
}

export const newsletterService = new NewsletterService();
