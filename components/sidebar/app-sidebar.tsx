"use client"

import * as React from "react"
import {NavMain} from "@/components/sidebar/nav-main"
import {NavMonitors} from "@/components/sidebar/nav-monitors"
import {NavUser} from "@/components/sidebar/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import CommonCompanyLogo from "@/components/common/company-logo";

export default function SidebarAppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
						>
							<div className="flex flex-row items-center justify-start gap-2">
								<CommonCompanyLogo width={50} height={50} href="/"/>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Bank Mega</span>
									<span className="truncate text-xs">Corporate System</span>
								</div>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain/>
				<NavMonitors/>
			</SidebarContent>
			<SidebarFooter>
				<NavUser/>
			</SidebarFooter>
			<SidebarRail/>
		</Sidebar>
	)
}
