"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {useAppSelector} from "@/hooks/store/use-app-selector";
import {selectLogoutDialogIsOpen, setLogoutDialog} from "@/stores/dialog/logout";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/hooks/store/use-app-dispatch";
import {resetUser} from "@/stores/entity/user";
import {logoutAction} from "@/actions/auth";


export function DialogLogout({...props}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
	const router = useRouter();
	const dialogIsOpen: boolean = useAppSelector(selectLogoutDialogIsOpen)
	const dispatch = useAppDispatch();

	async function onClick(): Promise<void> {
		await logoutAction()
		dispatch(resetUser())
		dispatch(setLogoutDialog({
			isOpen: false
		}))
		router.push("/login");
	}

	function onOpenChange(open: boolean): void {
		dispatch(setLogoutDialog({
			isOpen: open
		}))
	}

	return (
		<AlertDialog onOpenChange={onOpenChange} open={dialogIsOpen} {...props}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will redirect you to login page.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
					<AlertDialogAction className="cursor-pointer bg-red-500" onClick={onClick}>Logout</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
