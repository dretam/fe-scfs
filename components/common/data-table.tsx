'use client';

import * as React from "react"
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import {Button} from "@/components/ui/button"
import {PaginationResponse} from "@/types/response"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {reverseMapper, toBackendSort} from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({columns, data, pagination,}: DataTableProps<TData, TValue> & {
	pagination: PaginationResponse
}) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [sorting, setSorting] = React.useState<SortingState>([])

	// PAGINATION FROM URL
	const pageIndex = Number(searchParams.get("page") || 1) - 1
	const pageSize = Number(searchParams.get("perPage") || 10)
	const [paginationState, setPaginationState] = React.useState({
		pageIndex,
		pageSize,
	})

	React.useEffect(() => {
		setPaginationState({
			pageIndex,
			pageSize,
		})
	}, [pageIndex, pageSize])

	// SYNC SORT FROM URL
	React.useEffect(() => {
		const sort = searchParams.get("sort")

		if (!sort) {
			setSorting([])
			return
		}

		const parsed: SortingState = sort.split(",").map((item) => {
			const desc = item.startsWith("-")
			const rawId = desc ? item.slice(1) : item
			const id = reverseMapper(rawId)

			return { id, desc }
		})

		setSorting(parsed)
	}, [searchParams])


	// HANDLE PAGINATION
	const handlePaginationChange = (updater: any) => {
		const newState =
			typeof updater === "function"
				? updater(paginationState)
				: updater

		const params = new URLSearchParams(searchParams.toString())

		params.set("page", String(newState.pageIndex + 1))
		params.set("perPage", String(newState.pageSize))

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		})
	}


	// HANDLE SORTING
	const handleSortingChange = (updater: any) => {
		const newSorting =
			typeof updater === "function" ? updater(sorting) : updater
		setSorting(newSorting)
		const sortValue = toBackendSort<TData>(newSorting, {
			createdAt: "audit.createdAt",
		} as any)

		const params = new URLSearchParams(searchParams.toString())

		if (sortValue) {
			params.set("sort", sortValue)
		} else {
			params.delete("sort")
		}

		// reset ke page 1 saat sort berubah
		params.set("page", "1")
		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		})
	}


	const table = useReactTable({
		data,
		columns,
		manualPagination: true,
		rowCount: pagination.total,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onPaginationChange: handlePaginationChange,
		onSortingChange: handleSortingChange,
		state: {
			sorting,
			pagination: paginationState,
		},
	})

	return (
		<div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
