'use client'

import { useReadHook } from "../core/use-read"
import { getListRole, getRetrieveRole } from "@/data/role"
import {
  GetListRoleRequest,
  GetRetrieveRoleRequest
} from "@/types/request"
import {
  ReadResponse,
  RoleResponse
} from "@/types/response"

export function useRoleList(
  request: GetListRoleRequest
) {
  return useReadHook<
    ReadResponse<RoleResponse[]>,
    GetListRoleRequest
  >(
    "role-list",
    request,
    getListRole
  )
}

export function useRoleRetrieve(
  request: GetRetrieveRoleRequest
) {
  return useReadHook<
    ReadResponse<RoleResponse>,
    GetRetrieveRoleRequest
  >(
    "role-retrieve",
    request,
    getRetrieveRole
  )
}