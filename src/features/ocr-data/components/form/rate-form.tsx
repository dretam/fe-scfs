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
import { Checkbox } from "@/components/ui/checkbox";
import type { BulkDepositoOcrFormValues, RateFormValues } from "@/features/role/types";

export type { RateFormValues };

interface RateFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
  approverBungaOptions?: { value: string; label: string }[];
  namaApproverOptions?: { value: string; label: string }[];
  showConditionalFields?: boolean;
}

export function RateForm({
  form,
  approverBungaOptions = [],
  namaApproverOptions = [],
  showConditionalFields = false,
}: RateFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="totalBunga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Bunga (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.0001"
                    {...field}
                    placeholder="0.0000"
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                name="approverBunga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approver Bunga</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih approver bunga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {approverBungaOptions.map((option) => (
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
                name="namaApprover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Approver</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih nama approver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {namaApproverOptions.map((option) => (
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
          <FormField
            control={form.control}
            name="remarkSpecialRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remark Special Rate</FormLabel>
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

          <FormField
            control={form.control}
            name="sebagaiAlternate"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="mb-0">Sebagai Alternate</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
