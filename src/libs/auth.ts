// src/libs/auth.ts
import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Cached session getter for server
export const getSession = cache(async () => {
  return await getServerSession(authOptions);
});
