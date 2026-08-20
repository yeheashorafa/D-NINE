import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'cyan' | 'gradient' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  className = ''
}) => {
  const variantStyles = {
    purple:
      'bg-purple-100 dark:bg-purple-950/60 text-brand-purple dark:text-purple-300 border-purple-200 dark:border-purple-800/50',
    cyan:
      'bg-cyan-100 dark:bg-cyan-950/60 text-deep-cyan dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50',
    gradient:
      'bg-gradient-to-r from-brand-purple/15 to-brand-cyan/15 text-slate-900 dark:text-white border-brand-purple/20 dark:border-brand-cyan/30',
    slate:
      'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60'
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-solid tracking-wide transition-colors ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
