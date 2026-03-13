import { passwordValidation } from "@/shared/schema/validation";

import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  nama: z.string().optional(),
  email: z.email("Invalid email").optional(),
  area: z.string().optional(),
  roleId: z.number().optional(),
  jobTitle: z.string().optional(),
  direktorat: z.string().optional(),
  mobile: z.string().optional(),
  password: passwordValidation,

  overrides: z
    .array(
      z.object({
        permissionId: z.number(),
        effect: z.enum(["ALLOW", "DENY"]),
      })
    )
    .optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;