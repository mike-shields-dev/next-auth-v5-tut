"use server";

import bcrypt from 'bcrypt';
import { z } from 'zod';

import { getUserByEmail } from '@/app/data/user';
import { db } from '@/lib/db';
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
        password: hashedPassword, // IMPORTANT: Always use hashed password
      },
    });

    return { success: "Email sent" };
}