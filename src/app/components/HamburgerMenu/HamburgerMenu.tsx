'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiUser, FiLogIn, FiLogOut, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="p-2 rounded border bg-zinc-100 dark:bg-zinc-700 dark:text-white"
      >
        {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 p-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded shadow grid gap-2 z-50">
          {isAuthenticated && (
            <>
              {isAdmin && (
                <MenuButton
                  icon={<FiGrid />}
                  label="Dashboard"
                  onClick={() => handleNavigation('/dashboard')}
                />
              )}
              <MenuButton
                icon={<FiUser />}
                label="Profile"
                onClick={() => handleNavigation('/profile')}
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
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-left"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
