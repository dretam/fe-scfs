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

