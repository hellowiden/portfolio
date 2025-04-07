//src/app/profile/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen text-primary-900 dark:text-secondary-50 bg-primary-50 dark:bg-secondary-900">
      {/* Header */}
      <header className="bg-primary-200 dark:bg-secondary-800 text-primary-900 dark:text-white p-4">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">Profile Page</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid gap-6 p-6 border-x border-primary-200 dark:border-secondary-800">
        {children}
      </main>
    </div>
  );
}
