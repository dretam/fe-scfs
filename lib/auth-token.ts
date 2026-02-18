'use server';

import 'server-only'
import {cookies} from 'next/headers'
import {NextResponse} from 'next/server';
import {ACCESS_TOKEN_TTL, COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, IS_PRODUCTION} from "@/lib/config-const";

export async function refreshCookieAccessToken(handleI18nRoutingResponse: NextResponse, accessToken: any): Promise<NextResponse> {
	const cookieStore = handleI18nRoutingResponse.cookies;
	const cookieOptions: any = {
		httpOnly: IS_PRODUCTION,
		secure: IS_PRODUCTION,
		expires: ACCESS_TOKEN_TTL,
		maxAge: ACCESS_TOKEN_TTL.getSeconds(),
		sameSite: 'strict'
	}
	cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, cookieOptions)
	return handleI18nRoutingResponse;
}

export async function createCookieAccessToken(accessToken: any): Promise<void> {
	const cookieStore = await cookies();
	const cookieOptions: any = {
		httpOnly: IS_PRODUCTION,
		secure: IS_PRODUCTION,
		expires: ACCESS_TOKEN_TTL,
		maxAge: ACCESS_TOKEN_TTL.getSeconds(),
		sameSite: 'strict'
	}
	cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, cookieOptions);
}

export async function createCookieRefreshToken(refreshToken: any, isRememberMe: boolean = false): Promise<void> {
	// 1 Day
	let expiresAt: Date = new Date(Date.now() + 24 * 60 * 60 * 1000)
	// 1 Month
	if (isRememberMe) {
		expiresAt = new Date(new Date().setMonth(new Date().getMonth() + 1))
	}
	const cookieStore = await cookies();
	const cookieOptions: any = {
		httpOnly: IS_PRODUCTION,
		secure: IS_PRODUCTION,
		expires: expiresAt,
		sameSite: 'strict'
	}
	cookieStore.set(COOKIE_REFRESH_TOKEN, refreshToken, cookieOptions)
}

export async function removeCookieRefreshToken(): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.delete(COOKIE_REFRESH_TOKEN)
}

export async function removeCookieAccessToken(): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.delete(COOKIE_ACCESS_TOKEN)
}

