import { z } from "zod";
import { emailValidation, passwordValidation } from "@/shared/schema/validation";

/**
 * Base schema (shared fields)
 */
const baseUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  nama: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  area: z.string().optional(),
  roleId: z.number().optional(),
  jobTitle: z.string().optional(),
  direktorat: z.string().optional(),
  mobile: z.string().optional(),

  overrides: z
    .array(
      z.object({
        permissionId: z.number(),
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