import { TeamMemberItem } from '@/types/team';
import type { SanityLocalizedPortableText } from '@/sanity/types';

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
  }
];
