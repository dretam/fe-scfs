"use server";

import { DocumentUpdateActionFormData } from "@/types/form-data";
import { DocumentEntity } from "../types";
import { OCRDataEntity } from "@/features/ocr-data/types";

import {
  uploadDocument,
  getListDocument,
  getDocumentById,
  updateDocument,
  softDeleteDocument,
  hardDeleteDocument,
  uploadMultipleDocuments
} from "../service";

import {
  GetListDocumentRequest,
  GetRetrieveDocumentRequest,
  DocumentResponse,
} from "../types";
import { Result } from "@/types/response";



/**
 * UPLOAD
 */
export async function uploadDocumentAction(
  formData: FormData
): Promise<Result<OCRDataEntity[]>> {
  const file = formData.get("file") as File | null;

  if (!file) {
    return {
      success: false,
      error: {
        status: 400,
        message: "File is required"
      }
    };
  }

  return uploadDocument(file);
}


/**
 * UPLOAD MULTIPLE
 */
export async function uploadMultipleDocumentsAction(
  files: File[]
): Promise<Result<DocumentResponse[]>> {

  return uploadMultipleDocuments(files);
}


/**
 * LIST
 */
export async function listDocumentsAction(
  request: GetListDocumentRequest
): Promise<Result<DocumentResponse[]>> {

  return getListDocument(request);
}


/**
 * DETAIL
 */
export async function getDocumentAction(
  request: GetRetrieveDocumentRequest
): Promise<Result<DocumentResponse>> {

  return getDocumentById(request);
}


/**
 * UPDATE
 */
export async function updateDocumentAction(
  formData: DocumentUpdateActionFormData
): Promise<Result<DocumentEntity>> {

  if (!formData.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Document ID is required"
      }
    };
  }

  return updateDocument(formData.id, formData.file);
}


/**
 * SOFT DELETE
 */
export async function deleteDocumentAction(
  documentId: number
): Promise<Result<{ id: number }>> {

  return softDeleteDocument({ id: documentId });
}


/**
 * HARD DELETE
 */
export async function destroyDocumentAction(
  documentId: number
): Promise<Result<{ id: number }>> {

  return hardDeleteDocument(documentId);
}
