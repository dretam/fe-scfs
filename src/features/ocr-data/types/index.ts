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



// Data Utama Deposito
export interface DataUtamaDepositoFormValues {
    cif: string;
    namaNasabah: string;
    sumberDana: string;
    rekeningSumberDana: string;
    availBalanceRekeningSumber: number;
    mataUang: string;
    kodeProduk: string;
    namaProduk: string;
    tenor: string | number;
    jenisPerpanjangan: string;
    nominal: number;
    buktiPenempatanDeposito: string;
    effectiveDate: string;
}

// Pembayaran Bunga
export interface PembayaranBungaFormValues {
    metodeBunga: string;
    noRekeningTujuanBunga: string;
    bankTujuanBunga: string;
    namaPenerimaBunga: string;
    remarkBungaPembayaran: string;
    jenisTransferBunga: string;
    jenisTransaksiSKNBunga: string;
    jenisTransaksiRTGSBunga: string;
    jenisNasabahPenerimaBunga: string;
    statusKependudukanPenerimaBunga: string;
    alamatPenerimaBunga: string;
}

// Pembayaran Pokok
export interface PembayaranPokokFormValues {
    metodePokok: string;
    noRekeningTujuanPokok: string;
    bankTujuanPokok: string;
    namaPenerimaPokok: string;
    remarkPokok: string;
}

// Rate
export interface RateFormValues {
    totalBunga: number;
    approverBunga: string;
    namaApprover: string;
    remarkSpecialRate: string;
    sebagaiAlternate: boolean;
}

// Automatic Transfer
export interface AutomaticTransferFormValues {
    automaticTransfer: string;
    transferBungaDanPokok: string;
    transferBunga: string;
    transferPokok: string;
    jenisTransaksiSKNPokok: string;
    jenisTransaksiRTGSPokok: string;
    biayaTransfer: string;
    biayaMaterai: string;
}

// Batch Summary
export interface BatchSummaryFormValues {
    jumlahRekening: number;
    jumlahNominal: number;
}

// Combined type for the entire form
export interface BulkDepositoOcrFormValues
    extends DataUtamaDepositoFormValues,
    PembayaranBungaFormValues,
    PembayaranPokokFormValues,
    RateFormValues,
    AutomaticTransferFormValues,
    BatchSummaryFormValues { }
