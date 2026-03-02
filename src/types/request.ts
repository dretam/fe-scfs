export interface PostAuthLoginRequest {
	username: string;
	password: string;
	rememberMe: boolean;
}

export interface GetListUserRequest {
	page?: number | null;
	perPage?: number | null;
	filter?: string | null;
	sort?: string | null;
	expands?: string | null;
}

export interface GetRetrieveUserRequest {
	id: number;
	expands?: string | null;
}

export interface PutUserRequest {
	id: number;
	name?: string | null;
	email?: string | null;
	existingPassword?: string | null;
	password?: string | null;
	roleId?: number | null;
}

export interface PostUserRequest {
	name: string;
	email: string;
	password: string;
	roleId: number;
}

export interface DeleteUserRequest {
	id: number;
}

export interface GetListRoleRequest {
	page?: number | null;
	perPage?: number | null;
	filter?: string | null;
	sort?: string | null;
	expands?: string | null;
}

export interface GetRetrieveRoleRequest {
	id: number;
}

export interface PostRoleRequest {
	name: string;
	icon: string;
	description: string;
}

export interface PutRoleRequest {
	id: number;
	name: string;
	icon: string;
	description: string;
}

export interface DeleteRoleRequest {
	id: number;
}

export interface GetListDocumentRequest {
	page?: number | null;
	perPage?: number | null;
	filter?: string | null;
	sort?: string | null;
	expands?: string | null;
}

export interface GetRetrieveDocumentRequest {
	id: number;
	expands?: string | null;
}

export interface PutDocumentRequest {
	id: number;
	file: File;
}

export interface DeleteDocumentRequest {
	id: number;
}

export interface GetListOcrDataRequest {
	page?: number | null;
	perPage?: number | null;
	filter?: string | null;
	sort?: string | null;
	expands?: string | null;
}

export interface GetRetrieveOcrDataRequest {
	id: number;
	expands?: string | null;
}

export interface PutOcrDataRequest {
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

export interface GetListAccessLogRequest {
	page?: number | null;
	perPage?: number | null;
	filter?: string | null;
	sort?: string | null;
	expands?: string | null;
}

export interface GetRetrieveAccessLogRequest {
	id: number;
	expands?: string | null;
}