import { Result } from "@/types/response";
import {
  useQuery,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";

type UseReadHookOptions<TData> = {
  queryKey: QueryKey;
  apiCall: () => Promise<Result<TData>>;
} & Omit<
  UseQueryOptions<Result<TData>, Result<any>>,
  "queryKey" | "queryFn"
>;

export function useReadHook<TData>(
  options: UseReadHookOptions<TData>
) {
  const { queryKey, apiCall, ...queryOptions } = options;

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await apiCall();

      if (!response.success) {
        throw response;
      }

      return response;
    },
    ...queryOptions,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Result<any> | null,
    refetch: query.refetch,
  };
}