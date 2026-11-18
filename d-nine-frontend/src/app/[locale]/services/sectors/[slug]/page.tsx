import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stegaClean } from '@sanity/client/stega';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/seo';
import { DEFAULT_SECTORS } from '@/features/sectors/sector-content';
import { SectorPage } from '@/features/sectors/sector-page';
import { getSector, isSectorSlug } from '@/sanity/services/sector.service';
import { getAllProjects } from '@/services/content/projects.service';
import { getCategories } from '@/services/content/categories.service';

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => DEFAULT_SECTORS.map((sector) => ({ locale, slug: sector.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSectorSlug(slug)) return {};
  const sector = await getSector(slug, { stega: false });
  if (!sector) return {};
  const lang = locale === 'ar' ? 'ar' : 'en';
  return constructMetadata({ title: stegaClean(`${sector.title[lang]} | D-NINE`), description: stegaClean(sector.introduction[lang]), locale, path: `/services/sectors/${slug}` });
}

export default async function SectorRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSectorSlug(slug)) notFound();
  const [sector, projects, categories] = await Promise.all([getSector(slug), getAllProjects(), getCategories()]);
  if (!sector) notFound();
  return <SectorPage sector={sector} projects={projects} categories={categories} />;
}
