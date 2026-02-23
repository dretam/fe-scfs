'use client';

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import { useUserList } from "@/hooks/use-user";
import * as React from "react";
import PageUserFilterTable from "@/components/page/user/filter-table";
import {columns} from "@/components/page/user/column-table";
import {UserResponse} from "@/types/response";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {DialogLogout} from "@/components/dialog/logout";
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {setLogoutDialog} from "@/stores/dialog/logout";
import {toast} from "sonner";
import {userDeleteAction, userDestroyAction} from "@/actions/user";
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

export function PageUserDataTable({ className, ...props }: React.ComponentProps<"div">) {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	// ✅ Memoized request (IMPORTANT: prevent infinite SWR re-fetch)
	const request = React.useMemo(() => ({
		page: Number(searchParams.get("page") ?? 1),
		perPage: Number(searchParams.get("perPage") ?? 10),
		filter: searchParams.get("filter"),
		expands: "role"
	}), [searchParams]);

	const { response, isLoading, isError, refetch } = useUserList(request);

	// Dialog states
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
	const [selectedUser, setSelectedUser] = React.useState<UserResponse | null>(null);
	const [isHardDelete, setIsHardDelete] = React.useState(false);

	const handleEdit = (user: UserResponse) => {
		// TODO: Open edit dialog
		toast.info(`Edit user: ${user.name}`);
	};

	const handleDelete = (user: UserResponse) => {
		setSelectedUser(user);
		setIsHardDelete(false);
		setIsDeleteDialogOpen(true);
	};

	const handleHardDelete = (user: UserResponse) => {
		setSelectedUser(user);
		setIsHardDelete(true);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = async () => {
		if (!selectedUser) return;

		if (isHardDelete) {
			const result = await userDestroyAction(selectedUser.id);
			if (result.isSuccess) {
				toast.success("User permanently deleted");
			} else {
				toast.error("Failed to delete user");
			}
		} else {
			const result = await userDeleteAction({ userId: selectedUser.id });
			if (result.isSuccess) {
				toast.success("User soft deleted");
			} else {
				toast.error("Failed to delete user");
			}
		}

		setIsDeleteDialogOpen(false);
		setSelectedUser(null);
		// Refetch the list
		window.location.reload();
	};

	const userColumns = React.useMemo(() => 
		columns({ onEdit: handleEdit, onDelete: handleDelete }),
		[]
	);

	return (
		<div className={className} {...props}>
			<div className="flex justify-between items-center mb-4">
				<PageUserFilterTable className="my-0" />
				<Button onClick={() => toast.info("Create user - coming soon")}>
					<Plus className="mr-2 h-4 w-4"/>
					Add User
				</Button>
			</div>

			{isLoading && (
				<div>Loading...</div>
			)}

			{isError && (
				<div>Something went wrong.</div>
			)}

			{!isLoading && !isError && response && (
				<DataTable
					data={response.data}
					columns={userColumns}
					pagination={response.pagination}
				/>
			)}

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{isHardDelete ? "Permanently Delete User?" : "Soft Delete User?"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{isHardDelete 
								? "This action cannot be undone. This will permanently delete the user from the database."
								: "This will soft delete the user. The user will be marked as deleted but can be recovered."
							}
							{selectedUser && (
								<p className="mt-2 font-medium">User: {selectedUser.name} ({selectedUser.email})</p>
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
