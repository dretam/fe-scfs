"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import {
  useCommunitiesList,
  useCommunityCreate,
  useCommunityUpdate,
  useCommunityDelete,
} from "../../hooks";
import { CommunitiesFormDialog } from "../form/communities-form-dialog";
import { CommunityResponse } from "../../types";
import { useDialog } from "@/hooks/ui/use-dialog";
import { CommunityCreateFormValues } from "../../schemas";
import { PageCommunitiesFilterTable } from "./filter-table";
import { columns } from "./column-table";
import { CommunityDetailDialog } from "../dialog/community-detail-dialog";

export function PageCommunitiesDataTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dialog = useDialog();
  const searchParams = useSearchParams();

  const request = React.useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      filter: searchParams.get("filter") || undefined,
      sort: searchParams.get("sort") || undefined,
    }),
    [searchParams],
  );

  const { data: response, isLoading } = useCommunitiesList(request);

  const communityCreate = useCommunityCreate();
  const communityUpdate = useCommunityUpdate();
  const communityDelete = useCommunityDelete();

  const handleOpenAdd = async () => {
    const values = await dialog.form<CommunityCreateFormValues>(
      CommunitiesFormDialog,
      {
        isEdit: false,
      },
    );

    if (!values) return;

    try {
      const result = await communityCreate.execute(values);
      toast.success(result.message || "Community created successfully");
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to create community");
    }
  };

   const handleViewDetail = async (community: CommunityResponse) => {
    await dialog.form(CommunityDetailDialog, {
      selectedCommunityId: community.communityId,
      onEdit: () => {
        dialog.close();
        handleEdit(community);
      },
    });
  };

  const handleEdit = async (community: CommunityResponse) => {
    const values = await dialog.form<CommunityCreateFormValues>(
      CommunitiesFormDialog,
      {
        isEdit: true,
        selectedCommunityId: community.communityId,
      },
    );

    if (!values) return;

    try {
      const result = await communityUpdate.execute({
        ...values,
        communityId: community.communityId,
      });
      toast.success(result.message || "Community updated successfully");
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to update community");
    }
  };

  const handleDelete = async (community: CommunityResponse) => {
    const confirmed = await dialog.confirm({
      title: "Delete Community?",
      description: `Are you sure you want to delete ${community.name}? This is a soft-delete operation.`,
    });

    if (!confirmed) return;

    try {
      const result = await communityDelete.execute({
        communityId: community.communityId,
      });
      toast.success(result.message || "Community deleted successfully");
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to delete community");
    }
  };

  const communityColumns = React.useMemo(
    () =>
      columns({
        onDetail: handleViewDetail,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete],
  );

  return (
    <div className={className} {...props}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <PageCommunitiesFilterTable className="w-full md:max-w-sm" />

        <Button onClick={handleOpenAdd} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Community
        </Button>
      </div>

      {!isLoading && response?.success && (
        <DataTable
          data={response.data}
          columns={communityColumns}
          pagination={response.pagination}
          getRowId={(row) => row.communityId}
        />
      )}
    </div>
  );
}
