"use client";

import {useRouter} from 'next/navigation'
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React from "react";
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {authLoginFormSchema} from "@/schemas/auth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod"
import {loginAction} from "@/actions/auth";
import {AuthLoginAction} from "@/types/action";
import {toast} from "sonner";
import {setUser} from "@/stores/entity/user";
import InputPassword from "@/components/input/password";
import {Checkbox} from "@/components/ui/checkbox";

export default function FormLogin({className, ...props}: React.ComponentProps<"form">) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const formSchema = authLoginFormSchema()

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			rememberMe: false
		}
	})

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
		const action: AuthLoginAction = await loginAction(values);
		if (!action.isSuccess) {
			form.setError('username', {
				type: 'server',
				message: "Please check your username again",
			})
			form.setError('password', {
				type: 'server',
				message: "Double check your capslock and password",
			})
			toast("Username or Password is wrong!")
		} else {
			dispatch(setUser(action.user))
			toast(`Welcome, ${action.user?.name}`)
			router.push("/")
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
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
						render={({field}) => (
							<FormItem>
								<FormLabel>Username / Email</FormLabel>
								<FormControl>
									<Input type="text" placeholder="johndoe" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({field}) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<InputPassword
										disabled={form.getValues("password") === ""}
										placeholder="******"
										{...field}
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="rememberMe"
						render={({field}) => (
							<FormItem>
								<FormControl>
									<FieldGroup>
										<Field orientation="horizontal">
											<Checkbox
												id="auth-remember-me"
												onCheckedChange={(checked: boolean) => {
													field.value = checked
												}}
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
								<FormMessage/>
							</FormItem>
						)}
					/>
					<Field>
						<Button className="cursor-pointer" type="submit">Login</Button>
					</Field>
					<FieldSeparator/>
					<Field>
						<FieldDescription className="text-center">
							Don&apos;t have an account?{" "}
							<a href="#" className="underline underline-offset-4">
								Sign up
							</a>
						</FieldDescription>
					</Field>
				</FieldGroup>
			</form>
		</Form>
	)
}
