'use client'

import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read"
import {
  getListMenu,
  getRetrieveMenu,
} from "../service"

import {
  GetListMenuRequest,
  GetRetrieveMenuRequest,
  MenuResponse,
  MenuEntity,
  MenuCreateActionFormData,
  MenuDeleteActionFormData,
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
