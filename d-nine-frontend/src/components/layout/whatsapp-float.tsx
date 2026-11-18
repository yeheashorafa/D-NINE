'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

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
  return <a href={normalizeWhatsApp(number)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 flex items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}><MessageCircle className="w-7 h-7" aria-hidden="true" /></a>;
}
