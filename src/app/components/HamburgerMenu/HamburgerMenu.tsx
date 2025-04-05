//src/app/components/HamburgerMenu/HamburgerMenu.tsx

'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiUser, FiLogIn, FiLogOut, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import Button from '../Button/Button'; // Import centralized button

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.roles?.includes('admin');

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: '/' });
    } else {
      signIn();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        variant="secondary"
        size="sm"
        className="p-2"
      >
        {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 p-3 bg-primary-50 dark:bg-secondary-800 border border-primary-200 dark:border-secondary-800 rounded shadow grid gap-2 z-50 text-primary-900 dark:text-secondary-50">
          {isAuthenticated && (
            <>
              {isAdmin && (
                <MenuButton
                  icon={<FiGrid />}
                  label="Dashboard"
                  onClick={() => handleNavigation('/dashboard')}
                  active={pathname === '/dashboard'}
                />
              )}
              <MenuButton
                icon={<FiUser />}
                label="Profile"
                onClick={() => handleNavigation('/profile')}
                active={pathname === '/profile'}
              />
            </>
          )}

          <MenuButton
            icon={isAuthenticated ? <FiLogOut /> : <FiLogIn />}
            label={isAuthenticated ? 'Logout' : 'Login'}
            onClick={handleAuth}
          />

          <div className="grid">
            <ThemeSwitch />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={`grid grid-cols-[auto_1fr] items-center gap-2 text-left ${
        active
          ? 'bg-primary-200 dark:bg-secondary-700 font-semibold'
          : 'hover:bg-primary-100 dark:hover:bg-secondary-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
