import { prisma } from '../../lib/prisma.js';
import { BookCallRequestPayload } from '@d-nine/contracts';
import { BookingStatus } from '../../generated/prisma/enums.js';

export class BookCallRepository {
  async createRequest(payload: BookCallRequestPayload) {
    return prisma.bookCallRequest.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone || null,
        companyName: payload.companyName || null,
        serviceSlug: payload.serviceSlug,
        preferredDate: payload.preferredDate,
        preferredTime: payload.preferredTime,
        timezone: payload.timezone,
        notes: payload.notes || null,
        locale: payload.locale,
        sourcePage: payload.sourcePage || null,
        status: BookingStatus.PENDING_CONFIRMATION,
      },
    });
  }
}

export const bookCallRepository = new BookCallRepository();
