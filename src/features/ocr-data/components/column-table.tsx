import { ColumnDef } from "@tanstack/react-table";
import { OCRResponse } from "../types";

import { Button } from "@/components/ui/button";
import { SortIcon } from "@/components/common/sort-icon";
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ColumnsProps {
  onApprove: (ocrData: OCRResponse) => void;
  onReject: (ocrData: OCRResponse) => void;
}

// Helper function to handle null values
const formatValue = (value: any): string => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "null"
  ) {
    return "-";
  }
  return String(value);
};

export const columns = ({
  onApprove,
  onReject,
}: ColumnsProps): ColumnDef<OCRResponse>[] => [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <div className="p-2 pl-1 px-3">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="p-2 pl-1 px-3">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            value={row.getValue("id")}
          />
        </div>
      ),
      enableSorting: false,
      meta: {
        sticky: "left",
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const rowNumber = pageIndex * pageSize + row.index + 1;
        return rowNumber;
      },
    },
    {
      accessorKey: "atasNama",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Atas Nama
            <SortIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => formatValue(row.getValue("atasNama")),
    },
    {
      accessorKey: "nominal",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nominal
            <SortIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.getValue("nominal");
        if (!value) return "-";
        return "Rp. " + value;
      },
    },
    {
      accessorKey: "jangkaWaktu",
      header: "Jangka Waktu",
      cell: ({ row }) => formatValue(row.getValue("jangkaWaktu")),
    },
    {
      accessorKey: "periode",
      header: "Periode",
      cell: ({ row }) => formatValue(row.getValue("periode")),
    },
    {
      accessorKey: "rate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rate
            <SortIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.getValue("rate");
        if (!value) return "-";
        return `${value}%`;
      },
    },
    {
      accessorKey: "alokasi",
      header: "Alokasi",
      cell: ({ row }) => formatValue(row.getValue("alokasi")),
    },
    {
      accessorKey: "namaRekeningTujuanPencairan",
      header: "Rekening Tujuan",
      cell: ({ row }) => formatValue(row.getValue("namaRekeningTujuanPencairan")),
    },
    {
      accessorKey: "nomorRekeningTujuanPencairan",
      header: "No. Rekening Tujuan",
      cell: ({ row }) =>
        formatValue(row.getValue("nomorRekeningTujuanPencairan")),
    },
    {
      accessorKey: "nomorRekeningPlacement",
      header: "No. Rekening Placement",
      cell: ({ row }) => formatValue(row.getValue("nomorRekeningPlacement")),
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created at
            <SortIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.getValue("createdAt");
        if (!value) return "-";

        try {
          const date = new Date(value as string);
          // Check if date is valid
          if (isNaN(date.getTime())) return "-";

          return date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch {
          return "-";
        }
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 60,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        if (!status) return "-";

        const statusMap: Record<
          string,
          {
            label: string;
            variant: "default" | "secondary" | "destructive" | "outline";
          }
        > = {
          PENDING: {
            label: "Pending",
            variant: "secondary",
          },
          APPROVED: {
            label: "Approved",
            variant: "default",
          },
          REJECTED: {
            label: "Rejected",
            variant: "destructive",
          },
        };

        const config = statusMap[status] ?? {
          label: status,
          variant: "outline",
        };

        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
      meta: {
        sticky: "right",
        width: 60,
      },
    },
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const ocrData = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onApprove(ocrData)}>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Approve
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onReject(ocrData)}
                className="text-red-600 focus:text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      meta: {
        sticky: "right",
        width: 60,
      },
    },
  ];
