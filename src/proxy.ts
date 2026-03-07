import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import {
	COOKIE_ACCESS_TOKEN,
	COOKIE_REFRESH_TOKEN,
	PUBLIC_ROUTES
} from "@/lib/config-const";
import { postAuthRefresh } from "@/features/auth/service";

import { refreshCookieAccessToken } from "@/lib/auth-token";

export default async function proxy(req: NextRequest) {
	const appCookies = await cookies();
	const path: string = req.nextUrl.pathname

	// 1. Check if the current route is protected or public
	const isPublicRoute: boolean = PUBLIC_ROUTES.some(route =>
		route === '/'
			? path === '/'
			: path.startsWith(route)
	);

	// 2. Check Refresh Token & Access Token
	const hasRefreshToken: boolean = appCookies.has(COOKIE_REFRESH_TOKEN)
	const hasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN)

	// 3. Redirect ke login kalau route protected & tidak ada refresh token
	if (!isPublicRoute && !hasRefreshToken) {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	// 4. Kalau sudah login jangan bisa akses halaman login lagi
	if (hasRefreshToken && path.endsWith('/login')) {
		return NextResponse.redirect(new URL('/', req.nextUrl))
	}

	// Base response tanpa next-intl
	let response = NextResponse.next();

	// 5. Generate access token baru kalau expired
	if (!isPublicRoute && hasRefreshToken && !hasAccessToken) {
		const newAccessToken: string | null = await postAuthRefresh(req);

		if (!newAccessToken) {
			return NextResponse.redirect(new URL('/login', req.nextUrl))
		}

		return await refreshCookieAccessToken(response, newAccessToken);
	}

	return response;
}

export const config = {
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
