//src/app/dashboard/layout.tsx

'use client';

import { ReactNode, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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
      <aside className="flex flex-col gap-4 w-64 bg-zinc-200 dark:bg-zinc-800 border-r dark:border-zinc-700 p-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="grid gap-2">
          <Link
            href="/dashboard"
            className={`px-2 py-1 rounded ${
              pathname === '/dashboard'
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Users
          </Link>
          <Link
            href="/dashboard/projects"
            className={`px-2 py-1 rounded ${
              pathname === '/dashboard/projects'
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Projects
          </Link>
          <Link
            href="/dashboard/messages"
            className={`px-2 py-1 rounded ${
              pathname === '/dashboard/messages'
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Messages
          </Link>
          <Link
            href="/dashboard/experiences"
            className={`px-2 py-1 rounded ${
              pathname === '/dashboard/experiences'
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Experiences
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="p-4">{children}</main>
    </div>
  );
}
