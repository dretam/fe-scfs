'use client'

import { useReadHook } from "@/hooks/core/use-read"
import { useAppMutation } from "@/hooks/core/use-mutation"
import { getListCommunity, getCommunity } from "../service"
import {
  communityCreateAction,
  communityUpdateAction,
  communityDeleteAction
} from "../actions"
import {
  GetListCommunityRequest,
  CommunityResponse,
  CommunityCreateActionFormData,
  CommunityDeleteActionFormData,
  GetRetrieveCommunityRequest
} from "../types"

export function useCommunitiesList(
  request: GetListCommunityRequest
) {
  return useReadHook<CommunityResponse[]>({
    queryKey: [
      "communities-list",
      request.page,
      request.perPage,
      request.filter,
      request.sort,
    ],
    apiCall: () => getListCommunity(request),
    refetchOnWindowFocus: false,
  })
}

/**
 * RETRIEVE
 */
export function useCommunityRetrieve(
  request: GetRetrieveCommunityRequest,
  options?: { enabled?: boolean }
) {
  return useReadHook<CommunityResponse>({
    queryKey: ["community-detail", request.communityId],
    apiCall: () => getCommunity(request),
    ...options
  })
}

/**
 * CREATE
 */
export function useCommunityCreate() {
  return useAppMutation<CommunityResponse, CommunityCreateActionFormData>(
    communityCreateAction,
    ['communities-list']
  )
}

/**
 * UPDATE
 */
export function useCommunityUpdate() {
  return useAppMutation<CommunityResponse, CommunityCreateActionFormData>(
    communityUpdateAction,
    ['communities-list']
  )
}

/**
 * DELETE
 */
export function useCommunityDelete() {
  return useAppMutation<CommunityResponse, CommunityDeleteActionFormData>(
    communityDeleteAction,
    ['communities-list']
  )
}
