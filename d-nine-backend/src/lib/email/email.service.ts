import { env } from '../../config/env.js';
import { EmailAdapter, EmailOptions } from './email.types.js';
import { SmtpEmailAdapter } from './smtp-email.adapter.js';
import { TestEmailAdapter } from './test-email.adapter.js';
import { prisma } from '../prisma.js';
import { logger } from '../../middleware/request-logger.js';

class EmailService {
  private adapter: EmailAdapter;

  constructor() {
    if (env.SMTP_HOST && env.SMTP_USER) {
      this.adapter = new SmtpEmailAdapter();
    } else {
      this.adapter = new TestEmailAdapter();
      if (env.NODE_ENV === 'production') {
        logger.warn('EmailService initialized with TestEmailAdapter in production mode. Emails will NOT be sent.');
      }
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const delivery = await prisma.emailDelivery.create({
      data: {
        to: options.to,
        subject: options.subject,
        status: 'PENDING',
        referenceId: options.referenceId,
      },
    });

    try {
      await this.adapter.sendEmail(options);
      await prisma.emailDelivery.update({
        where: { id: delivery.id },
        data: { status: 'SENT' },
      });
    } catch (error) {
      logger.error({ error, options }, 'Failed to send email');
      await prisma.emailDelivery.update({
        where: { id: delivery.id },
        data: { 
          status: 'FAILED',
          error: error instanceof Error ? error.message : String(error)
        },
      });
      // Rethrow to let caller handle it, or we could swallow it so caller doesn't fail.
      // Requirements: "Ensure a saved submission remains successful if notification delivery fails."
      // So we swallow the error here but log it.
    }
  }
}

export const emailService = new EmailService();
