"use client";

import { useRouter } from "next/navigation";
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
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import { loginSchema, LoginFormValues } from "@/features/auth/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { setUser, setAuthData } from "@/stores/entity/auth.store";
import InputPassword from "@/components/input/password";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin, useSession } from "@/features/auth";
import { UserSendTokenChangePasswordFormDialog } from "@/features/user/components/form/user-send-token-change-password-form-dialog";
import { useDialog } from "@/hooks/ui/use-dialog";

export function FormLogin({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dialog = useDialog();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { execute: login } = useLogin();

  const { data: sessionData, refetch: fetchSession } = useSession(
    "role,menus,permissions",
    false,
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (!sessionData?.success || !sessionData.data) return;

    const session = sessionData.data;

    dispatch(
      setAuthData({
        permissions: session.role?.permissions ?? [],
        menus: session.role?.menus ?? [],
      }),
    );

    router.push("/");
  }, [sessionData, dispatch, router]);

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      const { data } = await login(values);

      dispatch(setUser(data));

      toast(`Welcome, ${data?.name}`);

      await fetchSession(); // call session API
    } catch (error: any) {
      form.setError("username", {
        type: "server",
        message: "Please check your username again",
      });

      form.setError("password", {
        type: "server",
        message: "Double check your capslock and password",
      });

      toast(error?.message || "Username or Password is wrong!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-nowrap text-sm">
              Enter your username or email below to login to your account
            </p>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username / Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="johndoe" {...field} />
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
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="auth-remember-me"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="auth-remember-me"
                        className="font-normal"
                      >
                        Remember me
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Field>
            <Button className="cursor-pointer w-full" type="submit">
              Login
            </Button>
          </Field>

          <FieldSeparator />

          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <a 
                href="#" 
                className="underline underline-offset-4"
                onClick={(e) => {
                  e.preventDefault();

                  dialog.form((resolve) => (
                    <UserSendTokenChangePasswordFormDialog resolve={resolve} />
                  ));
                }}
              >
                Forgot Password
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
