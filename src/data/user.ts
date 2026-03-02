"use server";

import {
  GetListUserRequest,
  GetRetrieveUserRequest,
  PostUserRequest,
  PutUserRequest,
  DeleteUserRequest
} from "@/types/request";

import { UserEntity } from "@/types/entity";
import { UserResponse, Result } from "@/types/response";
import { serverHttp } from "@/lib/server/server-fetch";


/**
 * GET LIST
 */
export async function getListUser(
  request: GetListUserRequest
): Promise<Result<UserResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  });

  return serverHttp.get<UserResponse[]>(
    `/users?${params.toString()}`,
    { withAuth: true }
  );
}


/**
 * GET DETAIL
 */
export async function getRetrieveUser(
  request: GetRetrieveUserRequest
): Promise<Result<UserResponse>> {

  if (!request.id) {
    return {
      success: false,
      data: null,
      error: {
        status: 400,
        message: "User ID is required"
      }
    };
  }

  let endpoint = `/users/${request.id}`;

  if (request.expands) {
    const params = new URLSearchParams({
      expands: request.expands
    });
    endpoint += `?${params.toString()}`;
  }

  return serverHttp.get<UserResponse>(
    endpoint,
    { withAuth: true }
  );
}


/**
 * UPDATE
 */
export async function putUser(
  request: PutUserRequest
): Promise<Result<UserEntity>> {

  const result = await serverHttp.put<UserResponse>(
    "/users",
    request,
    { withAuth: true }
  );

  if (!result.success) {
    return result;
  }

  const data = result.data;

  return {
    success: true,
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    }
  };
}


/**
 * CREATE
 */
export async function createUser(
  request: PostUserRequest
): Promise<Result<UserEntity>> {

  const result = await serverHttp.post<UserResponse>(
    "/users",
    request,
    { withAuth: true }
  );

  if (!result.success) {
    return result;
  }

  const data = result.data;

  return {
    success: true,
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    }
  };
}


/**
 * SOFT DELETE
 */
export async function softDeleteUser(
  request: DeleteUserRequest
): Promise<Result<UserEntity>> {

  const result = await serverHttp.delete<UserResponse>(
    "/users",
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
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    }
  };
}


/**
 * HARD DELETE
 */
export async function hardDeleteUser(
  id: number
): Promise<Result<{ id: number }>> {

  return serverHttp.delete<{ id: number }>(
    `/users/${id}/destroy`,
    { withAuth: true }
  );
}
