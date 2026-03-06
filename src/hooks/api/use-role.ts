'use client'

import { useReadHook } from "../core/use-read"
import { getListRole, getRetrieveRole } from "@/data/role"
import {
  GetListRoleRequest,
  GetRetrieveRoleRequest
} from "@/types/request"
import {
  RoleResponse
} from "@/types/response"

export function useRoleList(
  request: GetListRoleRequest
) {
  return useReadHook<RoleResponse[]>({
    queryKey: [
      "role-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListRole(request),
  })
}

export function useRoleRetrieve(
  request: GetRetrieveRoleRequest
) {
  return useReadHook<RoleResponse>({
    queryKey: ["role-retrieve", request.id],
    apiCall: () => getRetrieveRole(request),
    enabled: !!request.id,
  })
}
