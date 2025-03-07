// src/app/components/Header/Header.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 items-center px-4 py-2 border-b bg-zinc-100/80 dark:bg-zinc-900 backdrop-blur-md transition">
      {/* Logo / Title */}
      <div className="text-md text-zinc-700 dark:text-zinc-300 p-2 rounded transition">
        <Link href="/">
          {isAuthenticated ? `Welcome, ${session.user?.name}` : 'MW-Portfolio'}
        </Link>
      </div>

      {/* Navigation & Authentication */}
      <nav className="grid grid-flow-col auto-cols-max gap-4 justify-end">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <Link href="/dashboard">
                <button className="text-sm border border-zinc-700 dark:border-zinc-300 text-zinc-700 dark:text-zinc-300 hover:text-zinc-100 dark:hover:text-zinc-900 p-2 rounded hover:bg-zinc-800 dark:hover:bg-zinc-100 transition">
                  Dashboard
                </button>
              </Link>
            )}
            <Link href="/profile">
              <button className="text-sm border border-zinc-700 dark:border-zinc-300 text-zinc-700 dark:text-zinc-300 hover:text-zinc-100 dark:hover:text-zinc-900 p-2 rounded hover:bg-zinc-800 dark:hover:bg-zinc-100 transition">
                Profile
              </button>
            </Link>
          </>
        )}

        {status !== 'loading' && (
          <button
            onClick={() =>
              isAuthenticated ? signOut({ callbackUrl: '/' }) : signIn()
            }
            className="text-sm bg-zinc-700 dark:bg-zinc-300 text-white dark:text-zinc-900 p-2 rounded hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
}
