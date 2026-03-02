'use client'

import { useReadHook } from "../core/use-read"
import { getListDocument, getDocumentById } from "@/data/document"
import {
  GetListDocumentRequest,
  GetRetrieveDocumentRequest
} from "@/types/request"
import {
  DocumentResponse
} from "@/types/response"

export function useDocumentList(
  request: GetListDocumentRequest
) {
  return useReadHook<
    DocumentResponse[],
    GetListDocumentRequest
  >(
    "document-list",
    request,
    getListDocument
  )
}

export function useDocumentRetrieve(
  request: GetRetrieveDocumentRequest
) {
  return useReadHook<
    DocumentResponse,
    GetRetrieveDocumentRequest
  >(
    "document-retrieve",
    request,
    getDocumentById
  )
}
