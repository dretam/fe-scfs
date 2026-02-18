import {ColumnDef} from "@tanstack/react-table"
import {UserResponse} from "@/types/response"
import {Button} from "@/components/ui/button"
import {SortIcon} from "@/components/common/sort-icon";


export const columns: ColumnDef<UserResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
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
	},
	{
		accessorKey: "email",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Email
					<SortIcon column={column}/>
				</Button>
			)
		},
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
	},
]
