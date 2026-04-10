import { ColumnDef } from "@tanstack/react-table";
import { UserResponse } from "../../types";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnsProps {
  onEdit: (user: UserResponse) => void;
  onDelete: (user: UserResponse) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<UserResponse>[] => [
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
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as UserResponse["role"];
        return role?.name ?? "-";
      },
    },
    {
      accessorKey: "roleChildren",
      header: "User Role",
      cell: ({ row }) => {
        const role = row.getValue("roleChildren") as UserResponse["roleChildren"];
        return role?.name ?? "-";
      },
    },
    {
      accessorKey: "companyCif",
      header: "CIF",
      cell: ({ row }) => {
        const companyCif = row.original.company?.companyCif;
        return companyCif ?? "-";
      },
    },
    {
      accessorKey: "companyName",
      header: "Company",
      cell: ({ row }) => {
        const companyName = row.original.company?.companyName;
        return companyName ?? "-";
      },
    },
    {
      accessorKey: "userStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = (row.original.isActive ? 'AKTIF' : 'TIDAK AKTIF');
        return status;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(user)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
