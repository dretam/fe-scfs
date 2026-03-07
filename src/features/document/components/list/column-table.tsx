import { ColumnDef } from "@tanstack/react-table"
import { DocumentResponse } from "../../types";

import { Button } from "@/components/ui/button"
import { SortIcon } from "@/components/common/sort-icon";
import { MoreHorizontal, Pencil, Trash2, FileText } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ColumnsProps {
	onView: (document: DocumentResponse) => void;
	onDelete: (document: DocumentResponse) => void;
}

export const documentListColumns = ({ onView, onDelete }: ColumnsProps): ColumnDef<DocumentResponse>[] => [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => row.getValue("id"),
	},
	{
		accessorKey: "originalName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Original Name
					<SortIcon column={column} />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<FileText className="h-4 w-4" />
				<span>{row.getValue("originalName")}</span>
			</div>
		),
	},
	{
		accessorKey: "mimeType",
		header: "MIME Type",
		cell: ({ row }) => {
			const mimeType = row.getValue("mimeType") as string;
			const typeLabel = mimeType.split('/')[1]?.toUpperCase() || 'FILE';
			return <Badge variant="outline">{typeLabel}</Badge>;
		},
	},
	{
		accessorKey: "fileSize",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					File Size
					<SortIcon column={column} />
				</Button>
			)
		},
		cell: ({ row }) => {
			const size = row.getValue("fileSize") as number;
			const formatSize = (bytes: number) => {
				if (bytes >= 1024 * 1024) {
					return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
				}
				if (bytes >= 1024) {
					return `${(bytes / 1024).toFixed(2)} KB`;
				}
				return `${bytes} B`;
			};
			return formatSize(size);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Uploaded at
					<SortIcon column={column} />
				</Button>
			)
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
			const document = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onView(document)}>
							<FileText className="mr-2 h-4 w-4" />
							View Details
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDelete(document)}>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
]
