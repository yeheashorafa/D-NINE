import localFont from 'next/font/local';

/**
 * IBM Plex Sans Font Licensing Note:
 * IBM Plex Sans (Arabic & Latin) is licensed under the SIL Open Font License, Version 1.1.
 * Copyright (c) 2017 IBM Corp. with Reserved Font Name 'Plex'.
 * This internal note documents compliance and must not be rendered to end users.
 */

export const ibmPlexSansArabic = localFont({
  src: [
    {
      path: '../assets/fonts/ibm-plex-sans/arabic/IBMPlexSansArabic-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/arabic/IBMPlexSansArabic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/arabic/IBMPlexSansArabic-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/arabic/IBMPlexSansArabic-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/arabic/IBMPlexSansArabic-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
});

export const ibmPlexSansEnglish = localFont({
  src: [
    {
      path: '../assets/fonts/ibm-plex-sans/latin/IBMPlexSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/latin/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/latin/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/latin/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ibm-plex-sans/latin/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-latin',
  display: 'swap',
});