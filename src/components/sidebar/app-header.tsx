import {BreadcrumbNavItem} from "@/types/common";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import SidebarAppBreadcrumb from "@/components/sidebar/app-breadcrumb";
import {cn} from "@/lib/utils";
import NavToggleEnd from "@/components/sidebar/nav-toggle-end";

export default function SidebarAppHeader({breadcrumbs, className, ...props}: Readonly<{
	breadcrumbs: BreadcrumbNavItem[];
	className?: string;
}> & React.ComponentProps<"header">) {
	return (
		<header
			className={cn("flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12", className)} {...props}>
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1"/>
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<SidebarAppBreadcrumb breadcrumbs={breadcrumbs}/>
			</div>
			<div>
				<NavToggleEnd/>
			</div>
		</header>
	)
}