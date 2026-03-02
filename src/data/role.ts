"use server"

import {
  GetListRoleRequest,
  GetRetrieveRoleRequest,
  PostRoleRequest,
  DeleteRoleRequest,
  PutRoleRequest,
} from "@/types/request"

import { RoleEntity } from "@/types/entity"

import {
  ReadResponse,
  RoleResponse,
  ApiResponse,
} from "@/types/response"
import { serverHttp } from "@/lib/server/server-fetch"


export async function getListRole(
  request: GetListRoleRequest
): Promise<
  ApiResponse<RoleResponse[]>
> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  })

  return serverHttp.get<
    ReadResponse<RoleResponse[]>
  >(`/roles?${params.toString()}`, {
    withAuth: true,
  })
}
export async function getRetrieveRole(
  request: GetRetrieveRoleRequest
): Promise<
  ApiResponse<RoleResponse>
> {
  return serverHttp.get<
    ReadResponse<RoleResponse>
  >(`/roles/${request.id}`, {
    withAuth: true,
  })
}

export async function createRole(
  request: PostRoleRequest
): Promise<
  ApiResponse<RoleEntity>
> {

  const result = await serverHttp.post<
    ReadResponse<RoleResponse>
  >("/roles", request, {
    withAuth: true,
  })

  return result
}

export async function updateRole(
  request: PutRoleRequest
): Promise<
  ApiResponse<RoleEntity>
> {

  const result = await serverHttp.post<
    ReadResponse<RoleResponse>
  >("/roles", request, {
    withAuth: true,
  })

  return result
}


export async function softDeleteRole(
  request: DeleteRoleRequest
): Promise<
  ApiResponse<RoleEntity>> {
  const result = await serverHttp.delete<
    ReadResponse<RoleResponse>
  >("/roles", {
    body: JSON.stringify(request),
    withAuth: true,
  })

  return result
}

export async function hardDeleteRole(
  id: number
): Promise<
  ApiResponse<any>
> {

  return await serverHttp.delete(
    `/roles/${id}/destroy`,
    { withAuth: true }
  )

}