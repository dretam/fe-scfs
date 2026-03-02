"use server";

import {RoleFormActionFormData, RoleDeleteActionFormData} from "@/types/form-data";
import {TransactionAction} from "@/types/action";
import {RoleEntity} from "@/types/entity";
import {createRole, updateRole, softDeleteRole, hardDeleteRole} from "@/data/role";
import {BadRequestResponse, UnauthorizedResponse} from "@/types/response";


export async function roleCreateAction(formData: RoleFormActionFormData): Promise<TransactionAction<RoleEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: RoleEntity | UnauthorizedResponse | BadRequestResponse = await createRole({
		name: formData.name,
		icon: formData.icon,
		description: formData.description
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

export async function roleUpdateAction(formData: RoleFormActionFormData): Promise<TransactionAction<RoleEntity | UnauthorizedResponse | BadRequestResponse>> {
	if (!formData.id) {
		return {
			isSuccess: false,
			response: {
				status: 400,
				type: "Bad Request",
				message: "Role ID is required"
			}
		};
	}
	const response: RoleEntity | UnauthorizedResponse | BadRequestResponse = await updateRole({
		id: formData.id,
		name: formData.name,
		icon: formData.icon,
		description: formData.description
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

export async function roleDeleteAction(formData: RoleDeleteActionFormData): Promise<TransactionAction<RoleEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: RoleEntity | UnauthorizedResponse | BadRequestResponse = await softDeleteRole({
		id: formData.roleId
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

export async function roleDestroyAction(roleId: number): Promise<TransactionAction<{id: number} | UnauthorizedResponse | BadRequestResponse>> {
	const response: {id: number} | UnauthorizedResponse | BadRequestResponse = await hardDeleteRole(roleId);
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
