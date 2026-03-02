"use server";

import {COOKIE_REFRESH_TOKEN, BACKEND_URL, COOKIE_ACCESS_TOKEN} from "@/lib/config-const";
import {NextRequest} from 'next/server';
import {
	AuthLoginResponse,
	AuthRefreshResponse, ReadResponse,
	UnauthorizedResponse,
	UserResponse
} from "@/types/response";
import {PostAuthLoginRequest} from "@/types/request";
import {cookies} from "next/headers";
import {UserEntity} from "@/types/entity";

export async function postAuthRefresh(req: NextRequest): Promise<string | null> {
	const appCookies = req.cookies;
	const isHasRefreshToken: boolean = appCookies.has(COOKIE_REFRESH_TOKEN);
	if (isHasRefreshToken) {
		const refreshToken = appCookies.get(COOKIE_REFRESH_TOKEN)?.value
		const response: Response = await fetch(`${BACKEND_URL}/auth/refresh`, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				refreshToken: refreshToken
			})
		})
		if (response.ok) {
			const data: AuthRefreshResponse = await response.json();
			return data.accessToken;
		}
	}
	return null;
}

export async function postAuthLogin(request: PostAuthLoginRequest): Promise<AuthLoginResponse | UnauthorizedResponse> {
	const response: Response = await fetch(`${BACKEND_URL}/auth/login`, {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...request})
	})
	return await response.json();
}

export async function getAuthSession(): Promise<UserEntity | null> {
	const appCookies = await cookies();
	const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);
	if (!isHasAccessToken) {
		return null;
	}
	const accessToken = appCookies.get(COOKIE_ACCESS_TOKEN)?.value
	const params = new URLSearchParams({
		'expands': "role"
	});
	const url = `${BACKEND_URL}/auth/session?${params.toString()}`;
	const response: Response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	})
	if (!response.ok) {
		return null;
	}
	const user: ReadResponse<UserResponse> = await response.json();
	return {
		id: user.data.id,
		name: user.data.name,
		email: user.data.email,
		role: user.data.role,
	}
}