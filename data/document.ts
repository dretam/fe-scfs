"use server";

import { OCRDataEntity } from "@/types/entity";
import { cookies } from "next/headers";
import { BACKEND_URL, COOKIE_ACCESS_TOKEN } from "@/lib/config-const";
import { BadRequestResponse, DocumentResponse, OCRResponse, ReadResponse, UnauthorizedResponse } from "@/types/response";
import { badRequestResponse, unauthorizedResponse } from "@/lib/utils";
import { GetListDocumentRequest, GetRetrieveDocumentRequest, PutDocumentRequest, DeleteDocumentRequest } from "@/types/request";

export async function uploadDocument(file: File): Promise<
	OCRDataEntity[] | UnauthorizedResponse | BadRequestResponse
> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);

	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}

	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value;

	const formData = new FormData();
	formData.append("file", file); // field name harus sama dengan backend

	const url = `${BACKEND_URL}/documents`;

	const response: Response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: formData
	});

	if (!response.ok) {
		return badRequestResponse(await response.json());
	}

	const ocrResponse: ReadResponse<OCRResponse[]> = await response.json();

	return ocrResponse.data.map(ocrData => ocrData) // mapping
}

export async function getListDocument(request: GetListDocumentRequest): Promise<ReadResponse<DocumentResponse[]> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/documents`;
	const params = new URLSearchParams({
		page: String(request.page ?? 1),
		perPage: String(request.perPage ?? 5),
		...(request.filter && { filter: request.filter }),
		...(request.sort && { sort: request.sort }),
		...(request.expands && { expands: request.expands }),
	});
	url = `${BACKEND_URL}/documents?${params.toString()}`;
	const response: Response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		}
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	return await response.json() as ReadResponse<DocumentResponse[]>
}

export async function getDocumentById(request: GetRetrieveDocumentRequest): Promise<ReadResponse<DocumentResponse> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken || !request.id) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/documents/${request.id}`;
	if (request.expands) {
		const params = new URLSearchParams({
			'expands': request.expands
		});
		url = `${BACKEND_URL}/documents/${request.id}?${params.toString()}`;
	}
	const response: Response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		}
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	return await response.json() as ReadResponse<DocumentResponse>
}

export async function updateDocument(id: number, file: File): Promise<DocumentResponse | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value

	const formData = new FormData();
	formData.append("file", file);

	const url = `${BACKEND_URL}/documents/${id}`;
	const response: Response = await fetch(url, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
		},
		body: formData
	});

	if (!response.ok) {
		return badRequestResponse(await response.json());
	}

	const documentResponse: ReadResponse<DocumentResponse> = await response.json();
	return documentResponse.data;
}

export async function softDeleteDocument(id: number): Promise<DocumentResponse | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/documents`;
	const response: Response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify({ id })
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	const document: ReadResponse<DocumentResponse> = await response.json();
	return document.data;
}

export async function hardDeleteDocument(id: number): Promise<{id: number} | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/documents/${id}/destroy`;
	const response: Response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	return { id };
}

export async function uploadMultipleDocuments(files: File[]): Promise<DocumentResponse[] | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);

	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}

	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value;

	const formData = new FormData();
	files.forEach(file => {
		formData.append("files", file);
	});

	const url = `${BACKEND_URL}/documents/multiple`;

	const response: Response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: formData
	});

	if (!response.ok) {
		return badRequestResponse(await response.json());
	}

	const documentResponse: ReadResponse<DocumentResponse[]> = await response.json();
	return documentResponse.data;
}
