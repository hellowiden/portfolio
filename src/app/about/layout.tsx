//src/app/about/layout.tsx
'use client';

import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center container mx-auto border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <header className="w-full bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">About me</h1>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-6">{children}</main>
    </div>
  );
}
