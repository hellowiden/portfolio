//src/app/profile/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-900 text-primary-900 dark:text-secondary-50 flex flex-col">
      <header className="px-4 py-3 sm:px-6 border-b border-primary-200 dark:border-secondary-700 bg-primary-200 dark:bg-secondary-800">
        <h1 className="text-xl sm:text-2xl font-bold">Profile Page</h1>
      </header>
      <main className="flex-grow px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
