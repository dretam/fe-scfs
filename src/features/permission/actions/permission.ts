"use server"

import {
  PostPermissionRequest,
  PutPermissionRequest,
  DeletePermissionRequest
} from "../types"

import {
  createPermission,
  updatePermission,
  softDeletePermission,
  hardDeletePermission
} from "../service/permission"

import { PermissionResponse } from "../types"
import { Result } from "@/types/response"


/**
 * CREATE
 */
export async function permissionCreateAction(
  request: PostPermissionRequest
): Promise<Result<PermissionResponse>> {

  return createPermission(request)
}


/**
 * UPDATE
 */
export async function permissionUpdateAction(
  request: PutPermissionRequest
): Promise<Result<PermissionResponse>> {

  return updatePermission(request)
}


/**
 * SOFT DELETE
 */
export async function permissionSoftDeleteAction(
  request: DeletePermissionRequest
): Promise<Result<PermissionResponse>> {

  return softDeletePermission(request)
}


/**
 * HARD DELETE
 */
export async function permissionHardDeleteAction(
  id: number
): Promise<Result<{ id: number }>> {

  return hardDeletePermission(id)
}
