//src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.roles.includes('admin');

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="w-full grid gap-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Manage your data using the navigation.
      </p>
    </div>
  );
}
