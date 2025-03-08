import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full grid place-items-center p-6">
      <div
        role="main"
        className="max-w-4xl w-full bg-white dark:bg-zinc-800 p-6 rounded border border-zinc-300 dark:border-zinc-700 grid gap-4"
      >
        <p className="text-center text-zinc-900 dark:text-zinc-100 font-semibold">
          Your Profile
        </p>
        {children}
      </div>
    </div>
  );
}
