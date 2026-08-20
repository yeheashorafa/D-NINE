import { ServiceOffering } from '@/types/service';

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  // 1. Graphic Design Offerings
  {
    id: 'off-key-visuals',
    slug: 'key-visuals-design',
    parentServiceSlug: 'graphic-design',
    categorySlug: 'graphic-design',
    image: '/media/services/graphic-design.jpg',
    featured: true,
    title: {
      ar: 'تصميم المفاتيح البصرية الرئيسية (Key Visuals)',
      en: 'Key Visuals & Campaign Graphics Design',
    },
    description: {
      ar: 'ابتكار الصور والمفاهيم البصرية الرائدة التي تشكل العصب البصري للحملات الإعلانية.',
      en: 'Designing lead campaign artwork and visual hooks for major marketing initiatives.',
    },
  },
  {
    id: 'off-marketing-collateral',
    slug: 'marketing-collateral',
    parentServiceSlug: 'graphic-design',
    categorySlug: 'graphic-design',
    image: '/media/services/graphic-design.jpg',
    featured: false,
    title: {
      ar: 'تصميم الكتيبات والمطويات والمطبوعات',
      en: 'Corporate Brochures & Print Collateral',
    },
    description: {
      ar: 'تصميم مطبوعات وكتيبات تعريفية احترافية تعكس جودة الخدمات والمفهوم المؤسسي.',
      en: 'Designing company profiles, annual reports, brochures, and sales toolkits.',
    },
  },

  // 2. Brand Identity Offerings
  {
    id: 'off-logo-system',
    slug: 'logo-brand-system',
    parentServiceSlug: 'brand-identity',
    categorySlug: 'brand-identity',
    image: '/media/services/brand-identity.jpg',
    featured: true,
    title: {
      ar: 'تصميم الشعار وأنظمة العلامة التجارية',
      en: 'Logo Systems & Visual Brand Marks',
    },
    description: {
      ar: 'تطوير شعارات مبتكرة ومرنة تعكس جوهر الشركة وتضمن التميز التنافسي.',
      en: 'Crafting unique vector logo marks and adaptable icon systems for modern brands.',
    },
  },
  {
    id: 'off-brand-guidelines',
    slug: 'brand-guidelines-book',
    parentServiceSlug: 'brand-identity',
    categorySlug: 'brand-identity',
    image: '/media/services/brand-identity.jpg',
    featured: false,
    title: {
      ar: 'إعداد كتاب دليل الهوية البصرية (Brand Guidelines)',
      en: 'Comprehensive Brand Guidelines Manual',
    },
    description: {
      ar: 'توثيق معايير الألوان والخطوط والاستخدامات الصحيحة لضمان حماية اتساق العلامة.',
      en: 'Detailing color systems, font pairings, spacing rules, and usage standards.',
    },
  },

  // 3. Short Video & Reels Offerings
  {
    id: 'off-vertical-reels',
    slug: 'vertical-reels-editing',
    parentServiceSlug: 'short-video-reels',
    categorySlug: 'short-video-reels',
    image: '/media/services/reels-content.jpg',
    featured: true,
    title: {
      ar: 'صناعة مونتاج الريلز والفيديوهات العمودية (9:16)',
      en: 'Vertical Reels & Shorts Motion Editing',
    },
    description: {
      ar: 'مونتاج سريع مع نصوص حركية ومؤثرات صوتية مخصصة لإنستغرام وتيك توك.',
      en: 'Dynamic vertical edits with animated captions, audio hooks, and fast pacing.',
    },
  },
  {
    id: 'off-script-hooks',
    slug: 'short-video-scriptwriting',
    parentServiceSlug: 'short-video-reels',
    categorySlug: 'short-video-reels',
    image: '/media/services/reels-content.jpg',
    featured: false,
    title: {
      ar: 'كتابة سيناريوهات الخطاف (Hook Scriptwriting)',
      en: 'Short Video Scriptwriting & Hook Design',
    },
    description: {
      ar: 'صياغة نصوص قصيرة تركز على الثواني الأولى لزيادة نسبة مشاهدة الفيديو للطرف.',
      en: 'Creating engaging opening hooks and scripts tailored for short-form retention.',
    },
  },

  // 4. Video Production Offerings
  {
    id: 'off-cinematic-commercials',
    slug: 'cinematic-commercial-production',
    parentServiceSlug: 'video-production',
    categorySlug: 'video-production',
    image: '/media/services/video-production.jpg',
    featured: true,
    title: {
      ar: 'تصوير وإنتاج الإعلانات التجارية السينمائية',
      en: 'Cinematic Commercial Video Filming',
    },
    description: {
      ar: 'إنتاج إعلانات عالية الجودة مع إخراج سينمائي وإضاءة احترافية للشركات.',
      en: 'Full production filming of TV and web commercials using cinema equipment.',
    },
  },
  {
    id: 'off-color-grading',
    slug: 'color-grading-post',
    parentServiceSlug: 'video-production',
    categorySlug: 'video-production',
    image: '/media/services/video-production.jpg',
    featured: false,
    title: {
      ar: 'التلوين السينمائي والهندسة الصوتية (Color & Audio)',
      en: 'Cinematic Color Grading & Sound Mastering',
    },
    description: {
      ar: 'معالجة ألوان الفيديوهات وتنسيق المؤثرات الصوتية والمكساج بدرجة احترافية.',
      en: 'Professional DaVinci Resolve color grading and custom sound design mix.',
    },
  },

  // 5. Social Content Offerings
  {
    id: 'off-carousel-design',
    slug: 'social-carousels-infographics',
    parentServiceSlug: 'social-content',
    categorySlug: 'social-content',
    image: '/media/services/social-content.jpg',
    featured: true,
    title: {
      ar: 'تصميم الكاروسيل والإنفوجرافيك السريع',
      en: 'Social Media Carousels & Infographics',
    },
    description: {
      ar: 'تصاميم متعددة الشرائح تشرح المفاهيم المعقدة بطريقة بصرية سهلة وجذابة.',
      en: 'Multi-slide educational and narrative carousels for Instagram and LinkedIn.',
    },
  },
  {
    id: 'off-animated-posts',
    slug: 'motion-social-graphics',
    parentServiceSlug: 'social-content',
    categorySlug: 'social-content',
    image: '/media/services/social-content.jpg',
    featured: false,
    title: {
      ar: 'التصاميم المتحركة لمنشورات التواصل (Motion Posts)',
      en: 'Motion Graphics Social Media Posts',
    },
    description: {
      ar: 'إضافة لمسات موشن جرافيك متحركة تحول المنشورات الثابتة إلى عناصر حركية ملفتة.',
      en: 'Converting static visual posts into engaging 2D motion animated posts.',
    },
  },

  // 6. Social Management Offerings
  {
    id: 'off-channel-publishing',
    slug: 'channel-management-scheduling',
    parentServiceSlug: 'social-management',
    categorySlug: 'social-management',
    image: '/media/services/social-management.jpg',
    featured: true,
    title: {
      ar: 'جدولة وتنظيم النشر عبر المنصات',
      en: 'Social Channel Scheduling & Publishing',
    },
    description: {
      ar: 'تنظيم مواعيد النشر اليومية والأسبوعية لضمان الاستمرارية وتفاعل الجمهور.',
      en: 'Coordinating daily publishing workflows across Instagram, X, LinkedIn, and TikTok.',
    },
  },
  {
    id: 'off-analytics-reporting',
    slug: 'social-analytics-reports',
    parentServiceSlug: 'social-management',
    categorySlug: 'social-management',
    image: '/media/services/social-management.jpg',
    featured: false,
    title: {
      ar: 'إعداد تقارير الأداء والأثر الشهري',
      en: 'Monthly Analytics & Growth Performance Reports',
    },
    description: {
      ar: 'تحليل أرقام الوصول والتفاعل لتقديم توصيات عمل استراتيجية ومستمرة.',
      en: 'Actionable performance tracking reports measuring reach, engagement, and impressions.',
    },
  },

  // 7. Integrated Marketing Offerings
  {
    id: 'off-launch-campaigns',
    slug: 'product-launch-campaigns',
    parentServiceSlug: 'integrated-marketing',
    categorySlug: 'integrated-marketing',
    image: '/media/services/integrated-marketing.jpg',
    featured: true,
    title: {
      ar: 'تخطيط وإطلاق حملات تدشين المنتجات',
      en: 'Product Launch & Activation Campaigns',
    },
    description: {
      ar: 'بناء حملات إعلانية متكاملة لتقديم المنتجات والخدمات الجديدة للسوق بكفاءة.',
      en: 'Designing full-spectrum campaign packages for new product and service launches.',
    },
  },
  {
    id: 'off-seasonal-activations',
    slug: 'seasonal-marketing-campaigns',
    parentServiceSlug: 'integrated-marketing',
    categorySlug: 'integrated-marketing',
    image: '/media/services/integrated-marketing.jpg',
    featured: false,
    title: {
      ar: 'إدارة وتصميم الحملات الترويجية الموسمية',
      en: 'Seasonal & Event Marketing Campaigns',
    },
    description: {
      ar: 'صياغة أفكار إبداعية وتصاميم مرئية للمناسبات الوطنية والأعياد والمواسم.',
      en: 'Executing targeted creative campaigns for national holidays and major corporate events.',
    },
  },
];
