'use client';

import { useEffect, useState } from 'react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.04 2.67A13.3 13.3 0 0 0 4.49 22.58L2.6 29.5l7.08-1.86a13.3 13.3 0 1 0 6.36-24.97Zm0 24.18a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.2 1.1 1.12-4.1-.26-.42a10.9 10.9 0 1 1 9.3 5.18Zm5.98-8.16c-.33-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62a9.85 9.85 0 0 1-1.82-2.27c-.19-.33-.02-.5.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.15 1.12-1.15 2.74s1.18 3.18 1.34 3.4c.16.22 2.32 3.54 5.62 4.97.79.34 1.4.54 1.88.69.79.25 1.5.22 2.07.13.63-.09 1.94-.79 2.21-1.56.27-.77.27-1.42.19-1.56-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

function normalizeWhatsApp(value?: string) {
  const digits = (value || '+966 50 273 2528').replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

export function WhatsAppFloat({ number }: { number?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <a href={normalizeWhatsApp(number)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 flex items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}><WhatsAppIcon className="w-8 h-8" /></a>;
}
