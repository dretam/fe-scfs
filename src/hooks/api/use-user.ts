'use client'

import { useReadHook } from "../core/use-read"
import { getListUser, getRetrieveUser } from "@/data/user"
import {
  GetListUserRequest,
  GetRetrieveUserRequest
} from "@/types/request"
import {
  UserResponse
} from "@/types/response"

export function useUserList(
  request: GetListUserRequest
) {
  return useReadHook<
    UserResponse[],
    GetListUserRequest
  >(
    "user-list",
    request,
    getListUser
  )
}

export function useUserRetrieve(
  request: GetRetrieveUserRequest
) {
  return useReadHook<
    UserResponse,
    GetRetrieveUserRequest
  >(
    "user-retrieve",
    request,
    getRetrieveUser
  )
}
