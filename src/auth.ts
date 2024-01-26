import NextAuth from 'next-auth';

import { getUserById } from '@/app/data/user';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import { ExtendedUser } from '../next-auth';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        // Allow OAuth without email verification
        return true;
      }

      const { id } = user as ExtendedUser;
      const existingUser = await getUserById(id);

      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check

      return true;
    },
    // @ts-ignore (token)
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token; // logged out

      const userId = token.sub;
      const user = await getUserById(userId);

      if (!user) return token;

      token.role = user.role as UserRole;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
