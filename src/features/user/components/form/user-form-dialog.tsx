"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserFormValues, userSchema } from "../../schemas";
import { useDialog } from "@/hooks/ui/use-dialog";
import { useRoleList } from "@/features/role";
import { useMenuList } from "@/features/menu";
import { useInternalUserRetrieve, useUserRetrieve } from "../../api";
import { useDebouncedCallback } from "@/hooks/helper/useDebounce";
import { PermissionOverrideSelector } from "./permission-override-selector";
import { UserResponse } from "../../types";

interface UserFormDialogProps {
  resolve: (values?: UserFormValues) => void;
  isEdit?: boolean;
  selectedUserId?: number;
}

export function UserFormDialog({
  resolve,
  isEdit = false,
  selectedUserId,
}: UserFormDialogProps) {
  const dialog = useDialog();

  const { data: roles, isLoading: roleLoading } = useRoleList({
    page: 1,
    perPage: 100,
    expands: "permissions",
  });

  const { data: menus, isLoading: menuLoading } = useMenuList({
    page: 1,
    perPage: 100,
    expands: "permissions",
  });

  const { data: singleUser, isLoading: isLoadingEdit } = useUserRetrieve(
    { id: selectedUserId ?? 0, expands: "role,userPermission,userDetail" },
    { enabled: isEdit, refetchOnWindowFocus: false },
  );

  const [username, setUsername] = useState("");

  const { data: internalUser } = useInternalUserRetrieve(username);

  const { debouncedFn } = useDebouncedCallback((value: string) => {
    setUsername(value);
  }, 500);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      nama: "",
      email: "",
      area: "",
      jobTitle: "",
      direktorat: "",
      mobile: "",
      password: "",
      roleId: 1,
      overrides: [],
    },
  });

  useEffect(() => {
    if (!internalUser?.data) return;

    const user = internalUser.data;

    form.setValue("nama", user.nama ?? "");
    form.setValue("email", user.email ?? "");
    form.setValue("area", user.area ?? "");
    form.setValue("jobTitle", user.jobTitle ?? "");
    form.setValue("direktorat", user.direktorat ?? "");
    form.setValue("mobile", user.mobile ?? "");
  }, [internalUser, form]);

  useEffect(() => {
    if (!singleUser?.data) return;

    const user = singleUser.data as UserResponse;

    form.reset({
      username: user.name ?? "",
      nama: user.userDetail?.nama ?? "",
      email: user.email ?? "",
      area: user.userDetail?.area ?? "",
      jobTitle: user.userDetail?.jobTitle ?? "",
      direktorat: user.userDetail?.direktorat ?? "",
      mobile: user.userDetail?.mobile ?? "",
      roleId: user.role?.id ?? 1,
      overrides: user.userPermissionOverride ?? [],
    });
  }, [singleUser]);

  const onSubmit = (values: UserFormValues) => {
    resolve(values);
    dialog.close();
  };

  if (roleLoading || menuLoading || isLoadingEdit) {
    return <>Fetching....</>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[80vw]">
        <div className="grid grid-cols-2 gap-6">
          {/* First Column - User Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Details</h3>
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isEdit}
                      placeholder="Username"
                      onChange={(e) => {
                        field.onChange(e);
                        !isEdit && debouncedFn(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} type="email" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direktorat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Directorate</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEdit ? "New Password (optional)" : "Password"}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Second Column - Role & Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Role & Permissions</h3>
            
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(e) => field.onChange(Number(e))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {(roleLoading || menuLoading || isLoadingEdit) ? (
                        <SelectItem value="loading" disabled>
                          Loading roles...
                        </SelectItem>
                      ) : (
                        roles?.data?.map((role: any) => (
                          <SelectItem key={role.id} value={String(role.id)}>
                            {role.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Permission Overrides */}
            {!roleLoading && !menuLoading && (
              <div className="space-y-2">
                <PermissionOverrideSelector
                  menus={menus?.data}
                  roles={roles?.data}
                  form={form}
                />
              </div>
            )}
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
