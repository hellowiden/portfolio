'use client';

import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center border-x dark:border-light justify-center bg-zinc-100 dark:bg-zinc-900">
      <main className="w-full p-6">{children}</main>
    </div>
  );
}
