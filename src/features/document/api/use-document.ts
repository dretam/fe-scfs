'use client'

import { useReadHook } from "@/hooks/core/use-read"
import { getListDocument, getDocumentById } from "../service"

import {
  GetListDocumentRequest,
  GetRetrieveDocumentRequest,
  DocumentResponse
} from "../types"


export function useDocumentList(
  request: GetListDocumentRequest
) {
  return useReadHook<DocumentResponse[]>({
    queryKey: [
      "document-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListDocument(request),
  })
}

export function useDocumentRetrieve(
  request: GetRetrieveDocumentRequest
) {
  return useReadHook<DocumentResponse>({
    queryKey: ["document-retrieve", request.id],
    apiCall: () => getDocumentById(request),
    enabled: !!request.id,
  })
}
