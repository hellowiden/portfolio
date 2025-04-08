//src/app/legal/layout.tsx

'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto h-full p-6 gap-6 border-x border-primary-200 dark:border-secondary-700 bg-primary-100 dark:bg-secondary-900">
      <header className="w-full bg-primary-100 text-primary-900 p-4 dark:bg-secondary-800 dark:text-secondary-50">
        <div className="grid grid-cols-[1fr] items-center gap-0">
          <h1 className="text-2xl font-bold m-0">Legal Information</h1>
        </div>
      </header>

      <main className="grid w-full p-6">{children}</main>
    </div>
  );
}
