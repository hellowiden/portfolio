//src/app/about/layout.tsx
'use client';

import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-100/80 dark:bg-secondary-900/80">
      <main className="container mx-auto flex-grow">{children}</main>
    </div>
  );
}
