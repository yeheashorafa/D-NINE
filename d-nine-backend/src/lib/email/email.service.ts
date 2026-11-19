import { env } from '../../config/env.js';
import { EmailAdapter, EmailOptions } from './email.types.js';
import { SmtpEmailAdapter } from './smtp-email.adapter.js';
import { TestEmailAdapter } from './test-email.adapter.js';
import { prisma } from '../prisma.js';
import { logger } from '../../middleware/request-logger.js';

class EmailService {
  private adapter: EmailAdapter;

  constructor() {
    const smtpConfigured = Boolean(
      env.SMTP_HOST &&
      env.SMTP_USER &&
      env.SMTP_PASSWORD &&
      env.EMAIL_FROM
    );

    if (env.NODE_ENV === 'production' && !smtpConfigured) {
      throw new Error('Production SMTP configuration is incomplete');
    }

    if (smtpConfigured) {
      this.adapter = new SmtpEmailAdapter();
    } else {
      this.adapter = new TestEmailAdapter();
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
      logger.error(
        { error, referenceId: options.referenceId },
        'Failed to send email'
      );
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
