"use server";

import {
  GetListAccessLogRequest,
  GetRetrieveAccessLogRequest
} from "@/types/request";
import { AccessLogResponse, Result } from "@/types/response";
import { getListAccessLogs, getAccessLogById } from "@/data/log";


/**
 * LIST
 */
export async function listAccessLogsAction(
  request: GetListAccessLogRequest
): Promise<Result<AccessLogResponse[]>> {

  return getListAccessLogs(request);
}


/**
 * DETAIL
 */
export async function getAccessLogAction(
  request: GetRetrieveAccessLogRequest
): Promise<Result<AccessLogResponse>> {

  return getAccessLogById(request);
}
