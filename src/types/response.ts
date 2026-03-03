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
	pagination?: PaginationResponse
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
	url: string
	fileName: string
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


export interface OCRResponse {
	id: number
	document: DocumentResponse | null
	atasNama: string
	nominal: string
	jangkaWaktu: string
	periode: string
	rate: string
	alokasi: string
	namaRekeningTujuanPencairan: string
	nomorRekeningTujuanPencairan: string
	nomorRekeningPengirim: string
	nomorRekeningPlacement: string
	status: string
	createdAt: string
	createdBy: number
	updatedAt: any
	updatedBy: any
	deletedAt: any
	deletedBy: any
}

export interface AccessLogResponse {
	id: number;
	user: UserResponse | null;
	ipAddress: string;
	userAgent: string;
	uri: string;
	queryParams: string | null;
	requestBody: string | null;
	statusCode: number;
	responseTimeMs: number;
	errorMessage: string | null;
	httpMethod: string;
	createdAt: string;
}

export interface InternalUserResponse {
  userName: string
  nama: string
  joinDate: string
  jabatan: number
  approval1: string
  approval2: string
  lastLogin: string
  updatePass: string
  status: number
  count: number
  email: string
  area: string
  jobTitle: string
  direktorat: string
  sex: string
  employee: string
  mobile: string
  extOffice: any
  tglLahir: string
  pangkat: string
  sessionId: any
  usersCabang: any
  usersBranch: any
}