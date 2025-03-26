//src/app/contact/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full container mx-auto grid grid-rows-[auto_1fr] border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-100/80 dark:bg-secondary-900/80">
      <header className="grid gap-0 w-full bg-primary-200 text-primary-900 dark:bg-secondary-800 dark:text-secondary-50 p-4">
        <h1 className="text-2xl font-bold">Contact Me</h1>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
