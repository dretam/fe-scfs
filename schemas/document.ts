import { z } from "zod";

export function documentUpdateFormSchema() {
	return z.object({
		id: z.number().refine(v => v > 0, {
			message: "Invalid document",
		}),
		file: z.instanceof(File).refine(
			(file) => file.size > 0,
			"File is required"
		),
	});
}

export function documentDeleteFormSchema() {
	return z.object({
		documentId: z.number().refine(v => v > 0, {
			message: "Invalid document",
		}),
	});
}
