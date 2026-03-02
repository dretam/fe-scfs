import {ArrowUp, ArrowDown, ArrowUpDown} from "lucide-react"

export const SortIcon = ({column}: { column: any }) => {
	const sorted = column.getIsSorted()

	if (sorted === "asc") return <ArrowUp className="ml-2 h-4 w-4"/>
	if (sorted === "desc") return <ArrowDown className="ml-2 h-4 w-4"/>

	return <ArrowUpDown className="ml-2 h-4 w-4"/>
}
