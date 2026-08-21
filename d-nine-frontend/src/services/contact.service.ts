import { ContactFormData } from '@/features/contact/schemas/contact.schema';
import { apiClient } from '@/lib/api/api-client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { ContactSubmissionResponseData } from '@d-nine/contracts';

export async function submitContactForm(
  data: ContactFormData,
  locale: string,
  sourcePage: string
): Promise<ContactSubmissionResponseData> {
  const payload = {
    ...data,
    locale,
    sourcePage,
    website: '' // honeypot
  };

  return apiClient<ContactSubmissionResponseData>(API_ENDPOINTS.contact, {
    method: 'POST',
    body: payload,
    locale,
  });
}
