import * as z from 'zod';

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters minimum",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export { LoginSchema, RegisterSchema };
