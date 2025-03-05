// src/app/components/Header/Header.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="grid grid-cols-2 items-center px-4 py-2 border-b border-zinc-300 transition backdrop-blur-md bg-zinc-100 dark:bg-zinc-900">
      {/* Logo / Title */}
      <div className="text-2xl font-bold tracking-tight hover:text-zinc-500 transition">
        <Link href="/">
          {status === 'authenticated'
            ? `Welcome, ${session.user?.name}`
            : 'MW-Portfolio'}
        </Link>
      </div>

      {/* Navigation & Authentication */}
      <nav className="grid grid-flow-col auto-cols-max gap-4 justify-end">
        {status === 'authenticated' && (
          <Link href="/profile">
            <button
              className="rounded-md border px-2 py-1 transition border-zinc-400 bg-zinc-100 text-zinc-900 
                hover:bg-zinc-200 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 
                dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              Profile
            </button>
          </Link>
        )}

        {status !== 'loading' && (
          <button
            onClick={status === 'authenticated' ? () => signOut() : undefined}
            className="rounded-md border px-2 py-1 transition border-zinc-400 bg-zinc-100 text-zinc-900 
                hover:bg-zinc-200 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 
                dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            {status === 'authenticated' ? 'Logout' : 'Login'}
          </button>
        )}
      </nav>
    </header>
  );
}
