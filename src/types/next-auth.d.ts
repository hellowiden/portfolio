// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      roles: string[];
      isOnline: boolean;
    };
  }

  interface User {
    id: string;
    roles: string[];
    isOnline: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    roles: string[];
  }
}
