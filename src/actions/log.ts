"use server";

import {TransactionAction} from "@/types/action";
import {AccessLogResponse, BadRequestResponse, ReadResponse, UnauthorizedResponse} from "@/types/response";
import {GetListAccessLogRequest, GetRetrieveAccessLogRequest} from "@/types/request";
import {getListAccessLogs, getAccessLogById} from "@/data/log";


export async function listAccessLogsAction(
	request: GetListAccessLogRequest
): Promise<TransactionAction<ReadResponse<AccessLogResponse[]> | UnauthorizedResponse | BadRequestResponse>> {
	const response = await getListAccessLogs(request);

	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	}

	return {
		isSuccess: true,
		response: response
	};
}

export async function getAccessLogAction(
	request: GetRetrieveAccessLogRequest
): Promise<TransactionAction<ReadResponse<AccessLogResponse> | UnauthorizedResponse | BadRequestResponse>> {
	const response = await getAccessLogById(request);

	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	}

	return {
		isSuccess: true,
		response: response
	};
}
