import {ColumnDef} from "@tanstack/react-table"
import {RoleResponse} from "@/types/response"
import {Button} from "@/components/ui/button"
import {SortIcon} from "@/components/common/sort-icon";
import {MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnsProps {
	onEdit: (role: RoleResponse) => void;
	onDelete: (role: RoleResponse) => void;
}

export const columns = ({onEdit, onDelete}: ColumnsProps): ColumnDef<RoleResponse>[] => [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({row}) => row.getValue("id"),
	},
	{
		accessorKey: "name",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Name
					<SortIcon column={column}/>
				</Button>
			)
		},
		cell: ({row}) => row.getValue("name"),
	},
	{
		accessorKey: "icon",
		header: "Icon",
		cell: ({row}) => row.getValue("icon"),
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({row}) => row.getValue("description"),
	},
	{
		accessorKey: "createdAt",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Created at
					<SortIcon column={column}/>
				</Button>
			)
		},
		cell: ({row}) => {
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
		cell: ({row}) => {
			const role = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4"/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit(role)}>
							<Pencil className="mr-2 h-4 w-4"/>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDelete(role)}>
							<Trash2 className="mr-2 h-4 w-4"/>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
]
