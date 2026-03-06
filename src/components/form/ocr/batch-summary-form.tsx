"use client";

import { UseFormReturn } from "react-hook-form";

import { Label } from "@/components/ui/label";
import type { BulkDepositoOcrFormValues, BatchSummaryFormValues } from "./types";

export type { BatchSummaryFormValues };

interface BatchSummaryFormProps {
  form: UseFormReturn<BulkDepositoOcrFormValues>;
}

export function BatchSummaryForm({
  form,
}: BatchSummaryFormProps) {
  const values = form.watch();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Jumlah Rekening</Label>
          <div className="text-sm font-medium">
            {values.jumlahRekening?.toLocaleString() || "0"}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Jumlah Nominal</Label>
          <div className="text-sm font-medium">
            {values.jumlahNominal?.toLocaleString() || "0"}
          </div>
        </div>
      </div>
    </div>
  );
}