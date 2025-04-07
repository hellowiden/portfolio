//src/app/profile/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full container mx-auto border-x dark:border-secondary-800 backdrop-blur-md bg-primary-50 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50">
      {/* Header */}
      <header className="bg-primary-200 dark:bg-secondary-800 text-primary-900 dark:text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Page</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-6">{children}</main>
    </div>
  );
}
