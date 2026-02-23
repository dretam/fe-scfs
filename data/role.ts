"use server";

import {
	GetListRoleRequest,
	GetRetrieveRoleRequest,
	PostRoleRequest,
	PutRoleRequest,
	DeleteRoleRequest
} from "@/types/request";
import {RoleEntity} from "@/types/entity";
import {cookies} from "next/headers";
import {BACKEND_URL, COOKIE_ACCESS_TOKEN} from "@/lib/config-const";
import {BadRequestResponse, ReadResponse, RoleResponse, UnauthorizedResponse} from "@/types/response";
import {badRequestResponse, unauthorizedResponse} from "@/lib/utils";


export async function getListRole(request: GetListRoleRequest): Promise<ReadResponse<RoleResponse[]> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/roles`;
	if (request.expands || request.filter || request.sort) {
		const params = new URLSearchParams({
			page: String(request.page ?? 1),
			perPage: String(request.perPage ?? 5),
			...(request.filter && { filter: request.filter }),
			...(request.sort && { sort: request.sort }),
			...(request.expands && { expands: request.expands }),
		});
		url = `${BACKEND_URL}/roles?${params.toString()}`;
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
	return await response.json() as ReadResponse<RoleResponse[]>
}

export async function getRetrieveRole(request: GetRetrieveRoleRequest): Promise<ReadResponse<RoleResponse> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken || !request.id) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/roles/${request.id}`;
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
	return await response.json() as ReadResponse<RoleResponse>
}

export async function createRole(request: PostRoleRequest): Promise<RoleEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/roles`;
	const response: Response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify(request)
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	const role: ReadResponse<RoleResponse> = await response.json();
	return {
		id: role.data.id,
		name: role.data.name,
		icon: role.data.icon,
		description: role.data.description,
	}
}

export async function updateRole(request: PutRoleRequest): Promise<RoleEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/roles`;
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
	const role: ReadResponse<RoleResponse> = await response.json();
	return {
		id: role.data.id,
		name: role.data.name,
		icon: role.data.icon,
		description: role.data.description,
	}
}

export async function softDeleteRole(request: DeleteRoleRequest): Promise<RoleEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/roles`;
	const response: Response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify(request)
	})
	if (!response.ok) {
		return badRequestResponse(await response.json());
	}
	const role: ReadResponse<RoleResponse> = await response.json();
	return {
		id: role.data.id,
		name: role.data.name,
		icon: role.data.icon,
		description: role.data.description,
	}
}

export async function hardDeleteRole(id: number): Promise<{id: number} | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/roles/${id}/destroy`;
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
