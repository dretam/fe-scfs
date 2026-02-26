"use server"

import {
  GetListRoleRequest,
  GetRetrieveRoleRequest,
  PostRoleRequest,
  PutRoleRequest,
  DeleteRoleRequest,
} from "@/types/request"

import { RoleEntity } from "@/types/entity"
import {
  ApiResponse,
  handleServerResponse,
} from "@/lib/server/server-response"

import { serverFetch } from "@/lib/server/server-fetch"
import { RoleResponse, ReadResponse } from "@/types/response"



/* =========================================================
   GET LIST
========================================================= */

export async function getListRole(
  request: GetListRoleRequest
): Promise<ApiResponse<RoleResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  })

  return serverFetch<RoleResponse[]>(
    `/roles?${params.toString()}`,
    {
      method: "GET",
      withAuth: true,
    }
  )
}



/* =========================================================
   GET DETAIL
========================================================= */

export async function getRetrieveRole(
  request: GetRetrieveRoleRequest
): Promise<ApiResponse<RoleResponse>> {

  return serverFetch<RoleResponse>(
    `/roles/${request.id}`,
    {
      method: "GET",
      withAuth: true,
    }
  )
}



/* =========================================================
   CREATE
========================================================= */

export async function createRole(
  request: PostRoleRequest
): Promise<RoleEntity> {

  const response = await serverFetch<RoleResponse>(
    `/roles`,
    {
      method: "POST",
      body: JSON.stringify(request),
      withAuth: true,
    }
  )

  const data = handleServerResponse(response)

  return mapToEntity(data)
}



/* =========================================================
   UPDATE
========================================================= */

export async function updateRole(
  request: PutRoleRequest
): Promise<RoleEntity> {

  const response = await serverFetch<RoleResponse>(
    `/roles`,
    {
      method: "PUT",
      body: JSON.stringify(request),
      withAuth: true,
    }
  )

  const data = handleServerResponse(response)

  return mapToEntity(data)
}



/* =========================================================
   SOFT DELETE
========================================================= */

export async function softDeleteRole(
  request: DeleteRoleRequest
): Promise<RoleEntity> {

  const response = await serverFetch<RoleResponse>(
    `/roles`,
    {
      method: "DELETE",
      body: JSON.stringify(request),
      withAuth: true,
    }
  )

  const data = handleServerResponse(response)

  return mapToEntity(data)
}



/* =========================================================
   HARD DELETE
========================================================= */

export async function hardDeleteRole(
  id: number
): Promise<{ id: number }> {

  const response = await serverFetch<RoleResponse>(
    `/roles/${id}/destroy`,
    {
      method: "DELETE",
      withAuth: true,
    }
  )

  handleServerResponse(response)

  return { id }
}



function mapToEntity(
  response: ReadResponse<RoleResponse>
): RoleEntity {

  const role = response.data

  return {
    id: role.id,
    name: role.name,
    icon: role.icon,
    description: role.description,
  }
}