//src/app/dashboard/layout.tsx

'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

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
    <div className="grid grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white gap-4">
      {/* MOBILE NAVIGATION */}
      <div className="grid md:hidden grid-cols-[1fr_auto] items-center p-4 bg-zinc-200 dark:bg-zinc-800 border-b dark:border-zinc-700">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md bg-zinc-300 dark:bg-zinc-700"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* SIDEBAR / NAVBAR */}
      <aside
        className={`grid grid-rows-[1fr] md:grid-cols-[1fr] w-full md:w-64 bg-zinc-200 dark:bg-zinc-800 border-r dark:border-zinc-700 p-4 md:relative absolute top-16 left-0 md:top-0 md:left-auto ${
          menuOpen ? 'block' : 'hidden md:grid'
        }`}
      >
        <nav className="grid gap-2">
          <NavItem
            href="/dashboard"
            label="Dashboard"
            pathname={pathname}
            setMenuOpen={setMenuOpen}
          />
          <NavItem
            href="/dashboard/users"
            label="Users"
            pathname={pathname}
            setMenuOpen={setMenuOpen}
          />
          <NavItem
            href="/dashboard/projects"
            label="Projects"
            pathname={pathname}
            setMenuOpen={setMenuOpen}
          />
          <NavItem
            href="/dashboard/messages"
            label="Messages"
            pathname={pathname}
            setMenuOpen={setMenuOpen}
          />
          <NavItem
            href="/dashboard/experiences"
            label="Experiences"
            pathname={pathname}
            setMenuOpen={setMenuOpen}
          />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="grid p-4">{children}</main>
    </div>
  );
}

const NavItem = ({
  href,
  label,
  pathname,
  setMenuOpen,
}: {
  href: string;
  label: string;
  pathname: string;
  setMenuOpen: (open: boolean) => void;
}) => (
  <Link
    href={href}
    onClick={() => setMenuOpen(false)}
    className={`px-2 py-1 rounded ${
      pathname === href
        ? 'bg-zinc-300 dark:bg-zinc-700'
        : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'
    }`}
  >
    {label}
  </Link>
);
