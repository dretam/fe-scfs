'use client'

import { useReadHook } from "@/hooks/core/use-read"
import { createUser, getListUser, getRetrieveUser, hardDeleteUser, putUser, softDeleteUser } from "@/data/user"
import {
  DeleteUserRequest,
  GetListUserRequest,
  GetRetrieveUserRequest,
  PostUserRequest,
  PutUserRequest
} from "@/types/request"
import {
  UserResponse
} from "@/types/response"
import { useAppMutation } from "@/hooks/core/use-mutation"
import { UserEntity } from "@/types/entity"

export function useUserList(
  request: GetListUserRequest
) {
  return useReadHook<UserResponse[]>({
    queryKey: [
      "user-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListUser(request),
  })
}

export function useUserRetrieve(
  request: GetRetrieveUserRequest
) {
  return useReadHook<UserResponse>({
    queryKey: ["user-retrieve", request.id],
    apiCall: () => getRetrieveUser(request),
    enabled: !!request.id,
  })
}


/**
 * CREATE
 */
export function useUserCreate() {
  return useAppMutation<UserEntity, PostUserRequest>(
    createUser,
    ['user-list']
  )
}

/**
 * UPDATE
 */
export function useUserUpdate() {
  return useAppMutation<UserEntity, PutUserRequest>(
    putUser,
    ['user-list', 'user-retrieve']
  )
}

/**
 * SOFT DELETE
 */
export function useUserSoftDelete() {
  return useAppMutation<UserEntity, DeleteUserRequest>(
    softDeleteUser,
    ['user-list']
  )
}

/**
 * HARD DELETE
 */
export function useUserHardDelete() {
  return useAppMutation<{ id: number }, number>(
    hardDeleteUser,
    ['user-list']
  )
}
