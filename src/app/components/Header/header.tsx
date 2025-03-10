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
    <header className="sticky top-0 z-50 grid grid-cols-[auto_1fr] items-center py-2 px-8 border-b border-zinc-200 dark:border-zinc-800 transition backdrop-blur-md bg-white/80 dark:bg-black/70">
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
                <button className="flex items-center gap-2 p-2 text-sm border dark:border-light rounded transition text-black dark:text-white hover:text-opacity-80 dark:hover:text-opacity-80">
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
              <button className="flex items-center gap-2 p-2 text-sm border dark:border-light rounded transition text-black dark:text-white hover:text-opacity-80 dark:hover:text-opacity-80">
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
            className="flex items-center gap-2 p-2 text-sm border dark:border-light rounded transition text-black dark:text-white hover:text-opacity-80 dark:hover:text-opacity-80"
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
