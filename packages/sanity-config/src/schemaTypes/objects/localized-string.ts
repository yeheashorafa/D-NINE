import { defineType, defineField } from 'sanity';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String (AR / EN)',
  type: 'object',
  fieldsets: [
    {
      name: 'languages',
      title: 'Translations',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'ar',
      title: 'العربية (Arabic)',
      type: 'string',
      fieldset: 'languages',
      validation: (Rule) => Rule.required().error('Arabic text is required (النص العربي مطلوب)'),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      fieldset: 'languages',
      validation: (Rule) => Rule.required().error('English text is required'),
    }),
  ],
  preview: {
    select: {
      ar: 'ar',
      en: 'en',
    },
    prepare({ ar, en }) {
      return {
        title: ar || en || 'Untitled',
        subtitle: en ? `EN: ${en}` : undefined,
      };
    },
  },
});
