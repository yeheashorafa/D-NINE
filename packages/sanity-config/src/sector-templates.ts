import type { Template } from 'sanity';

const service = (key: string, slug: string, iconName: string, ar: string, en: string, descriptionAr: string, descriptionEn: string) => ({
  _type: 'sectorServiceItem', _key: key, slug, iconName,
  title: { _type: 'localizedString', ar, en },
  description: { _type: 'localizedText', ar: descriptionAr, en: descriptionEn },
});

export const sectorTemplates: Template[] = [
  {
    id: 'sector-events-template', title: 'قطاع تنظيم المؤتمرات والمعارض والملتقيات', schemaType: 'sectorPage',
    value: {
      title: { ar: 'تنظيم المؤتمرات والمعارض والملتقيات', en: 'Conferences, Exhibitions & Forums Management' },
      slug: { _type: 'slug', current: 'events-exhibitions-conferences' },
      introduction: { ar: 'نخطط وننظم المعارض والمؤتمرات والملتقيات، من تطوير الفكرة والتصور إلى إدارة التنفيذ والتنسيق.', en: 'We plan and manage exhibitions, conferences, and forums—from concept development through execution and on-site coordination.' },
      serviceGroups: [{ _type: 'object', _key: 'events-services', items: [
        service('event-1', 'forums-conferences', 'Presentation', 'تنظيم الملتقيات والمؤتمرات', 'Forums & Conferences', 'نحوّل أهداف اللقاء إلى برنامج منظم وتجربة متماسكة من التسجيل حتى الختام.', 'We turn event objectives into a coordinated programme and cohesive attendee journey.'),
        service('event-2', 'exhibitions-events', 'PanelsTopLeft', 'تنظيم المعارض والفعاليات', 'Exhibitions & Events', 'نخطط المساحات والتجارب وننسق الموردين لإخراج فعالية واضحة الهوية.', 'We plan spaces, experiences, and suppliers to deliver an event with a clear identity.'),
        service('event-3', 'concepts-programmes', 'ClipboardList', 'إعداد التصورات والبرامج التنفيذية', 'Concepts & Execution Programmes', 'نطوّر التصور الإبداعي وخارطة التنفيذ والجداول والمسؤوليات قبل الانطلاق.', 'We develop the creative concept, delivery roadmap, schedules, and responsibilities.'),
        service('event-4', 'field-operations', 'RadioTower', 'إدارة العمليات والتنسيق الميداني', 'Field Operations', 'ندير فرق التنفيذ والتوقيتات والتنسيق الميداني لضمان سير العمل بسلاسة.', 'We manage crews, timing, and on-site coordination for reliable delivery.'),
        service('event-5', 'attendee-experience', 'UsersRound', 'تطوير تجارب الحضور', 'Attendee Experience', 'نصمم رحلة حضور مريحة وتفاعلية تعزز الانطباع وقيمة المشاركة.', 'We design an engaging attendee journey that strengthens participation and recall.'),
        service('event-6', 'sponsorships-partnerships', 'Handshake', 'إدارة الرعايات والشراكات ضمن نطاق المشروع', 'Sponsorships & Partnerships', 'ننسق فرص الرعاية والشراكات بما يخدم أهداف المشروع ويحفظ وضوح الأدوار.', 'We coordinate sponsorship opportunities around clear project goals and roles.'),
      ] }],
      packages: [], active: true, order: 1,
    },
  },
  {
    id: 'sector-media-template', title: 'قطاع الإنتاج الإعلامي والتسويق', schemaType: 'sectorPage',
    value: {
      title: { ar: 'الإنتاج الإعلامي والتسويق', en: 'Media Production & Marketing' },
      slug: { _type: 'slug', current: 'media-production-marketing' },
      introduction: { ar: 'نساعد العلامات التجارية والمنشآت على بناء حضورها الرقمي عبر الاستراتيجية والمحتوى والتصميم والإنتاج الإعلامي والتسويق الرقمي.', en: 'We help brands build a strong digital presence through strategy, content, design, media production, and digital marketing.' },
      serviceGroups: [
        { _type: 'object', _key: 'strategy', title: { ar: 'الاستراتيجية والمحتوى', en: 'Strategy & Content' }, items: [
          service('strategy-1', 'marketing-plans', 'ChartNoAxesCombined', 'الخطط التسويقية', 'Marketing Plans', 'خطط عملية تربط الأهداف بالجمهور والقنوات ومؤشرات القياس.', 'Actionable plans connecting goals, audiences, channels, and measurement.'),
          service('strategy-2', 'ideas-content', 'Lightbulb', 'صناعة الأفكار وكتابة المحتوى', 'Ideas & Content Writing', 'أفكار ورسائل أصيلة تُصاغ بصوت العلامة وتناسب كل منصة.', 'Original ideas and messages shaped in the brand voice for every channel.'),
          service('strategy-3', 'social-management', 'MessagesSquare', 'إدارة حسابات التواصل', 'Social Media Management', 'إدارة منظمة للنشر والتفاعل والمتابعة وتحسين الأداء.', 'Structured publishing, engagement, monitoring, and optimisation.'),
        ] },
        { _type: 'object', _key: 'design', title: { ar: 'التصميم والإبداع', en: 'Design & Creativity' }, items: [
          service('design-1', 'brand-identities', 'Fingerprint', 'الهويات البصرية', 'Brand Identities', 'أنظمة بصرية متكاملة تعبّر عن شخصية العلامة وتضمن اتساق حضورها.', 'Complete visual systems that express the brand consistently.'),
          service('design-2', 'creative-design', 'Palette', 'التصميم الإبداعي', 'Creative Design', 'تصاميم مبتكرة للحملات والمحتوى والمطبوعات تخدم الرسالة بوضوح.', 'Distinctive campaign, content, and print design built around a clear message.'),
          service('design-3', 'motion-graphics', 'Clapperboard', 'الموشن جرافيك', 'Motion Graphics', 'حركة بصرية مدروسة تبسّط الأفكار وتزيد جاذبية المحتوى.', 'Purposeful motion that simplifies ideas and makes content engaging.'),
        ] },
        { _type: 'object', _key: 'production', title: { ar: 'الإنتاج الإعلامي', en: 'Media Production' }, items: [
          service('production-1', 'photography-coverage', 'Camera', 'التصوير والتغطيات', 'Photography & Coverage', 'تغطية احترافية توثّق اللحظات وتنتج مادة جاهزة للنشر.', 'Professional coverage that delivers publish-ready assets.'),
          service('production-2', 'video-editing', 'Film', 'المونتاج', 'Video Editing', 'بناء إيقاع بصري وسرد واضح يرفع جودة المادة المصورة.', 'Clear visual storytelling and pacing that elevate every asset.'),
          service('production-3', 'profile-videos', 'CirclePlay', 'إنتاج الفيديوهات التعريفية', 'Profile Videos', 'فيديوهات متكاملة من الفكرة والسيناريو حتى النسخة النهائية.', 'End-to-end profile videos, from concept and script to final delivery.'),
        ] },
        { _type: 'object', _key: 'marketing', title: { ar: 'التسويق الرقمي', en: 'Digital Marketing' }, items: [
          service('marketing-1', 'campaign-management', 'Megaphone', 'إدارة الحملات الإعلانية', 'Campaign Management', 'إعداد وتشغيل ومتابعة الحملات عبر القنوات المناسبة للهدف.', 'Planning, launching, and monitoring campaigns across the right channels.'),
          service('marketing-2', 'performance-marketing', 'Gauge', 'التسويق بالأداء', 'Performance Marketing', 'قرارات مبنية على البيانات لتحسين التكلفة والنتائج باستمرار.', 'Data-led optimisation focused on efficiency and measurable outcomes.'),
          service('marketing-3', 'influencer-marketing', 'Users', 'التسويق عبر المؤثرين وفق احتياج المشروع', 'Influencer Marketing', 'اختيار وإدارة التعاونات المؤثرة وفق الجمهور والهدف ونطاق المشروع.', 'Creator partnerships selected and managed around audience and goals.'),
        ] },
      ],
      packages: [
        { _type: 'object', _key: 'presence', title: { ar: 'باقة حضور D9', en: 'D9 Presence Package' }, description: { ar: 'منظومة حضور رقمي تجمع الاستراتيجية والمحتوى والتصميم والفيديو وإدارة الحسابات والتحليل.', en: 'A digital presence system combining strategy, content, design, video, account management, and analytics.' } },
        { _type: 'object', _key: 'growth', title: { ar: 'باقة نمو D9', en: 'D9 Growth Package' }, description: { ar: 'خدمات باقة حضور مع التسويق بالأداء وإدارة الحملات وتحليل النتائج وتحسينها.', en: 'D9 Presence plus performance marketing, campaign management, analysis, and optimisation.' } },
      ],
      active: true, order: 2,
    },
  },
];
