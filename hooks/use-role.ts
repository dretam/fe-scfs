'use client';

import useSWR from "swr";
import {UseReadHook} from "@/types/hook";
import {getListRole, getRetrieveRole} from "@/data/role";
import {BadRequestResponse, ReadResponse, RoleResponse, UnauthorizedResponse} from "@/types/response";
import {GetListRoleRequest, GetRetrieveRoleRequest} from "@/types/request";

export function useRoleList(request: GetListRoleRequest): UseReadHook<ReadResponse<RoleResponse[]>> {
	const {data, error, isLoading} = useSWR(
		["role-list", request],
		async () => {
			const list: ReadResponse<RoleResponse[]> | UnauthorizedResponse | BadRequestResponse = await getListRole(request)
			if ('data' in list) {
				return list
			} else {
				const error: Error = new Error()
				if ('status' in list) {
					error.name = list.status.toString().trim()
					error.message = list.message
				}
				throw error
			}
		}
	)
	return {
		response: data,
		isLoading,
		isError: error
	}
}

export function useRoleRetrieve(request: GetRetrieveRoleRequest): UseReadHook<ReadResponse<RoleResponse>> {
	const {data, error, isLoading} = useSWR(
		["role-retrieve", request],
		async () => {
			const retrieve: ReadResponse<RoleResponse> | UnauthorizedResponse | BadRequestResponse = await getRetrieveRole(request)
			if ('data' in retrieve) {
				return retrieve
			} else {
				const error: Error = new Error()
				if ('status' in retrieve) {
					error.name = retrieve.status.toString().trim()
					error.message = retrieve.message
				}
				throw error
			}
		}
	)
	return {
		response: data,
		isLoading,
		isError: error
	}
}
