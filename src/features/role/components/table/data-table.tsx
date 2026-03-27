'use client';

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRoleList, useRoleSoftDelete, useRoleHardDelete, useRoleCreate, useRoleUpdate } from "@/features/role";
import { RoleResponse } from "../../types";
import { columns } from "./column-table";
import PageRoleFilterTable from "./filter-table";
import { useDialog } from "@/hooks/ui/use-dialog";
import { RoleFormDialog } from "../form/role-form-dialog";
import { RoleFormValues } from "../../schemas";

export function PageRoleDataTable({ className, ...props }: React.ComponentProps<"div">) {
	const dialog = useDialog();
	const searchParams = useSearchParams();

	const request = React.useMemo(() => ({
		page: Number(searchParams.get("page") ?? 1),
		perPage: Number(searchParams.get("perPage") ?? 10),
		filter: searchParams.get("filter"),
	}), [searchParams]);

	const { data: response, isLoading, isError } = useRoleList(request);

	const roleCreate = useRoleCreate();
	const roleUpdate = useRoleUpdate();
	const softDelete = useRoleSoftDelete();

	const handleOpenAdd = async () => {
		const values = await dialog.form<RoleFormValues>(RoleFormDialog, {
			isEdit: false,
		});

		if (!values) return;

		try {
			const result = await roleCreate.execute({
				name: values.name,
				icon: values.icon,
				description: values.description,
				permissionIds: values.permissionIds,
			});
			toast.success(result.message || "Role created successfully");
		} catch (error: any) {
			toast.error(error?.error?.message || "Failed to create role");
		}
	};

	const handleEdit = async (role: RoleResponse) => {
		const values = await dialog.form<RoleFormValues>(RoleFormDialog, {
			isEdit: true,
			selectedRoleId: role.id,
		});

		if (!values) return;

		try {
			const result = await roleUpdate.execute({
				id: role.id,
				name: values.name,
				icon: values.icon,
				description: values.description,
				permissionIds: values.permissionIds,
			});

			toast.success(result.message || "Role updated successfully");
		} catch (error: any) {
			toast.error(error?.error?.message || "Failed to update role");
		}
	};

	const handleDelete = async (role: RoleResponse) => {
		const confirmed = await dialog.confirm({
			title: "Delete Role?",
			description: `Are you sure you want to delete role "${role.name}"?`,
		});

		if (!confirmed) return;

		try {
			const result = await softDelete.execute({ roleId: role.id });
			toast.success(result.message || "Role soft deleted");
		} catch (error: any) {
			toast.error(error?.error?.message || "Failed to delete role");
		}
	};

	const roleColumns = React.useMemo(() =>
		columns({ onEdit: handleEdit, onDelete: handleDelete }),
		[]
	);

	return (
		<div className={className} {...props}>
			<div className="flex justify-between items-center mb-4">
				<PageRoleFilterTable className="my-0" />
				<Button onClick={handleOpenAdd}>
					<Plus className="mr-2 h-4 w-4" />
					Add Role
				</Button>
			</div>

			{isLoading && (
				<div>Loading...</div>
			)}

			{isError && (
				<div>Something went wrong.</div>
			)}

			{!isLoading && response?.success && (
				<DataTable
					data={response.data}
					columns={roleColumns}
					pagination={response.pagination}
				/>
			)}
		</div>
	);
}
