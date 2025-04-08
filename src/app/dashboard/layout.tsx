//src/app/dashboard/layout.tsx

'use client';

import { ReactNode, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/Button/Button';

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
    else if (status === 'authenticated' && !isAdmin) router.replace('/');
  }, [status, isAdmin, router]);

  if (status === 'loading' || !isAdmin) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full bg-primary-100 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50 gap-4">
      <aside className="grid grid-rows-[auto_auto_1fr] gap-4 w-full md:w-64 bg-primary-200 border-r border-primary-200 dark:bg-secondary-800 dark:border-secondary-700 p-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="grid gap-2">
          {['Dashboard', 'Users', 'Projects', 'Messages', 'Experiences'].map(
            (label) => (
              <NavItem
                key={label}
                href={`/dashboard/${label.toLowerCase()}`}
                label={label}
              />
            )
          )}
        </nav>
      </aside>
      <main className="p-4">{children}</main>
    </div>
  );
}

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href}>
    <Button
      variant="secondary"
      size="sm"
      className="w-full justify-start text-left"
    >
      {label}
    </Button>
  </Link>
);
