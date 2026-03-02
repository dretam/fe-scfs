"use server";

import {
	createCookieRefreshToken,
	removeCookieRefreshToken,
	removeCookieAccessToken,
	createCookieAccessToken,
} from "@/lib/auth-token";
import {getAuthSession, postAuthLogin} from "@/data/auth";
import {persistor} from "@/lib/store";
import {AuthLoginResponse, UnauthorizedResponse} from "@/types/response";
import {AuthLoginAction} from "@/types/action";
import {AuthLoginActionFormData} from "@/types/form-data";
import {UserEntity} from "@/types/entity";


export async function logoutAction(): Promise<void> {
	await removeCookieAccessToken();
	await removeCookieRefreshToken();
	await persistor.purge();
}

export async function loginAction(formData: AuthLoginActionFormData): Promise<AuthLoginAction> {
	const response: AuthLoginResponse | UnauthorizedResponse = await postAuthLogin(formData);
	let user: UserEntity | null = null;
	if (response.status === 200) {
		if ("refreshToken" in response) {
			await createCookieRefreshToken(response.refreshToken, formData.rememberMe);
		}
		if ("accessToken" in response) {
			await createCookieAccessToken(response.accessToken);
			user = await getAuthSession()
		}
	}
	return {
		status: response.status,
		isSuccess: response.status === 200,
		user: user
	};
}