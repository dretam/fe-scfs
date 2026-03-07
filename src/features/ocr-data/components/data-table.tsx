"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/common/data-table";
import PageOcrDataFilterTable from "@/features/ocr-data/components/filter-table";
import { columns } from "@/features/ocr-data/components/column-table";
import { useApproveOcrData, useOcrDataList, useRejectOcrData } from "../api";
import { OCRResponse } from "../types";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PageOcrDataDataTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();

  const request = React.useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      filter: searchParams.get("filter"),
    }),
    [searchParams],
  );

  const { data: response, isLoading, isError } =
    useOcrDataList(request);

  const { execute: approveOcr, isLoading: isApproving } =
    useApproveOcrData();

  const { execute: rejectOcr, isLoading: isRejecting } =
    useRejectOcrData();

  const [rowSelection, setRowSelection] =
    React.useState<Record<string, boolean>>({});

  const handleSingleApprove = async (ocrData: OCRResponse) => {
    try {
      await approveOcr({ ids: [ocrData.id] });
      toast.success(`OCR data ${ocrData.atasNama} approved`);
    } catch (err: any) {
      toast.error(err?.error?.message ?? "Failed to approve data");
    }
  };

  const handleSingleReject = async (ocrData: OCRResponse) => {
    try {
      await rejectOcr({ ids: [ocrData.id] });
      toast.success(`OCR data ${ocrData.atasNama} rejected`);
    } catch (err: any) {
      toast.error(err?.error?.message ?? "Failed to reject data");
    }
  };

  const handleBulkApprove = async () => {
    const selectedIds = Object.keys(rowSelection);

    if (!selectedIds.length) {
      toast.warning("No data selected");
      return;
    }

    try {
      await approveOcr({
        ids: selectedIds.map(Number),
      });

      toast.success(
        `${selectedIds.length} OCR data approved successfully`,
      );

      setRowSelection({});
    } catch (err: any) {
      toast.error(err?.error?.message ?? "Failed to approve data");
    }
  };

  const handleBulkReject = async () => {
    const selectedIds = Object.keys(rowSelection);

    if (!selectedIds.length) {
      toast.warning("No data selected");
      return;
    }

    try {
      await rejectOcr({
        ids: selectedIds.map(Number),
      });

      toast.success(
        `${selectedIds.length} OCR data rejected successfully`,
      );

      setRowSelection({});
    } catch (err: any) {
      toast.error(err?.error?.message ?? "Failed to reject data");
    }
  };

  const ocrDataColumns = React.useMemo(
    () =>
      columns({
        onApprove: handleSingleApprove,
        onReject: handleSingleReject,
      }),
    [],
  );

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <PageOcrDataFilterTable className="my-0" />

        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleBulkReject}
            disabled={selectedCount === 0 || isRejecting}
          >
            {isRejecting
              ? "Rejecting..."
              : `Reject Selected (${selectedCount})`}
          </Button>

          <Button
            onClick={handleBulkApprove}
            disabled={selectedCount === 0 || isApproving}
          >
            {isApproving
              ? "Approving..."
              : `Approve Selected (${selectedCount})`}
          </Button>
        </div>
      </div>

      {isError && <div>Something went wrong.</div>}

      {response?.success && (
        <DataTable
          data={response.data}
          columns={ocrDataColumns}
          pagination={response.pagination}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
