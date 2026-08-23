import { defineType, defineField, defineArrayMember } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Brand Info',
  type: 'document',
  icon: CogIcon,
  fieldsets: [
    { name: 'general', title: 'Brand & Legal Details' },
    { name: 'contact', title: 'Official Contact Info' },
    { name: 'social', title: 'Social Media Channels' },
    { name: 'seo', title: 'Default Global SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Brand Name',
      type: 'localizedString',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legalName',
      title: 'Official Legal Entity Name',
      type: 'localizedString',
      fieldset: 'general',
    }),
    defineField({
      name: 'email',
      title: 'Official General Inquiries Email',
      type: 'string',
      fieldset: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Official Phone Number',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'locations',
      title: 'Agency Office Locations',
      type: 'localizedStringArray',
      fieldset: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
      fieldset: 'social',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default Global Fallback SEO',
      type: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      titleAr: 'companyName.ar',
      titleEn: 'companyName.en',
      email: 'email',
    },
    prepare({ titleAr, titleEn, email }) {
      return {
        title: `Site Settings — ${titleEn || 'D-NINE'} (${titleAr || 'دي ناين'})`,
        subtitle: email || 'Global Configuration',
      };
    },
  },
});
