import { StructureResolver } from 'sanity/structure';
import { singletonListItem } from './singletons';
import {
  TagIcon,
  SparklesIcon,
  CaseIcon,
  DocumentTextIcon,
  HomeIcon,
  CogIcon,
  StarIcon,
  UsersIcon,
  UserIcon,
} from '@sanity/icons';

const SINGLETON_DOCUMENT_TYPES = [
  'homePage',
  'aboutPage',
  'servicesPage',
  'workPage',
  'blogPage',
  'contactPage',
  'privacyPage',
  'termsPage',
  'siteSettings'
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('D-NINE CMS (لوحة التحكم)')
    .items([
      // 1. الصفحة الرئيسية (Homepage)
      singletonListItem(S, 'homePage', 'الصفحة الرئيسية', HomeIcon),

      S.divider(),

      // 2. أعمالنا ومشاريعنا (Our Work)
      S.listItem()
        .title('أعمالنا ومشاريعنا')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('أعمالنا ومشاريعنا')
            .items([
              S.documentTypeListItem('project').title('المشاريع والأعمال (Projects)').icon(CaseIcon),
              S.listItem()
                .title('التصنيفات والتخصصات (Categories — 8 Canonical)')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('التصنيفات الثابتة المعتمدة (8 Canonical Categories)')
                    .items([
                      S.documentListItem().schemaType('contentCategory').id('cat-motion-graphics').title('1. الموشن جرافيك (Motion Graphics)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-video-editing').title('2. المونتاج وتحرير الفيديو (Video Editing)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-social-media-design').title('3. تصاميم السوشيال ميديا (Social Media Design)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-print-design').title('4. التصاميم والمطبوعات (Print Design)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-brand-identity').title('5. تصميم الشعارات والهويات البصرية (Brand Identity)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-artificial-intelligence').title('6. الذكاء الاصطناعي والإنتاج الرقمي (Artificial Intelligence)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-exhibitions').title('7. المعارض وتجهيز المساحات (Exhibitions)'),
                      S.documentListItem().schemaType('contentCategory').id('cat-festivals').title('8. المهرجانات والفعاليات (Festivals)'),
                    ])
                ),
            ])
        ),

      // 3. الخدمات (Services)
      S.listItem()
        .title('الخدمات')
        .icon(SparklesIcon)
        .child(
          S.list()
            .title('الخدمات')
            .items([
              S.documentTypeListItem('service').title('قائمة الخدمات (Services)').icon(SparklesIcon),
              S.documentTypeListItem('serviceOffering').title('الخدمات الفرعية (Service Offerings)').icon(SparklesIcon),
            ])
        ),

      // 4. الشركاء (Partners)
      S.documentTypeListItem('partner').title('الشركاء').icon(UsersIcon),

      // 5. آراء العملاء (Testimonials)
      S.documentTypeListItem('testimonial').title('آراء العملاء').icon(StarIcon),

      // 6. المدونة والمقالات (Blog)
      S.listItem()
        .title('المدونة والمقالات')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('المدونة والمقالات')
            .items([
              S.documentTypeListItem('blogPost').title('المقالات (Articles)').icon(DocumentTextIcon),
              S.documentTypeListItem('author').title('الكتّاب (Authors)').icon(UserIcon),
            ])
        ),

      S.divider(),

      // 7. الصفحات التعريفية (Pages)
      S.listItem()
        .title('الصفحات التعريفية')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('الصفحات التعريفية')
            .items([
              singletonListItem(S, 'aboutPage', 'من نحن (About Us)', DocumentTextIcon),
              singletonListItem(S, 'servicesPage', 'صفحة الخدمات العامة (Services Page)', DocumentTextIcon),
              singletonListItem(S, 'workPage', 'صفحة الأعمال العامة (Work Page)', DocumentTextIcon),
              singletonListItem(S, 'blogPage', 'صفحة المدونة العامة (Blog Page)', DocumentTextIcon),
              singletonListItem(S, 'contactPage', 'تواصل معنا (Contact Us)', DocumentTextIcon),
              singletonListItem(S, 'privacyPage', 'سياسة الخصوصية (Privacy Policy)', DocumentTextIcon),
              singletonListItem(S, 'termsPage', 'الشروط والأحكام (Terms & Conditions)', DocumentTextIcon),
            ])
        ),

      // 8. إعدادات الموقع (Site Settings)
      singletonListItem(S, 'siteSettings', 'إعدادات الموقع', CogIcon),

      // Filter out singletons, teamMember (hidden from client), and manually organized types from fallback root list
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_DOCUMENT_TYPES.includes(listItem.getId() || '') &&
          !['contentCategory', 'service', 'serviceOffering', 'project', 'partner', 'blogPost', 'author', 'testimonial', 'teamMember'].includes(listItem.getId() || '')
      ),
    ]);
