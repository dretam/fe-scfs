'use client';

import useSWR from "swr";
import {UseReadHook} from "@/types/hook";
import {getListAccessLogs, getAccessLogById} from "@/data/log";
import {AccessLogResponse, BadRequestResponse, ReadResponse, UnauthorizedResponse} from "@/types/response";
import {GetListAccessLogRequest, GetRetrieveAccessLogRequest} from "@/types/request";

export function useAccessLogList(request: GetListAccessLogRequest): UseReadHook<ReadResponse<AccessLogResponse[]>> {
	const {data, error, isLoading} = useSWR(
		["access-log-list", request],
		async () => {
			const list: ReadResponse<AccessLogResponse[]> | UnauthorizedResponse | BadRequestResponse = await getListAccessLogs(request)
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

export function useAccessLogRetrieve(request: GetRetrieveAccessLogRequest): UseReadHook<ReadResponse<AccessLogResponse>> {
	const {data, error, isLoading} = useSWR(
		["access-log-retrieve", request],
		async () => {
			const retrieve: ReadResponse<AccessLogResponse> | UnauthorizedResponse | BadRequestResponse = await getAccessLogById(request)
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
