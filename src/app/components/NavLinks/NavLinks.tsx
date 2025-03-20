// src/app/components/NavLinks/NavLinks.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function NavLinks() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <nav className="grid grid-flow-col gap-4 justify-end items-center">
      {isAuthenticated && (
        <>
          {isAdmin && (
            <button
              onClick={() => router.push('/dashboard')}
              onMouseEnter={() => setHoveredButton('dashboard')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Go to Dashboard"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
            >
              <motion.div
                key={hoveredButton === 'dashboard' ? 'hover' : 'dashboard'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiGrid className="text-lg" />
              </motion.div>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}

          <button
            onClick={() => router.push('/profile')}
            onMouseEnter={() => setHoveredButton('profile')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Go to Profile"
            className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
          >
            <motion.div
              key={hoveredButton === 'profile' ? 'hover' : 'profile'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiUser className="text-lg" />
            </motion.div>
            <span className="hidden sm:inline">Profile</span>
          </button>
        </>
      )}

      {status !== 'loading' && (
        <button
          onClick={() =>
            isAuthenticated ? signOut({ callbackUrl: '/' }) : signIn()
          }
          onMouseEnter={() => setHoveredButton('auth')}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label={isAuthenticated ? 'Logout' : 'Login'}
          className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
        >
          <motion.div
            key={hoveredButton === 'auth' ? 'hover' : 'auth'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
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

      {/* Theme Switch */}
      <ThemeSwitch />
    </nav>
  );
}
