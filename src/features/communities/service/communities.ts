"use server"

import {
  GetListCommunityRequest,
  PostCommunityRequest,
  PutCommunityRequest,
  DeleteCommunityRequest,
  CommunityResponse,
  GetRetrieveCommunityRequest
} from "../types";

import { Result } from "@/types/response";
import { serverHttp } from "@/lib/server/server-fetch";

const BASE_URL = "/communities";

/**
 * GET LIST
 */
export async function getListCommunity(
  request: GetListCommunityRequest
): Promise<Result<CommunityResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 10),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
  });

  return serverHttp.get<CommunityResponse[]>(
    `${BASE_URL}?${params.toString()}`,
    { withAuth: true }
  );
}

/**
 * CREATE
 */
export async function createCommunity(
  request: PostCommunityRequest
): Promise<Result<CommunityResponse>> {

  return serverHttp.post<CommunityResponse>(
    BASE_URL,
    request,
    { withAuth: true }
  );
}

/**
 * UPDATE
 */
export async function updateCommunity(
  request: PutCommunityRequest
): Promise<Result<CommunityResponse>> {

  return serverHttp.put<CommunityResponse>(
    BASE_URL,
    request,
    { withAuth: true }
  );
}

/**
 * SOFT DELETE
 */
export async function deleteCommunity(
  request: DeleteCommunityRequest
): Promise<Result<CommunityResponse>> {

  return serverHttp.delete<CommunityResponse>(
    BASE_URL,
    {
      body: JSON.stringify(request),
      withAuth: true,
    }
  );
}

/**
 * GET BY ID
 */
export async function getCommunity(
  request: GetRetrieveCommunityRequest
): Promise<Result<CommunityResponse>> {
  return serverHttp.get<CommunityResponse>(
    `${BASE_URL}/${request.communityId}`,
    { withAuth: true }
  );
}
