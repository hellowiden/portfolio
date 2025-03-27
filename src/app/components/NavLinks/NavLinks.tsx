// src/app/components/NavLinks/NavLinks.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

export default function NavLinks() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const buttonBaseClasses =
    'grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition \
  text-primary-900 bg-primary-200 hover:bg-primary-100 border-primary-200 \
  dark:bg-secondary-800 dark:hover:bg-secondary-700 dark:text-secondary-50 dark:border-secondary-800';

  return (
    <nav className="flex justify-end items-center">
      {/* Large Screen Navigation */}
      <div className="hidden md:flex gap-4">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <button
                onClick={() => router.push('/dashboard')}
                onMouseEnter={() => setHoveredButton('dashboard')}
                onMouseLeave={() => setHoveredButton(null)}
                aria-label="Go to Dashboard"
                className={buttonBaseClasses}
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
              className={buttonBaseClasses}
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
            className={buttonBaseClasses}
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
      </div>

      {/* Small Screen Navigation */}
      <div className="md:hidden">
        <HamburgerMenu />
      </div>
    </nav>
  );
}
