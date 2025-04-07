//src/app/about/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-900 text-primary-900 dark:text-secondary-50 flex flex-col">
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
