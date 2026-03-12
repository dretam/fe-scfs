"use server";

import { Result } from "@/types/response";

import { OCRDataEntity } from "@/features/ocr-data/types";

import { serverHttp } from "@/lib/server/server-fetch";

export async function uploadDocument(
  file: File
): Promise<Result<OCRDataEntity[]>> {

  const formData = new FormData();
  formData.append("file", file);

  return serverHttp.post<OCRDataEntity[]>(
    "/documents",
    formData,
    {
      withAuth: true,
    }
  );
}