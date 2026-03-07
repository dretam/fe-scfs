import { ColumnDef } from "@tanstack/react-table"

import { AccessLogResponse } from "../types";

import { Button } from "@/components/ui/button"
import { SortIcon } from "@/components/common/sort-icon";
import { Badge } from "@/components/ui/badge";

interface ColumnsProps {
	onViewDetails: (log: AccessLogResponse) => void;
}

export const columns = ({ onViewDetails }: ColumnsProps): ColumnDef<AccessLogResponse>[] => [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => row.getValue("id"),
	},
	{
		accessorKey: "user",
		header: "User",
		cell: ({ row }) => {
			const user = row.getValue("user") as AccessLogResponse["user"];
			return user?.name ?? "-";
		},
	},
	{
		accessorKey: "httpMethod",
		header: "Method",
		cell: ({ row }) => {
			const method = row.getValue("httpMethod") as string;
			const methodColors: Record<string, string> = {
				GET: "bg-blue-500",
				POST: "bg-green-500",
				PUT: "bg-yellow-500",
				PATCH: "bg-orange-500",
				DELETE: "bg-red-500",
			};
			return (
				<Badge variant="outline" className={methodColors[method] || "bg-gray-500"}>
					{method}
				</Badge>
			);
		},
	},
	{
		accessorKey: "uri",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					URI
					<SortIcon column={column} />
				</Button>
			)
		},
		cell: ({ row }) => row.getValue("uri"),
	},
	{
		accessorKey: "ipAddress",
		header: "IP Address",
		cell: ({ row }) => row.getValue("ipAddress"),
	},
	{
		accessorKey: "statusCode",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Status
					<SortIcon column={column} />
				</Button>
			)
		},
		cell: ({ row }) => {
			const statusCode = row.getValue("statusCode") as number;
			const statusColor = statusCode >= 400 ? "text-red-500" : statusCode >= 300 ? "text-yellow-500" : "text-green-500";
			return <span className={statusColor}>{statusCode}</span>;
		},
	},
	{
		accessorKey: "responseTimeMs",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Response Time
					<SortIcon column={column} />
				</Button>
			)
		},
		cell: ({ row }) => `${row.getValue("responseTimeMs")} ms`,
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
					Created at
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
				hour: "2-digit",
				minute: "2-digit",
			});
		},
	},
]
