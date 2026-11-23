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
  DropIcon,
} from '@sanity/icons';
import { InboundMessagesPanel } from '../components/InboundMessagesPanel';

const SINGLETON_DOCUMENT_TYPES = [
  'homePage',
  'aboutPage',
  'servicesPage',
  'workPage',
  'blogPage',
  'contactPage',
  'privacyPage',
  'termsPage',
  'siteSettings',
  'themeSettings',
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
                .title('تصنيفات الأعمال (4 فقط)')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('التصنيفات الثابتة المعتمدة')
                    .items([
                      S.documentListItem().schemaType('contentCategory').id('cat-events').title('1. المعارض والملتقيات والمؤتمرات'),
                      S.documentListItem().schemaType('contentCategory').id('cat-identity-design').title('2. الهوية والتصاميم'),
                      S.documentListItem().schemaType('contentCategory').id('cat-media-production').title('3. الفيديو والإنتاج الإعلامي'),
                      S.documentListItem().schemaType('contentCategory').id('cat-content-marketing').title('4. المحتوى والتسويق'),
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
              S.documentTypeListItem('sectorPage').title('القطاعان والخدمات الفرعية').icon(DocumentTextIcon),
            ])
        ),

      // 4. الشركاء (Partners)
      S.documentTypeListItem('partner').title('الشركاء').icon(UsersIcon),

      // 5. آراء العملاء (Testimonials)
      S.documentTypeListItem('testimonial').title('آراء العملاء').icon(StarIcon),

      S.listItem()
        .title('الرسائل الواردة')
        .icon(DocumentTextIcon)
        .child(S.component(InboundMessagesPanel).title('الرسائل الواردة')),

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

      // 8. ألوان وهوية الموقع (Theme Settings)
      singletonListItem(S, 'themeSettings', 'ألوان وهوية الموقع', DropIcon),

      // 9. إعدادات الموقع (Site Settings)
      singletonListItem(S, 'siteSettings', 'إعدادات الموقع', CogIcon),

      // Filter out singletons and manually organized types from fallback root list
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_DOCUMENT_TYPES.includes(listItem.getId() || '') &&
          !['contentCategory', 'sectorPage', 'project', 'partner', 'blogPost', 'author', 'testimonial'].includes(listItem.getId() || '')
      ),
    ]);
