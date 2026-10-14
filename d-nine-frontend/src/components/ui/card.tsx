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
    ? 'bg-[var(--theme-card)]/80 backdrop-blur-xl border border-[var(--theme-border)]/80 shadow-sm'
    : 'bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-sm';

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-purple/30 dark:hover:border-brand-cyan/30'
    : '';

  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${glassStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
