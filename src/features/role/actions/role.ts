"use server"

import {
  RoleFormActionFormData,
  RoleDeleteActionFormData
} from "../types"
import {
  createRole,
  updateRole,
  softDeleteRole,
  hardDeleteRole
} from "../service"

import { Result } from "@/types/response"
import { RoleResponse } from "../types"

/**
 * CREATE
 */
export async function roleCreateAction(
  formData: RoleFormActionFormData
): Promise<Result<RoleResponse>> {

  return createRole({
    name: formData.name,
    icon: formData.icon,
    description: formData.description,
    permissionIds: formData.permissionIds
  })
}



/**
 * UPDATE
 */
export async function roleUpdateAction(
  formData: RoleFormActionFormData
): Promise<Result<RoleResponse>> {

  if (!formData.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Role ID is required"
      }
    }
  }

  return updateRole({
    id: formData.id,
    name: formData.name,
    icon: formData.icon,
    description: formData.description,
    permissionIds: formData.permissionIds
  })
}



/**
 * SOFT DELETE
 */
export async function roleSoftDeleteAction(
  formData: RoleDeleteActionFormData
): Promise<Result<RoleResponse>> {

  return softDeleteRole({
    id: formData.roleId
  })
}



/**
 * HARD DELETE
 */
export async function roleHardDeleteAction(
  roleId: number
): Promise<Result<{ id: number }>> {

  return hardDeleteRole(roleId)
}
