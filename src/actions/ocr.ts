"use server";

import { OcrDataUpdateActionFormData } from "@/types/form-data";
import { OCRDataEntity } from "@/types/entity";
import {
  getListOcrData,
  getOcrDataById,
  updateOcrData,
  hardDeleteOcrData
} from "@/data/ocr";
import {
  GetListOcrDataRequest,
  GetRetrieveOcrDataRequest
} from "@/types/request";
import { OCRResponse, Result } from "@/types/response";


/**
 * LIST
 */
export async function listOcrDataAction(
  request: GetListOcrDataRequest
): Promise<Result<OCRResponse[]>> {

  return getListOcrData(request);
}



/**
 * DETAIL
 */
export async function getOcrDataAction(
  request: GetRetrieveOcrDataRequest
): Promise<Result<OCRResponse>> {

  return getOcrDataById(request);
}



/**
 * UPDATE
 */
export async function updateOcrDataAction(
  formData: OcrDataUpdateActionFormData
): Promise<Result<OCRDataEntity>> {

  if (!formData.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "OCR Data ID is required"
      }
    };
  }

  return updateOcrData({
    id: formData.id,
    atasNama: formData.atasNama,
    nominal: formData.nominal,
    jangkaWaktu: formData.jangkaWaktu,
    periode: formData.periode,
    rate: formData.rate,
    alokasi: formData.alokasi,
    namaRekeningTujuanPencairan: formData.namaRekeningTujuanPencairan,
    nomorRekeningTujuanPencairan: formData.nomorRekeningTujuanPencairan,
    nomorRekeningPengirim: formData.nomorRekeningPengirim,
    nomorRekeningPlacement: formData.nomorRekeningPlacement,
  });
}



/**
 * HARD DELETE
 */
export async function destroyOcrDataAction(
  ocrDataId: number
): Promise<Result<{ id: number }>> {

  return hardDeleteOcrData(ocrDataId);
}