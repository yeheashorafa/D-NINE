import React from 'react';
import { AboutPage } from '@/features/about/about-page';

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <AboutPage />;
}
