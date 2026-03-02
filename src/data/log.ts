"use server";

import {
	GetListAccessLogRequest,
	GetRetrieveAccessLogRequest
} from "@/types/request";
import {cookies} from "next/headers";
import {BACKEND_URL, COOKIE_ACCESS_TOKEN} from "@/lib/config-const";
import {AccessLogResponse, BadRequestResponse, ReadResponse, UnauthorizedResponse} from "@/types/response";
import {badRequestResponse, unauthorizedResponse} from "@/lib/utils";


export async function getListAccessLogs(request: GetListAccessLogRequest): Promise<ReadResponse<AccessLogResponse[]> | UnauthorizedResponse | BadRequestResponse> {
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
	const url = `${BACKEND_URL}/logs/access?${params.toString()}`;
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
	return await response.json() as ReadResponse<AccessLogResponse[]>
}

export async function getAccessLogById(request: GetRetrieveAccessLogRequest): Promise<ReadResponse<AccessLogResponse> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken || !request.id) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/logs/access/${request.id}`;
	if (request.expands) {
		const params = new URLSearchParams({
			'expands': request.expands
		});
		url = `${BACKEND_URL}/logs/access/${request.id}?${params.toString()}`;
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
	return await response.json() as ReadResponse<AccessLogResponse>
}
