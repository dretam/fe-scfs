import {BreadcrumbNavItem} from "@/types/common";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbItem,
	BreadcrumbPage
} from "@/components/ui/breadcrumb";
import {cn} from "@/lib/utils";


export default function SidebarAppBreadcrumb({breadcrumbs, className, props}: Readonly<{
	breadcrumbs: BreadcrumbNavItem[];
	className?: string;
}> & React.ComponentProps<"nav">) {
	return (
		<Breadcrumb className={cn(className)} {...props}>
			<BreadcrumbList>
				{
					breadcrumbs.map((breadcrumb, index) => {
						const isLast: boolean = index === breadcrumbs.length - 1;
						if (!isLast) {
							return (
								<React.Fragment key={index}>
									<BreadcrumbItem className="hidden md:block cursor-pointer">
										<BreadcrumbLink href={breadcrumb.href}>
											{breadcrumb.title}
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="hidden md:block" key={index}/>
								</React.Fragment>
							)
						} else {
							return (
								<BreadcrumbItem key={index}>
									<BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
								</BreadcrumbItem>
							)
						}
					})
				}
			</BreadcrumbList>
		</Breadcrumb>
	)
}