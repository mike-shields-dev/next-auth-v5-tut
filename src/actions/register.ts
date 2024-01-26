"use server";

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { getUserByEmail } from '@/app/data/user';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas';

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);
    
    if(!validatedFields.success) {
        return { error: "Invalid fields"};
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isExistingUser = await getUserByEmail(email);
    
    if (isExistingUser) {
      return { error: "Email already in use" };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // IMPORTANT: Always use hashed password!!
      },
    });

    const verificationToken = await generateVerificationToken(email);

    return { success: "Confirmation email sent" };
}