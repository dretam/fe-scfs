'use client'

import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read"
import {
  createMenu,
  getListMenu,
  getRetrieveMenu,
  getMenuByRole,
  getMenuTreeByRole,
  softDeleteMenu,
  hardDeleteMenu,
  updateMenu
} from "../service"

import {
  DeleteMenuRequest,
  GetListMenuRequest,
  GetRetrieveMenuRequest,
  PostMenuRequest,
  PutMenuRequest,
  MenuResponse,
  MenuEntity
} from "../types"
import { useAppMutation } from "@/hooks/core/use-mutation"


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
  return useAppMutation<MenuEntity, PostMenuRequest>(
    createMenu,
    ['menu-list']
  )
}

/**
 * UPDATE
 */
export function useMenuUpdate() {
  return useAppMutation<MenuEntity, PutMenuRequest>(
    updateMenu,
    ['menu-list', 'menu-retrieve']
  )
}

/**
 * SOFT DELETE
 */
export function useMenuSoftDelete() {
  return useAppMutation<MenuEntity, DeleteMenuRequest>(
    softDeleteMenu,
    ['menu-list']
  )
}

/**
 * HARD DELETE
 */
export function useMenuHardDelete() {
  return useAppMutation<{ id: number }, number>(
    hardDeleteMenu,
    ['menu-list']
  )
}
