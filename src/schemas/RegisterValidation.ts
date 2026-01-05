import { z } from "zod";

export const RegisterUserValidationSchema = z
  .object({
    name: z.string().min(3, "Username must be at least 3 characters"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password does not match!",
    path: ["confirmPassword"],
  });
