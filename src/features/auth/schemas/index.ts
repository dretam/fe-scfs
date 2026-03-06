import { z } from "zod";

/**
 * LOGIN SCHEMA
 */
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

/**
 * CHANGE PROFILE SCHEMA
 */
export const changeProfileSchema = z.object({
    userId: z.number().int().positive(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email must be a valid email address"),
})

export type ChangeProfileFormValues = z.infer<typeof changeProfileSchema>

/**
 * CHANGE PASSWORD SCHEMA
 */
export const changePasswordSchema = z.object({
    userId: z.number().int().positive(),
    existingPassword: z.string().min(1, {
        message: "Existing password is required",
    }),
    newPassword: z.string().min(8, {
        message: "New password must be at least 8 characters",
    }),
    retypeNewPassword: z.string().min(1, {
        message: "Retype new password is required",
    }),
}).refine((data) => data.newPassword === data.retypeNewPassword, {
    message: "Passwords don't match",
    path: ["retypeNewPassword"],
})

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
