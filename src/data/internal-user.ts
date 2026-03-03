"use server";

import { serverHttp } from "@/lib/server/server-fetch";
import { GetRetrieveInternalUser } from "@/types/request";
import { InternalUserResponse, Result } from "@/types/response";

export async function getRetrieveInternalUser(
  request: GetRetrieveInternalUser
): Promise<Result<InternalUserResponse>> {

  return serverHttp.get(
    `/internal-users/${request.username}`,
    { withAuth: true }
  )
}