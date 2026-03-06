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
import type { BulkDepositoOcrFormValues, AutomaticTransferFormValues } from "./types";

export type { AutomaticTransferFormValues };

interface AutomaticTransferFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
  automaticTransferOptions?: { value: string; label: string }[];
  transferBungaDanPokokOptions?: { value: string; label: string }[];
  transferBungaOptions?: { value: string; label: string }[];
  transferPokokOptions?: { value: string; label: string }[];
  jenisTransaksiSKNPokokOptions?: { value: string; label: string }[];
  jenisTransaksiRTGSPokokOptions?: { value: string; label: string }[];
  biayaTransferOptions?: { value: string; label: string }[];
  biayaMateraiOptions?: { value: string; label: string }[];
  showConditionalFields?: boolean;
}

export function AutomaticTransferForm({
  form,
  automaticTransferOptions = [],
  transferBungaDanPokokOptions = [],
  transferBungaOptions = [],
  transferPokokOptions = [],
  jenisTransaksiSKNPokokOptions = [],
  jenisTransaksiRTGSPokokOptions = [],
  biayaTransferOptions = [],
  biayaMateraiOptions = [],
  showConditionalFields = false,
}: AutomaticTransferFormProps) {
  // Default options for N/Y/S selection
  const defaultAutomaticTransferOptions = [
    { value: "N", label: "N" },
    { value: "Y", label: "Y" },
    { value: "S", label: "S" },
  ];

  // Default options for Y/N selection
  const defaultYesNoOptions = [
    { value: "Y", label: "Yes" },
    { value: "N", label: "No" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="automaticTransfer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Automatic Transfer</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih automatic transfer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(automaticTransferOptions.length > 0 ? automaticTransferOptions : defaultAutomaticTransferOptions).map((option) => (
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
                name="transferBungaDanPokok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Bunga dan Pokok</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih transfer bunga dan pokok" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transferBungaDanPokokOptions.map((option) => (
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
                name="transferBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih transfer bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transferBungaOptions.map((option) => (
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
                name="transferPokok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Pokok</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih transfer pokok" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transferPokokOptions.map((option) => (
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
            </>
          )}
        </div>

        <div className="space-y-4">
          {showConditionalFields && (
            <>
              <FormField
                control={form.control}
                name="jenisTransaksiSKNPokok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transaksi SKN Pokok</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis transaksi SKN pokok" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisTransaksiSKNPokokOptions.map((option) => (
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
                name="jenisTransaksiRTGSPokok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transaksi RTGS Pokok</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis transaksi RTGS pokok" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisTransaksiRTGSPokokOptions.map((option) => (
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
            </>
          )}

          <FormField
            control={form.control}
            name="biayaTransfer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biaya Transfer</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih biaya transfer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(biayaTransferOptions.length > 0 ? biayaTransferOptions : defaultYesNoOptions).map((option) => (
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
            name="biayaMaterai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biaya Materai</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih biaya materai" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(biayaMateraiOptions.length > 0 ? biayaMateraiOptions : defaultYesNoOptions).map((option) => (
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
        </div>
      </div>
    </div>
  );
}
