'use client'

import { useReadHook } from "../core/use-read"
import { getListOcrData, getOcrDataById } from "@/data/ocr"
import {
  GetListOcrDataRequest,
  GetRetrieveOcrDataRequest
} from "@/types/request"
import {
  ReadResponse,
  OCRResponse
} from "@/types/response"

export function useOcrDataList(
  request: GetListOcrDataRequest
) {
  return useReadHook<
    ReadResponse<OCRResponse[]>,
    GetListOcrDataRequest
  >(
    "ocr-data-list",
    request,
    getListOcrData
  )
}

export function useOcrDataRetrieve(
  request: GetRetrieveOcrDataRequest
) {
  return useReadHook<
    ReadResponse<OCRResponse>,
    GetRetrieveOcrDataRequest
  >(
    "ocr-data-retrieve",
    request,
    getOcrDataById
  )
}
