import React from 'react';
import { WorkPage } from '@/features/work/work-page';

export default async function WorkRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <WorkPage />;
}
