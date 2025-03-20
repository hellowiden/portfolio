'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiUser, FiLogIn, FiLogOut, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="p-2 border rounded bg-zinc-100 dark:bg-zinc-700 dark:text-white"
      >
        {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded shadow-lg flex flex-col p-2">
          {isAuthenticated && (
            <>
              {isAdmin && (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <FiGrid />
                  <span>Dashboard</span>
                </button>
              )}
              <button
                onClick={() => router.push('/profile')}
                className="flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <FiUser />
                <span>Profile</span>
              </button>
            </>
          )}

          <button
            onClick={() =>
              isAuthenticated ? signOut({ callbackUrl: '/' }) : signIn()
            }
            className="flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {isAuthenticated ? <FiLogOut /> : <FiLogIn />}
            <span>{isAuthenticated ? 'Logout' : 'Login'}</span>
          </button>

          <div className="p-2">
            <ThemeSwitch />
          </div>
        </div>
      )}
    </div>
  );
}
