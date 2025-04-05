//src/app/components/Button/Button.tsx

//  THIS WILL BECOME CENTRILISED BUTTON NOT IMPLEMENTED!

'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'rounded font-medium transition focus:outline-none focus:ring-0 disabled:opacity-50';

  const variantClasses =
    variant === 'primary'
      ? 'bg-primary-200 text-primary-900 hover:bg-primary-100 dark:bg-secondary-700 dark:text-secondary-50 dark:hover:bg-secondary-800'
      : variant === 'secondary'
      ? 'bg-primary-100 text-primary-900 hover:bg-primary-200 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-700'
      : variant === 'danger'
      ? 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
      : 'bg-transparent text-inherit hover:bg-primary-100 dark:hover:bg-secondary-700'; // ghost

  const sizeClasses =
    size === 'sm'
      ? 'text-sm px-3 py-1.5'
      : size === 'lg'
      ? 'text-base px-6 py-3'
      : 'text-sm px-4 py-2';

  return (
    <button
      className={`${base} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
