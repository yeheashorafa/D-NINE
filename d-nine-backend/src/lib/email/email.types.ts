export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  referenceId?: string; // e.g. submissionId or bookingId
}

export interface EmailAdapter {
  sendEmail(options: EmailOptions): Promise<void>;
}
