"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import {BreadcrumbNavItem} from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";

export default async function LogsPage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: 'Access Logs',
			href: "/logs",
		},
	]

	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs}/>
			<HeadingSmall className="m-5" title="Access Logs" description="system access logs"/>
			<div className="m-5">
				<p className="text-muted-foreground">Access Logs viewer page - coming soon</p>
			</div>
		</SidebarAppWrapper>
	)
}
