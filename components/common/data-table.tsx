"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { PaginationResponse } from "@/types/response";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn, reverseMapper, toBackendSort } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationResponse;

  rowSelection?: any;
  onRowSelectionChange?: any;

  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  rowSelection,
  onRowSelectionChange,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // PAGINATION FROM URL
  const pageIndex = Number(searchParams.get("page") || 1) - 1;
  const pageSize = Number(searchParams.get("perPage") || 10);
  const [paginationState, setPaginationState] = React.useState({
    pageIndex,
    pageSize,
  });

  const defaultPagination = {
    currentPage: 1,
    perPage: 10,
    totalPage: 1,
    total: data.length,
  };

  const safePagination = pagination ?? defaultPagination;

  React.useEffect(() => {
    if (!pagination) return;

    setPaginationState({
      pageIndex: pagination.currentPage - 1,
      pageSize: pagination.perPage,
    });
  }, [pagination]);

  // SYNC SORT FROM URL
  React.useEffect(() => {
    const sort = searchParams.get("sort");

    if (!sort) {
      setSorting([]);
      return;
    }

    const parsed: SortingState = sort.split(",").map((item) => {
      const desc = item.startsWith("-");
      const rawId = desc ? item.slice(1) : item;
      const id = reverseMapper(rawId);

      return { id, desc };
    });

    setSorting(parsed);
  }, [searchParams]);

  // HANDLE PAGINATION
  const handlePaginationChange = (updater: any) => {
    const newState =
      typeof updater === "function" ? updater(paginationState) : updater;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newState.pageIndex + 1));
    params.set("perPage", String(newState.pageSize));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // HANDLE SORTING
  const handleSortingChange = (updater: any) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSorting);
    const sortValue = toBackendSort<TData>(newSorting, {
      createdAt: "audit.createdAt",
    } as any);

    const params = new URLSearchParams(searchParams.toString());

    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    // reset ke page 1 saat sort berubah
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: pagination ? safePagination.totalPage : undefined,
    rowCount: pagination ? safePagination.total : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,

    getRowId: (row: any) => row.id.toString(), // ⭐ WAJIB
    autoResetPageIndex: false,
    enableRowSelection: true,
    onRowSelectionChange,

    state: {
      sorting,
      pagination: pagination ? paginationState : undefined,
        rowSelection,
    },
  });
  function getStickyClass(
    sticky: "left" | "right" | undefined,
    type: "header" | "cell",
    columnId?: string,
  ) {
    return cn(
      sticky === "left" &&
        "sticky left-0 shadow-[4px_0_6px_-4px_rgba(0,0,0,0.2)]",

      sticky === "right" &&
        "sticky right-0 shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.2)]",

      sticky && (type === "header" ? "z-30" : "z-20"),

      sticky && (columnId === "select" ? "bg-muted" : "bg-background"),
    );
  }

  return (
    <div>
      <div className="relative overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={getStickyClass(
                      header.column.columnDef.meta?.sticky,
                      "header",
                      header.column.id,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: paginationState.pageSize }).map(
                (_, index) => (
                  <TableRow key={index}>
                    {columns.map((col, i) => (
                      <TableCell key={i}>
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={rowSelection && row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={getStickyClass(
                        cell.column.columnDef.meta?.sticky,
                        "cell",
                        cell.column.id,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
  );
}
