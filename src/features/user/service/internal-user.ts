"use server";

import { serverHttp } from "@/lib/server/server-fetch";
import { GetRetrieveInternalUser, InternalUserResponse } from "../types";
import { Result } from "@/types/response";


export async function getRetrieveInternalUser(
  request: GetRetrieveInternalUser
): Promise<Result<InternalUserResponse>> {

  return serverHttp.get(
    `/internal-users/${request.username}`,
    { withAuth: true }
  )
}