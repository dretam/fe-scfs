"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { DialogFooter } from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRoleList } from "../../../role/api";
import { passwordValidation } from "@/shared/schema/validation";
import { useDialog } from "@/hooks/ui/use-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useInternalUserRetrieve } from "../../api";
import { useDebouncedCallback } from "@/hooks/helper/useDebounce";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  nama: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email"),
  area: z.string().min(1, "Area is required"),
  roleId: z.number(),
  jobTitle: z.string().min(1, "Job title is required"),
  direktorat: z.string().min(1, "Directorate is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  password: passwordValidation,
});

export type UserFormValues = z.infer<typeof userSchema>;

interface UserFormDialogProps {
  resolve: (values?: UserFormValues) => void;
  isEdit?: boolean;
  defaultValues?: Partial<UserFormValues>;
}

export function UserFormDialog({
  resolve,
  isEdit = false,
  defaultValues,
}: UserFormDialogProps) {
  const dialog = useDialog();

  const { data: roles } = useRoleList({
    page: 1,
    perPage: 100,
  });

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
      ...defaultValues,
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

  const onSubmit = (values: UserFormValues) => {
    resolve(values);

    dialog.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
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
                    <Input disabled {...field} placeholder="Full Name" />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} type="email" />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
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
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => {
                      field.onChange(value ? Number(value) : null);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles?.data?.map((role: any) => (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isEdit ? "New Password (optional)" : "Password"}
              </FormLabel>
              <FormControl>
                <Input
                  type={isEdit ? "password" : "text"}
                  {...field}
                  placeholder={
                    isEdit ? "Leave blank to keep current" : "Password"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
