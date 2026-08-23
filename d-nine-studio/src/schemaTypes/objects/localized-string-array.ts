import { defineType, defineField, defineArrayMember } from 'sanity';

export const localizedStringArray = defineType({
  name: 'localizedStringArray',
  title: 'Localized String Array (AR / EN)',
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
      title: 'العربية (Arabic Items)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      fieldset: 'languages',
      validation: (Rule) => Rule.required().error('Arabic list items required (العناصر بالعربية مطلوبة)'),
    }),
    defineField({
      name: 'en',
      title: 'English Items',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      fieldset: 'languages',
      validation: (Rule) => Rule.required().error('English list items required'),
    }),
  ],
});
