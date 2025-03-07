// src/app/profile/layout.tsx

import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-800 p-6 rounded-md border border-zinc-300 dark:border-zinc-700">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-4">
          User Profile
        </h1>
        {children}
      </div>
    </div>
  );
}
