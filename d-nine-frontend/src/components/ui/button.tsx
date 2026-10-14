import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function getButtonClasses({
  variant = 'primary',
  size = 'md',
  className = ''
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} = {}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5'
  }[size];

  const variantStyles = {
    primary:
      'bg-[var(--theme-button-primary-bg)] text-[var(--theme-button-primary-text)] shadow-md hover:opacity-90 hover:shadow-lg focus:ring-[var(--theme-primary)]/50 border border-white/10',
    secondary:
      'bg-[var(--theme-button-secondary-bg)] text-[var(--theme-button-secondary-text)] shadow-md hover:opacity-90 focus:ring-[var(--theme-secondary)]/50',
    outline:
      'border-2 border-[var(--theme-primary)]/40 dark:border-[var(--theme-secondary)]/40 text-[var(--theme-primary)] dark:text-[var(--theme-secondary)] hover:bg-[var(--theme-primary)]/10 dark:hover:bg-[var(--theme-secondary)]/10 focus:ring-[var(--theme-primary)]/50',
    ghost:
      'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:ring-slate-400',
    dark:
      'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-md focus:ring-slate-700'
  }[variant];

  return `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const classes = getButtonClasses({ variant, size, className });

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
};

