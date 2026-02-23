"use server";

import {OcrDataUpdateActionFormData} from "@/types/form-data";
import {TransactionAction} from "@/types/action";
import {OCRDataEntity} from "@/types/entity";
import {getListOcrData, getOcrDataById, updateOcrData, hardDeleteOcrData} from "@/data/ocr";
import {BadRequestResponse, OCRResponse, ReadResponse, UnauthorizedResponse} from "@/types/response";
import {GetListOcrDataRequest, GetRetrieveOcrDataRequest} from "@/types/request";


export async function listOcrDataAction(
	request: GetListOcrDataRequest
): Promise<TransactionAction<ReadResponse<OCRResponse[]> | UnauthorizedResponse | BadRequestResponse>> {
	const response = await getListOcrData(request);

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

export async function getOcrDataAction(
	request: GetRetrieveOcrDataRequest
): Promise<TransactionAction<ReadResponse<OCRResponse> | UnauthorizedResponse | BadRequestResponse>> {
	const response = await getOcrDataById(request);

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

export async function updateOcrDataAction(
	formData: OcrDataUpdateActionFormData
): Promise<TransactionAction<OCRDataEntity | UnauthorizedResponse | BadRequestResponse>> {
	const response: OCRDataEntity | UnauthorizedResponse | BadRequestResponse = await updateOcrData({
		id: formData.id,
		atasNama: formData.atasNama,
		nominal: formData.nominal,
		jangkaWaktu: formData.jangkaWaktu,
		periode: formData.periode,
		rate: formData.rate,
		alokasi: formData.alokasi,
		namaRekeningTujuanPencairan: formData.namaRekeningTujuanPencairan,
		nomorRekeningTujuanPencairan: formData.nomorRekeningTujuanPencairan,
		nomorRekeningPengirim: formData.nomorRekeningPengirim,
		nomorRekeningPlacement: formData.nomorRekeningPlacement,
	});
	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	} else {
		return {
			isSuccess: true,
			response: response
		};
	}
}

export async function destroyOcrDataAction(ocrDataId: number): Promise<TransactionAction<{id: number} | UnauthorizedResponse | BadRequestResponse>> {
	const response: {id: number} | UnauthorizedResponse | BadRequestResponse = await hardDeleteOcrData(ocrDataId);
	if ("status" in response) {
		return {
			isSuccess: false,
			response: response
		};
	} else {
		return {
			isSuccess: true,
			response: response
		};
	}
}
