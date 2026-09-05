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
      name: 'defaultSiteUrl',
      title: 'Default Site URL',
      type: 'string',
      fieldset: 'general',
    }),
    defineField({
      name: 'lightLogo',
      title: 'Light Theme Logo',
      type: 'image',
      fieldset: 'general',
    }),
    defineField({
      name: 'darkLogo',
      title: 'Dark Theme Logo',
      type: 'image',
      fieldset: 'general',
    }),
    defineField({
      name: 'headerNav',
      title: 'Header Navigation Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
      fieldset: 'general',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description / About Text',
      type: 'localizedText',
      fieldset: 'general',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [defineArrayMember({ type: 'footerColumn' })],
      fieldset: 'general',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
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
      name: 'phoneDisplay',
      title: 'Phone Number (Display)',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Number (Link href, e.g. tel:+966...)',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number / Link',
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
    defineField({
      name: 'defaultOgImage',
      title: 'Default OG Image',
      type: 'image',
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
