import 'server-only'

export const IS_PRODUCTION: boolean = ["production", "prod"].includes(process.env.NODE_ENV);
export const BACKEND_URL: string = `${process.env.BACKEND_BASE_URL}/${process.env.BACKEND_BASE_PATH}/${process.env.BACKEND_VERSION}`;
export const COOKIE_REFRESH_TOKEN: any = "refresh-token";
export const COOKIE_ACCESS_TOKEN: any = "access-token";
export const ACCESS_TOKEN_TTL: Date = new Date(Date.now() + (Number.parseInt(process.env.ACCESS_TOKEN_TTL_SECONDS) - 1) * 1000);
export const PUBLIC_ROUTES: string[] = [
	'/login',
]