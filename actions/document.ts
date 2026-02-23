"use server";

import { uploadDocument, getListDocument, getDocumentById, updateDocument, softDeleteDocument, hardDeleteDocument, uploadMultipleDocuments } from "@/data/document";
import { badRequestResponse } from "@/lib/utils";
import { TransactionAction } from "@/types/action";
import { OCRDataEntity, DocumentEntity } from "@/types/entity";
import { BadRequestResponse, DocumentResponse, ReadResponse, UnauthorizedResponse } from "@/types/response";
import { GetListDocumentRequest, GetRetrieveDocumentRequest, DeleteDocumentRequest } from "@/types/request";

export async function uploadDocumentAction(
	formData: FormData
): Promise<
	TransactionAction<OCRDataEntity[] | UnauthorizedResponse | BadRequestResponse>
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

export async function uploadMultipleDocumentsAction(
	files: File[]
): Promise<
	TransactionAction<DocumentResponse[] | UnauthorizedResponse | BadRequestResponse>
> {
	const response = await uploadMultipleDocuments(files);

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

export async function listDocumentsAction(
	request: GetListDocumentRequest
): Promise<
	TransactionAction<ReadResponse<DocumentResponse[]> | UnauthorizedResponse | BadRequestResponse>
> {
	const response = await getListDocument(request);

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

export async function getDocumentAction(
	request: GetRetrieveDocumentRequest
): Promise<
	TransactionAction<ReadResponse<DocumentResponse> | UnauthorizedResponse | BadRequestResponse>
> {
	const response = await getDocumentById(request);

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

export async function updateDocumentAction(
	id: number,
	file: File
): Promise<
	TransactionAction<DocumentResponse | UnauthorizedResponse | BadRequestResponse>
> {
	const response = await updateDocument(id, file);

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

export async function deleteDocumentAction(
	id: number
): Promise<
	TransactionAction<DocumentResponse | UnauthorizedResponse | BadRequestResponse>
> {
	const response = await softDeleteDocument(id);

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

export async function destroyDocumentAction(
	id: number
): Promise<
	TransactionAction<{id: number} | UnauthorizedResponse | BadRequestResponse>
> {
	const response = await hardDeleteDocument(id);

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
