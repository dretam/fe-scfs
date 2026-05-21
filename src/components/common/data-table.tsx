"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  TableOptions,
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

  getRowId?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  rowSelection,
  onRowSelectionChange,
  isLoading,
  getRowId,
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
  const isRowSelectionEnabled = rowSelection !== undefined && onRowSelectionChange !== undefined;

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

  // Prepare table configuration based on whether row selection is enabled
  const tableConfig: any = {
    data,
    columns,
    manualPagination: true,
    pageCount: pagination ? safePagination.totalPage : undefined,
    rowCount: pagination ? safePagination.total : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    getRowId: (row: any) => (getRowId ? getRowId(row) : row.id?.toString()),
    autoResetPageIndex: false,
    state: {
      sorting,
      pagination: pagination ? paginationState : undefined,
    },
  };

  // Add row selection configuration only if enabled
  if (isRowSelectionEnabled) {
    tableConfig.enableRowSelection = true;
    tableConfig.onRowSelectionChange = onRowSelectionChange;
    tableConfig.state.rowSelection = rowSelection;
  }

  const table = useReactTable(tableConfig);

  function getStickyStyle(
    column: any,
    type: "header" | "cell",
    table: any,
  ): React.CSSProperties | undefined {
    const sticky = column.columnDef.meta?.sticky;
    if (!sticky) return undefined;

    const allLeafColumns = table.getAllLeafColumns();

    const baseStyle: React.CSSProperties = {
      position: "sticky",
      zIndex: type === "header" ? 50 : 40,
    };

    if (sticky === "left") {
      // Get ALL columns that appear BEFORE this column (by order), and are also sticky left
      const currentIndex = allLeafColumns.findIndex(
        (col: any) => col.id === column.id,
      );

      const offset = allLeafColumns
        .slice(0, currentIndex) // all columns before current
        .filter((col: any) => col.columnDef.meta?.sticky === "left") // only sticky left ones
        .reduce((total: number, col: any) => total + col.getSize(), 0);

      return {
        ...baseStyle,
        left: offset,
      };
    }

    if (sticky === "right") {
      // Get ALL columns that appear AFTER this column (by order), and are also sticky right
      const currentIndex = allLeafColumns.findIndex(
        (col: any) => col.id === column.id,
      );

      const offset = allLeafColumns
        .slice(currentIndex + 1) // all columns after current
        .filter((col: any) => col.columnDef.meta?.sticky === "right") // only sticky right ones
        .reduce((total: number, col: any) => total + col.getSize(), 0);

      return {
        ...baseStyle,
        right: offset,
      };
    }

    return undefined;
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
                    className="bg-background"
                    style={getStickyStyle(header.column, "header", table)}
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
                      className={`bg-background ${rowSelection && row.getIsSelected() ? "bg-muted" : ""}`}
                      style={getStickyStyle(cell.column, "cell", table)}
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
          disabled={pagination && !table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={pagination && !table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
