"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { ChangeNewPasswordFormValues, changeNewPasswordSchema } from "@/features/auth/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import InputPassword from "@/components/input/password";
import { useChangePass, useUserChangePass } from "../hooks/use-user";
import { useRouter, useSearchParams } from "next/navigation";

export function FormChangePass({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { execute: changePass } = useChangePass();

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { data: singleUser, isLoading: isLoadingUser } = useUserChangePass(
    { id: token ?? '', expands: "role,userPermission,company" },
    { refetchOnWindowFocus: false },
  );

  const form = useForm<ChangeNewPasswordFormValues>({
    resolver: zodResolver(changeNewPasswordSchema),
    defaultValues: {
      id: '',
      forgotPasswordTokenHash: token ?? '',
      username: '',
      oldPassword: "",
      password: "",
      passwordConfirmation: ""
    },
  });

  useEffect(() => {
    if (singleUser?.data) {
      form.reset({
        id: singleUser.data.id,
        forgotPasswordTokenHash: token ?? '',
        username: singleUser.data.name,
        oldPassword: "",
        password: "",
        passwordConfirmation: ""
      });
    }
  }, [form, singleUser, token]);

  const onSubmit = async (values: ChangeNewPasswordFormValues): Promise<void> => {
    try {
      const { data } = await changePass(values);

      toast("Change password success");
      router.push('/login');
    } catch (error: any) {
      form.setError("id", {
        type: "server",
        message: "Please check your user id again",
      });

      form.setError("forgotPasswordTokenHash", {
        type: "server",
        message: "Please check your token again",
      });

      form.setError("username", {
        type: "server",
        message: "Please check your username again",
      });

      form.setError("oldPassword", {
        type: "server",
        message: "Double check your capslock and old password",
      });

      form.setError("password", {
        type: "server",
        message: "Double check your capslock and password",
      });

      form.setError("passwordConfirmation", {
        type: "server",
        message: "Double check your capslock and password confirmation",
      });

      toast(error?.message || "Change password fail");
    }
  };

  if (isLoadingUser) {
    return <>Fetching....</>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Change Password Account</h1>
            <p className="text-muted-foreground text-nowrap text-sm">
              Enter the fields below to change password to your account
            </p>
          </div>

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input type="text" disabled placeholder="User ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="forgotPasswordTokenHash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input type="text" disabled placeholder="token" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" disabled placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <InputPassword
                    disabled={form.getValues("oldPassword") === ""}
                    placeholder="******"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    disabled={form.getValues("password") === ""}
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <InputPassword
                    disabled={form.getValues("password") === ""}
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Field>
            <Button className="cursor-pointer w-full" type="submit">
              Submit
            </Button>
          </Field>

          <FieldSeparator />

          <Field>
            <FieldDescription className="text-center">
              Want to back login page?{" "}
              <a 
                href="/login" 
                className="underline underline-offset-4">
                Back to Login Page
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
