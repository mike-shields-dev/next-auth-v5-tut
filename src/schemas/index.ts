import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "A valid email address is required"
    }),
    password: z.string()
});