"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DataTable } from "@/components/common/data-table";
import PageUserFilterTable from "@/features/user/components/filter-table";
import { columns } from "@/features/user/components/column-table";
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

import {
  useUserCreate,
  useUserList,
  useUserSoftDelete,
  useUserUpdate,
  useInternalUserRetrieve,
} from "../api";
import { useDebouncedCallback } from "@/hooks/helper/useDebounce";

import {
  UserFormDialog,
  UserFormValues,
  userSchema,
} from "@/features/user/components/user-form-dialog";

import { UserResponse } from "../types";


export function PageUserDataTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
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

  const [searchUsername, setSearchUsername] = React.useState("");

  const { data: internalUser } = useInternalUserRetrieve(searchUsername);

  const userCreate = useUserCreate();
  const userUpdate = useUserUpdate();
  const userSoftDelete = useUserSoftDelete();

  const defaultValues: UserFormValues = {
    username: "",
    nama: "",
    email: "",
    area: "",
    jobTitle: "",
    direktorat: "",
    mobile: "",
    password: "",
    roleId: 1,
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });

  const { debouncedFn: handleSearchInternalUser } = useDebouncedCallback(
    (value: string) => {
      if (!value) {
        setSearchUsername("");
        form.reset(defaultValues);
        return;
      }

      setSearchUsername(value);
    },
    500,
  );
  React.useEffect(() => {
    if (!internalUser?.data) return;

    form.reset({
      ...form.getValues(),
      ...internalUser.data,
    });
  }, [internalUser, form]);


  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<UserResponse | null>(
    null,
  );


  const handleOpenAdd = () => {
    form.reset({
      username: "",
      nama: "",
      email: "",
      area: "",
      jobTitle: "",
      direktorat: "",
      mobile: "",
      password: "",
      roleId: 1,
    });

    setIsAddOpen(true);
  };

  const onSubmitAdd = async (values: UserFormValues) => {
    try {
      const result = await userCreate.execute({
        username: values.username,
        password: values.password ?? "",
        roleId: values.roleId,
      });

      toast.success(result.message || "User created successfully");

      setIsAddOpen(false);
      form.reset(defaultValues);
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to create user");
    }
  };

  const handleEdit = (user: UserResponse) => {
    setSelectedUser(user);

    form.reset({
      username: user.name,
      nama: user.name,
      email: user.email,
      area: "",
      jobTitle: "",
      direktorat: "",
      mobile: "",
      password: "",
      roleId: user.role?.id ?? 1,
    });

    setIsEditOpen(true);
  };

  const onSubmitEdit = async (values: UserFormValues) => {
    if (!selectedUser) return;

    try {
      const result = await userUpdate.execute({
        id: selectedUser.id,
        password: values.password,
        roleId: values.roleId,
      });

      toast.success(result.message || "User updated successfully");

      setIsEditOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error?.error?.message || "Failed to update user");
    }
  };

  const handleDelete = (user: UserResponse) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const result = await userSoftDelete.execute({
        id: selectedUser.id,
      });

      toast.success(result.message || "User soft deleted");

      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
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
    [],
  );

  return (
    <div className={className} {...props}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <PageUserFilterTable className="my-0" />

        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* TABLE */}
      {isLoading && <div>Loading...</div>}

      {!isLoading && response?.success && (
        <DataTable
          data={response.data}
          columns={userColumns}
          pagination={response.pagination}
        />
      )}

      {/* ================= DELETE DIALOG ================= */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>

            <AlertDialogDescription>
              {selectedUser && (
                <>
                  User: {selectedUser.name} ({selectedUser.email})
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ================= ADD DIALOG ================= */}
      <UserFormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Add User"
        submitLabel="Save"
        form={form}
        onSubmit={onSubmitAdd}
        onUsernameChange={handleSearchInternalUser}
      />

      {/* ================= EDIT DIALOG ================= */}
      <UserFormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Edit User"
        submitLabel="Update"
        form={form}
        onSubmit={onSubmitEdit}
        isEdit
      />
    </div>
  );
}
