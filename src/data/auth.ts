"use server";

import { NextRequest } from 'next/server';
import { PostAuthLoginRequest } from "@/types/request";
import { AuthLoginResponse, Result } from "@/types/response";
import { serverHttp } from "@/lib/server/server-fetch";
import { cookies } from "next/headers";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, BACKEND_URL } from "@/lib/config-const";
import { UserEntity } from "@/types/entity";
import { UserResponse } from "@/types/response";


/**
 * POST /auth/refresh
 */
export async function postAuthRefresh(req: NextRequest): Promise<string | null> {
  const appCookies = req.cookies;
  const hasRefreshToken: boolean = appCookies.has(COOKIE_REFRESH_TOKEN);

  if (!hasRefreshToken) {
    return null;
  }

  const refreshToken = appCookies.get(COOKIE_REFRESH_TOKEN)?.value;

  const response: Response = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  if (response.ok) {
    const data: { accessToken: string } = await response.json();

    return data.accessToken;
  }

  return null;
}


/**
 * POST /auth/login
 */
export async function postAuthLogin(
  request: PostAuthLoginRequest
): Promise<Result<AuthLoginResponse>> {

  return serverHttp.post<AuthLoginResponse>(
    "/auth/login",
    request,
    { withAuth: false }
  );
}


/**
 * GET /auth/session
 */
export async function getAuthSession(): Promise<Result<UserEntity>> {
  const appCookies = await cookies();
  const isHasAccessToken: boolean = appCookies.has(COOKIE_ACCESS_TOKEN);

  if (!isHasAccessToken) {
    return {
      success: false,
      error: {
        status: 401,
        message: "Unauthorized"
      }
    };
  }

  const params = new URLSearchParams({
    expands: "role"
  });

  const result = await serverHttp.get<UserResponse>(
    `/auth/session?${params.toString()}`,
    { withAuth: true }
  );

  if (!result.success) {
    return result;
  }

  const data = result.data;

  return {
    success: true,
    message: "Success",
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    }
  };
}
