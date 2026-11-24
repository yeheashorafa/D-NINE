import { z } from 'zod';

export const contactFormSchema = z.object({
  phone: z.string().trim().max(30).transform(value => value
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0))
    .replace(/[\s()-]/g, ''))
    .pipe(z.string().regex(/^\+?\d{7,15}$/)),
  fullName: z.string().min(2, { message: 'forms.validation.nameRequired' }),
  email: z.string().email({ message: 'forms.validation.emailInvalid' }),
  serviceSlug: z.string().min(1, { message: 'forms.validation.serviceRequired' }),
  message: z.string().min(10, { message: 'forms.validation.messageMin' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
