"use server";

import {UserChangePasswordActionFormData, UserChangeProfileActionFormData} from "@/types/form-data";
import {TransactionAction} from "@/types/action";
import {UserEntity} from "@/types/entity";
import {putUser} from "@/data/user";
import {BadRequestResponse, UnauthorizedResponse} from "@/types/response";


export async function userChangePasswordAction(formData: UserChangePasswordActionFormData): Promise<TransactionAction<UserEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: UserEntity | UnauthorizedResponse | BadRequestResponse = await putUser({
		id: formData.userId,
		existingPassword: formData.existingPassword,
		password: formData.newPassword
	});
	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	} else {
		return {
			isSuccess: true,
			response: response
		};
	}
}

export async function userChangeProfileAction(formData: UserChangeProfileActionFormData): Promise<TransactionAction<UserEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: UserEntity | UnauthorizedResponse | BadRequestResponse = await putUser({
		id: formData.userId,
		name: formData.name,
		email: formData.email
	});
	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	} else {
		return {
			isSuccess: true,
			response: response
		};
	}
}