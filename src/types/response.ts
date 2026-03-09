// types/api-result.ts

export interface ApiError {
	status: number
	message?: string | Record<string, string>
	type?: string
}

export interface Paginated<T> {
	items: T
	pagination?: PaginationResponse
}

export interface SuccessResult<T> {
	success: true;
	message: string;
	data: T;
	pagination?: PaginationResponse
	accessToken?: string
	refreshToken?: string
}

export interface ErrorResult {
	success: false;
	data?: any | null;
	error: ApiError
}

export type Result<T> =
	| SuccessResult<T>
	| ErrorResult

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
	pagination?: PaginationResponse
}

export interface BaseAuditResponse {
	createdAt?: string | null;
	createdBy?: number | null;
	updatedAt?: string | null;
	updatedBy?: number | null;
	deletedAt?: string | null;
	deletedBy?: number | null;
}