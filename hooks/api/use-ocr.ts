'use client';

import useSWR from "swr";
import {UseReadHook} from "@/types/hook";
import {getListOcrData, getOcrDataById} from "@/data/ocr";
import {BadRequestResponse, OCRResponse, ReadResponse, UnauthorizedResponse} from "@/types/response";
import {GetListOcrDataRequest, GetRetrieveOcrDataRequest} from "@/types/request";

export function useOcrDataList(request: GetListOcrDataRequest): UseReadHook<ReadResponse<OCRResponse[]>> {
	
	const {data, error, isLoading } = useSWR(
		["ocr-data-list", request],
		async () => {
			const list: ReadResponse<OCRResponse[]> | UnauthorizedResponse | BadRequestResponse = await getListOcrData(request)
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

export function useOcrDataRetrieve(request: GetRetrieveOcrDataRequest): UseReadHook<ReadResponse<OCRResponse>> {
	const {data, error, isLoading} = useSWR(
		["ocr-data-retrieve", request],
		async () => {
			const retrieve: ReadResponse<OCRResponse> | UnauthorizedResponse | BadRequestResponse = await getOcrDataById(request)
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
