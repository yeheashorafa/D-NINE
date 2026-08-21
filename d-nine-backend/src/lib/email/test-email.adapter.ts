import { logger } from '../../middleware/request-logger.js';
import { EmailAdapter, EmailOptions } from './email.types.js';

export class TestEmailAdapter implements EmailAdapter {
  async sendEmail(options: EmailOptions): Promise<void> {
    logger.info({ emailOptions: options }, 'TestEmailAdapter: Simulated sending email');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
