//src/app/dashboard/layout.tsx

'use client';

import { ReactNode, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAdmin = useMemo(() => {
    return session?.user?.roles.includes('admin');
  }, [session]);

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white gap-4">
      {/* SIDEBAR NAVIGATION */}
      <aside className="grid grid-rows-[auto_auto_1fr] gap-4 w-64 bg-zinc-200 dark:bg-zinc-800 border-r dark:border-zinc-700 p-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="grid gap-2">
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/dashboard/users" label="Users" />
          <NavItem href="/dashboard/projects" label="Projects" />
          <NavItem href="/dashboard/messages" label="Messages" />
          <NavItem href="/dashboard/experiences" label="Experiences" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="p-4">{children}</main>
    </div>
  );
}

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
  >
    {label}
  </Link>
);
