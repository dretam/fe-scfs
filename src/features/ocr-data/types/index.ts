import { DocumentEntity, DocumentResponse } from "@/features/document";


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

export interface GetListOcrDataRequest {
    page?: number | null;
    perPage?: number | null;
    filter?: string | null;
    sort?: string | null;
    expands?: string | null;
}

export interface GetRetrieveOcrDataRequest {
    id: number;
    expands?: string | null;
}

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

export interface OCRResponse {
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
    createdAt: string
    createdBy: number
    updatedAt: any
    updatedBy: any
    deletedAt: any
    deletedBy: any
}




