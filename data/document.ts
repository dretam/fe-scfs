"use server";

import { OCRDataEntity } from "@/types/entity";
import { cookies } from "next/headers";
import { BACKEND_URL, COOKIE_ACCESS_TOKEN } from "@/lib/config-const";
import { BadRequestResponse, OCRResponse, ReadResponse, UnauthorizedResponse } from "@/types/response";
import { badRequestResponse, unauthorizedResponse } from "@/lib/utils";

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
