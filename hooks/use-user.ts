'use client';

import useSWR from "swr";
import {UseReadHook} from "@/types/hook";
import {getListUser, getRetrieveUser} from "@/data/user";
import {BadRequestResponse, ReadResponse, UnauthorizedResponse, UserResponse} from "@/types/response";
import {GetListUserRequest, GetRetrieveUserRequest} from "@/types/request";

export function useUserList(request: GetListUserRequest): UseReadHook<ReadResponse<UserResponse[]>> {
	const {data, error, isLoading} = useSWR(
		["user-list", request],
		async () => {
			const list: ReadResponse<UserResponse[]> | UnauthorizedResponse | BadRequestResponse = await getListUser(request)
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

export function useUserRetrieve(request: GetRetrieveUserRequest): UseReadHook<ReadResponse<UserResponse>> {
	const {data, error, isLoading} = useSWR(
		["user-retrieve", request],
		async () => {
			const retrieve: ReadResponse<UserResponse> | UnauthorizedResponse | BadRequestResponse = await getRetrieveUser(request)
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