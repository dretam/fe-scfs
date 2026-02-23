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
import { userChangePasswordFormSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionAction } from "@/types/action";
import { toast } from "sonner";
import { selectUserId } from "@/stores/entity/user";
import InputPassword from "@/components/input/password";
import { userChangePasswordAction } from "@/actions/user";
import { UserEntity } from "@/types/entity";
import { useAppSelector } from "@/hooks/use-app-selector";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { BadRequestResponse, UnauthorizedResponse } from "@/types/response";
import { useTranslations } from "next-intl";

export default function FormSettingPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const userId: number | null = useAppSelector(selectUserId);
  const formSchema = userChangePasswordFormSchema();
  const t = useTranslations();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId ?? 0,
      existingPassword: "",
      newPassword: "",
      retypeNewPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof formSchema>,
  ): Promise<void> => {
    const action: TransactionAction<
      UserEntity | UnauthorizedResponse | BadRequestResponse
    > = await userChangePasswordAction(values);
    if (!action.isSuccess) {
      if ("message" in action.response) {
        form.setError("existingPassword", {
          type: "server",
          message: action.response.message as string ?? "Error",
        });
      }
    } else {
      toast(t("toast1"));
      form.reset();
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
                  <FormLabel>{t("existing")}</FormLabel>
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
                  <FormLabel>{t("new")}</FormLabel>
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
                  <FormLabel>{t("retype")}</FormLabel>
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
              {t("reset")}
            </Button>
          </div>
          <div>
            <Button variant="default" type="submit" className="cursor-pointer">
              {t("submit")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
