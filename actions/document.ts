"use server";

import { uploadDocument } from "@/data/document";
import { badRequestResponse } from "@/lib/utils";
import { TransactionAction } from "@/types/action";
import { DocumentEntity } from "@/types/entity";
import { BadRequestResponse, UnauthorizedResponse } from "@/types/response";

export async function uploadDocumentAction(
	formData: FormData
): Promise<
	TransactionAction<DocumentEntity | UnauthorizedResponse | BadRequestResponse>
> {
	const file = formData.get("file") as File | null;

	if (!file) {
		return {
			isSuccess: false,
			response: badRequestResponse({ message: "File is required" })
		};
	}

	const response = await uploadDocument(file);

	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	}

	return {
		isSuccess: true,
		response: response
	};
}
