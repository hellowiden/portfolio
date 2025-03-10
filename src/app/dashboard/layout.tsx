'use client';

import { ReactNode, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    } else if (status === 'authenticated' && !isAdmin) {
      router.replace('/');
    }
  }, [status, isAdmin, router]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return null;

  return (
    <div className="h-full border-x dark:border-light bg-white dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      {children}
    </div>
  );
}
