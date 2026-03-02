"use server";

import * as React from "react";
import SidebarAppSidebar from "@/components/sidebar/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {DialogLogout} from "@/components/dialog/logout";

export default async function SidebarAppWrapper({children}: { children: React.ReactNode; }) {
	return (
		<>
			<SidebarProvider>
				<SidebarAppSidebar/>
				<SidebarInset className="min-w-0 overflow-x-auto">
					{children}
				</SidebarInset>
			</SidebarProvider>
			<DialogLogout/>
		</>
	)
}