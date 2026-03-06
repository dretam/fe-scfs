"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import { BreadcrumbNavItem } from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";
import { PageUserDataTable } from "@/features/user";

export default async function UserPage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: 'User',
			href: "/user",
		},
	]

	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs} />
			<HeadingSmall className="m-5" title="User list" description="list of users" />
			<PageUserDataTable className="m-5" />
		</SidebarAppWrapper>
	)
}
