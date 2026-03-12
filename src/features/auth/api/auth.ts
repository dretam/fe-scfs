"use server";

import {
  createCookieRefreshToken,
  removeCookieRefreshToken,
  removeCookieAccessToken,
  createCookieAccessToken,
} from "@/lib/auth-token";
import { getAuthSession, postAuthLogin } from "../service";

import { persistor } from "@/lib/store";
import { Result } from "@/types/response";
import { AuthLoginActionFormData } from "../types";
import { UserEntity } from "@/features/user";




/**
 * LOGOUT
 */
export async function logoutAction(): Promise<Result<void>> {
  await removeCookieAccessToken();
  await removeCookieRefreshToken();
  await persistor.purge();

  return {
    success: true,
    message: "Logged out successfully",
    data: undefined,
  };
}


/**
 * LOGIN
 */
export async function loginAction(
  formData: AuthLoginActionFormData
): Promise<Result<UserEntity>> {

  const result = await postAuthLogin(formData);

  if (!result.success) {
    return result;
  }

  if ("refreshToken" in result) {
    await createCookieRefreshToken(result.refreshToken, formData.rememberMe);
  }

  if ("accessToken" in result) {
    await createCookieAccessToken(result.accessToken);
  }

  const sessionResult = await getAuthSession();

  if (!sessionResult.success) {
    return sessionResult;
  }

  return {
    ...sessionResult,
    success: true,
  };
}
