//src/app/components/Button/Button.tsx

'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantMap = {
  primary:
    'bg-primary-200 text-primary-900 hover:bg-primary-100 dark:bg-secondary-700 dark:text-secondary-50 dark:hover:bg-secondary-800',
  secondary:
    'bg-primary-100 text-primary-900 hover:bg-primary-200 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-700',
  danger:
    'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
  ghost:
    'bg-transparent text-inherit hover:bg-primary-100 dark:hover:bg-secondary-700',
};

const sizeMap = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-md px-4 py-2',
  lg: 'text-lg px-6 py-3',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const base = `
    rounded font-medium transition
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <button
      type="button"
      className={`${variantMap[variant]} ${sizeMap[size]} ${base} ${
        className ?? ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
