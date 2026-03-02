"use server";

import {UserChangePasswordActionFormData, UserChangeProfileActionFormData, UserCreateActionFormData, UserDeleteActionFormData} from "@/types/form-data";
import {TransactionAction} from "@/types/action";
import {UserEntity} from "@/types/entity";
import {putUser, createUser, softDeleteUser, hardDeleteUser} from "@/data/user";
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

export async function userCreateAction(formData: UserCreateActionFormData): Promise<TransactionAction<UserEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: UserEntity | UnauthorizedResponse | BadRequestResponse = await createUser({
		name: formData.name,
		email: formData.email,
		password: formData.password,
		roleId: formData.roleId
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

export async function userDeleteAction(formData: UserDeleteActionFormData): Promise<TransactionAction<UserEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: UserEntity | UnauthorizedResponse | BadRequestResponse = await softDeleteUser({
		id: formData.userId
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

export async function userDestroyAction(userId: number): Promise<TransactionAction<{id: number} | UnauthorizedResponse | BadRequestResponse>> {
	const response: {id: number} | UnauthorizedResponse | BadRequestResponse = await hardDeleteUser(userId);
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