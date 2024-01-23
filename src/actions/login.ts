"use server";
import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';

import { DEFAULT_LOGIN_REDIRECT } from '../../routes';

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Unknown error" };
      }
    }

    // Error must be thrown to initiate redirectTo: DEFAULT_LOGIN_REDIRECT
    throw error; 
  }
}
