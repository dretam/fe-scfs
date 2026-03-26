"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { changePasswordSchema, ChangePasswordFormValues } from "@/features/auth/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { selectUserId } from "@/stores/entity/auth.store";
import InputPassword from "@/components/input/password";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import { cn } from "@/lib/utils";
import { useUserChangePassword } from "@/features/user";

export function FormSettingPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const userId: number | null = useAppSelector(selectUserId);

  const { execute: changePassword, isLoading } = useUserChangePassword();

  // 1. Define your form.
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      userId: userId ?? 0,
      existingPassword: "",
      newPassword: "",
      retypeNewPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: ChangePasswordFormValues,
  ): Promise<void> => {
    try {
      await changePassword(values);
      toast.success("Password updated successfully");
      form.reset({
        ...form.getValues(),
        existingPassword: "",
        newPassword: "",
        retypeNewPassword: "",
      });
    } catch (error: any) {
      if (error?.message) {
        form.setError("existingPassword", {
          type: "server",
          message: typeof error.message === 'string' ? error.message : "Error updating password",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "flex w-full flex-col gap-8")}
        {...props}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="existingPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"existing"}</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="******"
                      disabled={form.getValues("existingPassword") === ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"new"}</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="******"
                      disabled={form.getValues("newPassword") === ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="retypeNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"retype"}</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="******"
                      disabled={form.getValues("retypeNewPassword") === ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full items-center justify-end">
          <div>
            <Button
              onClick={(): void => form.reset()}
              variant="secondary"
              type="button"
              className="cursor-pointer"
            >
              {"reset"}
            </Button>
          </div>
          <div>
            <Button variant="default" type="submit" className="cursor-pointer">
              {"submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
