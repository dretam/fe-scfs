'use client'

import { Result } from '@/types/response'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAppMutation<TData, TRequest>(
  apiCall: (req: TRequest) => Promise<Result<TData>>,
  invalidateKeys?: string[]
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (request: TRequest) => {
      const response = await apiCall(request)

      return response
    },

    onSuccess: async () => {
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({
              queryKey: [key],
            })
          )
        )
      }
    },
  })

  return {
    execute: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Result<any> | null,
  }
}