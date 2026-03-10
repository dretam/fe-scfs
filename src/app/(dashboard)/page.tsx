"use client"

import SidebarAppHeader from "@/components/sidebar/app-header";
import { BreadcrumbNavItem } from "@/types/common";

export default function DashboardPage() {
    const breadcrumbs: BreadcrumbNavItem[] = [
        {
            title: "Dashboard",
            href: "/",
        }
    ]
    return (
        <>
            <SidebarAppHeader breadcrumbs={breadcrumbs} />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
            </div>
        </>
    )
}
