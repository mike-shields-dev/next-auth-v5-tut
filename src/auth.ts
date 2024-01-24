import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from './auth.config';
import { db } from './lib/db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({token, session}) {
      console.log({sessionToken: token, session });
      return session;
    },
    async jwt({ token }) {
      console.log({ token });
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
