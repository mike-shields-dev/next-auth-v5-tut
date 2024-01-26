"use server";
import { AuthError } from 'next-auth';
import * as z from 'zod';

import { getUserByEmail } from '@/app/data/user';
import { signIn } from '@/auth';
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schemas';

import { DEFAULT_LOGIN_REDIRECT } from '../../routes';

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!(existingUser?.email && existingUser?.password)) {
    return { error: "An account with that email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }

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
