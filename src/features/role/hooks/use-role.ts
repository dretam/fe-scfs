'use client'

import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read"
import { useAppMutation } from "@/hooks/core/use-mutation"
import { getListRole, getRetrieveRole } from "../service"
import {
  roleCreateAction,
  roleUpdateAction,
  roleSoftDeleteAction,
  roleHardDeleteAction
} from "../actions"

import {
  GetListRoleRequest,
  GetRetrieveRoleRequest,
  RoleResponse,
  RoleFormActionFormData,
  RoleDeleteActionFormData
} from "../types"


export function useRoleList(
  request: GetListRoleRequest
) {
  return useReadHook<RoleResponse[]>({
    queryKey: [
      "role-list",
      request.page,
      request.perPage,
      request.filter ?? "",
      request.expands ?? "",
    ],
    apiCall: () => getListRole(request),
  });
}

export function useRoleRetrieve(
  request: GetRetrieveRoleRequest,
  options?: IReactQueryOptions<RoleResponse>
) {
  return useReadHook<RoleResponse>({
    queryKey: ["role-retrieve", request.id, request.expands],
    apiCall: () => getRetrieveRole(request),
    enabled: !!request.id,
    ...options
  })
}

/**
 * CREATE
 */
export function useRoleCreate() {
  return useAppMutation<RoleResponse, RoleFormActionFormData>(
    roleCreateAction,
    ['role-list']
  )
}

/**
 * UPDATE
 */
export function useRoleUpdate() {
  return useAppMutation<RoleResponse, RoleFormActionFormData>(
    roleUpdateAction,
    ['role-list', 'role-retrieve']
  )
}

/**
 * SOFT DELETE
 */
export function useRoleSoftDelete() {
  return useAppMutation<RoleResponse, RoleDeleteActionFormData>(
    roleSoftDeleteAction,
    ['role-list']
  )
}

/**
 * HARD DELETE
 */
export function useRoleHardDelete() {
  return useAppMutation<{ id: number }, number>(
    roleHardDeleteAction,
    ['role-list']
  )
}
