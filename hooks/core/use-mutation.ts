'use client'

import { useState } from "react"
import { mutate } from "swr"

type ApiError = {
    status?: number
    message?: string
}

export function useMutation<TResponse, TRequest>(
    apiCall: (req: TRequest) => Promise<TResponse>,
    revalidateKeys?: (string | any[])[]
) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const execute = async (request: TRequest): Promise<TResponse> => {
        try {
            setIsLoading(true)
            setError(null)

            const result: any = await apiCall(request)

            // Handle backend union response
            if (!("data" in result) && result?.status) {
                const err = new Error(
                    typeof result.message === "string"
                        ? result.message
                        : JSON.stringify(result.message)
                )
                throw err
            }

            // 🔥 Revalidate after success
            if (revalidateKeys?.length) {
                await Promise.all(
                    revalidateKeys.map((key) => mutate(key))
                )
            }

            return result

        } catch (err: any) {
            setError(err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        execute,
        isLoading,
        isError: error,
    }
}