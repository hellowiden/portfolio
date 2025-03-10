'use client';

import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen border-x dark:border-light bg-zinc-100 dark:bg-zinc-800 ">
      {/* Header */}
      <header className="bg-zinc-100 text-zinc-900 shadow-sm p-4 dark:bg-zinc-800 dark:text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Page</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-6">{children}</main>
    </div>
  );
}
