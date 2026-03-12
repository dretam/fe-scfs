"use server"

import {
  ListByUserUserPermissionRequest,
  PostUserPermissionRequest,
  PutUserPermissionRequest,
  DeleteUserPermissionRequest,
  UserPermissionResponse
} from "../types";
import { Result } from "@/types/response";

import { serverHttp } from "@/lib/server/server-fetch"


/**
 * GET /users/:userId/permissions
 */
export async function listByUserPermission(
  request: ListByUserUserPermissionRequest
): Promise<
  Result<UserPermissionResponse[]>
> {

  return serverHttp.get<
    UserPermissionResponse[]
  >(`/users/${request.userId}/permissions`, {
    withAuth: true,
  })
}

/**
 * POST /users/:userId/permissions
 */
export async function createUserPermission(
  request: PostUserPermissionRequest
): Promise<Result<UserPermissionResponse>> {

  return serverHttp.post<UserPermissionResponse>(
    `/users/${request.userId}/permissions`,
    request,
    { withAuth: true }
  )
}


/**
 * PUT /users/:userId/permissions/:permissionId
 */
export async function updateUserPermission(
  request: PutUserPermissionRequest
): Promise<Result<UserPermissionResponse>> {

  return serverHttp.put<UserPermissionResponse>(
    `/users/${request.userId}/permissions/${request.permissionId}`,
    request,
    { withAuth: true }
  )
}



/**
 * DELETE /users/:userId/permissions/:permissionId
 */
export async function deleteUserPermission(
  request: DeleteUserPermissionRequest
): Promise<Result<void>> {

  return serverHttp.delete(
    `/users/${request.userId}/permissions/${request.permissionId}`,
    { withAuth: true }
  )
}
