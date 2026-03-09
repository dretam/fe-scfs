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
import type { BulkDepositoOcrFormValues, DataUtamaDepositoFormValues } from "@/features/ocr-data/types";

export type { DataUtamaDepositoFormValues };

export interface DataUtamaDepositoFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
  sumberDanaOptions?: { value: string; label: string }[];
  rekeningSumberDanaOptions?: { value: string; label: string }[];
  mataUangOptions?: { value: string; label: string }[];
  kodeProdukOptions?: { value: string; label: string }[];
  jenisPerpanjanganOptions?: { value: string; label: string }[];
}

export function DataUtamaDepositoForm({
  form,
  sumberDanaOptions = [],
  rekeningSumberDanaOptions = [],
  mataUangOptions = [],
  kodeProdukOptions = [],
  jenisPerpanjanganOptions = [],
}: DataUtamaDepositoFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="cif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIF</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="CIF" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="namaNasabah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Nasabah</FormLabel>
                <FormControl>
                  <Input disabled {...field} placeholder="Nama Nasabah" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sumberDana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sumber Dana</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sumber dana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sumberDanaOptions.map((option) => (
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
            name="rekeningSumberDana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rekening Sumber Dana</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rekening sumber dana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rekeningSumberDanaOptions.map((option) => (
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
            name="availBalanceRekeningSumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Balance Rekening Sumber</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="number"
                    {...field}
                    placeholder="0"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="mataUang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mata Uang</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata uang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mataUangOptions.map((option) => (
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
            name="kodeProduk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Produk</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kode produk" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kodeProdukOptions.map((option) => (
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
            name="namaProduk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input disabled {...field} placeholder="Nama Produk" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tenor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenor</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="number"
                    {...field}
                    placeholder="Tenor"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jenisPerpanjangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Perpanjangan</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis perpanjangan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jenisPerpanjanganOptions.map((option) => (
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="nominal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nominal</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="0"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buktiPenempatanDeposito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bukti Penempatan Deposito</FormLabel>
              <FormControl>
                <Input disabled {...field} placeholder="Bukti Penempatan Deposito" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="effectiveDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Effective Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
