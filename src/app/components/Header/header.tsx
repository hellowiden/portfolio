//src/app/components/Header/Header.tsx

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');

  return (
    <header className="sticky top-0 z-50 grid grid-cols-[auto_1fr] items-center py-2 px-8 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md bg-white/80 dark:bg-black/70">
      <div className="text-md text-black hover:text-opacity-80 dark:text-white dark:hover:text-opacity-80 transition">
        <Link href="/">
          {isAuthenticated ? `Welcome, ${session.user?.name}` : 'MW-Portfolio'}
        </Link>
      </div>

      <nav className="grid grid-flow-col gap-4 justify-end">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <Link href="/dashboard">
                <button className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 dark:text-white sm:gap-2">
                  <motion.div
                    key="dashboard"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiGrid className="text-lg" />
                  </motion.div>
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
              </Link>
            )}

            <Link href="/profile">
              <button className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2">
                <motion.div
                  key="profile"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiUser className="text-lg" />
                </motion.div>
                <span className="hidden sm:inline">Profile</span>
              </button>
            </Link>
          </>
        )}

        {status !== 'loading' && (
          <button
            onClick={() =>
              isAuthenticated ? signOut({ callbackUrl: '/' }) : signIn()
            }
            className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
          >
            <motion.div
              key="auth"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              {isAuthenticated ? (
                <FiLogOut className="text-lg" />
              ) : (
                <FiLogIn className="text-lg" />
              )}
            </motion.div>
            <span className="hidden sm:inline">
              {isAuthenticated ? 'Logout' : 'Login'}
            </span>
          </button>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
}
