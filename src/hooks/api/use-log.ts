'use client'

import { useReadHook } from "../core/use-read"
import { getListAccessLogs, getAccessLogById } from "@/data/log"
import {
  GetListAccessLogRequest,
  GetRetrieveAccessLogRequest
} from "@/types/request"
import {
  ReadResponse,
  AccessLogResponse
} from "@/types/response"

export function useAccessLogList(
  request: GetListAccessLogRequest
) {
  return useReadHook<
    ReadResponse<AccessLogResponse[]>,
    GetListAccessLogRequest
  >(
    "access-log-list",
    request,
    getListAccessLogs
  )
}

export function useAccessLogRetrieve(
  request: GetRetrieveAccessLogRequest
) {
  return useReadHook<
    ReadResponse<AccessLogResponse>,
    GetRetrieveAccessLogRequest
  >(
    "access-log-retrieve",
    request,
    getAccessLogById
  )
}
