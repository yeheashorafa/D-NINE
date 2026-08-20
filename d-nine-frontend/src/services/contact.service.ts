import { ContactFormData } from '@/features/contact/schemas/contact.schema';

export async function submitContactForm(_data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Prepared boundary for future API / backend endpoint
  if (_data) {
    // validated input
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Contact form submitted successfully.',
      });
    }, 500);
  });
}
