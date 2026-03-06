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
import type { BulkDepositoOcrFormValues, PembayaranPokokFormValues } from "./types";

export type { PembayaranPokokFormValues };

interface PembayaranPokokFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
  metodePokokOptions?: { value: string; label: string }[];
  bankTujuanPokokOptions?: { value: string; label: string }[];
  showConditionalFields?: boolean;
}

export function PembayaranPokokForm({
  form,
  metodePokokOptions = [],
  bankTujuanPokokOptions = [],
  showConditionalFields = false,
}: PembayaranPokokFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="metodePokok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metode Pokok</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode pokok" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {metodePokokOptions.map((option) => (
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
            name="noRekeningTujuanPokok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Rekening Tujuan Pokok</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="No. Rekening Tujuan Pokok" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showConditionalFields && (
            <FormField
              control={form.control}
              name="bankTujuanPokok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Tujuan Pokok</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bank tujuan pokok" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bankTujuanPokokOptions.map((option) => (
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
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="namaPenerimaPokok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Penerima Pokok</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nama Penerima Pokok" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remarkPokok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remark Pokok</FormLabel>
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
        </div>
      </div>
    </div>
  );
}
