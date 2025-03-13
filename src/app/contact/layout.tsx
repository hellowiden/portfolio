//src/app/contact/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full grid grid-rows-[auto_1fr] container mx-auto border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      {/* Header */}
      <header className="w-full bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white p-4 grid">
        <div className="container mx-auto grid grid-cols-1">
          <h1 className="text-2xl font-bold">Contact Me</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 grid">{children}</main>
    </div>
  );
}
