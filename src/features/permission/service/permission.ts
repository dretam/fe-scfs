"use server"

import {
  GetListPermissionRequest,
  GetRetrievePermissionRequest,
  PostPermissionRequest,
  PutPermissionRequest,
  DeletePermissionRequest,
  PermissionResponse
} from "../types";
import { Result } from "@/types/response";

import { serverHttp } from "@/lib/server/server-fetch"


/**
 * GET /permissions
 */
export async function getListPermission(
  request: GetListPermissionRequest
): Promise<
  Result<PermissionResponse[]>
> {
  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
  })

  return serverHttp.get<
    PermissionResponse[]
  >(`/permissions?${params.toString()}`, {
    withAuth: true,
  })
}

/**
 * GET /permissions/:id
 */
export async function getRetrievePermission(
  request: GetRetrievePermissionRequest
): Promise<Result<PermissionResponse>> {

  return serverHttp.get(
    `/permissions/${request.id}`,
    { withAuth: true }
  )
}



/**
 * POST /permissions
 */
export async function createPermission(
  request: PostPermissionRequest
): Promise<Result<PermissionResponse>> {

  return serverHttp.post<PermissionResponse>(
    "/permissions",
    request,
    { withAuth: true }
  )
}


/**
 * PUT /permissions/:id
 */
export async function updatePermission(
  request: PutPermissionRequest
): Promise<Result<PermissionResponse>> {

  return serverHttp.put<PermissionResponse>(
    `/permissions/${request.id}`,
    request,
    { withAuth: true }
  )
}



/**
 * DELETE /permissions (soft delete)
 */
export async function softDeletePermission(
  request: DeletePermissionRequest
): Promise<Result<PermissionResponse>> {

  return serverHttp.delete(
    "/permissions",
    {
      body: JSON.stringify(request),
      withAuth: true,
    }
  )
}


/**
 * DELETE /permissions/:id/destroy (hard delete)
 */
export async function hardDeletePermission(
  id: number
): Promise<Result<{ id: number }>> {

  return serverHttp.delete(
    `/permissions/${id}/destroy`,
    { withAuth: true }
  )
}
