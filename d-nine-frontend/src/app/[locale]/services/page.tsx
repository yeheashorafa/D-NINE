import React from 'react';
import { ServicesPage } from '@/features/services/services-page';

export default async function ServicesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <ServicesPage />;
}
