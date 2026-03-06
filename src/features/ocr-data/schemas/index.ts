import { z } from "zod";

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
