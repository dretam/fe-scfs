'use client'

import { useReadHook } from "../core/use-read"
import { getListOcrData, getOcrDataById } from "@/data/ocr"
import {
  GetListOcrDataRequest,
  GetRetrieveOcrDataRequest
} from "@/types/request"
import {
  OCRResponse
} from "@/types/response"

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