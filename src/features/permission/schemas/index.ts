import { z } from "zod";

export const permissionCreateFormSchema = z.object({
    name: z.string().min(3).max(255),
    code: z.string().min(3).max(100),
    description: z.string().max(1000).optional(),
    menuId: z.number().int().positive().optional(),
});

export const permissionUpdateFormSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(3).max(255).optional(),
    code: z.string().min(3).max(100).optional(),
    description: z.string().max(1000).optional(),
    menuId: z.number().int().positive().optional(),
});

export const permissionDeleteFormSchema = z.object({
    id: z.number().int().positive(),
});

export type PermissionCreateFormValues = z.infer<typeof permissionCreateFormSchema>;
export type PermissionUpdateFormValues = z.infer<typeof permissionUpdateFormSchema>;
export type PermissionDeleteFormValues = z.infer<typeof permissionDeleteFormSchema>;
