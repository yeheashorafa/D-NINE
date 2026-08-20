import React from 'react';
import { PrivacyPage } from '@/features/legal/privacy-page';

export default async function PrivacyRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <PrivacyPage />;
}