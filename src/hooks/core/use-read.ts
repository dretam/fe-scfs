import { Result } from "@/types/response"
import { useQuery } from "@tanstack/react-query"

export function useReadHook<
  TData,
  TRequest
>(
  key: string,
  request: TRequest,
  apiCall: (req: TRequest) => Promise<Result<TData>>,
  options?: {
    enabled?: boolean
  }
) {
  const query = useQuery({
    queryKey: [key, request],
    queryFn: async () => {
      const response = await apiCall(request)

      if (!response.success) {
        throw response
      }

      return response
    },
    enabled: options?.enabled ?? true,
  })

  return {
    data: query.data,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error as Result<any> | null,
    refetch: query.refetch,
  }
}