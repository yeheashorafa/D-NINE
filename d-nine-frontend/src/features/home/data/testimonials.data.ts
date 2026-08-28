import { TestimonialItem } from '@/types/testimonial';

export const STATIC_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    personName: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' },
    role: { ar: 'المدير التنفيذي', en: 'CEO' },
    company: { ar: 'شركة الابتكار', en: 'Innovation Co.' },
    quote: {
      ar: 'دي ناين قدمت لنا خدمة استثنائية فاقت توقعاتنا في كل شيء.',
      en: 'D-NINE provided us with exceptional service that exceeded our expectations in every way.',
    },
    rating: 5,
    featured: true,
  },
  {
    id: 't2',
    personName: { ar: 'سارة خالد', en: 'Sarah Khaled' },
    role: { ar: 'مدير التسويق', en: 'Marketing Director' },
    company: { ar: 'الرؤية الرقمية', en: 'Digital Vision' },
    quote: {
      ar: 'فريق محترف ومبدع، ساعدونا في إعادة بناء هويتنا البصرية بنجاح.',
      en: 'A professional and creative team, they helped us successfully rebuild our visual identity.',
    },
    rating: 5,
    featured: true,
  },
];
