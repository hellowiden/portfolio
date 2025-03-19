//src/app/components/Header/Header.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 grid grid-cols-[auto_1fr] items-center py-2 px-8 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md bg-white/80 dark:bg-black/70">
      <div className="text-md text-black hover:text-opacity-80 dark:text-white dark:hover:text-opacity-80 transition">
        <button onClick={() => router.push('/')} className="focus:outline-none">
          {isAuthenticated ? `Welcome, ${session.user?.name}` : 'MW-Portfolio'}
        </button>
      </div>

      <nav className="grid grid-flow-col gap-4 justify-end">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <button
                onClick={() => router.push('/dashboard')}
                onMouseEnter={() => setHoveredButton('dashboard')}
                onMouseLeave={() => setHoveredButton(null)}
                aria-label="Go to Dashboard"
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-white bg-zinc-700 hover:bg-zinc-800"
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
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
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
            className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
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
        <ThemeSwitch />
      </nav>
    </header>
  );
}
