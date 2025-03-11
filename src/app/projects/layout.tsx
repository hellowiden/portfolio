'use client';

import { ReactNode } from 'react';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-x dark:border-light">
      <header className="p-4 border-b border-light dark:border-dark bg-white dark:bg-zinc-800">
        <h1 className="text-2xl font-bold">Projects</h1>
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
