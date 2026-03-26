'use client';

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRoleList, useRoleSoftDelete, useRoleHardDelete } from "@/features/role";
import { RoleResponse, RoleDeleteActionFormData } from "../../types";
import { columns } from "./column-table";
import PageRoleFilterTable from "./filter-table";

export function PageRoleDataTable({ className, ...props }: React.ComponentProps<"div">) {
	const searchParams = useSearchParams();

	const request = React.useMemo(() => ({
		page: Number(searchParams.get("page") ?? 1),
		perPage: Number(searchParams.get("perPage") ?? 10),
		filter: searchParams.get("filter"),
	}), [searchParams]);

	const { data: response, isLoading, isError } = useRoleList(request);


	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
	const [selectedRole, setSelectedRole] = React.useState<RoleResponse | null>(null);
	const [isHardDelete, setIsHardDelete] = React.useState(false);

	const softDelete = useRoleSoftDelete();
	const hardDelete = useRoleHardDelete();

	const handleEdit = (role: RoleResponse) => {
		// TODO: Open edit dialog
		toast.info(`Edit role: ${role.name}`);
	};

	const handleDelete = (role: RoleResponse) => {
		setSelectedRole(role);
		setIsHardDelete(false);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = async () => {
		if (!selectedRole) return;

		try {
			if (isHardDelete) {
				const result = await hardDelete.execute(selectedRole.id);
				toast.success("Role permanently deleted");
			} else {
				const result = await softDelete.execute({ roleId: selectedRole.id });
				toast.success("Role soft deleted");
			}
		} catch (error: any) {
			toast.error(error?.error?.message || "Failed to delete role");
		}

		setIsDeleteDialogOpen(false);
		setSelectedRole(null);
		// Refetch the list
		window.location.reload();
	};

	const roleColumns = React.useMemo(() =>
		columns({ onEdit: handleEdit, onDelete: handleDelete }),
		[]
	);

	return (
		<div className={className} {...props}>
			<div className="flex justify-between items-center mb-4">
				<PageRoleFilterTable className="my-0" />
				<Button onClick={() => toast.info("Create role - coming soon")}>
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

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{isHardDelete ? "Permanently Delete Role?" : "Soft Delete Role?"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{isHardDelete
								? "This action cannot be undone. This will permanently delete the role from the database."
								: "This will soft delete the role. The role will be marked as deleted but can be recovered."
							}
							{selectedRole && (
								<span className="mt-2 font-medium">Role: {selectedRole.name}</span>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="cursor-pointer bg-red-500"
							onClick={confirmDelete}
						>
							{isHardDelete ? "Permanently Delete" : "Soft Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
