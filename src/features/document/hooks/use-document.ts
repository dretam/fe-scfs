'use client'

import { OCRDataEntity } from "@/features/ocr-data";
import { useAppMutation } from "@/hooks/core/use-mutation";
import { uploadDocumentAction } from "../actions";


export function useDocumentUpload() {
  return useAppMutation<OCRDataEntity[], FormData>(
    uploadDocumentAction,
    []
  )
}
