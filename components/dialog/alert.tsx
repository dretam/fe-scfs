import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {cn} from '@/lib/utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import React from 'react';

export function DialogAlert({
	                               cancelOnClick,
	                               actionOnClick,
	                               title = 'Are you absolutely sure?',
	                               subTitle = 'This action cannot be undone. This will permanently delete your data and remove your data from our servers.',
	                               actionText = 'Continue',
	                               actionColorBG = 'bg-red-500',
	                               cancelText = 'Cancel',
	                               ...props
                               }: Readonly<{
	cancelOnClick: () => void;
	actionOnClick: () => void;
	title?: string;
	subTitle?: string;
	actionText?: string;
	actionColorBG?: string;
	cancelText?: string;
}> &
	React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
	return (
		<AlertDialog {...props}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{subTitle}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer" onClick={cancelOnClick}>
						{cancelText}
					</AlertDialogCancel>
					<AlertDialogAction className={cn('cursor-pointer', actionColorBG)} onClick={actionOnClick}>
						{actionText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
