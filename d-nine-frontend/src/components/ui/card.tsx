import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glassmorphism?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glassmorphism = true
}) => {
  const glassStyles = glassmorphism
    ? 'bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm'
    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm';

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-purple/30 dark:hover:border-brand-cyan/30'
    : '';

  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${glassStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
