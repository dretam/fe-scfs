'use client'

import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read"
import { getListCompany, getRetrieveCompany } from "../service/company"
import { CompanyResponse, GetListCompanyRequest, GetRetrieveCompanyRequest } from "../types"

export function useCompanyList(
  request: GetListCompanyRequest
) {
  return useReadHook<CompanyResponse[]>({
    queryKey: [
      "company-list",
      request.page,
      request.perPage,
      request.filter,
      request.expands,
    ],
    apiCall: () => getListCompany(request),
  })
}

export function useCompanyRetrieve(
  request: GetRetrieveCompanyRequest,
  options: IReactQueryOptions<CompanyResponse>
) {
  return useReadHook<CompanyResponse>({
    queryKey: ["company-retrieve", request.id],
    apiCall: () => getRetrieveCompany(request),
    refetchOnWindowFocus: false,
    ...options
  })
}