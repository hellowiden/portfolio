// src/app/components/Header/Header.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NavLinks from '../NavLinks/NavLinks';

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <header className="sticky top-0 z-50 grid grid-cols-[auto_1fr] items-center py-2 px-8 border-b border-primary-200 dark:border-secondary-700 bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50">
      <div className="hover:opacity-80 transition">
        <button onClick={() => router.push('/')} className="focus:outline-none">
          {isAuthenticated ? `Welcome, ${session.user?.name}` : 'MW-Portfolio'}
        </button>
      </div>
      <NavLinks />
    </header>
  );
}
