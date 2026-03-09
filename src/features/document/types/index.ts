import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

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

export interface GetListDocumentRequest extends BaseListRequest { }

export interface GetRetrieveDocumentRequest extends BaseRetrieveRequest { }

export interface PutDocumentRequest {
    id: number;
    file: File;
}

export interface DeleteDocumentRequest {
    id: number;
}

export interface DocumentResponse extends BaseAuditResponse {
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
}

