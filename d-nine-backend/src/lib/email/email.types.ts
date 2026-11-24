export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  referenceId?: string; // e.g. submissionId or bookingId
}

export type EmailDeliveryResult = 'SENT' | 'FAILED';

export interface EmailAdapter {
  sendEmail(options: EmailOptions): Promise<void>;
}
