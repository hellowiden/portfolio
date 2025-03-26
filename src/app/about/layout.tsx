//src/app/about/layout.tsx

'use client';

import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center container mx-auto border-x backdrop-blur-md bg-[#F1F1F1] dark:bg-[#121212] text-[#121212] dark:text-[#FFFFFF] border-[#E3E3E3] dark:border-[#292929]">
      <main className="container mx-auto flex-grow">{children}</main>
    </div>
  );
}
