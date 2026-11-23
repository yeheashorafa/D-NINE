import { redirect } from '@/i18n/navigation';

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/services', locale });
}
