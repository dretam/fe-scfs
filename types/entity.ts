export interface RoleEntity {
	id: number | null,
	name: string | null,
	icon: string | null,
	description: string | null,
}

export interface UserEntity {
	id: number | null,
	name: string | null,
	email: string | null,
	role: RoleEntity | null,
}

export interface DocumentEntity {
	id: number,
	fileName: string,
	url: string,
}

export interface DocumentEntity {
	id: number;
	filename: string;
	originalName: string;
	filePath: string;
	fileSize: number;
	mimeType: string;
	uploadedBy: number;
	userId: number;
	createdAt: string;
	createdBy: number;
	updatedAt: string;
	updatedBy: number;
	deletedAt: string;
	deletedBy: number;
}

export interface OCRDataEntity {
  id: number
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
}

export interface AccessLogEntity {
	id: number;
	user: UserEntity | null;
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

