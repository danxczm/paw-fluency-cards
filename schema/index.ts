import * as z from 'zod';

export const RegistrationSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email adress.',
  }),
  name: z.string().min(3, {
    message: 'Please enter your name',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export const LogInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email adress.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});
