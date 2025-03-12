//src/app/components/SessionProvider.tsx

'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
