// src/app/components/Header/Header.tsx

'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NavLinks from '../NavLinks/NavLinks';
import Button from '@/app/components/Button/Button';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header
      role="header"
      aria-label="Main header"
      className="sticky top-0 z-50 grid grid-cols-[auto_1fr] items-center py-2 px-8 border-b border-primary-200 dark:border-secondary-700 text-lg bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50"
    >
      <div className="hover:opacity-80 transition">
        <Link href="/" aria-label="Homepage">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 font-bold"
          >
            {status === 'authenticated'
              ? `Welcome, ${session.user?.name}`
              : 'MW-Portfolio'}
          </Button>
        </Link>
      </div>
      <NavLinks />
    </header>
  );
}
