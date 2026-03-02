"use server";

import {
  createCookieRefreshToken,
  removeCookieRefreshToken,
  removeCookieAccessToken,
  createCookieAccessToken,
} from "@/lib/auth-token";
import { getAuthSession, postAuthLogin } from "@/data/auth";
import { persistor } from "@/lib/store";
import { AuthLoginResponse, Result } from "@/types/response";
import { AuthLoginActionFormData } from "@/types/form-data";
import { UserEntity } from "@/types/entity";


/**
 * LOGOUT
 */
export async function logoutAction(): Promise<void> {
  await removeCookieAccessToken();
  await removeCookieRefreshToken();
  await persistor.purge();
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
    success: true,
    data: sessionResult.data
  };
}
