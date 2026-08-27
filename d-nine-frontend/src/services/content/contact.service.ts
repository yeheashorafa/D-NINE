import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { siteConfig } from '@/config/site.config';

export interface ContactPageData {
  hero: {
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
  };
  contactInfo: {
    email: string;
    phone: string;
    locations: { ar: string[]; en: string[] };
  };
  form: {
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    submitButtonLabel: { ar: string; en: string };
    successMessage: { ar: string; en: string };
  };
}

const contactQuery = `*[_type == "contact"][0]{
  hero,
  contactInfo,
  form
}`;

export async function getContactPageData(): Promise<ContactPageData> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<any>({
      query: contactQuery,
      tags: ['contact'],
    });

    if (data) {
      return {
        hero: {
          title: { ar: data.hero?.title?.ar || 'تواصل معنا', en: data.hero?.title?.en || 'Contact Us' },
          subtitle: { ar: data.hero?.subtitle?.ar || 'نحن هنا لمساعدتك', en: data.hero?.subtitle?.en || 'We are here to help' },
        },
        contactInfo: {
          email: data.contactInfo?.email || siteConfig.contact.email,
          phone: data.contactInfo?.phone || siteConfig.contact.phone.display,
          locations: {
            ar: data.contactInfo?.locations?.ar || [siteConfig.contact.locations.ar],
            en: data.contactInfo?.locations?.en || [siteConfig.contact.locations.en],
          },
        },
        form: {
          title: { ar: data.form?.title?.ar || 'أرسل لنا رسالة', en: data.form?.title?.en || 'Send us a message' },
          subtitle: { ar: data.form?.subtitle?.ar || 'سيقوم فريقنا بالرد عليك قريباً', en: data.form?.subtitle?.en || 'Our team will get back to you shortly' },
          submitButtonLabel: { ar: data.form?.submitButtonLabel?.ar || 'إرسال الرسالة', en: data.form?.submitButtonLabel?.en || 'Send Message' },
          successMessage: { ar: data.form?.successMessage?.ar || 'تم إرسال رسالتك بنجاح', en: data.form?.successMessage?.en || 'Your message has been sent successfully' },
        }
      };
    }
  }

  // Fallback to static
  return {
    hero: {
      title: { ar: 'تواصل معنا', en: 'Contact Us' },
      subtitle: { ar: 'هل لديك مشروع في ذهنك؟ دعنا نتحدث.', en: 'Have a project in mind? Let\'s talk.' },
    },
    contactInfo: {
      email: siteConfig.contact.email,
      phone: siteConfig.contact.phone.display,
      locations: {
        ar: [siteConfig.contact.locations.ar],
        en: [siteConfig.contact.locations.en],
      },
    },
    form: {
      title: { ar: 'أرسل رسالة', en: 'Send a message' },
      subtitle: { ar: 'نحن نرد عادة خلال ٢٤ ساعة.', en: 'We usually respond within 24 hours.' },
      submitButtonLabel: { ar: 'إرسال الرسالة', en: 'Send Message' },
      successMessage: { ar: 'تم الإرسال بنجاح! سنتواصل معك قريباً.', en: 'Sent successfully! We will get back to you soon.' },
    }
  };
}
