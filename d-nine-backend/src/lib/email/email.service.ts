import { env } from '../../config/env.js';
import { EmailAdapter, EmailDeliveryResult, EmailOptions } from './email.types.js';
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

  async sendEmail(options: EmailOptions): Promise<EmailDeliveryResult> {
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
      return 'SENT';
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
      return 'FAILED';
    }
  }
}

export const emailService = new EmailService();
