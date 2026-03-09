import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

export interface RoleEntity {
    id: number | null,
    name: string | null,
    icon: string | null,
    description: string | null,
}

export interface GetListRoleRequest extends BaseListRequest { }

export interface GetRetrieveRoleRequest extends BaseRetrieveRequest { }

export interface PostRoleRequest {
    name: string;
    icon: string;
    description: string;
}

export interface PutRoleRequest {
    id: number;
    name: string;
    icon: string;
    description: string;
}

export interface DeleteRoleRequest {
    id: number;
}

export interface RoleResponse extends BaseAuditResponse {
    id: number;
    name: string;
    icon: string;
    description: string;
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
