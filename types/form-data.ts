export interface AuthLoginActionFormData {
	username: string;
	password: string;
	rememberMe: boolean;
}

export interface UserChangePasswordActionFormData {
	userId: number;
	existingPassword: string;
	newPassword: string;
	retypeNewPassword: string;
}

export interface UserChangeProfileActionFormData {
	userId: number;
	name: string;
	email: string;
}