import { defineType, defineField } from 'sanity';

export const creativeSnapshot = defineType({
  name: 'creativeSnapshot',
  title: 'مقدمة التخصصات والفيديو التعريفي (Specialties & Showreel)',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'شارة القسم (Badge)',
      type: 'localizedString',
      description: 'نص الشارة الصغيرة أعلى عنوان القسم (عربي وإنجليزي)',
    }),
    defineField({
      name: 'title',
      title: 'عنوان القسم (Section Heading)',
      type: 'localizedString',
      description: 'العنوان الرئيسي لقسم التخصصات (عربي وإنجليزي)',
    }),
    defineField({
      name: 'description',
      title: 'الوصف التمهيدي (Section Description)',
      type: 'localizedText',
      description: 'نص وصفي مختصر يظهر أسفل العنوان الرئيسي',
    }),
    defineField({
      name: 'videoPoster',
      title: 'ملصق الفيديو التعريفي (Showreel Video Poster)',
      type: 'image',
      options: { hotspot: true },
      description: 'صورة الغلاف للفيديو التعريفي (Showreel)',
    }),
    defineField({
      name: 'showreelVideo',
      title: 'ملف الفيديو التعريفي (Showreel Video File)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'ملف فيديو MP4 للعرض في النافذة المنبثقة',
    }),
    defineField({
      name: 'videoUrl',
      title: 'رابط فيديو بديل (Video URL)',
      type: 'url',
      description: 'رابط فيديو خارجي اختياري في حال عدم رفع ملف MP4',
    }),

    // Legacy fields preserved for safe migration without data loss
    defineField({
      name: 'capabilities',
      title: 'Legacy Capabilities',
      type: 'localizedStringArray',
      hidden: true,
    }),
    defineField({
      name: 'stats',
      title: 'Legacy Stats',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'localizedString' }] }],
      hidden: true,
    }),
    defineField({
      name: 'cta',
      title: 'Legacy CTA Text',
      type: 'localizedString',
      hidden: true,
    }),
    defineField({
      name: 'modalLabels',
      title: 'Legacy Modal Labels',
      type: 'object',
      fields: [
        defineField({ name: 'watch', title: 'Watch Text', type: 'localizedString' }),
        defineField({ name: 'close', title: 'Close Text', type: 'localizedString' }),
      ],
      hidden: true,
    }),
  ],
});
