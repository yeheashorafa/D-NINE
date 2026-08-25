import { prisma } from '../../lib/prisma.js';
import { ContactSubmissionPayload } from '@d-nine/contracts';
import { SubmissionStatus } from '../../generated/prisma/enums.js';

export class ContactRepository {
  async createSubmission(payload: ContactSubmissionPayload) {
    return prisma.contactSubmission.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone || null,
        serviceSlug: payload.serviceSlug,
        message: payload.message,
        locale: payload.locale,
        sourcePage: payload.sourcePage || null,
        status: SubmissionStatus.NEW,
      },
    });
  }
}

export const contactRepository = new ContactRepository();
