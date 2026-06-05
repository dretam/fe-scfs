import { z } from "zod";
import { emailValidation, passwordValidation } from "@/shared/schema/validation";

/**
 * Base schema (shared fields)
 */
const baseUserSchema = z.object({
  username: z.string().min(8, "Username is required"),
  fullName: z.string().min(3, "Full name is required"),
  roleId: z.string().min(1, "Role is required"),
  roleChildrenId: z.string().min(1, "Role children is required"),
  companyId: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  isActive: z.boolean().default(true),
  photoPath: z.string().default(""),

  overrides: z
    .array(
      z.object({
        permissionId: z.string(),
        effect: z.enum(["ALLOW", "DENY"]),
      })
    )
    .optional(),
});

/**
 * Send token change password schema
 */
const baseUserSendTokenChangePasswordSchema = z.object({
  email: z.string().email("Invalid email")
});

export const sendTokenChangePasswordUserSchema = baseUserSendTokenChangePasswordSchema.extend({
  email: emailValidation,
});

export const createUserSchema = baseUserSchema.extend({
  password: passwordValidation,
});

export const editUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val))
    .pipe(passwordValidation.optional()),
});

export type UserFormValues = z.infer<typeof baseUserSchema> & {
  password?: string;
};

export type UserSendTokenChangePasswordFormValues = z.infer<typeof baseUserSendTokenChangePasswordSchema> & {
  email?: string;
};