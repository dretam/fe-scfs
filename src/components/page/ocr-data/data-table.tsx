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

  const { response, isLoading, isError } = useOcrDataList(request);

  const [rowSelection, setRowSelection] = React.useState({});

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedOcrData, setSelectedOcrData] =
    React.useState<OCRResponse | null>(null);
    
  const [isHardDelete, setIsHardDelete] = React.useState(false);

  const handleEdit = (ocrData: OCRResponse) => {
    toast.info(`Edit OCR data: ${ocrData.atasNama}`);
  };

  const handleDelete = (ocrData: OCRResponse) => {
    setSelectedOcrData(ocrData);
    setIsHardDelete(false);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedOcrData) return;

    if (isHardDelete) {
      const result = await destroyOcrDataAction(selectedOcrData.id);

      if (result.success) {
        toast.success("OCR data permanently deleted");
        router.refresh(); // ✅ instead of window.location.reload()
      } else {
        toast.error("Failed to delete OCR data");
      }
    } else {
      toast.info("Soft delete not implemented for OCR data");
      setIsDeleteDialogOpen(false);
      return;
    }

    setIsDeleteDialogOpen(false);
    setSelectedOcrData(null);
  };

  const ocrDataColumns = React.useMemo(
    () => columns({ onEdit: handleEdit, onDelete: handleDelete }),
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

      {response && (
        <DataTable
          data={response.data}
          columns={ocrDataColumns}
          pagination={response.pagination}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete OCR Data</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the OCR data. The OCR data will be marked as
              deleted but can be recovered.
              {selectedOcrData && (
                <span className="mt-2 font-medium">
                  Atas Nama: {selectedOcrData.atasNama}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-500"
              onClick={confirmDelete}
            >
              {isHardDelete ? "Permanently Delete" : "Soft Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
