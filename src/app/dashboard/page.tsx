'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session?.user) return <p>User data not available</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
      <p>Your email: {session.user.email}</p>
    </div>
  );
}
