import React from "react";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return <SidebarAppWrapper>{children}</SidebarAppWrapper>;
}
