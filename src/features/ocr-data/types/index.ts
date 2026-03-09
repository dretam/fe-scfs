import { DocumentEntity, DocumentResponse } from "@/features/document";
import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";


export interface OCRDataEntity {
    id: number
    document?: DocumentEntity | null
    atasNama: string
    nominal: string
    jangkaWaktu: string
    periode: string
    rate: string
    alokasi: string
    namaRekeningTujuanPencairan: string
    nomorRekeningTujuanPencairan: string
    nomorRekeningPengirim: string
    nomorRekeningPlacement: string
    status: string
}

export interface GetListOcrDataRequest extends BaseListRequest { }

export interface GetRetrieveOcrDataRequest extends BaseRetrieveRequest { }

export interface PutOcrDataRequest {
    id: number;
    atasNama?: string;
    nominal?: string;
    jangkaWaktu?: string;
    periode?: string;
    rate?: string;
    alokasi?: string;
    namaRekeningTujuanPencairan?: string;
    nomorRekeningTujuanPencairan?: string;
    nomorRekeningPengirim?: string;
    nomorRekeningPlacement?: string;
}

export interface PostBulkOcrDataRequest {
    ids: number[];
}

export interface OCRResponse extends BaseAuditResponse {
    id: number
    document: DocumentResponse | null
    atasNama: string
    nominal: string
    jangkaWaktu: string
    periode: string
    rate: string
    alokasi: string
    namaRekeningTujuanPencairan: string
    nomorRekeningTujuanPencairan: string
    nomorRekeningPengirim: string
    nomorRekeningPlacement: string
    status: string
}




