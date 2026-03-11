"use client";

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import React from "react";
import { changeProfileSchema, ChangeProfileFormValues } from "@/features/auth/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectUserEmail, selectUserId, selectUserName, setUser } from "@/stores/entity/auth.store";
import { userChangeProfileAction } from "@/features/user/api/user";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import { useAppMutation } from "@/hooks/core/use-mutation";


export function FormSettingProfile({ className, ...props }: React.ComponentProps<"form">) {
	const userId: number | null = useAppSelector(selectUserId);
	const userName: string | null = useAppSelector(selectUserName);
	const userEmail: string | null = useAppSelector(selectUserEmail);
	const dispatch = useAppDispatch();

	const { execute: updateProfile, isLoading } = useAppMutation(userChangeProfileAction);

	// 1. Define your form.
	const form = useForm<ChangeProfileFormValues>({
		resolver: zodResolver(changeProfileSchema),
		defaultValues: {
			userId: userId ?? 0,
			name: userName ?? "",
			email: userEmail ?? "",
		}
	})

	// 2. Define a submit handler.
	const onSubmit = async (values: ChangeProfileFormValues): Promise<void> => {
		try {
			const { data } = await updateProfile(values);
			dispatch(setUser(data));
		} catch (error: any) {
			if (error?.message) {
				if (error.message.name) {
					form.setError('name', {
						type: 'server',
						message: error.message.name,
					})
				}
				if (error.message.email) {
					form.setError('email', {
						type: 'server',
						message: error.message.email,
					})
				}
			}
		}
	}

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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"name"}</FormLabel>
									<FormControl>
										<Input type="text" placeholder="johndoe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"email"}</FormLabel>
									<FormControl>
										<Input type="email" placeholder="johndoe@bankmega.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-row gap-2 w-full items-center justify-end">
					<div>
						<Button variant="default" type="submit" className="cursor-pointer"
							disabled={!form.formState.isDirty || form.formState.isSubmitting}>
							{"submit"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
