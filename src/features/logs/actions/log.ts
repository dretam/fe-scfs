"use server";

import {
  GetListAccessLogRequest,
  GetRetrieveAccessLogRequest,
  AccessLogResponse,
} from "../types";
import { Result } from "@/types/response";

import { getListAccessLogs, getAccessLogById } from "../service";



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
