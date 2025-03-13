//src/app/api/auth/route.ts

import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User, { IUser } from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';
import { JWT } from 'next-auth/jwt';
import { Session, User as NextAuthUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: string[];
    };
  }

  interface JWT {
    id: string;
    roles: string[];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectToDatabase();
        const user = (await User.findOne({
          email: credentials.email,
        })) as IUser | null;
        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          roles: user.roles,
        } as NextAuthUser;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser | AdapterUser;
    }) {
      if (user) {
        token.id = String(user.id);
        token.roles = (user as IUser).roles || [];
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user) {
        session.user = { id: '', name: '', email: '', roles: [] };
      }

      session.user.id = String(token.id);
      session.user.roles = Array.isArray(token.roles) ? token.roles : [];

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
