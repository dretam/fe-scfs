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
      header: "No.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const rowNumber = pageIndex * pageSize + row.index + 1;
        return rowNumber;
      },
    },
    {
      accessorKey: "name",
      header: "Username",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "fullName",
      header: "Nama",
      cell: ({ row }) => row.getValue("fullName"),
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
        let color = "bg-green-100 text-green-800";

        if(role?.id === "SUPPLIER") {
          color = "bg-blue-100 text-blue-800";
        } else if(role?.id === "ANCHOR") {
          color = "bg-purple-100 text-purple-800";
        } else {
          color = "bg-gray-100 text-gray-800";
        }

        return <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
        >
          {role?.name ? role?.name : "-"}
        </span>;
      },
    },
    {
      accessorKey: "roleChildren",
      header: "User Role",
      cell: ({ row }) => {
        const roleChildren = row.getValue("roleChildren") as UserResponse["roleChildren"];
        return <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            roleChildren?.name
              ? "bg-green-100 text-green-800"
              : ""
          }`}
        >
          {roleChildren?.name ? roleChildren?.name : "-"}
        </span>
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
        const status = row.original.isActive;
        return <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            status
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status ? "AKTIF" : "TIDAK AKTIF"}
        </span>
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
            >
              <Pencil className="h-4 w-4 mr-1 text-blue-500" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="h-4 w-4 mr-1 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];
