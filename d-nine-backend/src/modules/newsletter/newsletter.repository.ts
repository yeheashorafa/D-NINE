import { prisma } from '../../lib/prisma.js';
import { NewsletterSubscriptionPayload } from '@d-nine/contracts';
import { SubscriptionStatus } from '../../generated/prisma/enums.js';

export class NewsletterRepository {
  async findByEmail(email: string) {
    return prisma.newsletterSubscription.findUnique({
      where: { email },
    });
  }

  async createSubscription(payload: NewsletterSubscriptionPayload) {
    return prisma.newsletterSubscription.create({
      data: {
        email: payload.email,
        locale: payload.locale,
        sourcePage: payload.sourcePage || null,
        status: SubscriptionStatus.ACTIVE,
      },
    });
  }
}

export const newsletterRepository = new NewsletterRepository();
