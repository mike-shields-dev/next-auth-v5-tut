import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./app/data/user";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!(user && user.password)) return null;

          const isMatchingPassword = await bcrypt.compare(
            password,
            user.password
          );
          if (isMatchingPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
