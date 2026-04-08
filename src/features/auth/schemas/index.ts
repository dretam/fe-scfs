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

/**
 * CHANGE PASSWORD (FORGOT PASSWORD) SCHEMA
 */
export const changeNewPasswordSchema = z.object({
    id: z.string().min(1, {
        message: "User ID is required",
    }),
    forgotPasswordTokenHash: z.string().min(1, {
        message: "Forgot password token hash is required",
    }),
    username: z.string().min(1, {
        message: "Username is required",
    }),
    oldPassword: z.string().min(1, {
        message: "Old password is required",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
    passwordConfirmation: z.string().min(1, {
        message: "Password confirmation is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
})

export type ChangeNewPasswordFormValues = z.infer<typeof changeNewPasswordSchema>