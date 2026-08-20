import React from 'react';
import { HomePage } from '@/features/home/home-page';

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <HomePage />;
}
