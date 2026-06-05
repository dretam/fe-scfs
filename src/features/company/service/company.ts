"use server";

import { Result } from "@/types/response";

import { serverHttp } from "@/lib/server/server-fetch";
import { CompanyResponse, GetListCompanyRequest, GetRetrieveCompanyRequest } from "../types";

/**
 * GET LIST
 */
export async function getListCompany(
  request: GetListCompanyRequest
): Promise<Result<CompanyResponse[]>> {

  const params = new URLSearchParams({
    page: String(request.page ?? 1),
    perPage: String(request.perPage ?? 5),
    ...(request.filter && { filter: request.filter }),
    ...(request.sort && { sort: request.sort }),
    ...(request.expands && { expands: request.expands }),
  });

  return serverHttp.get<CompanyResponse[]>(
    `/companies?${params.toString()}`,
    { withAuth: true }
  );

}

/**
 * GET DETAIL
 */
export async function getRetrieveCompany(
  request: GetRetrieveCompanyRequest
): Promise<Result<CompanyResponse>> {

  if (!request.id) {
    return {
      success: false,
      data: null,
      error: {
        status: 400,
        message: "Company ID is required"
      }
    };
  }

  let endpoint = `/companies/${request.id}`;

  if (request.expands) {
    const params = new URLSearchParams({
      expands: request.expands
    });
    endpoint += `?${params.toString()}`;
  }

  return serverHttp.get<CompanyResponse>(
    endpoint,
    { withAuth: true }
  );
}