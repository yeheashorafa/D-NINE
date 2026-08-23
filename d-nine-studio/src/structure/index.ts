import { StructureResolver } from 'sanity/structure';
import { singletonListItem } from './singletons.js';
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

const SINGLETON_DOCUMENT_TYPES = ['homePage', 'siteSettings'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('D-NINE Content CMS')
    .items([
      // 1. Singletons Section
      singletonListItem(S, 'homePage', 'Home Page (الصفحة الرئيسية)', HomeIcon),
      singletonListItem(S, 'siteSettings', 'Site Settings & Brand (إعدادات الموقع)', CogIcon),
      S.divider(),

      // 2. Core Taxonomy & Offerings
      S.listItem()
        .title('Categories (التصنيفات الموحدة)')
        .icon(TagIcon)
        .child(
          S.documentTypeList('contentCategory')
            .title('Content Categories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Primary Services (الخدمات الرئيسية)')
        .icon(SparklesIcon)
        .child(
          S.documentTypeList('service')
            .title('Primary Services')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Service Offerings (الخدمات الفرعية)')
        .icon(MasterDetailIcon)
        .child(
          S.documentTypeList('serviceOffering')
            .title('Service Offerings')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),

      // 3. Portfolio & Media
      S.listItem()
        .title('Projects / Portfolio (المشاريع والأعمال)')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // 4. Insights & Blog
      S.listItem()
        .title('Blog Posts (المقالات والأفكار)')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.listItem()
        .title('Authors (فريق التحرير والكتاب)')
        .icon(UserIcon)
        .child(S.documentTypeList('author').title('Authors')),

      // Filter out singletons from any remaining auto-generated lists
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_DOCUMENT_TYPES.includes(listItem.getId() || '') &&
          !['contentCategory', 'service', 'serviceOffering', 'project', 'blogPost', 'author'].includes(listItem.getId() || '')
      ),
    ]);
