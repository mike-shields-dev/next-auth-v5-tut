import NextAuth from 'next-auth';

import { getUserById } from '@/app/data/user';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if(session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if(token.role) {
          session.user.role = token.role;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const userId = token.sub;
      const user = await getUserById(userId);

      if (!user) return token;

      token.role = user.role as UserRole;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
