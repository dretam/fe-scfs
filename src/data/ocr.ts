"use server";

import {
  GetListOcrDataRequest,
  GetRetrieveOcrDataRequest,
  PutOcrDataRequest
} from "@/types/request";

import { OCRResponse, Result } from "@/types/response";
import { OCRDataEntity } from "@/types/entity";
import { serverHttp } from "@/lib/server/server-fetch";

/**
 * GET LIST
 */
export async function getListOcrData(
  request: GetListOcrDataRequest
): Promise<Result<OCRResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  });

  return serverHttp.get<OCRResponse[]>(
    `/ocr-data?${params.toString()}`,
    { withAuth: true }
  );
}



/**
 * GET DETAIL
 */
export async function getOcrDataById(
  request: GetRetrieveOcrDataRequest
): Promise<Result<OCRResponse>> {

  if (!request.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "OCR Data ID is required"
      }
    };
  }

  let endpoint = `/ocr-data/${request.id}`;

  if (request.expands) {
    const params = new URLSearchParams({
      expands: request.expands
    });
    endpoint += `?${params.toString()}`;
  }

  return serverHttp.get<OCRResponse>(
    endpoint,
    { withAuth: true }
  );
}



/**
 * UPDATE
 */
export async function updateOcrData(
  request: PutOcrDataRequest
): Promise<Result<OCRDataEntity>> {

  const result = await serverHttp.put<OCRResponse>(
    "/ocr-data",
    request,
    { withAuth: true }
  );

  if (!result.success) {
    return result;
  }

  // Map OCRResponse → OCRDataEntity
  const data = result.data;

  return {
    success: true,
    data: {
      id: data.id,
      atasNama: data.atasNama,
      nominal: data.nominal,
      jangkaWaktu: data.jangkaWaktu,
      periode: data.periode,
      rate: data.rate,
      alokasi: data.alokasi,
      namaRekeningTujuanPencairan: data.namaRekeningTujuanPencairan,
      nomorRekeningTujuanPencairan: data.nomorRekeningTujuanPencairan,
      nomorRekeningPengirim: data.nomorRekeningPengirim,
      nomorRekeningPlacement: data.nomorRekeningPlacement,
    }
  };
}



/**
 * HARD DELETE
 */
export async function hardDeleteOcrData(
  id: number
): Promise<Result<{ id: number }>> {

  return serverHttp.delete<{ id: number }>(
    `/ocr-data/${id}/destroy`,
    { withAuth: true }
  );
}