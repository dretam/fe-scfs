"use client";

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import { useUserList } from "@/hooks/api/use-user";
import * as React from "react";
import PageUserFilterTable from "@/components/page/user/filter-table";
import { columns } from "@/components/page/user/column-table";
import { UserResponse } from "@/types/response";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import { toast } from "sonner";
import { userDeleteAction, userDestroyAction } from "@/actions/user";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const userSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
  roleId: z.number().nullable(),
});

type UserFormValues = z.infer<typeof userSchema>;

export function PageUserDataTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const request = React.useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      filter: searchParams.get("filter"),
      expands: "role",
    }),
    [searchParams],
  );

  const { data: response, isLoading, isError } = useUserList(request);

  // Dialog states
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserResponse | null>(
    null,
  );
  const [isHardDelete, setIsHardDelete] = React.useState(false);

  const handleDelete = (user: UserResponse) => {
    setSelectedUser(user);
    setIsHardDelete(false);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    if (isHardDelete) {
      const result = await userDestroyAction(selectedUser.id);
      if (result.success) {
        toast.success("User permanently deleted");
      } else {
        toast.error("Failed to delete user");
      }
    } else {
      const result = await userDeleteAction({ userId: selectedUser.id });
      if (result.success) {
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

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      roleId: null,
    },
  });

  const handleOpenAdd = () => {
    form.reset({
      username: "",
      password: "",
      roleId: null,
    });
    setIsAddOpen(true);
  };

  //
  // ==========================
  // OPEN EDIT
  // ==========================
  //
  const handleEdit = (user: UserResponse) => {
    setSelectedUser(user);

    form.reset({
      username: user.name,
      password: "",
      roleId: user.role?.id ?? 0,
    });

    setIsEditOpen(true);
  };

  const onSubmitAdd = async (values: UserFormValues) => {};

  //
  // ==========================
  // UPDATE USER
  // ==========================
  //
  const onSubmitEdit = async (values: UserFormValues) => {};

  const userColumns = React.useMemo(
    () => columns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  return (
    <div className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <PageUserFilterTable className="my-0" />
        <Button onClick={() => handleOpenAdd()}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}

      {isError && <div>Something went wrong.</div>}

      {!isLoading && !isError && response && (
        <DataTable
          data={response.data}
          columns={userColumns}
          pagination={response.pagination}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isHardDelete ? "Permanently Delete User?" : "Soft Delete User?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isHardDelete
                ? "This action cannot be undone. This will permanently delete the user from the database."
                : "This will soft delete the user. The user will be marked as deleted but can be recovered."}
              {selectedUser && (
                <span className="mt-2 font-medium">
                  User: {selectedUser.name} ({selectedUser.email})
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-500"
              onClick={confirmDelete}
            >
              {isHardDelete ? "Permanently Delete" : "Soft Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ===================== ADD DIALOG ===================== */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
            <Input placeholder="Username" {...form.register("username")} />
            {form.formState.errors.username && (
              <p className="text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}

            <Input
              type="password"
              placeholder="Password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}

            <Select onValueChange={(value) => form.setValue("roleId", +value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Admin</SelectItem>
                <SelectItem value="2">User</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.roleId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.roleId.message}
              </p>
            )}

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ===================== EDIT DIALOG ===================== */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmitEdit)}
            className="space-y-4"
          >
            <Input placeholder="Username" {...form.register("username")} />

            <Input
              type="password"
              placeholder="New Password (optional)"
              {...form.register("password")}
            />

            <Select
              defaultValue={form.getValues("roleId")?.toString()}
              onValueChange={(value) => form.setValue("roleId", +value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Admin</SelectItem>
                <SelectItem value="2">User</SelectItem>
              </SelectContent>
            </Select>

            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
