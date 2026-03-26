'use client'

import { useReadHook } from "@/hooks/core/use-read"
import { getListAccessLogs, getAccessLogById } from "../service"

import {
  GetListAccessLogRequest,
  GetRetrieveAccessLogRequest,
  AccessLogResponse
} from "../types"


export function useAccessLogList(
  request: GetListAccessLogRequest
) {
  return useReadHook<AccessLogResponse[]>({
    queryKey: [
      "access-log-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListAccessLogs(request),
  })
}

export function useAccessLogRetrieve(
  request: GetRetrieveAccessLogRequest
) {
  return useReadHook<AccessLogResponse>({
    queryKey: ["access-log-retrieve", request.id],
    apiCall: () => getAccessLogById(request),
    enabled: !!request.id,
  })
}
