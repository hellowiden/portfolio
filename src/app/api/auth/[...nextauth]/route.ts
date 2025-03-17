//src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    roles: string[];
  }
}

// Centralized function to authenticate user credentials
async function authenticateUser(
  credentials: Record<string, string> | undefined
): Promise<AuthUser | null> {
  if (!credentials?.email || !credentials?.password) {
    throw new Error('Missing credentials');
  }

  await connectToDatabase();
  const user = await User.findOne({ email: credentials.email });

  if (!user) throw new Error('User not found');

  const isValidPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (!isValidPassword) throw new Error('Invalid password');

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    roles: user.roles || [],
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          return await authenticateUser(credentials);
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = { ...session.user, id: token.id, roles: token.roles };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : '/';
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
