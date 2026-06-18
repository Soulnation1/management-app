import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export type SignInFormData = z.infer<typeof signInSchema>;




export const signUpSchema = z.object({
    fullName: z
        .string()
        .min(3, "Name must be at least 3 characters"),
    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;


export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;