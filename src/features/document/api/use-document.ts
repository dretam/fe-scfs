import { OCRDataEntity } from "@/features/ocr-data";
import { useAppMutation } from "@/hooks/core/use-mutation";
import { uploadDocumentAction } from "./document";


export function useUserCreate() {
  return useAppMutation<OCRDataEntity[], FormData>(
    uploadDocumentAction,
    ['user-list']
  )
}