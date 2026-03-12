// deposit-columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortIcon } from "@/components/common/sort-icon";

export interface DepositResponse {
    id: number;
    cif: string;
    namaNasabah: string;
    kodeProduk: string;
    namaProduk: string;
    tenor: string;
    masaUang: string;
    jenisPerjanjian: string;
    nominal: number;
    totalBungaPersen: number;
    approverBunga: string;
    namaApprover: string;
    pembayaranBungaMetode: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ColumnsProps {
    onEdit: (deposit: DepositResponse) => void;
    onDelete: (deposit: DepositResponse) => void;
}

export const columns = ({
    onEdit,
    onDelete,
}: ColumnsProps): ColumnDef<DepositResponse>[] => [
        {
            accessorKey: "no",
            header: "No.",
            cell: ({ row, table }) => {
                const pageIndex = table.getState().pagination.pageIndex;
                const pageSize = table.getState().pagination.pageSize;
                const rowNumber = pageIndex * pageSize + row.index + 1;
                return rowNumber;
            },
        },
        {
            accessorKey: "cif",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        CIF
                        <SortIcon column={column} />
                    </Button>
                );
            },
            cell: ({ row }) => row.getValue("cif"),
        },
        {
            accessorKey: "namaNasabah",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nama Nasabah
                        <SortIcon column={column} />
                    </Button>
                );
            },
            cell: ({ row }) => row.getValue("namaNasabah"),
        },
        {
            accessorKey: "kodeProduk",
            header: "Kode Produk",
            cell: ({ row }) => row.getValue("kodeProduk"),
        },
        {
            accessorKey: "namaProduk",
            header: "Nama Produk",
            cell: ({ row }) => row.getValue("namaProduk"),
        },
        {
            accessorKey: "tenor",
            header: "Tenor",
            cell: ({ row }) => row.getValue("tenor"),
        },
        {
            accessorKey: "masaUang",
            header: "Masa Uang",
            cell: ({ row }) => row.getValue("masaUang"),
        },
        {
            accessorKey: "jenisPerjanjian",
            header: "Jenis Perjanjian",
            cell: ({ row }) => row.getValue("jenisPerjanjian"),
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
                const nominal = row.getValue("nominal") as number;
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(nominal);
            },
        },
        {
            accessorKey: "totalBungaPersen",
            header: "Total Bunga (%)",
            cell: ({ row }) => {
                const bunga = row.getValue("totalBungaPersen") as number;
                return `${bunga}%`;
            },
        },
        {
            accessorKey: "approverBunga",
            header: "Approver Bunga",
            cell: ({ row }) => row.getValue("approverBunga"),
        },
        {
            accessorKey: "namaApprover",
            header: "Nama Approver",
            cell: ({ row }) => row.getValue("namaApprover"),
        },
        {
            accessorKey: "pembayaranBungaMetode",
            header: "Pembayaran Bunga Metode",
            cell: ({ row }) => row.getValue("pembayaranBungaMetode"),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <SortIcon column={column} />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("createdAt") as string);
                return date.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const deposit = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(deposit)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(deposit)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
