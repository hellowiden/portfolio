// src/app/components/Header/Header.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <div className="grid grid-cols-2 items-center bg-zinc-900 text-zinc-100 p-4">
      {/* Title or Welcome Message */}
      <h1 className="text-2xl font-bold tracking-tight">
        {status === 'authenticated'
          ? `Welcome ${session.user?.name}`
          : 'MW-Portfolio'}
      </h1>

      {/* Authentication Buttons */}
      <div className="grid grid-flow-col gap-4 justify-end">
        {status === 'loading' ? null : status === 'authenticated' ? (
          <button
            onClick={() => signOut()}
            className="bg-zinc-700 text-zinc-100 px-4 py-2 rounded hover:bg-zinc-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-zinc-700 text-zinc-100 px-4 py-2 rounded hover:bg-zinc-600 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
