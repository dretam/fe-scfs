'use client';

import useSWR from "swr";
import {UseReadHook} from "@/types/hook";
import {getListDocument, getDocumentById} from "@/data/document";
import {BadRequestResponse, ReadResponse, UnauthorizedResponse, DocumentResponse} from "@/types/response";
import {GetListDocumentRequest, GetRetrieveDocumentRequest} from "@/types/request";

export function useDocumentList(request: GetListDocumentRequest): UseReadHook<ReadResponse<DocumentResponse[]>> {
	const {data, error, isLoading} = useSWR(
		["document-list", request],
		async () => {
			const list: ReadResponse<DocumentResponse[]> | UnauthorizedResponse | BadRequestResponse = await getListDocument(request)
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

export function useDocumentRetrieve(request: GetRetrieveDocumentRequest): UseReadHook<ReadResponse<DocumentResponse>> {
	const {data, error, isLoading} = useSWR(
		["document-retrieve", request],
		async () => {
			const retrieve: ReadResponse<DocumentResponse> | UnauthorizedResponse | BadRequestResponse = await getDocumentById(request)
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
