import { defineType, defineField, defineArrayMember } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export const homePage = defineType({
  name: 'homePage',
  title: 'الصفحة الرئيسية (Homepage)',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'slider', title: 'سلايدر الهيرو (Hero Slider)', default: true },
    { name: 'specialties', title: 'التخصصات والشواريل (Specialties & Showreel)' },
    { name: 'featuredWork', title: 'أعمال مختارة (Featured Work)' },
    { name: 'partners', title: 'الشركاء والعملاء (Partners)' },
    { name: 'testimonials', title: 'آراء العملاء (Testimonials)' },
    { name: 'process', title: 'منهجية العمل (Process)' },
    { name: 'faqs', title: 'الأسئلة الشائعة (FAQs)' },
    { name: 'cta', title: 'دعوة للتواصل (Call to Action)' },
    { name: 'seo', title: 'تحسين محركات البحث (SEO)' },
  ],
  fields: [
    // 1. Slider
    defineField({
      name: 'heroSlides',
      title: 'شرائح العرض البصرية (Hero Slides)',
      type: 'array',
      of: [defineArrayMember({ type: 'heroSlide' })],
      group: 'slider',
      description: 'شرائح العرض الرئيسية. اسحب لإعادة الترتيب.',
    }),

    // 2. Specialties & Showreel
    defineField({
      name: 'creativeSnapshot',
      title: 'مقدمة التخصصات والفيديو التعريفي (Specialties & Showreel Intro)',
      type: 'creativeSnapshot',
      group: 'specialties',
    }),

    // 3. Featured Work
    defineField({
      name: 'featuredProjects',
      title: 'المشاريع المختارة (Featured Projects — Max 6)',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      group: 'featuredWork',
      validation: (Rule) => Rule.max(6),
      description: 'اختر المشاريع التي تظهر في الصفحة الرئيسية ورتبها بالسحب والإفلات.',
    }),
    defineField({
      name: 'featuredServices',
      title: 'الخدمات المميزة (Legacy Featured Services)',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      group: 'featuredWork',
      hidden: true,
    }),

    // 4. Partners
    defineField({
      name: 'partners',
      title: 'الشركاء المعروضون (Selected Partners)',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'partner' }] })],
      group: 'partners',
      description: 'حدد الشركاء الذين سيتم عرض شعاراتهم في الصفحة الرئيسية، ورتبهم بالسحب والإفلات.',
    }),

    // 5. Testimonials
    defineField({
      name: 'testimonials',
      title: 'قسم آراء العملاء (Testimonials Section)',
      type: 'testimonialsSection',
      group: 'testimonials',
    }),

    // 6. Process Timeline
    defineField({
      name: 'processTimeline',
      title: 'خطوات منهجية العمل (Agency Process Steps)',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceProcessStep' })],
      group: 'process',
    }),

    // 7. FAQs
    defineField({
      name: 'faqs',
      title: 'الأسئلة الشائعة (Frequently Asked Questions)',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceFaq' })],
      group: 'faqs',
    }),

    // 8. Book a Call / CTA
    defineField({
      name: 'bookACall',
      title: 'بانر حجز الاستشارة والتواصل (Book a Call Banner)',
      type: 'bookACallSection',
      group: 'cta',
    }),

    // 9. SEO
    defineField({
      name: 'seo',
      title: 'إعدادات محركات البحث (Home Page SEO)',
      type: 'seo',
      group: 'seo',
    }),

    // Legacy Fields (Hidden to preserve existing data safely)
    defineField({
      name: 'teamPreview',
      title: 'Legacy Team Preview',
      type: 'teamSection',
      hidden: true,
    }),
    defineField({
      name: 'latestNews',
      title: 'Legacy Latest News',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'blogPost' }] })],
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'الصفحة الرئيسية (Homepage)',
        subtitle: 'المحتوى والإعدادات الشاملة للصفحة الرئيسية',
      };
    },
  },
});
