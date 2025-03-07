// src/app/components/Header/Header.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');

  return (
    <header className="grid grid-cols-2 items-center px-4 py-2  border-b bg-zinc-100/80 backdrop-blur-md transition">
      {/* Logo / Title */}
      <div className="text-md transition text-black hover:text-opacity-80 ">
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
            className="text-sm bg-zinc-700 text-white p-2 rounded hover:bg-zinc-800 transition"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        )}
      </nav>
    </header>
  );
}
