"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import {BreadcrumbNavItem} from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";
import { PageRoleDataTable } from "@/components/page/role/data-table";

export default async function RolePage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: 'Role',
			href: "/role",
		},
	]

	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs}/>
			<HeadingSmall className="m-5" title="Role list" description="list of roles"/>
			<PageRoleDataTable className="m-5"/>
		</SidebarAppWrapper>
	)
}
