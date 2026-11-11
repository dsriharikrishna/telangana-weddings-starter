'use client';

import React from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

export function AdminLanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        'inline-flex items-center p-1 bg-stone-100/90 rounded-xl border border-stone-200/80 text-xs font-semibold select-none shadow-xs',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer',
          language === 'en'
            ? 'bg-white text-stone-900 shadow-xs font-bold'
            : 'text-stone-500 hover:text-stone-800'
        )}
      >
        <span>English</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('te')}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-telugu',
          language === 'te'
            ? 'bg-[#762B46] text-white shadow-xs font-bold'
            : 'text-stone-500 hover:text-stone-800'
        )}
      >
        <span>తెలుగు</span>
      </button>
    </div>
  );
}

