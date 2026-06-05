"use client";

import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
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
import { createUserSchema, editUserSchema, UserFormValues } from "../../schemas";
import { useDialog } from "@/hooks/ui/use-dialog";
import { useRoleList, useRoleRetrieve } from "@/features/role";
import { useMenuList } from "@/features/menu";
import { useInternalUserRetrieve, useUserRetrieve } from "../../hooks";
import { useDebouncedCallback } from "@/hooks/helper/useDebounce";
import { PermissionOverrideSelector } from "./permission-override-selector";
import { UserResponse } from "../../types";
import { useCompanyList, useCompanyRetrieve } from "@/features/company/hooks/use-company";

interface UserFormDialogProps {
  resolve: (values?: UserFormValues) => void;
  isEdit?: boolean;
  selectedUserId?: string;
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

  const { data: companies, isLoading: companyLoading } = useCompanyList({
    page: 1,
    perPage: 100
  });

  const { data: menus, isLoading: menuLoading } = useMenuList({
    page: 1,
    perPage: 100,
    expands: "permissions",
  });

  const { data: singleUser, isLoading: isLoadingEdit } = useUserRetrieve(
    { id: selectedUserId ?? "", expands: "role,roleChildren" },
    { enabled: isEdit, refetchOnWindowFocus: false },
  );

  const [username, setUsername] = useState("");

  const { debouncedFn } = useDebouncedCallback((value: string) => {
    setUsername(value);
  }, 500);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(
    isEdit ? editUserSchema : createUserSchema
  ) as Resolver<UserFormValues>,
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      roleId: "",
      roleChildrenId: "",
      companyId: "",
      email: "",
      isActive: false,
      photoPath: "",
      overrides: [],
    },
  });

  useEffect(() => {
    if (!singleUser?.data) return;

    const user = singleUser.data as UserResponse;

    form.reset({
      username: user.username ?? "",
      password: "",
      fullName: user.fullName ?? "",
      roleId: user.role?.id ?? "",
      roleChildrenId: user.roleChildren?.id ?? "",
      companyId: user.company?.companyId ?? "",
      email: user.email ?? "",
      isActive: user.isActive ?? false,
      overrides: user.userPermissionOverride ?? [],
    });
  }, [singleUser]);

  const onSubmit = (values: UserFormValues) => {
    resolve(values);
    dialog.close();
  };

  const selectedRoleId = form.watch("roleId");

  const { data: roleChildren, isLoading: roleChildrenLoading } = useRoleRetrieve(
    { id: selectedRoleId ?? "", expands: "roleChildren" },
    { enabled: !!selectedRoleId, refetchOnWindowFocus: false },
  );

  const selectedCompanyId = form.watch("companyId");

  const { data: company, isLoading: editCompanyLoading } = useCompanyRetrieve(
    { id: selectedCompanyId ?? "" },
    { enabled: !!selectedCompanyId, refetchOnWindowFocus: false },
  );

  if (roleLoading || companyLoading || menuLoading || isLoadingEdit) {
    return <>Fetching....</>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          {/* Tambah/Edit User */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isEdit ? "Edit User" : "Tambah User Baru"}</h3>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username*</FormLabel>
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEdit ? "New Password (Optional)" : "Password*"}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role*</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={
                      (e) => {
                        field.onChange(String(e));

                        // reset child dropdown
                        form.setValue("roleChildrenId", "");
                      } 
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {roleLoading || menuLoading || isLoadingEdit ? (
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization*</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={
                      (e) => {
                        field.onChange(String(e));
                      } 
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Company" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {companyLoading || editCompanyLoading || menuLoading || isLoadingEdit ? (
                        <SelectItem value="loading" disabled>
                          Loading companies...
                        </SelectItem>
                      ) : (
                        companies?.data?.map((company: any) => (
                          <SelectItem key={company.companyId} value={String(company.companyId)}>
                            {company.companyName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roleChildrenId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role dalam Company*</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(e) => field.onChange(String(e))}
                    disabled={!selectedRoleId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select User Role dalam Company" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {roleChildrenLoading || menuLoading || isLoadingEdit ? (
                        <SelectItem value="loading" disabled>
                          Loading user roles in company...
                        </SelectItem>
                      ) : (
                        roleChildren?.data?.roleChildren.map((roleChildren: any) => (
                          <SelectItem key={roleChildren.id} value={String(roleChildren.id)}>
                            {roleChildren.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
