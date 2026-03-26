'use client'

import { useReadHook } from "@/hooks/core/use-read"
import { getListOcrData, getOcrDataById } from "../service"

import {
  GetListOcrDataRequest,
  GetRetrieveOcrDataRequest,
  PostBulkOcrDataRequest,
  OCRResponse,
  OcrDataUpdateActionFormData,
  OcrDataDeleteActionFormData
} from "../types"

import { useAppMutation } from "@/hooks/core/use-mutation"
import { 
  approveOcrDataAction, 
  rejectOcrDataAction,
  updateOcrDataAction,
  destroyOcrDataAction
} from "../actions"
import { OCRDataEntity } from "../types";


export function useOcrDataList(
  request: GetListOcrDataRequest
) {
  return useReadHook<OCRResponse[]>({
    queryKey: [
      "ocr-data-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListOcrData(request),
  })
}

export function useOcrDataRetrieve(
  request: GetRetrieveOcrDataRequest
) {
  return useReadHook<OCRResponse>({
    queryKey: ["ocr-data-retrieve", request.id],
    apiCall: () => getOcrDataById(request),
    enabled: !!request.id,
  })
}

/**
 * UPDATE
 */
export function useUpdateOcrData() {
  return useAppMutation<OCRDataEntity, OcrDataUpdateActionFormData>(
    updateOcrDataAction,
    ["ocr-data-list"]
  )
}

/**
 * BULK APPROVE
 */
export function useApproveOcrData() {
  return useAppMutation<OCRDataEntity[], PostBulkOcrDataRequest>(
    approveOcrDataAction,
    ["ocr-data-list"]
  )
}

/**
 * BULK REJECT
 */
export function useRejectOcrData() {
  return useAppMutation<OCRDataEntity[], PostBulkOcrDataRequest>(
    rejectOcrDataAction,
    ["ocr-data-list"]
  )
}

/**
 * HARD DELETE
 */
export function useDestroyOcrData() {
  return useAppMutation<{ id: number }, number>(
    destroyOcrDataAction,
    ["ocr-data-list"]
  )
}
