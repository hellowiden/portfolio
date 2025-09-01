// src/libs/auth-options.ts
import type { NextAuthOptions, User as NextAuthUser, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import UserModel from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Optional: narrow user objects coming from authorize()
type AppUser = NextAuthUser & {
  id: string;
  roles: string[];
  isOnline: boolean;
};

function isAppUser(u: unknown): u is AppUser {
  return !!u && typeof u === 'object' && 'id' in u && 'roles' in u;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) return null;

        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;

        await UserModel.findByIdAndUpdate(user._id, { isOnline: true });

        const appUser: AppUser = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          roles: user.roles,
          isOnline: true,
        };

        return appUser; // typed, no any
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },

  callbacks: {
    async jwt({ token, user }) {
      // user is defined on sign-in. It can be AdapterUser or your returned object.
      if (user && isAppUser(user)) {
        (token as JWT & { id: string; roles: string[] }).id = user.id;
        (token as JWT & { id: string; roles: string[] }).roles =
          user.roles ?? [];
      }
      return token as JWT;
    },

    async session({ session, token }) {
      // Ensure DB connection before reading isOnline
      let isOnline = false;
      const t = token as JWT & { id?: string; roles?: string[] };

      if (t.id) {
        await connectToDatabase();
        const dbUser = await UserModel.findById(t.id).select('isOnline');
        isOnline = dbUser?.isOnline ?? false;
      }

      // Augment session.user without any-casts
      const s = session as Session & {
        user: Session['user'] & {
          id?: string;
          roles?: string[];
          isOnline?: boolean;
        };
      };

      s.user.id = t.id ?? '';
      s.user.roles = t.roles ?? [];
      s.user.isOnline = isOnline;

      return s;
    },

    async redirect({ url, baseUrl }) {
      if (url.includes('/login')) return `${baseUrl}/`;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  events: {
    async signOut({ token }) {
      const t = token as JWT & { id?: string };
      if (t?.id) {
        await connectToDatabase();
        await UserModel.findByIdAndUpdate(t.id, { isOnline: false });
      }
    },
  },
};
