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
    <div className="p-4 h-full border-x dark:border-light bg-white dark:bg-zinc-900">
      {children}
    </div>
  );
}
