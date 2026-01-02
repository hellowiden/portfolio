// src/app/components/NavLinks/NavLinks.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Button from '../Button/Button';

export default function NavLinks() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? '/dashboard';
  const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL ?? '/';

  const goToDashboard = () => {
    if (dashboardUrl.startsWith('http')) {
      window.location.assign(dashboardUrl);
      return;
    }
    router.push(dashboardUrl);
  };

  return (
    <nav className="grid justify-end items-center">
      {/* Large Screen Navigation */}
      <div className="hidden md:grid md:grid-flow-col md:gap-4">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <Button
                onClick={goToDashboard}
                onMouseEnter={() => setHoveredButton('dashboard')}
                onMouseLeave={() => setHoveredButton(null)}
                aria-label="Go to Dashboard"
                variant="ghost"
                size="sm"
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2"
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
              </Button>
            )}

            <Button
              onClick={() => router.push('/profile')}
              onMouseEnter={() => setHoveredButton('profile')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Go to Profile"
              variant="ghost"
              size="sm"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2"
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
            </Button>
          </>
        )}

        {status !== 'loading' && (
          <Button
            onClick={() =>
              isAuthenticated
                ? signOut({ callbackUrl: marketingUrl })
                : signIn()
            }
            onMouseEnter={() => setHoveredButton('auth')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label={isAuthenticated ? 'Logout' : 'Login'}
            variant="ghost"
            size="sm"
            className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2"
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
          </Button>
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
