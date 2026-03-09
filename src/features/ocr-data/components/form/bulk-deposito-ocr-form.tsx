"use client";

import { UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DataUtamaDepositoForm } from "./data-utama-deposito-form";
import { PembayaranBungaForm } from "./pembayaran-bunga-form";
import { PembayaranPokokForm } from "./pembayaran-pokok-form";
import { RateForm } from "./rate-form";
import { AutomaticTransferForm } from "./automatic-transfer-form";
import type { BulkDepositoOcrFormValues } from "@/features/ocr-data/types";

export type { BulkDepositoOcrFormValues };

interface BulkDepositoOcrFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
  showConditionalFields?: boolean;
  // Data Utama Deposito options
  sumberDanaOptions?: { value: string; label: string }[];
  rekeningSumberDanaOptions?: { value: string; label: string }[];
  mataUangOptions?: { value: string; label: string }[];
  kodeProdukOptions?: { value: string; label: string }[];
  jenisPerpanjanganOptions?: { value: string; label: string }[];
  // Pembayaran Bunga options
  metodeBungaOptions?: { value: string; label: string }[];
  bankTujuanBungaOptions?: { value: string; label: string }[];
  jenisTransferBungaOptions?: { value: string; label: string }[];
  jenisTransaksiSKNBungaOptions?: { value: string; label: string }[];
  jenisTransaksiRTGSBungaOptions?: { value: string; label: string }[];
  jenisNasabahPenerimaBungaOptions?: { value: string; label: string }[];
  statusKependudukanPenerimaBungaOptions?: { value: string; label: string }[];
  // Pembayaran Pokok options
  metodePokokOptions?: { value: string; label: string }[];
  bankTujuanPokokOptions?: { value: string; label: string }[];
  // Rate options
  approverBungaOptions?: { value: string; label: string }[];
  namaApproverOptions?: { value: string; label: string }[];
  // Automatic Transfer options
  automaticTransferOptions?: { value: string; label: string }[];
  transferBungaDanPokokOptions?: { value: string; label: string }[];
  transferBungaOptions?: { value: string; label: string }[];
  transferPokokOptions?: { value: string; label: string }[];
  jenisTransaksiSKNPokokOptions?: { value: string; label: string }[];
  jenisTransaksiRTGSPokokOptions?: { value: string; label: string }[];
  biayaTransferOptions?: { value: string; label: string }[];
  biayaMateraiOptions?: { value: string; label: string }[];
}

export function BulkDepositoOcrForm({
  form,
  showConditionalFields = false,
  sumberDanaOptions = [],
  rekeningSumberDanaOptions = [],
  mataUangOptions = [],
  kodeProdukOptions = [],
  jenisPerpanjanganOptions = [],
  metodeBungaOptions = [],
  bankTujuanBungaOptions = [],
  jenisTransferBungaOptions = [],
  jenisTransaksiSKNBungaOptions = [],
  jenisTransaksiRTGSBungaOptions = [],
  jenisNasabahPenerimaBungaOptions = [],
  statusKependudukanPenerimaBungaOptions = [],
  metodePokokOptions = [],
  bankTujuanPokokOptions = [],
  approverBungaOptions = [],
  namaApproverOptions = [],
  automaticTransferOptions = [],
  transferBungaDanPokokOptions = [],
  transferBungaOptions = [],
  transferPokokOptions = [],
  jenisTransaksiSKNPokokOptions = [],
  jenisTransaksiRTGSPokokOptions = [],
  biayaTransferOptions = [],
  biayaMateraiOptions = [],
}: BulkDepositoOcrFormProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1: Data Utama Deposito */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Utama Deposito</CardTitle>
            </CardHeader>
            <CardContent>
              <DataUtamaDepositoForm
                form={form}
                sumberDanaOptions={sumberDanaOptions}
                rekeningSumberDanaOptions={rekeningSumberDanaOptions}
                mataUangOptions={mataUangOptions}
                kodeProdukOptions={kodeProdukOptions}
                jenisPerpanjanganOptions={jenisPerpanjanganOptions}
              />
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Pembayaran Bunga */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pembayaran Bunga</CardTitle>
            </CardHeader>
            <CardContent>
              <PembayaranBungaForm
                form={form}
                metodeBungaOptions={metodeBungaOptions}
                bankTujuanBungaOptions={bankTujuanBungaOptions}
                jenisTransferBungaOptions={jenisTransferBungaOptions}
                jenisTransaksiSKNBungaOptions={jenisTransaksiSKNBungaOptions}
                jenisTransaksiRTGSBungaOptions={jenisTransaksiRTGSBungaOptions}
                jenisNasabahPenerimaBungaOptions={
                  jenisNasabahPenerimaBungaOptions
                }
                statusKependudukanPenerimaBungaOptions={
                  statusKependudukanPenerimaBungaOptions
                }
                showConditionalFields={showConditionalFields}
              />
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Pembayaran Pokok, Rate, Automatic Transfer, Batch Summary, Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pembayaran Pokok</CardTitle>
          </CardHeader>
          <CardContent>
            <PembayaranPokokForm
              form={form}
              metodePokokOptions={metodePokokOptions}
              bankTujuanPokokOptions={bankTujuanPokokOptions}
              showConditionalFields={showConditionalFields}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <RateForm
              form={form}
              approverBungaOptions={approverBungaOptions}
              namaApproverOptions={namaApproverOptions}
              showConditionalFields={showConditionalFields}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Automatic Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <AutomaticTransferForm
              form={form}
              automaticTransferOptions={automaticTransferOptions}
              transferBungaDanPokokOptions={transferBungaDanPokokOptions}
              transferBungaOptions={transferBungaOptions}
              transferPokokOptions={transferPokokOptions}
              jenisTransaksiSKNPokokOptions={jenisTransaksiSKNPokokOptions}
              jenisTransaksiRTGSPokokOptions={jenisTransaksiRTGSPokokOptions}
              biayaTransferOptions={biayaTransferOptions}
              biayaMateraiOptions={biayaMateraiOptions}
              showConditionalFields={showConditionalFields}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
