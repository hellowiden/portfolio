//app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Define User Type
interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

// Extend JWT Token Type
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    roles: string[];
  }
}

// Extend Session Type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: string[];
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing credentials');
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // Ensure the returned object contains all required fields
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          roles: user.roles || [],
        } as AuthUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login', // Redirect failed logins here
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: session.user.name,
        email: session.user.email,
        roles: token.roles as string[],
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
