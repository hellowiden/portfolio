// src/app/components/Header/Header.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');

  return (
    <header className="grid grid-cols-2 items-center p-4 border-b border-zinc-300 bg-zinc-100/80 backdrop-blur-md transition">
      {/* Logo / Title */}
      <div className="text-2xl text-zinc-900 font-bold tracking-tight hover:text-zinc-500 transition">
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
                <button
                  className="rounded-lg border px-3 py-2 text-sm font-medium transition border-zinc-400 bg-zinc-100 text-zinc-900 
                    hover:bg-zinc-200 hover:text-zinc-700"
                >
                  Dashboard
                </button>
              </Link>
            )}
            <Link href="/profile">
              <button
                className="rounded-lg border px-3 py-2 text-sm font-medium transition border-zinc-400 bg-zinc-100 text-zinc-900 
                  hover:bg-zinc-200 hover:text-zinc-700"
              >
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
            className="rounded-lg border px-3 py-2 text-sm font-medium transition border-zinc-500 bg-zinc-900 text-white 
              hover:bg-zinc-800 hover:border-zinc-600"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        )}
      </nav>
    </header>
  );
}
