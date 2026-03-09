'use client'

import { useReadHook } from "@/hooks/core/use-read"
import { getListRole, getRetrieveRole } from "../service"

import {
  GetListRoleRequest,
  GetRetrieveRoleRequest,
  RoleResponse
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
  request: GetRetrieveRoleRequest
) {
  return useReadHook<RoleResponse>({
    queryKey: ["role-retrieve", request.id],
    apiCall: () => getRetrieveRole(request),
    enabled: !!request.id,
  })
}
