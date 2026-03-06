import { DocumentEntity } from "@/features/document";

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
