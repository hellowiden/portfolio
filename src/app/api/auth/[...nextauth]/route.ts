// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import UserModel from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isOnline: boolean;
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

// Authenticate user credentials
async function authenticateUser(
  credentials: Record<string, string> | undefined
): Promise<User> {
  if (!credentials?.email || !credentials?.password) {
    throw new Error('Missing credentials');
  }

  await connectToDatabase();
  const user = await UserModel.findOne({ email: credentials.email });

  if (!user) throw new Error('User not found');

  const isValidPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (!isValidPassword) throw new Error('Invalid password');

  await UserModel.findByIdAndUpdate(user._id, { isOnline: true });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    roles: user.roles,
    isOnline: true,
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
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        await connectToDatabase();
        const user = await UserModel.findById(token.id).select('isOnline');
        session.user = {
          ...session.user,
          id: token.id,
          roles: token.roles,
          isOnline: user?.isOnline ?? false,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/login')) {
        return `${baseUrl}/`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.id) {
        await connectToDatabase();
        await UserModel.findByIdAndUpdate(token.id, { isOnline: false });
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
