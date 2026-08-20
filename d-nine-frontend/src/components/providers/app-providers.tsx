'use client';

import React from 'react';
import { ThemeProvider } from './theme-provider';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
