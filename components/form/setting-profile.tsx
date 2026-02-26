"use client";

import {Button} from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import React from "react";
import {userChangeProfileFormSchema} from "@/schemas/auth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TransactionAction} from "@/types/action";
import {toast} from "sonner";
import {selectUserEmail, selectUserId, selectUserName, setUser} from "@/stores/entity/user";
import {userChangeProfileAction} from "@/actions/user";
import {UserEntity} from "@/types/entity";
import {useAppSelector} from "@/hooks/use-app-selector";
import {cn} from "@/lib/utils";
import * as z from "zod"
import {BadRequestResponse, UnauthorizedResponse} from "@/types/response";
import {Input} from "@/components/ui/input";
import {useAppDispatch} from "@/hooks/use-app-dispatch";


export default function FormSettingProfile({className, ...props}: React.ComponentProps<"form">) {
		const userId: number | null = useAppSelector(selectUserId);
		const userName: string | null = useAppSelector(selectUserName);
		const userEmail: string | null = useAppSelector(selectUserEmail);
		const dispatch = useAppDispatch();
		const formSchema = userChangeProfileFormSchema()


		// 1. Define your form.
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				userId: userId,
				name: userName ?? "",
				email: userEmail ?? "",
			}
		})

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
		const action: TransactionAction<UserEntity | UnauthorizedResponse | BadRequestResponse> = await userChangeProfileAction(values);
		if (!action.isSuccess) {
			if ('message' in action.response) {
				if ('name' in action.response.message) {
					form.setError('name', {
						type: 'server',
						message: action.response.message.name,
					})
				}
				if ('email' in action.response.message) {
					form.setError('email', {
						type: 'server',
						message: action.response.message.email,
					})
				}
			}
		} else {
			dispatch(setUser(action.response))
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
							render={({field}) => (
								<FormItem>
									<FormLabel>{"name"}</FormLabel>
									<FormControl>
										<Input type="text" placeholder="johndoe" {...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({field}) => (
								<FormItem>
									<FormLabel>{"email"}</FormLabel>
									<FormControl>
										<Input type="email" placeholder="johndoe@bankmega.com" {...field} />
									</FormControl>
									<FormMessage/>
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
