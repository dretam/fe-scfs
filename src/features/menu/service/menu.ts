"use server"

import {
  GetListMenuRequest,
  GetRetrieveMenuRequest,
  PostMenuRequest,
  PutMenuRequest,
  DeleteMenuRequest,
  MenuResponse,
  MenuEntity
} from "../types";

import { Result } from "@/types/response";
import { serverHttp } from "@/lib/server/server-fetch";


/**
 * GET LIST
 */
export async function getListMenu(
  request: GetListMenuRequest
): Promise<Result<MenuResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  });

  return serverHttp.get<MenuResponse[]>(
    `/menus?${params.toString()}`,
    { withAuth: true }
  );
}


/**
 * GET DETAIL
 */
export async function getRetrieveMenu(
  request: GetRetrieveMenuRequest
): Promise<Result<MenuResponse>> {

  if (!request.id) {
    return {
      success: false,
      data: null,
      error: {
        status: 400,
        message: "Menu ID is required"
      }
    };
  }

  let endpoint = `/menus/${request.id}`;

  if (request.expands) {
    const params = new URLSearchParams({
      expands: request.expands
    });
    endpoint += `?${params.toString()}`;
  }

  return serverHttp.get<MenuResponse>(
    endpoint,
    { withAuth: true }
  );
}


/**
 * CREATE
 */
export async function createMenu(
  request: PostMenuRequest
): Promise<Result<MenuEntity>> {

  const result = await serverHttp.post<MenuResponse>(
    "/menus",
    request,
    { withAuth: true }
  );

  if (!result.success) {
    return result;
  }

  const data = result.data;

  return {
    success: true,
    message: result.message,
    data: {
      id: data.id,
      name: data.name,
      code: data.code,
      path: data.path,
      icon: data.icon,
      parentId: data.parentId ?? null,
      sortOrder: data.sortOrder,
    }
  };
}


/**
 * UPDATE
 */
export async function updateMenu(
  request: PutMenuRequest
): Promise<Result<MenuEntity>> {

  const result = await serverHttp.put<MenuResponse>(
    "/menus",
    request,
    { withAuth: true }
  );

  if (!result.success) {
    return result;
  }

  const data = result.data;

  return {
    success: true,
    message: result.message,
    data: {
      id: data.id,
      name: data.name,
      code: data.code,
      path: data.path,
      icon: data.icon,
      parentId: data.parentId ?? null,
      sortOrder: data.sortOrder,
    }
  };
}


/**
 * SOFT DELETE
 */
export async function softDeleteMenu(
  request: DeleteMenuRequest
): Promise<Result<MenuEntity>> {

  const result = await serverHttp.delete<MenuResponse>(
    "/menus",
    {
      body: JSON.stringify(request),
      withAuth: true,
    }
  );

  if (!result.success) {
    return result;
  }

  const data = result.data;

  return {
    success: true,
    message: result.message,
    data: {
      id: data.id,
      name: data.name,
      code: data.code,
      path: data.path,
      icon: data.icon,
      parentId: data.parentId ?? null,
      sortOrder: data.sortOrder,
    }
  };
}


/**
 * HARD DELETE
 */
export async function hardDeleteMenu(
  id: number
): Promise<Result<{ id: number }>> {

  return serverHttp.delete<{ id: number }>(
    `/menus/${id}/destroy`,
    { withAuth: true }
  );
}
