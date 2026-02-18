export interface UnauthorizedResponse {
	status: number;
	message: string;
}

export interface BadRequestResponse {
	status: number;
	type: string;
	message: Record<string, string> | string;
}

export interface AuthLoginResponse {
	status: number;
	message: string;
	refreshToken: string;
	accessToken: string;
}

export interface AuthRefreshResponse {
	status: number;
	message: string;
	accessToken: string;
}

export interface PaginationResponse {
	total: number;
	count: number;
	currentPage: number;
	perPage: number;
	totalPage: number;
	hasNext: boolean;
	hasPrevious: boolean;
	hasContent: boolean
}

export interface ReadResponse<T> {
	status: number;
	message: string;
	data: T;
	pagination: PaginationResponse
}

export interface RoleResponse {
	id: number;
	name: string;
	icon: string;
	description: string;
	createdAt: string;
	createdBy: number;
	updatedAt: string;
	updatedBy: number;
	deletedAt: string;
	deletedBy: number
}

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	role: RoleResponse | null;
	createdAt: string;
	createdBy: number;
	updatedAt: string;
	updatedBy: number;
	deletedAt: string;
	deletedBy: number
}


export interface DocumentResponse {
  id: number
  filename: string
  originalName: string
  filePath: string
  fileSize: number
  mimeType: string
  uploadedBy: number
  userId: number
  createdAt: string
  createdBy: number
  updatedAt: string
  updatedBy: number
  deletedAt: string
  deletedBy: number
}
