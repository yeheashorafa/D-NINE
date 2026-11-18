import type { LocalizedText } from '@/types/localized';

export type SectorSlug = 'events-exhibitions-conferences' | 'media-production-marketing';
export type PortfolioGroupSlug = 'events' | 'identity-design' | 'media-production' | 'content-marketing';

export interface SectorContent {
  slug: SectorSlug;
  title: LocalizedText;
  intro: LocalizedText;
  services: LocalizedText[];
  image: string;
  relatedCategorySlugs: string[];
  packages?: Array<{ title: LocalizedText; description: LocalizedText }>;
}

export const HOME_INTRO = {
  title: {
    ar: 'نصنع التجارب، ونبني الحضور، ونحوّل الأفكار إلى أثر.',
    en: 'We create experiences, build presence, and turn ideas into impact.',
  },
  description: {
    ar: 'من تنظيم الملتقيات والمعارض إلى الإنتاج الإعلامي والتسويق الرقمي، نجمع بين التخطيط والإبداع والتنفيذ لتحويل الأفكار إلى مشاريع متكاملة.',
    en: 'From conferences and exhibitions to media production and digital marketing, we bring planning, creativity, and execution together to transform ideas into integrated projects.',
  },
};

export const SECTORS: SectorContent[] = [
  {
    slug: 'events-exhibitions-conferences',
    title: {
      ar: 'تنظيم المعارض والمؤتمرات والملتقيات',
      en: 'Exhibitions, Conferences & Forums',
    },
    intro: {
      ar: 'نخطط وننظم المعارض والمؤتمرات والملتقيات، من تطوير الفكرة والتصور إلى إدارة التنفيذ والتنسيق.',
      en: 'We plan and deliver exhibitions, conferences, and forums—from concept development through execution management and on-site coordination.',
    },
    services: [
      { ar: 'تنظيم الملتقيات والمؤتمرات', en: 'Forum and conference management' },
      { ar: 'تنظيم المعارض والفعاليات', en: 'Exhibition and event management' },
      { ar: 'إعداد التصورات والبرامج التنفيذية', en: 'Concept and execution programme development' },
      { ar: 'إدارة العمليات والتنسيق الميداني', en: 'Operations and on-site coordination' },
      { ar: 'تطوير تجارب الحضور', en: 'Attendee experience design' },
      { ar: 'إدارة الرعايات والشراكات ضمن نطاق المشروع', en: 'Sponsorship and partnership management within project scope' },
    ],
    image: '/media/work/project-5.jpg',
    relatedCategorySlugs: ['exhibitions', 'festivals'],
  },
  {
    slug: 'media-production-marketing',
    title: {
      ar: 'الإنتاج الإعلامي والتسويق',
      en: 'Media Production & Marketing',
    },
    intro: {
      ar: 'نساعد العلامات التجارية والمنشآت على بناء حضورها الرقمي عبر الاستراتيجية والمحتوى والتصميم والإنتاج الإعلامي والتسويق الرقمي.',
      en: 'We help brands and organisations build a powerful digital presence through strategy, content, design, media production, and digital marketing.',
    },
    services: [
      { ar: 'الخطط التسويقية', en: 'Marketing plans and strategy' },
      { ar: 'صناعة الأفكار وكتابة المحتوى', en: 'Concept development and content writing' },
      { ar: 'إدارة حسابات التواصل', en: 'Social media management' },
      { ar: 'الهويات البصرية والتصميم الإبداعي', en: 'Brand identity and creative design' },
      { ar: 'الموشن جرافيك', en: 'Motion graphics' },
      { ar: 'التصوير والتغطيات والمونتاج', en: 'Photography, coverage, and editing' },
      { ar: 'إنتاج الفيديوهات التعريفية', en: 'Corporate and profile video production' },
      { ar: 'إدارة الحملات الإعلانية والتسويق بالأداء', en: 'Advertising campaign and performance marketing management' },
      { ar: 'التسويق عبر المؤثرين وفق احتياج المشروع', en: 'Influencer marketing tailored to project needs' },
    ],
    packages: [
      {
        title: { ar: 'باقة حضور D9', en: 'D9 Presence Package' },
        description: {
          ar: 'منظومة حضور رقمي تجمع الاستراتيجية والمحتوى والتصميم والفيديو وإدارة الحسابات والتحليل.',
          en: 'An integrated digital presence system combining strategy, content, design, video, account management, and analytics.',
        },
      },
      {
        title: { ar: 'باقة نمو D9', en: 'D9 Growth Package' },
        description: {
          ar: 'منظومة الحضور الرقمي والتسويق بالأداء وإدارة الحملات وتحليل النتائج وتحسين الأداء، إضافة إلى خدمات باقة حضور.',
          en: 'The Presence Package plus performance marketing, campaign management, results analysis, and continuous optimisation.',
        },
      },
    ],
    image: '/media/services/integrated-marketing.jpg',
    relatedCategorySlugs: ['motion-graphics', 'video-editing', 'social-media-design', 'print-design', 'brand-identity', 'artificial-intelligence'],
  },
];

export const WHY_D9 = [
  {
    iconName: 'Route',
    title: { ar: 'التخطيط قبل التنفيذ', en: 'Planning Before Execution' },
    description: { ar: 'نبدأ بفهم احتياج المشروع وأهدافه، ثم نبني التصور والخطة المناسبة قبل الانتقال إلى التنفيذ.', en: 'We begin by understanding the project and its goals, then build the right concept and plan before execution.' },
  },
  {
    iconName: 'Layers3',
    title: { ar: 'الجمع بين التنظيم والإبداع', en: 'Organisation Meets Creativity' },
    description: { ar: 'نقدم حلولًا متكاملة تجمع بين الانضباط التشغيلي والفكر الإبداعي في كل مرحلة.', en: 'We combine operational discipline with creative thinking at every stage.' },
  },
  {
    iconName: 'Puzzle',
    title: { ar: 'حلول متكاملة وفق احتياج المشروع', en: 'Solutions Built Around Your Needs' },
    description: { ar: 'نصمم خدماتنا وفق طبيعة كل مشروع وأهدافه بعيدًا عن الحلول الجاهزة.', en: 'We tailor every service to the project’s nature and objectives—not a one-size-fits-all formula.' },
  },
  {
    iconName: 'BadgeCheck',
    title: { ar: 'جودة التنفيذ والتفاصيل', en: 'Quality in Every Detail' },
    description: { ar: 'نهتم بجودة التنفيذ والتفاصيل التي تصنع تجربة متماسكة ونتيجة تليق بالعلامة.', en: 'We focus on execution quality and the details that create a coherent, brand-worthy result.' },
  },
];

export const ABOUT_CONTENT = {
  intro: {
    ar: 'من تنظيم الملتقيات والمؤتمرات إلى الإنتاج الإعلامي والتسويق الرقمي، تجمع دي ناين بين التخطيط والإبداع والتنفيذ لتحويل الأفكار إلى مشاريع متكاملة.',
    en: 'From forums and conferences to media production and digital marketing, D-NINE combines planning, creativity, and execution to transform ideas into integrated projects.',
  },
  vision: {
    ar: 'أن نكون شريكًا رائدًا في صناعة التجارب وبناء الحضور، وأن نُسهم في تطوير قطاع تنظيم الملتقيات والإنتاج الإعلامي والتسويق من خلال حلول إبداعية ومتكاملة تصنع قيمة وأثرًا مستدامًا.',
    en: 'To be a leading partner in creating experiences and building presence, advancing events, media production, and marketing through integrated creative solutions that deliver lasting value and impact.',
  },
  mission: {
    ar: 'تقديم حلول احترافية ومتكاملة في تنظيم الملتقيات والإنتاج الإعلامي والتسويق الرقمي، من خلال توظيف التخطيط والإبداع والخبرة في تحويل الأفكار إلى مشاريع ناجحة، وبناء شراكات فاعلة، وتحقيق قيمة حقيقية لعملائنا ومجتمعاتهم.',
    en: 'To deliver professional, integrated solutions in event management, media production, and digital marketing—using planning, creativity, and expertise to turn ideas into successful projects, build effective partnerships, and create genuine value for our clients and their communities.',
  },
  whyIntro: {
    ar: 'لأننا نرى أن نجاح المشاريع يبدأ من الفكرة، ويتحقق بالتخطيط، ويكتمل بجودة التنفيذ. نجمع بين التنظيم والإبداع لنرافق عملاءنا من التصور الأولي إلى تحقيق النتائج.',
    en: 'We believe successful projects begin with an idea, take shape through planning, and are completed through quality execution. We unite organisation and creativity to support our clients from first concept to measurable results.',
  },
  advantages: [
    { iconName: 'Layers3', title: { ar: 'رؤية متكاملة', en: 'Integrated Vision' }, description: { ar: 'نربط تنظيم الفعاليات والإنتاج الإعلامي والتسويق الرقمي بحلول مترابطة تخدم أهداف المشروع.', en: 'We connect events, media production, and digital marketing through coherent solutions that serve the project’s goals.' } },
    { iconName: 'Route', title: { ar: 'التخطيط قبل التنفيذ', en: 'Planning Before Execution' }, description: { ar: 'نفهم احتياج العميل وأهدافه ثم نبني التصورات والخطط المناسبة قبل التنفيذ.', en: 'We understand the client and objectives before building the right concept and execution plan.' } },
    { iconName: 'Sparkles', title: { ar: 'الإبداع في التفاصيل', en: 'Creativity in the Details' }, description: { ar: 'نحوّل الأفكار إلى تجارب ومخرجات تعكس هوية المشروع وتحقق أهدافه.', en: 'We turn ideas into experiences and outputs that express the project identity and achieve its goals.' } },
    { iconName: 'Puzzle', title: { ar: 'حلول تناسب احتياجك', en: 'Solutions That Fit' }, description: { ar: 'نصمم خدماتنا وفق طبيعة كل مشروع بعيدًا عن الحلول الجاهزة.', en: 'We tailor services to each project instead of relying on generic packages.' } },
    { iconName: 'Handshake', title: { ar: 'شريكك من الفكرة إلى الإنجاز', en: 'Your Partner from Idea to Delivery' }, description: { ar: 'نرافق رحلة المشروع من تطوير الفكرة والتخطيط إلى التنفيذ والمتابعة.', en: 'We support the project journey from idea development and planning through delivery and follow-up.' } },
    { iconName: 'Target', title: { ar: 'التركيز على الأثر', en: 'Focused on Impact' }, description: { ar: 'نقيس نجاحنا بالقيمة والنتائج التي يحققها المشروع، لا بمجرد إنجاز المهام.', en: 'We measure success by the value and results a project creates—not simply by completing tasks.' } },
  ],
};

export const PORTFOLIO_GROUPS: Array<{ slug: PortfolioGroupSlug; title: LocalizedText; categories: string[] }> = [
  { slug: 'events', title: { ar: 'المعارض والملتقيات والمؤتمرات', en: 'Exhibitions, Forums & Conferences' }, categories: ['exhibitions', 'festivals'] },
  { slug: 'identity-design', title: { ar: 'الهوية والتصاميم', en: 'Brand Identity & Design' }, categories: ['brand-identity', 'print-design'] },
  { slug: 'media-production', title: { ar: 'الفيديو والإنتاج الإعلامي', en: 'Video & Media Production' }, categories: ['motion-graphics', 'video-editing', 'artificial-intelligence'] },
  { slug: 'content-marketing', title: { ar: 'المحتوى والتسويق', en: 'Content & Marketing' }, categories: ['social-media-design'] },
];
