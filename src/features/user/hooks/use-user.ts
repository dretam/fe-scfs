'use client'

import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read"
import { getListUser, getRetrieveUser, putUser } from "../service"

import {
  DeleteUserRequest,
  GetListUserRequest,
  GetRetrieveUserRequest,
  PostUserRequest,
  PutUserRequest,
  UserResponse,
  UserEntity,
  UserCreateActionFormData,
  UserDeleteActionFormData,
  UserChangeProfileActionFormData,
  UserChangePasswordActionFormData,
  ForgotPasswordResponse,
  UserSendTokenChangePasswordActionFormData
} from "../types"
import { useAppMutation } from "@/hooks/core/use-mutation"
import {
  userCreateAction,
  userHardDeleteAction,
  userSoftDeleteAction,
  userChangeProfileAction,
  userChangePasswordAction,
  userSendTokenChangePasswordAction
} from "../actions"


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
  request: GetRetrieveUserRequest,
  options: IReactQueryOptions<UserResponse>
) {
  return useReadHook<UserResponse>({
    queryKey: ["user-retrieve", request.id],
    apiCall: () => getRetrieveUser(request),
    refetchOnWindowFocus: false,
    ...options
  })
}


/**
 * CREATE
 */
export function useUserCreate() {
  return useAppMutation<UserEntity, UserCreateActionFormData>(
    userCreateAction,
    ['user-list']
  )
}

/**
 * UPDATE (General - for data table with all fields)
 */
export function useUserUpdate() {
  return useAppMutation<UserEntity, PutUserRequest>(
    putUser,
    ['user-list', 'user-retrieve']
  )
}

/**
 * UPDATE PROFILE (Settings form - name/email only)
 */
export function useUserUpdateProfile() {
  return useAppMutation<UserEntity, UserChangeProfileActionFormData>(
    userChangeProfileAction,
    ['user-list', 'user-retrieve']
  )
}

/**
 * UPDATE PASSWORD (Settings form - password only)
 */
export function useUserChangePassword() {
  return useAppMutation<UserEntity, UserChangePasswordActionFormData>(
    userChangePasswordAction,
    []
  )
}

/**
 * SEND TOKEN CHANGE PASSWORD
 */
export function useUserSendTokenChangePassword() {
  return useAppMutation<ForgotPasswordResponse, UserSendTokenChangePasswordActionFormData>(
    userSendTokenChangePasswordAction,
    []
  )
}

/**
 * SOFT DELETE
 */
export function useUserSoftDelete() {
  return useAppMutation<UserEntity, UserDeleteActionFormData>(
    userSoftDeleteAction,
    ['user-list']
  )
}

/**
 * HARD DELETE
 */
export function useUserHardDelete() {
  return useAppMutation<{ id: number }, number>(
    userHardDeleteAction,
    ['user-list']
  )
}
