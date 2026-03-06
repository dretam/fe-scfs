"use client";

import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BulkDepositoOcrFormValues, PembayaranBungaFormValues } from "./types";

export type { PembayaranBungaFormValues };

interface PembayaranBungaFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
  metodeBungaOptions?: { value: string; label: string }[];
  bankTujuanBungaOptions?: { value: string; label: string }[];
  jenisTransferBungaOptions?: { value: string; label: string }[];
  jenisTransaksiSKNBungaOptions?: { value: string; label: string }[];
  jenisTransaksiRTGSBungaOptions?: { value: string; label: string }[];
  jenisNasabahPenerimaBungaOptions?: { value: string; label: string }[];
  statusKependudukanPenerimaBungaOptions?: { value: string; label: string }[];
  showConditionalFields?: boolean;
}

export function PembayaranBungaForm({
  form,
  metodeBungaOptions = [],
  bankTujuanBungaOptions = [],
  jenisTransferBungaOptions = [],
  jenisTransaksiSKNBungaOptions = [],
  jenisTransaksiRTGSBungaOptions = [],
  jenisNasabahPenerimaBungaOptions = [],
  statusKependudukanPenerimaBungaOptions = [],
  showConditionalFields = true,
}: PembayaranBungaFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="metodeBunga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metode Bunga</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode bunga" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {metodeBungaOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showConditionalFields && (
            <>
              <FormField
                control={form.control}
                name="noRekeningTujuanBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Rekening Tujuan Bunga</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="No. Rekening Tujuan Bunga" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankTujuanBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Tujuan Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih bank tujuan bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bankTujuanBungaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="namaPenerimaBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Penerima Bunga</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama Penerima Bunga" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="remarkBungaPembayaran"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remark Bunga Pembayaran</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Remark (max 40 karakter)" 
                    maxLength={40}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showConditionalFields && (
            <>
              <FormField
                control={form.control}
                name="jenisTransferBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transfer Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis transfer bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisTransferBungaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jenisTransaksiSKNBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transaksi SKN Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih SKN bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisTransaksiSKNBungaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jenisTransaksiRTGSBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transaksi RTGS Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih RTGS bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisTransaksiRTGSBungaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jenisNasabahPenerimaBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Nasabah Penerima Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih penerima bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisNasabahPenerimaBungaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statusKependudukanPenerimaBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Kependudukan Penerima Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status kependudukan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusKependudukanPenerimaBungaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alamatPenerimaBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Penerima Bunga</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Alamat penerima bunga" 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
