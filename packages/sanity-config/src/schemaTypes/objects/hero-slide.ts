import { defineType, defineField } from 'sanity';

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'شريحة العرض الرئيسية (Hero Slide)',
  type: 'object',
  groups: [
    { name: 'arabic', title: 'النسخة العربية (Arabic Artwork)', default: true },
    { name: 'english', title: 'النسخة الإنجليزية (English Artwork)' },
    { name: 'settings', title: 'إعدادات الشريحة (Settings)' },
  ],
  fields: [
    // 1. Arabic Desktop Image
    defineField({
      name: 'desktopImageAr',
      title: 'صورة الشاشات الكبيرة — عربي (Arabic Desktop Image)',
      type: 'image',
      group: 'arabic',
      options: { hotspot: true },
      description: 'أبعاد موصى بها: 1920×1080 بكسل. يجب أن يتضمن العمل الفني التصميم والنصوص المدمجة بالعربية.',
    }),
    // 2. Arabic Mobile Image
    defineField({
      name: 'mobileImageAr',
      title: 'صورة الجوال — عربي (Arabic Mobile Image)',
      type: 'image',
      group: 'arabic',
      options: { hotspot: true },
      description: 'أبعاد موصى بها: 1080×1920 بكسل (رأسي). في حال عدم رفعها، يُستخدم تصميم الشاشات الكبيرة تلقائياً.',
    }),

    // 3. English Desktop Image
    defineField({
      name: 'desktopImageEn',
      title: 'Desktop Artwork — English (صورة الشاشات الكبيرة — إنجليزي)',
      type: 'image',
      group: 'english',
      options: { hotspot: true },
      description: 'Recommended: 1920×1080px. Visible marketing artwork tailored for English.',
    }),
    // 4. English Mobile Image
    defineField({
      name: 'mobileImageEn',
      title: 'Mobile Artwork — English (صورة الجوال — إنجليزي)',
      type: 'image',
      group: 'english',
      options: { hotspot: true },
      description: 'Recommended: 1080×1920px (vertical). Falls back to English desktop artwork if omitted.',
    }),

    // Alt text
    defineField({
      name: 'alt',
      title: 'النص البديل للشريحة (Accessible Alt Text)',
      type: 'localizedString',
      group: 'settings',
      description: 'وصف بديل لقارئات الشاشة ومحركات البحث (عربي وإنجليزي)',
    }),

    // Active Toggle
    defineField({
      name: 'active',
      title: 'حالة التفعيل (Active Status)',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'إلغاء التفعيل لإخفاء الشريحة مؤقتاً دون حذفها',
    }),

    // Hidden Legacy Fields (Preserved for safe migration without data loss)
    defineField({
      name: 'image',
      title: 'Legacy Desktop Image',
      type: 'image',
      hidden: true,
    }),
    defineField({
      name: 'mobileImage',
      title: 'Legacy Mobile Image',
      type: 'image',
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Legacy Title',
      type: 'localizedString',
      hidden: true,
    }),
    defineField({
      name: 'category',
      title: 'Legacy Category',
      type: 'localizedString',
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Legacy Description',
      type: 'localizedText',
      hidden: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'Legacy CTA Text',
      type: 'localizedString',
      hidden: true,
    }),
    defineField({
      name: 'ctaLink',
      title: 'Legacy CTA Link',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      mediaAr: 'desktopImageAr',
      mediaEn: 'desktopImageEn',
      mediaLegacy: 'image',
      altAr: 'alt.ar',
      altEn: 'alt.en',
      active: 'active',
    },
    prepare({ mediaAr, mediaEn, mediaLegacy, altAr, altEn, active }) {
      const media = mediaAr || mediaEn || mediaLegacy;
      const title = altAr || altEn || 'شريحة عرض (Hero Slide)';
      const status = active !== false ? '🟢 نشط' : '🔴 معطل';
      return {
        title,
        subtitle: status,
        media,
      };
    },
  },
});
