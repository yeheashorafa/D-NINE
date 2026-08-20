import React from 'react';
import { TermsPage } from '@/features/legal/terms-page';

export default async function TermsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <TermsPage />;
}