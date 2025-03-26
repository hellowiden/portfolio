//src/app/about/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center container mx-auto border-x border-[#E3E3E3] dark:border-[#191919] backdrop-blur-md bg-[#F1F1F1]/80 dark:bg-[#121212]/80">
      <main className="container mx-auto flex-grow">{children}</main>
    </div>
  );
}
