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

export interface UserCreateActionFormData {
	name: string;
	email: string;
	password: string;
	roleId: number;
}

export interface UserDeleteActionFormData {
	userId: number;
}

export interface RoleFormActionFormData {
	id?: number;
	name: string;
	icon: string;
	description: string;
}

export interface RoleDeleteActionFormData {
	roleId: number;
}

export interface DocumentUpdateActionFormData {
	id: number;
	file: File;
}

export interface DocumentDeleteActionFormData {
	documentId: number;
}

export interface OcrDataUpdateActionFormData {
	id: number;
	atasNama?: string;
	nominal?: string;
	jangkaWaktu?: string;
	periode?: string;
	rate?: string;
	alokasi?: string;
	namaRekeningTujuanPencairan?: string;
	nomorRekeningTujuanPencairan?: string;
	nomorRekeningPengirim?: string;
	nomorRekeningPlacement?: string;
}

export interface OcrDataDeleteActionFormData {
	ocrDataId: number;
}