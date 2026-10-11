import { defineType, defineField } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const workPage = defineType({
  name: 'workPage',
  title: 'صفحة الأعمال والمشاريع (Work Page)',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'مقدمة الصفحة (Hero Section)' },
    { name: 'seo', title: 'محركات البحث (SEO & Metadata)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'الشارة التمهيدية (Hero Badge)',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'عنوان الصفحة (Hero Title)',
      type: 'localizedString',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'الوصف التمهيدي (Hero Subtitle)',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'seo',
      title: 'إعدادات محركات البحث (SEO Settings)',
      type: 'seo',
      fieldset: 'seo',
    }),

    // Legacy field preserved safely without deleting from database
    defineField({
      name: 'allCategoriesLabel',
      title: 'Legacy All Categories Label',
      type: 'localizedString',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'صفحة الأعمال (Work Page)',
        subtitle: 'المحتوى التمهيدي وإعدادات محركات البحث لمعرض الأعمال',
      };
    },
  },
});
