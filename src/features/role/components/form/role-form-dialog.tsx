"use client";

import { useEffect } from "react";
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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RoleFormValues, roleSchema } from "../../schemas";
import { useDialog } from "@/hooks/ui/use-dialog";
import { useMenuList } from "@/features/menu";
import { useRoleRetrieve } from "../../hooks";
import { PermissionSelector } from "./permission-selector";
import { RoleResponse } from "../../types";

interface RoleFormDialogProps {
  resolve: (values?: RoleFormValues) => void;
  isEdit?: boolean;
  selectedRoleId?: number;
}

export function RoleFormDialog({
  resolve,
  isEdit = false,
  selectedRoleId,
}: RoleFormDialogProps) {
  const dialog = useDialog();

  const { data: menus, isLoading: menuLoading } = useMenuList({
    page: 1,
    perPage: 100,
    expands: "permissions",
  });

  const { data: singleRole, isLoading: isLoadingEdit } = useRoleRetrieve(
    { id: selectedRoleId ?? 0, expands: "permissions" },
    { enabled: isEdit, refetchOnWindowFocus: false },
  );

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      icon: "",
      description: "",
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (!singleRole?.data) return;

    const role = singleRole.data as RoleResponse;

    form.reset({
      name: role.name ?? "",
      icon: role.icon ?? "",
      description: role.description ?? "",
      permissionIds: role.permissions?.map((p) => p.id) ?? [],
    });
  }, [singleRole, form]);

  const onSubmit = (values: RoleFormValues) => {
    resolve(values);
    dialog.close();
  };

  if (menuLoading || (isEdit && isLoadingEdit)) {
    return <>Fetching....</>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[60vw]">
        <div className="grid grid-cols-2 gap-6">
          {/* First Column - Role Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Role Details</h3>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Role Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Class</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="lucide icon name or class" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Role Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Second Column - Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permissions</h3>

            {!menuLoading && (
              <div className="space-y-2">
                <PermissionSelector
                  menus={menus?.data ?? []}
                  form={form}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => dialog.close()}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
