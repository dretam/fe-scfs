"use server";

import {
  GetListDocumentRequest,
  GetRetrieveDocumentRequest,
  DeleteDocumentRequest
} from "@/types/request";

import {
  DocumentResponse,
  ReadResponse,
  Result
} from "@/types/response";

import { DocumentEntity, OCRDataEntity } from "@/types/entity";
import { serverHttp } from "@/lib/server/server-fetch";

/**
 * =========================
 * GET LIST
 * =========================
 */
export async function getListDocument(
  request: GetListDocumentRequest
): Promise<Result<DocumentResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  });

  return serverHttp.get<DocumentResponse[]>(
    `/documents?${params.toString()}`,
    { withAuth: true }
  );
}


/**
 * =========================
 * GET DETAIL
 * =========================
 */
export async function getDocumentById(
  request: GetRetrieveDocumentRequest
): Promise<Result<DocumentResponse>> {

  if (!request.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Document ID is required"
      }
    };
  }

  let endpoint = `/documents/${request.id}`;

  if (request.expands) {
    const params = new URLSearchParams({
      expands: request.expands
    });
    endpoint += `?${params.toString()}`;
  }

  return serverHttp.get<DocumentResponse>(
    endpoint,
    { withAuth: true }
  );
}


/**
 * =========================
 * UPLOAD
 * =========================
 */
export async function uploadDocument(
  file: File
): Promise<Result<OCRDataEntity[]>> {

  const formData = new FormData();
  formData.append("file", file);

  return serverHttp.post<OCRDataEntity[]>(
    "/documents",
    formData,
    {
      withAuth: true,
    }
  );
}


/**
 * =========================
 * UPDATE
 * =========================
 */
export async function updateDocument(
  id: number,
  file: File
): Promise<Result<DocumentEntity>> {

  const formData = new FormData();
  formData.append("file", file);

  const result = await serverHttp.put<DocumentResponse>(
    `/documents/${id}`,
    formData,
    {
      withAuth: true,
    }
  );

  if (!result.success) return result;

  const data = result.data;

  // mapping response → entity (kalau perlu)
  return {
    success: true,
    message: result.message,
    data: data as DocumentEntity
  };
}


/**
 * =========================
 * SOFT DELETE
 * =========================
 */
export async function softDeleteDocument(
  request: DeleteDocumentRequest
): Promise<Result<{ id: number }>> {

  return serverHttp.delete<{ id: number }>(
    "/documents/" + request.id,
    {
      withAuth: true
    }
  );
}


/**
 * =========================
 * HARD DELETE
 * =========================
 */
export async function hardDeleteDocument(
  id: number
): Promise<Result<{ id: number }>> {

  return serverHttp.delete<{ id: number }>(
    `/documents/${id}/destroy`,
    { withAuth: true }
  );
}


/**
 * =========================
 * MULTIPLE UPLOAD
 * =========================
 */
export async function uploadMultipleDocuments(
  files: File[]
): Promise<Result<DocumentResponse[]>> {

  const formData = new FormData();

  files.forEach(file => {
    formData.append("files", file);
  });

  return serverHttp.post<DocumentResponse[]>(
    "/documents/multiple",
    formData,
    {
      withAuth: true,
    }
  );
}