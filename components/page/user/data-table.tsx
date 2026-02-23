'use client';

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import { useUserList } from "@/hooks/use-user";
import * as React from "react";
import PageUserFilterTable from "@/components/page/user/filter-table";
import {columns} from "@/components/page/user/column-table";

export function PageUserDataTable({ className, ...props }: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();

  // ✅ Memoized request (IMPORTANT: prevent infinite SWR re-fetch)
  const request = React.useMemo(() => ({
    page: Number(searchParams.get("page") ?? 1),
    perPage: Number(searchParams.get("perPage") ?? 10),
    filter: searchParams.get("filter"),
    expands: "role"
  }), [searchParams]);

  const { response, isLoading, isError } = useUserList(request);

  return (
    <div className={className} {...props}>
      <PageUserFilterTable className="my-5" />

      {isLoading && (
        <div>Loading...</div>
      )}

      {isError && (
        <div>Something went wrong.</div>
      )}

      {!isLoading && !isError && response && (
        <DataTable
          data={response.data}
          columns={columns}
          pagination={response.pagination}
        />
      )}
    </div>
  );
}
