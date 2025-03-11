'use client';

import { ReactNode } from 'react';

export default function ExperiencesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border-x border-zinc-300 dark:border-zinc-700">
      <header className="p-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white">
        <h1 className="text-2xl font-bold">Experiences</h1>
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
