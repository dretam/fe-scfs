"use server";

import {
	GetListOcrDataRequest,
	GetRetrieveOcrDataRequest,
	PutOcrDataRequest
} from "@/types/request";
import {OCRDataEntity} from "@/types/entity";
import {cookies} from "next/headers";
import {BACKEND_URL, COOKIE_ACCESS_TOKEN} from "@/lib/config-const";
import {BadRequestResponse, OCRResponse, ReadResponse, UnauthorizedResponse} from "@/types/response";
import {badRequestResponse, unauthorizedResponse} from "@/lib/utils";


export async function getListOcrData(request: GetListOcrDataRequest): Promise<ReadResponse<OCRResponse[]> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const params = new URLSearchParams({
		page: String(request.page ?? 1),
		perPage: String(request.perPage ?? 5),
		...(request.filter && { filter: request.filter }),
		...(request.sort && { sort: request.sort }),
		...(request.expands && { expands: request.expands }),
	});
	const url = `${BACKEND_URL}/ocr-data?${params.toString()}`;
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
	return await response.json() as ReadResponse<OCRResponse[]>
}

export async function getOcrDataById(request: GetRetrieveOcrDataRequest): Promise<ReadResponse<OCRResponse> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken || !request.id) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/ocr-data/${request.id}`;
	if (request.expands) {
		const params = new URLSearchParams({
			'expands': request.expands
		});
		url = `${BACKEND_URL}/ocr-data/${request.id}?${params.toString()}`;
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
	return await response.json() as ReadResponse<OCRResponse>
}

export async function updateOcrData(request: PutOcrDataRequest): Promise<OCRDataEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/ocr-data`;
	const response: Response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify(request)
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	const ocrData: ReadResponse<OCRResponse> = await response.json();
	return {
		id: ocrData.data.id,
		atasNama: ocrData.data.atasNama,
		nominal: ocrData.data.nominal,
		jangkaWaktu: ocrData.data.jangkaWaktu,
		periode: ocrData.data.periode,
		rate: ocrData.data.rate,
		alokasi: ocrData.data.alokasi,
		namaRekeningTujuanPencairan: ocrData.data.namaRekeningTujuanPencairan,
		nomorRekeningTujuanPencairan: ocrData.data.nomorRekeningTujuanPencairan,
		nomorRekeningPengirim: ocrData.data.nomorRekeningPengirim,
		nomorRekeningPlacement: ocrData.data.nomorRekeningPlacement,
	}
}

export async function hardDeleteOcrData(id: number): Promise<{id: number} | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/ocr-data/${id}/destroy`;
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
