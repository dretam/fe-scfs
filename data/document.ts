"use server";

import {DocumentEntity} from "@/types/entity";
import {cookies} from "next/headers";
import {BACKEND_URL, COOKIE_ACCESS_TOKEN} from "@/lib/config-const";
import {BadRequestResponse, DocumentResponse, ReadResponse, UnauthorizedResponse, UserResponse} from "@/types/response";
import {badRequestResponse, unauthorizedResponse} from "@/lib/utils";

export async function uploadDocument(file: File): Promise<
	DocumentEntity | UnauthorizedResponse | BadRequestResponse
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

	const document: ReadResponse<DocumentResponse> = await response.json();

	return {
		id: document.data.id,
		fileName: document.data.filename,
		url: document.data.filePath,
	};
}
