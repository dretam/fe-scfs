"use client";

import * as React from "react";
import SidebarAppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function SidebarAppWrapper({ children }: { children: React.ReactNode; }) {
	return (
		<>
			<SidebarProvider>
				<SidebarAppSidebar />
				<SidebarInset className="min-w-0 overflow-x-auto">
					{children}
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
