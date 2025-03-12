//src/app/legal/layout.tsx

'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col items-center border-x dark:border-light justify-center bg-zinc-100 dark:bg-zinc-900">
      {/* Header */}
      <header className="w-full bg-zinc-100 text-zinc-900 shadow-sm p-4 dark:bg-zinc-800 dark:text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Legal Information</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-6">{children}</main>
    </div>
  );
}
