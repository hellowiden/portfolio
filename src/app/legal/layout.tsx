//src/app/legal/layout.tsx

'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col items-center container mx-auto border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <header className="w-full bg-zinc-100 text-zinc-900 shadow-sm p-4 dark:bg-zinc-800 dark:text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Legal Information</h1>
        </div>
      </header>

      <main className="container mx-auto flex-grow p-6">{children}</main>
    </div>
  );
}
