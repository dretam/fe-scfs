"use server"

import {
  GetListRoleRequest,
  GetRetrieveRoleRequest,
  PostRoleRequest,
  DeleteRoleRequest,
  PutRoleRequest,
} from "@/types/request"

import {
  ReadResponse,
  Result,
  RoleResponse,
} from "@/types/response"
import { serverHttp } from "@/lib/server/server-fetch"


export async function getListRole(
  request: GetListRoleRequest
): Promise<
  Result<RoleResponse[]>
> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  })

  return serverHttp.get<
    RoleResponse[]
  >(`/roles?${params.toString()}`, {
    withAuth: true,
  })
}

/**
 * GET /roles/:id
 */
export async function getRetrieveRole(
  request: GetRetrieveRoleRequest
): Promise<Result<RoleResponse>> {

  return serverHttp.get(
    `/roles/${request.id}`,
    { withAuth: true }
  )
}



/**
 * POST /roles
 */
export async function createRole(
  request: PostRoleRequest
): Promise<Result<RoleResponse>> {

  return serverHttp.post<RoleResponse>(
    "/roles",
    request,
    { withAuth: true }
  )
}


/**
 * PUT /roles/:id
 */
export async function updateRole(
  request: PutRoleRequest
): Promise<Result<RoleResponse>> {

  return serverHttp.put<RoleResponse>(
    `/roles/${request.id}`,
    request,
    { withAuth: true }
  )
}



/**
 * DELETE /roles (soft delete)
 */
export async function softDeleteRole(
  request: DeleteRoleRequest
): Promise<Result<RoleResponse>> {

  return serverHttp.delete(
    "/roles",
    {
      body: JSON.stringify(request),
      withAuth: true,
    }
  )
}


/**
 * DELETE /roles/:id/destroy (hard delete)
 */
export async function hardDeleteRole(
  id: number
): Promise<Result<{ id: number }>> {

  return serverHttp.delete(
    `/roles/${id}/destroy`,
    { withAuth: true }
  )
}