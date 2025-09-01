// src/libs/auth.ts
import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth-options';

export const getSession = cache(async () => getServerSession(authOptions));
