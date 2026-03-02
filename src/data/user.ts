"use server";

import {GetListUserRequest, GetRetrieveUserRequest, PostUserRequest, PutUserRequest, DeleteUserRequest} from "@/types/request";
import {UserEntity} from "@/types/entity";
import {cookies} from "next/headers";
import {BACKEND_URL, COOKIE_ACCESS_TOKEN} from "@/lib/config-const";
import {BadRequestResponse, ReadResponse, UnauthorizedResponse, UserResponse} from "@/types/response";
import {badRequestResponse, unauthorizedResponse} from "@/lib/utils";


export async function getListUser(request: GetListUserRequest): Promise<ReadResponse<UserResponse[]> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/users`;
	if (request.expands) {
		if (request.filter === null || !request.filter) {
			delete request.filter;
		}
		const params = new URLSearchParams({
			...request
		});
		url = `${BACKEND_URL}/users?${params.toString()}`;
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
	return await response.json() as ReadResponse<UserResponse[]>
}

export async function getRetrieveUser(request: GetRetrieveUserRequest): Promise<ReadResponse<UserResponse> | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken || !request.id) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	let url = `${BACKEND_URL}/users/${request.id}`;
	if (request.expands) {
		const params = new URLSearchParams({
			'expands': request.expands
		});
		url = `${BACKEND_URL}/users/${request.id}?${params.toString()}`;
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
	return await response.json() as ReadResponse<UserResponse>
}


export async function putUser(request: PutUserRequest): Promise<UserEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/users`;
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
	const user: ReadResponse<UserResponse> = await response.json();
	return {
		id: user.data.id,
		name: user.data.name,
		email: user.data.email,
		role: user.data.role,
	}
}

export async function createUser(request: PostUserRequest): Promise<UserEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/users`;
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
	const user: ReadResponse<UserResponse> = await response.json();
	return {
		id: user.data.id,
		name: user.data.name,
		email: user.data.email,
		role: user.data.role,
	}
}

export async function softDeleteUser(request: DeleteUserRequest): Promise<UserEntity | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/users`;
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
	const user: ReadResponse<UserResponse> = await response.json();
	return {
		id: user.data.id,
		name: user.data.name,
		email: user.data.email,
		role: user.data.role,
	}
}

export async function hardDeleteUser(id: number): Promise<{id: number} | UnauthorizedResponse | BadRequestResponse> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return unauthorizedResponse();
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const url = `${BACKEND_URL}/users/${id}/destroy`;
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



