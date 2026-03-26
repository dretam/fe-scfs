"use server";

import { OCRDataEntity } from "@/features/ocr-data/types";
import { uploadDocument } from "../service";
import { Result } from "@/types/response";


export async function uploadDocumentAction(
  formData: FormData
): Promise<Result<OCRDataEntity[]>> {
  const file = formData.get("file") as File | null;

  if (!file) {
    return {
      success: false,
      error: {
        status: 400,
        message: "File is required"
      }
    };
  }

  return uploadDocument(file);
}
