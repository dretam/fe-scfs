'use client'

import useSWR from "swr"
import { swrFetcher } from "./fetcher"
import { defaultSWRConfig } from "./swr-options"

export function useReadHook<
  TSuccess,
  TRequest,
  TError = any
>(
  key: string,
  request: TRequest,
  apiCall: (req: TRequest) => Promise<TSuccess | TError>
) {
  const { data, error, isLoading, mutate } = useSWR(
    [key, request],
    () => swrFetcher<TSuccess>(apiCall(request)),
    defaultSWRConfig
  )

  return {
    response: data,
    isLoading,
    isError: error,
    mutate,
  }
}