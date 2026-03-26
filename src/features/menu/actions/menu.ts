"use server"

import {
  MenuCreateActionFormData,
  MenuDeleteActionFormData
} from "../types"

import {
  createMenu,
  updateMenu,
  softDeleteMenu,
  hardDeleteMenu
} from "../service"

import { MenuEntity } from "../types"
import { Result } from "@/types/response"


/**
 * CREATE
 */
export async function menuCreateAction(
  formData: MenuCreateActionFormData
): Promise<Result<MenuEntity>> {

  return createMenu({
    name: formData.name,
    code: formData.code,
    path: formData.path,
    icon: formData.icon,
    parentId: formData.parentId,
    sortOrder: formData.sortOrder
  })
}


/**
 * UPDATE
 */
export async function menuUpdateAction(
  formData: MenuCreateActionFormData
): Promise<Result<MenuEntity>> {

  if (!formData.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Menu ID is required"
      }
    }
  }

  return updateMenu({
    id: formData.id,
    name: formData.name,
    code: formData.code,
    path: formData.path,
    icon: formData.icon,
    parentId: formData.parentId,
    sortOrder: formData.sortOrder
  })
}


/**
 * SOFT DELETE
 */
export async function menuSoftDeleteAction(
  formData: MenuDeleteActionFormData
): Promise<Result<MenuEntity>> {

  if (!formData.menuId) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Menu ID is required"
      }
    }
  }

  return softDeleteMenu({
    id: formData.menuId
  })
}


/**
 * HARD DELETE
 */
export async function menuHardDeleteAction(
  menuId: number
): Promise<Result<{ id: number }>> {

  return hardDeleteMenu(menuId)
}
