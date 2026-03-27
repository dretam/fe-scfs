"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { DataTable } from "@/components/common/data-table";
import PageUserFilterTable from "@/features/user/components/user-table/filter-table";
import { columns } from "@/features/user/components/user-table/column-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  useUserCreate,
  useUserList,
  useUserSoftDelete,
  useUserUpdate,
} from "../../hooks";

import { UserFormDialog } from "@/features/user/components/form/user-form-dialog";

import { UserResponse } from "../../types";
import { useDialog } from "@/hooks/ui/use-dialog";
import { UserFormValues } from "../../schemas";
export function PageUserDataTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dialog = useDialog();

  const searchParams = useSearchParams();

  const request = React.useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      filter: searchParams.get("filter"),
      expands: "role",
    }),
    [searchParams],
  );

  const { data: response, isLoading } = useUserList(request);

  const userCreate = useUserCreate();
  const userUpdate = useUserUpdate();
  const userSoftDelete = useUserSoftDelete();

  const handleOpenAdd = async () => {
    const values = await dialog.form<UserFormValues>(UserFormDialog, {
      isEdit: false,
    });

    if (!values) return;

    try {
      const result = await userCreate.execute({
        username: values.username,
        password: values.password ?? "",
        roleId: Number(values.roleId) ?? "1",
        permissionOverrides: values.overrides,
      });
      toast.success(result.message || "User created successfully");
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to create user");
    }
  };

  const handleEdit = async (user: UserResponse) => {
    const values = await dialog.form<UserFormValues>(UserFormDialog, {
      isEdit: true,
      selectedUserId: user.id,
    });

    if (!values) return;

    try {
      const result = await userUpdate.execute({
        id: user.id,
        password: values.password,
        roleId: Number(values.roleId) ?? "1",
        permissionOverrides: values.overrides,
      });

      toast.success(result.message || "User updated successfully");
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to update user");
    }
  };

  const handleDelete = async (user: UserResponse) => {
    const confirmed = await dialog.confirm({
      title: "Delete User?",
      description: `${user.name} (${user.email})`,
    });

    if (!confirmed) return;

    try {
      const result = await userSoftDelete.execute({
        userId: user.id,
      });

      toast.success(result.message || "User soft deleted");
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to delete user");
    }
  };

  const userColumns = React.useMemo(
    () =>
      columns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete],
  );

  return (
    <div className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <PageUserFilterTable className="my-0" />

        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}

      {!isLoading && response?.success && (
        <DataTable
          data={response.data}
          columns={userColumns}
          pagination={response.pagination}
        />
      )}
    </div>
  );
}
