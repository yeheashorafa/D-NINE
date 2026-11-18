import type { Template } from 'sanity';

export const sectorTemplates: Template[] = [
  {
    id: 'sector-events-template',
    title: 'قطاع تنظيم المؤتمرات والمعارض والملتقيات',
    schemaType: 'sectorPage',
    value: {
      title: { ar: 'تنظيم المؤتمرات والمعارض والملتقيات', en: 'Conferences, Exhibitions & Forums Management' },
      slug: { _type: 'slug', current: 'events-exhibitions-conferences' },
      introduction: { ar: 'نخطط وننظم المعارض والمؤتمرات والملتقيات، من تطوير الفكرة والتصور إلى إدارة التنفيذ والتنسيق.', en: 'We plan and manage exhibitions, conferences, and forums—from concept development and creative direction through execution and on-site coordination.' },
      serviceGroups: [{ _type: 'object', _key: 'events-services', items: [
        { _type: 'localizedString', _key: 'event-1', ar: 'تنظيم الملتقيات والمؤتمرات', en: 'Forums and conferences management' },
        { _type: 'localizedString', _key: 'event-2', ar: 'تنظيم المعارض والفعاليات', en: 'Exhibitions and events management' },
        { _type: 'localizedString', _key: 'event-3', ar: 'إعداد التصورات والبرامج التنفيذية', en: 'Concept and execution programme development' },
        { _type: 'localizedString', _key: 'event-4', ar: 'إدارة العمليات والتنسيق الميداني', en: 'Operations and on-site coordination' },
        { _type: 'localizedString', _key: 'event-5', ar: 'تطوير تجارب الحضور', en: 'Attendee experience development' },
        { _type: 'localizedString', _key: 'event-6', ar: 'إدارة الرعايات والشراكات ضمن نطاق المشروع', en: 'Sponsorship and partnership management within the project scope' },
      ] }],
      packages: [], active: true, order: 1,
    },
  },
  {
    id: 'sector-media-template',
    title: 'قطاع الإنتاج الإعلامي والتسويق',
    schemaType: 'sectorPage',
    value: {
      title: { ar: 'الإنتاج الإعلامي والتسويق', en: 'Media Production & Marketing' },
      slug: { _type: 'slug', current: 'media-production-marketing' },
      introduction: { ar: 'نساعد العلامات التجارية والمنشآت على بناء حضورها الرقمي عبر الاستراتيجية والمحتوى والتصميم والإنتاج الإعلامي والتسويق الرقمي.', en: 'We help brands and organisations build a strong digital presence through strategy, content, design, media production, and digital marketing.' },
      serviceGroups: [
        { _type: 'object', _key: 'strategy', title: { ar: 'الاستراتيجية والمحتوى', en: 'Strategy & Content' }, items: [
          { _type: 'localizedString', _key: 'strategy-1', ar: 'الخطط التسويقية', en: 'Marketing plans' }, { _type: 'localizedString', _key: 'strategy-2', ar: 'صناعة الأفكار وكتابة المحتوى', en: 'Concept development and content writing' }, { _type: 'localizedString', _key: 'strategy-3', ar: 'إدارة حسابات التواصل', en: 'Social media management' },
        ] },
        { _type: 'object', _key: 'design', title: { ar: 'التصميم والإبداع', en: 'Design & Creativity' }, items: [
          { _type: 'localizedString', _key: 'design-1', ar: 'الهويات البصرية', en: 'Brand identities' }, { _type: 'localizedString', _key: 'design-2', ar: 'التصميم الإبداعي', en: 'Creative design' }, { _type: 'localizedString', _key: 'design-3', ar: 'الموشن جرافيك', en: 'Motion graphics' },
        ] },
        { _type: 'object', _key: 'production', title: { ar: 'الإنتاج الإعلامي', en: 'Media Production' }, items: [
          { _type: 'localizedString', _key: 'production-1', ar: 'التصوير والتغطيات', en: 'Photography and coverage' }, { _type: 'localizedString', _key: 'production-2', ar: 'المونتاج', en: 'Video editing' }, { _type: 'localizedString', _key: 'production-3', ar: 'إنتاج الفيديوهات التعريفية', en: 'Corporate and profile video production' },
        ] },
        { _type: 'object', _key: 'marketing', title: { ar: 'التسويق الرقمي', en: 'Digital Marketing' }, items: [
          { _type: 'localizedString', _key: 'marketing-1', ar: 'إدارة الحملات الإعلانية', en: 'Advertising campaign management' }, { _type: 'localizedString', _key: 'marketing-2', ar: 'التسويق بالأداء', en: 'Performance marketing' }, { _type: 'localizedString', _key: 'marketing-3', ar: 'التسويق عبر المؤثرين وفق احتياج المشروع', en: 'Influencer marketing tailored to project needs' },
        ] },
      ],
      packages: [
        { _type: 'object', _key: 'presence', title: { ar: 'باقة حضور D9', en: 'D9 Presence Package' }, description: { ar: 'منظومة الحضور الرقمي التي تجمع بين الاستراتيجية والمحتوى والتصميم والفيديو وإدارة الحسابات والتحليل.', en: 'A complete digital presence system combining strategy, content, design, video, account management, and analytics.' } },
        { _type: 'object', _key: 'growth', title: { ar: 'باقة نمو D9', en: 'D9 Growth Package' }, description: { ar: 'منظومة الحضور الرقمي والتسويق بالأداء وإدارة الحملات وتحليل النتائج وتحسين الأداء، إضافة إلى خدمات باقة حضور.', en: 'A growth system combining digital presence, performance marketing, campaign management, results analysis, and continuous optimisation, in addition to all D9 Presence services.' } },
      ],
      active: true, order: 2,
    },
  },
];
