'use client'

import { useReadHook } from "../core/use-read"
import { getListUser, getRetrieveUser } from "@/data/user"
import {
  GetListUserRequest,
  GetRetrieveUserRequest
} from "@/types/request"
import {
  ReadResponse,
  UserResponse
} from "@/types/response"

export function useUserList(
  request: GetListUserRequest
) {
  return useReadHook<
    ReadResponse<UserResponse[]>,
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
    ReadResponse<UserResponse>,
    GetRetrieveUserRequest
  >(
    "user-retrieve",
    request,
    getRetrieveUser
  )
}
