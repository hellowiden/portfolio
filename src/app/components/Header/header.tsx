// src/app/components/Header/Header.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center p-4 border-b border-zinc-300 bg-zinc-100/80 backdrop-blur-md dark:bg-zinc-900/80 transition">
      {/* Logo / Title */}
      <div className="text-2xl font-bold tracking-tight hover:text-zinc-500 transition">
        <Link href="/">
          {status === 'authenticated'
            ? `Welcome, ${session.user?.name}`
            : 'MW-Portfolio'}
        </Link>
      </div>

      {/* Navigation & Authentication */}
      <nav className="flex items-center gap-4">
        {status === 'authenticated' && (
          <Link href="/profile">
            <button
              className="rounded-lg border px-3 py-2 text-sm font-medium transition border-zinc-400 bg-zinc-100 text-zinc-900 
              hover:bg-zinc-200 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 
              dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              Profile
            </button>
          </Link>
        )}

        {status !== 'loading' && (
          <button
            onClick={() =>
              status === 'authenticated'
                ? signOut({ callbackUrl: '/' })
                : signIn()
            }
            className="rounded-lg border px-3 py-1.5 text-sm font-medium transition border-zinc-400 bg-zinc-100 text-zinc-900 
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
