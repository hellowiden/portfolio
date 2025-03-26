//src/app/legal/layout.tsx

'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col items-center container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-100/80 dark:bg-secondary-900/80">
      <header className="w-full bg-primary-100 text-primary-900 p-4 dark:bg-secondary-800 dark:text-secondary-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Legal Information</h1>
        </div>
      </header>

      <main className="container mx-auto flex-grow p-6">{children}</main>
    </div>
  );
}
