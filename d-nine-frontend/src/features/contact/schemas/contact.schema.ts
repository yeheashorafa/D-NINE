import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'forms.validation.nameRequired' }),
  email: z.string().email({ message: 'forms.validation.emailInvalid' }),
  serviceSlug: z.string().min(1, { message: 'forms.validation.serviceRequired' }),
  message: z.string().min(10, { message: 'forms.validation.messageMin' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
