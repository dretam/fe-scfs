import { z } from "zod";

export const menuCreateFormSchema = z.object({
    name: z.string().min(3).max(255),
    code: z.string().min(3).max(100),
    path: z.string().max(500).optional(),
    icon: z.string().max(100).optional(),
    parentId: z.number().int().positive().optional(),
    sortOrder: z.number().int(),
});

export const menuUpdateFormSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(3).max(255).optional(),
    code: z.string().min(3).max(100).optional(),
    path: z.string().max(500).optional(),
    icon: z.string().max(100).optional(),
    parentId: z.number().int().positive().optional(),
    sortOrder: z.number().int().optional(),
});

export const menuDeleteFormSchema = z.object({
    id: z.number().int().positive(),
});

export type MenuCreateFormValues = z.infer<typeof menuCreateFormSchema>;
export type MenuUpdateFormValues = z.infer<typeof menuUpdateFormSchema>;
export type MenuDeleteFormValues = z.infer<typeof menuDeleteFormSchema>;
