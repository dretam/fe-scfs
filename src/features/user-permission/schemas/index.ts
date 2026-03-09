import { z } from "zod";

export const userPermissionCreateFormSchema = z.object({
    userId: z.number().int().positive(),
    permissionId: z.number().int().positive(),
    effect: z.string().min(1),
});

export const userPermissionUpdateFormSchema = z.object({
    userId: z.number().int().positive(),
    permissionId: z.number().int().positive(),
    effect: z.string().min(1),
});

export const userPermissionDeleteFormSchema = z.object({
    userId: z.number().int().positive(),
    permissionId: z.number().int().positive(),
});

export type UserPermissionCreateFormValues = z.infer<typeof userPermissionCreateFormSchema>;
export type UserPermissionUpdateFormValues = z.infer<typeof userPermissionUpdateFormSchema>;
export type UserPermissionDeleteFormValues = z.infer<typeof userPermissionDeleteFormSchema>;
