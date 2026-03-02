import { z } from "zod";

export function roleFormSchema() {
	return z.object({
		id: z.number().optional(),
		name: z.string().min(1, {
			message: "Name is required",
		}),
		icon: z.string().min(1, {
			message: "Icon is required",
		}),
		description: z.string().min(1, {
			message: "Description is required",
		}),
	});
}

export function roleDeleteFormSchema() {
	return z.object({
		roleId: z.number().refine(v => v > 0, {
			message: "Invalid role",
		}),
	});
}
