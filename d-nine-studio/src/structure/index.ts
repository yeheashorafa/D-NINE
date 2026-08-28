import { StructureResolver } from 'sanity/structure';
import { singletonListItem } from './singletons';
import {
  TagIcon,
  SparklesIcon,
  MasterDetailIcon,
  CaseIcon,
  DocumentTextIcon,
  UserIcon,
  HomeIcon,
  CogIcon,
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
      S.listItem()
        .title('الصفحات (Pages)')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('الصفحات')
            .items([
              singletonListItem(S, 'homePage', 'الصفحة الرئيسية', HomeIcon),
              singletonListItem(S, 'aboutPage', 'من نحن', DocumentTextIcon),
              singletonListItem(S, 'servicesPage', 'الخدمات', DocumentTextIcon),
              singletonListItem(S, 'workPage', 'أعمالنا', DocumentTextIcon),
              singletonListItem(S, 'blogPage', 'المدونة', DocumentTextIcon),
              singletonListItem(S, 'contactPage', 'تواصل معنا', DocumentTextIcon),
              singletonListItem(S, 'privacyPage', 'سياسة الخصوصية', DocumentTextIcon),
              singletonListItem(S, 'termsPage', 'الشروط والأحكام', DocumentTextIcon),
            ])
        ),
      
      S.divider(),

      S.listItem()
        .title('إدارة المحتوى (Content)')
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title('إدارة المحتوى')
            .items([
              S.documentTypeListItem('service').title('الخدمات الرئيسية (Primary Services)').icon(SparklesIcon),
              S.documentTypeListItem('serviceOffering').title('الخدمات الفرعية (Service Offerings)').icon(MasterDetailIcon),
              S.documentTypeListItem('project').title('المشاريع والأعمال (Projects)').icon(CaseIcon),
              S.documentTypeListItem('blogPost').title('مقالات المدونة (Blog Posts)').icon(DocumentTextIcon),
              S.documentTypeListItem('author').title('الكتّاب (Authors)').icon(UserIcon),
              S.documentTypeListItem('contentCategory').title('التصنيفات (Categories)').icon(TagIcon),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('الإعدادات (Settings)')
        .icon(CogIcon)
        .child(
          S.list()
            .title('الإعدادات')
            .items([
              singletonListItem(S, 'siteSettings', 'إعدادات الموقع (Site Settings)', CogIcon),
            ])
        ),

      // Filter out singletons from any remaining auto-generated lists
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_DOCUMENT_TYPES.includes(listItem.getId() || '') &&
          !['contentCategory', 'service', 'serviceOffering', 'project', 'blogPost', 'author'].includes(listItem.getId() || '')
      ),
    ]);
