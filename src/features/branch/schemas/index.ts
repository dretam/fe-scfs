import { z } from 'zod';

export const branchSchema = z.object({
    id: z.number().optional(),
    idBranch: z.string().optional(),
    branchName: z.string().optional(),
    flagDel: z.boolean().optional(),
    category: z.string().optional(),
    regional: z.string().optional(),
    address: z.string().optional(),
    area: z.string().optional(),
    direktorat: z.string().optional(),
    modId: z.number().optional(),
    telepon: z.number().optional(),
    faximile: z.number().optional(),
    singkatan: z.string().optional(),
    createdAt: z.string().optional(),
    createdBy: z.number().optional(),
    updatedAt: z.string().optional(),
    updatedBy: z.number().optional(),
    deletedAt: z.string().optional(),
    deletedBy: z.number().optional(),
});
