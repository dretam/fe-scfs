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
