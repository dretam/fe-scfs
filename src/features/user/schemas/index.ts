import { z } from "zod";
import { passwordValidation } from "@/shared/schema/validation";

export function userCreateFormSchema() {
	return z.object({
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(50, { message: "Username must be at most 50 characters" })
			.regex(/^[a-zA-Z0-9]+$/, {
				message: "Username can only contain letters and numbers",
			}),
		password: passwordValidation,
		roleId: z.number().refine((v) => v > 0, {
			message: "Role is required",
		}),
		permissionOverrides: z
			.array(
				z.object({
					permissionId: z.number().int().positive(),
					effect: z.enum(["ALLOW", "DENY"]),
				})
			)
			.optional(),
	});
}

export function userEditFormSchema() {
	return z.object({
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(50, { message: "Username must be at most 50 characters" })
			.regex(/^[a-zA-Z0-9]+$/, {
				message: "Username can only contain letters and numbers",
			}),
		password: passwordValidation.optional(),
		roleId: z.number().refine((v) => v > 0, {
			message: "Role is required",
		}),
		permissionOverrides: z
			.array(
				z.object({
					permissionId: z.number().int().positive(),
					effect: z.enum(["ALLOW", "DENY"]),
				})
			)
			.optional(),
	});
}

export function userDeleteFormSchema() {
	return z.object({
		userId: z.number().refine(v => v > 0, {
			message: "Invalid user",
		}),
	});
}

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

export function ocrDataUpdateFormSchema() {
	return z.object({
		id: z.number().refine(v => v > 0, {
			message: "Invalid OCR data",
		}),
		atasNama: z.string().optional(),
		nominal: z.string().optional(),
		jangkaWaktu: z.string().optional(),
		periode: z.string().optional(),
		rate: z.string().optional(),
		alokasi: z.string().optional(),
		namaRekeningTujuanPencairan: z.string().optional(),
		nomorRekeningTujuanPencairan: z.string().optional(),
		nomorRekeningPengirim: z.string().optional(),
		nomorRekeningPlacement: z.string().optional(),
	});
}

export function ocrDataDeleteFormSchema() {
	return z.object({
		ocrDataId: z.number().refine(v => v > 0, {
			message: "Invalid OCR data",
		}),
	});
}
