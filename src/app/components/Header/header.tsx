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
    <header className="sticky top-0 z-50 grid grid-cols-2 items-center px-4 py-2 border-b border-light dark:border-dark transition backdrop-blur-md bg-white/70 dark:bg-black/70">
      {/* Logo / Title */}
      <div className="text-md transition text-black hover:text-opacity-80 dark:text-white dark:hover:text-opacity-80">
        <Link href="/">
          {isAuthenticated ? `Welcome, ${session.user?.name}` : 'MW-Portfolio'}
        </Link>
      </div>

      {/* Navigation & Authentication */}
      <nav className="grid grid-flow-col gap-4 justify-end">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <Link href="/dashboard">
                <button className="p-2 text-sm border border-zinc-700 text-black dark:text-white hover:text-opacity-80  dark:hover:text-opacity-80 rounded transition ">
                  Dashboard
                </button>
              </Link>
            )}
            <Link href="/profile">
              <button className="p-2 text-sm border border-zinc-700 rounded transition text-black dark:text-white hover:text-opacity-80  dark:hover:text-opacity-80">
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
            className="p-2 text-sm border border-green bg-green text-white rounded hover:bg-green-600 dark:hover:bg-green-400 transition  dark:text-white hover:text-opacity-80  dark:hover:text-opacity-80"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
}
