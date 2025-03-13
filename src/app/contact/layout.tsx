//src/app/contact/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full container mx-auto grid grid-rows-[auto_1fr] border-x border-zinc-300 dark:border-zinc-700 backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      {/* Header */}
      <header className="w-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white p-4">
        <h1 className="text-2xl font-bold">Contact Me</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
