// page-deposit-list-table.tsx
"use client";

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./column-table";

export function PageDepositListTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleEdit = (deposit: any) => {
    // Handle edit - navigate to edit form or open edit dialog
    toast.info("Edit functionality - implement navigation to edit form");
    console.log("Edit deposit:", deposit);
  };

  const handleDelete = (deposit: any) => {};

  const columnsList = React.useMemo(
    () => columns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  return (
    <div className={className} {...props}>
      <div className="p-3">
        <DataTable data={[]} columns={columnsList} />
      </div>
    </div>
  );
}
