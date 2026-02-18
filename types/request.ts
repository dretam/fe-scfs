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