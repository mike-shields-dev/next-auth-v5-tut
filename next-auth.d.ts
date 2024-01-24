import { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import type { UserRole } from '@prisma/client';

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
