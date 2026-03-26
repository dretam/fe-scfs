'use client'

import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read"
import {
  getListMenu,
  getRetrieveMenu,
  getMenuByRole,
  getMenuTreeByRole
} from "../service"

import {
  GetListMenuRequest,
  GetRetrieveMenuRequest,
  MenuResponse,
  MenuEntity,
  MenuCreateActionFormData,
  MenuDeleteActionFormData,
  PostMenuRequest,
  PutMenuRequest
} from "../types"
import { useAppMutation } from "@/hooks/core/use-mutation"
import {
  menuCreateAction,
  menuUpdateAction,
  menuSoftDeleteAction,
  menuHardDeleteAction
} from "../actions"


export function useMenuList(
  request: GetListMenuRequest
) {
  return useReadHook<MenuResponse[]>({
    queryKey: [
      "menu-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListMenu(request),
  })
}

export function useMenuRetrieve(
  request: GetRetrieveMenuRequest,
  options: IReactQueryOptions<MenuResponse>
) {
  return useReadHook<MenuResponse>({
    queryKey: ["menu-retrieve", request.id],
    apiCall: () => getRetrieveMenu(request),
    ...options
  })
}

export function useMenuByRole(
  roleId: number
) {
  return useReadHook<MenuResponse[]>({
    queryKey: ["menu-by-role", roleId],
    apiCall: () => getMenuByRole(roleId),
    enabled: !!roleId,
  })
}

export function useMenuTreeByRole(
  roleId: number
) {
  return useReadHook<MenuResponse[]>({
    queryKey: ["menu-tree-by-role", roleId],
    apiCall: () => getMenuTreeByRole(roleId),
    enabled: !!roleId,
  })
}

/**
 * CREATE
 */
export function useMenuCreate() {
  return useAppMutation<MenuEntity, MenuCreateActionFormData>(
    menuCreateAction,
    ['menu-list']
  )
}

/**
 * UPDATE
 */
export function useMenuUpdate() {
  return useAppMutation<MenuEntity, MenuCreateActionFormData>(
    menuUpdateAction,
    ['menu-list', 'menu-retrieve']
  )
}

/**
 * SOFT DELETE
 */
export function useMenuSoftDelete() {
  return useAppMutation<MenuEntity, MenuDeleteActionFormData>(
    menuSoftDeleteAction,
    ['menu-list']
  )
}

/**
 * HARD DELETE
 */
export function useMenuHardDelete() {
  return useAppMutation<{ id: number }, number>(
    menuHardDeleteAction,
    ['menu-list']
  )
}
