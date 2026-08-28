'use client';

import React from 'react';
// import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

export interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder: string;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full ps-11 pe-10 py-3.5 rounded-full bg-surface dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan shadow-sm transition-all"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 end-0 flex items-center pe-4 text-slate-400 hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
