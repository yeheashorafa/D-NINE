import type { TeamMemberItem } from '../../../types/team';
import type { SanityLocalizedPortableText } from '../../../sanity/types';

export const STATIC_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 'tm1',
    name: { ar: 'محمد علي', en: 'Mohammed Ali' },
    role: { ar: 'المدير الإبداعي', en: 'Creative Director' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'خبرة أكثر من 10 سنوات في قيادة الفرق الإبداعية.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Over 10 years of experience leading creative teams.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: true,
  },
  {
    id: 'tm2',
    name: { ar: 'نورة السعيد', en: 'Noura Al-Saeed' },
    role: { ar: 'مدير العمليات', en: 'Operations Manager' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'خبيرة في إدارة المشاريع والتسليم في الوقت المحدد.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Expert in project management and on-time delivery.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: true,
  },
    {
    id: 'tm3',
    name: { ar: 'خالد إبراهيم', en: 'Khaled Ibrahim' },
    role: { ar: 'مصمم جرافيك أول', en: 'Senior Graphic Designer' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'شغوف بالهوية البصرية والتصميم الذي يروي قصة العلامة التجارية.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Passionate about visual identity and design that tells a brand story.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: true,
  },
  {
    id: 'tm4',
    name: { ar: 'ليلى حسن', en: 'Layla Hassan' },
    role: { ar: 'مديرة التسويق الرقمي', en: 'Digital Marketing Manager' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'تجمع بين الإبداع والتحليل لبناء حملات تسويقية فعّالة.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Combines creativity and analytics to build effective marketing campaigns.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: false,
  },
  {
    id: 'tm5',
    name: { ar: 'يوسف عبدالله', en: 'Youssef Abdullah' },
    role: { ar: 'مطور واجهات أمامية', en: 'Frontend Developer' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'يحول التصاميم إلى تجارب رقمية سلسة وسريعة الاستجابة.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Turns designs into smooth, responsive digital experiences.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: false,
  },
  {
    id: 'tm6',
    name: { ar: 'ريم الشمري', en: 'Reem Al-Shammari' },
    role: { ar: 'مسؤولة علاقات العملاء', en: 'Client Relations Lead' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'تحرص على تجربة عميل استثنائية من الفكرة وحتى التسليم.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Ensures an exceptional client experience from concept to delivery.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: false,
  },
  {
    id: 'tm7',
    name: { ar: 'عمر فاروق', en: 'Omar Farouk' },
    role: { ar: 'مصور فوتوغرافي ومونتير', en: 'Photographer & Video Editor' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'يوثّق تفاصيل العلامات التجارية بعدسة احترافية وسرد بصري مميز.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Captures brand details through a professional lens and distinctive visual storytelling.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: false,
  },
  {
    id: 'tm8',
    name: { ar: 'هبة زيدان', en: 'Heba Zeidan' },
    role: { ar: 'مديرة المشاريع', en: 'Project Manager' },
    bio: {
      ar: [{ _type: 'block', children: [{ _type: 'span', text: 'تنسّق بين الفرق لضمان تسليم المشاريع بجودة عالية وفي وقتها.' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Coordinates between teams to ensure high-quality, on-time project delivery.' }] }],
    } as unknown as SanityLocalizedPortableText,
    featured: false,
  },
];
