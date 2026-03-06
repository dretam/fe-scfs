"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import { BreadcrumbNavItem } from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";
import { PageLogsDataTable } from "@/features/logs";

export default async function LogsPage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: 'Access Logs',
			href: "/logs",
		},
	]

	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs} />
			<HeadingSmall className="m-5" title="Access Logs" description="system access logs" />
			<PageLogsDataTable className="m-5" />
		</SidebarAppWrapper>
	)
}
