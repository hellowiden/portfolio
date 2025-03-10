'use client';

import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen border-x dark:border-light bg-zinc-100 dark:bg-zinc-800 ">
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
