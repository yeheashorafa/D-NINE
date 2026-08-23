import { defineType, defineField, defineArrayMember } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page Configuration',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    { name: 'hero', title: 'Hero & Intro' },
    { name: 'featured', title: 'Featured Content' },
    { name: 'methodology', title: 'Agency Methodology' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects (Max 6)',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      fieldset: 'featured',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Primary Services',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      fieldset: 'featured',
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured Insights / Blog Posts',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'blogPost' }] })],
      fieldset: 'featured',
    }),
    defineField({
      name: 'processTimeline',
      title: '3-Step Methodology Timeline',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceProcessStep' })],
      fieldset: 'methodology',
    }),
    defineField({
      name: 'seo',
      title: 'Home Page SEO',
      type: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page (الصفحة الرئيسية)',
        subtitle: 'Singleton Content & Featured Sections',
      };
    },
  },
});
