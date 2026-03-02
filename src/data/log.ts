"use server";

import {
  GetListAccessLogRequest,
  GetRetrieveAccessLogRequest
} from "@/types/request";

import { AccessLogResponse, Result } from "@/types/response";
import { serverHttp } from "@/lib/server/server-fetch";


/**
 * GET LIST
 */
export async function getListAccessLogs(
  request: GetListAccessLogRequest
): Promise<Result<AccessLogResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  });

  return serverHttp.get<AccessLogResponse[]>(
    `/logs/access?${params.toString()}`,
    { withAuth: true }
  );
}


/**
 * GET DETAIL
 */
export async function getAccessLogById(
  request: GetRetrieveAccessLogRequest
): Promise<Result<AccessLogResponse>> {

  if (!request.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Access Log ID is required"
      }
    };
  }

  let endpoint = `/logs/access/${request.id}`;

  if (request.expands) {
    const params = new URLSearchParams({
      expands: request.expands
    });
    endpoint += `?${params.toString()}`;
  }

  return serverHttp.get<AccessLogResponse>(
    endpoint,
    { withAuth: true }
  );
}
