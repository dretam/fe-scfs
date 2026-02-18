"use client"

import {ChevronRight, Building2Icon, type LucideIcon} from "lucide-react"

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavMainItem {
	title: string;
	url: string;
}

interface NavMainMenu {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive: boolean;
	items: NavMainItem[];
}

export function NavMain() {

	const items: NavMainMenu[] = [
		{
			title: "Business Unit",
			url: "#",
			icon: Building2Icon,
			isActive: true,
			items: [
				{
					title: "Users",
					url: "/user",
				}
			],
		},
		{
			title: "Documents",
			url: "#",
			icon: Building2Icon,
			isActive: true,
			items: [
				{
					title: "Documents",
					url: "/document",
				}
			],
		}
	];
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon/>}
									<span>{item.title}</span>
									<ChevronRight
										className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<a href={subItem.url}>
													<span>{subItem.title}</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
