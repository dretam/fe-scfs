"use client";

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import { useOcrDataList } from "@/hooks/api/use-ocr";
import * as React from "react";
import PageOcrDataFilterTable from "@/components/page/ocr-data/filter-table";
import { columns } from "@/components/page/ocr-data/column-table";
import { OCRResponse } from "@/types/response";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { destroyOcrDataAction } from "@/actions/ocr";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function PageOcrDataDataTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const request = React.useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      filter: searchParams.get("filter"),
    }),
    [searchParams],
  );

  const { data: response, isLoading, isError } = useOcrDataList(request);

  const [rowSelection, setRowSelection] = React.useState({});

  const handleSingleApprove = (ocrData: OCRResponse) => {
    toast.info(`Edit OCR data: ${ocrData.atasNama}`);
  };

  const ocrDataColumns = React.useMemo(
    () => columns({ onApprove: handleSingleApprove }),
    [],
  );

  const handleBulkApprove = async () => {
    const selectedIds = Object.keys(rowSelection);

    if (selectedIds.length === 0) {
      toast.warning("No data selected");
      return;
    }

    try {
      toast.success(`${selectedIds.length} OCR data approved ${selectedIds}`);
      setRowSelection({});
      router.refresh();
    } catch (err) {
      toast.error("Failed to approve data");
    }
  };

  return (
    <div className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <PageOcrDataFilterTable className="my-0" />
        <Button
          onClick={handleBulkApprove}
          disabled={Object.keys(rowSelection).length === 0}
        >
          Approve Selected ({Object.keys(rowSelection).length})
        </Button>
      </div>


      {isError && <div>Something went wrong.</div>}

      {response?.success && response && (
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
