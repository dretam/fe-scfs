'use client'

import { useState } from "react"
import { mutate } from "swr"
import { ApiResponse } from "@/types/response"

export function useMutation<TData, TRequest>(
  apiCall: (req: TRequest) => Promise<ApiResponse<TData>>,
  revalidateKeys?: (string | any[])[],
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiResponse<any> | null>(null)

  const execute = async (
    request: TRequest
  ): Promise<ApiResponse<TData>> => {

    try {
      setIsLoading(true)
      setError(null)

      const response = await apiCall(request)

      const isSuccess =
        response.status >= 200 && response.status < 300

      if (!isSuccess) {
        setError(response)
        return response
      }

      if (revalidateKeys?.length) {
        await Promise.all(
          revalidateKeys.map((key) => mutate(key))
        )
      }

      return response

    } finally {
      setIsLoading(false)
    }
  }

  return {
    execute,
    isLoading,
    isError: !!error,
    error,
  }
}